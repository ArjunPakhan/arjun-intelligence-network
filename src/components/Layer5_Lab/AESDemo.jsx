import { useState } from 'react';
import { motion } from 'framer-motion';

const BLOCK_SIZE = 16;

function textToBlocks(text) {
  const padded = text.padEnd(Math.ceil(text.length / BLOCK_SIZE) * BLOCK_SIZE, '\0');
  const blocks = [];
  for (let i = 0; i < padded.length; i += BLOCK_SIZE) {
    blocks.push(padded.slice(i, i + BLOCK_SIZE));
  }
  return blocks;
}

function fakeAES(block, key) {
  let result = '';
  for (let i = 0; i < block.length; i++) {
    const encrypted = ((block.charCodeAt(i) ^ key.charCodeAt(i % key.length)) + 128) % 256;
    result += encrypted.toString(16).padStart(2, '0').toUpperCase();
  }
  return result;
}

function xorHex(a, b) {
  let result = '';
  for (let i = 0; i < Math.max(a.length, b.length); i += 2) {
    const byteA = parseInt(a.slice(i, i + 2) || '00', 16);
    const byteB = parseInt(b.slice(i, i + 2) || '00', 16);
    result += ((byteA ^ byteB)).toString(16).padStart(2, '0').toUpperCase();
  }
  return result;
}

export default function AESDemo() {
  const [plaintext, setPlaintext] = useState('Attack at dawn!');
  const [encrypting, setEncrypting] = useState(false);
  const [decrypting, setDecrypting] = useState(false);
  const [steps, setSteps] = useState([]);
  const [ciphertext, setCiphertext] = useState('');
  const [decryptSteps, setDecryptSteps] = useState([]);
  const [decryptedText, setDecryptedText] = useState('');

  const KEY = 'SECRET_KEY_12345';
  const IV = 'A1B2C3D4E5F6G7H8';

  const encrypt = () => {
    setEncrypting(true);
    setDecryptSteps([]);
    setDecryptedText('');
    const blocks = textToBlocks(plaintext);
    const allSteps = [];
    let prevCipher = IV;

    blocks.forEach((block, i) => {
      const blockHex = Array.from(block).map(c =>
        c.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()
      ).join('');

      const xored = xorHex(blockHex, prevCipher);
      const encrypted = fakeAES(xored, KEY);

      allSteps.push({
        blockNum: i + 1,
        plaintext: block,
        plaintextHex: blockHex,
        iv: prevCipher,
        xored,
        ciphertext: encrypted,
      });

      prevCipher = encrypted;
    });

    // Animate steps one by one
    setSteps([]);
    allSteps.forEach((step, i) => {
      setTimeout(() => {
        setSteps(prev => [...prev, step]);
        if (i === allSteps.length - 1) {
          setCiphertext(prevCipher);
          setEncrypting(false);
        }
      }, i * 500);
    });
  };

  const decrypt = () => {
    if (!ciphertext) return;
    setDecrypting(true);
    const blocks = textToBlocks(plaintext);
    const allDecryptSteps = [];
    let prevCipher = IV;

    blocks.forEach((block, i) => {
      const blockHex = Array.from(block).map(c =>
        c.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()
      ).join('');

      const xored = xorHex(blockHex, prevCipher);
      const encrypted = fakeAES(xored, KEY);

      // Decrypt: reverse the XOR
      const decryptedHex = xorHex(encrypted, prevCipher);
      const decryptedText = decryptedHex.match(/.{1,2}/g)?.map(h =>
        String.fromCharCode(parseInt(h, 16))
      ).join('') || '';

      allDecryptSteps.push({
        blockNum: i + 1,
        cipherHex: encrypted,
        iv: prevCipher,
        decryptedHex,
        decryptedText: decryptedText.replace(/\0/g, ''),
      });

      prevCipher = encrypted;
    });

    setDecryptSteps([]);
    allDecryptSteps.forEach((step, i) => {
      setTimeout(() => {
        setDecryptSteps(prev => [...prev, step]);
        if (i === allDecryptSteps.length - 1) {
          setDecryptedText(allDecryptSteps.map(s => s.decryptedText).join(''));
          setDecrypting(false);
        }
      }, i * 500);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="flex-1 bg-navy-mid border border-terminal-border rounded px-3 py-2 font-mono text-sm text-ghost-white placeholder-gray-600 outline-none focus:border-code-green transition-colors"
        />
        <button
          onClick={encrypt}
          disabled={encrypting || decrypting}
          className="px-4 py-2 rounded font-mono text-xs transition-all"
          style={{ background: encrypting ? '#1A1F2B' : '#00FF88', color: encrypting ? '#666' : '#06080F' }}
        >
          ENCRYPT
        </button>
        <button
          onClick={decrypt}
          disabled={encrypting || decrypting || !ciphertext}
          className="px-4 py-2 rounded font-mono text-xs border transition-all"
          style={{
            borderColor: !ciphertext ? '#2A3040' : '#00D4FF',
            color: !ciphertext ? '#666' : '#00D4FF',
            background: '#0D1117',
          }}
        >
          DECRYPT
        </button>
      </div>

      {/* Encryption steps */}
      {steps.length > 0 && (
        <div className="space-y-3">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Encryption Pipeline (CBC Mode)</div>
          {steps.map((step) => (
            <motion.div
              key={step.blockNum}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded border font-mono text-[11px] space-y-1"
              style={{ background: '#0A0E17', borderColor: '#2A3040' }}
            >
              <div className="text-gray-500">Block {step.blockNum}:</div>
              <div><span className="text-gray-500">Plain:</span> <span className="text-ghost-white">{step.plaintext}</span> <span className="text-gray-600">({step.plaintextHex})</span></div>
              <div><span className="text-gray-500">XOR ⊕</span> <span className="text-imperial-purple">{step.iv}</span> <span className="text-gray-500">→</span> <span className="text-cuda-orange">{step.xored}</span></div>
              <div><span className="text-gray-500">AES  →</span> <span className="text-code-green font-bold">{step.ciphertext}</span></div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Decryption steps */}
      {decryptSteps.length > 0 && (
        <div className="space-y-3 mt-4">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Decryption Pipeline</div>
          {decryptSteps.map((step) => (
            <motion.div
              key={step.blockNum}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded border font-mono text-[11px] space-y-1"
              style={{ background: '#0A0E17', borderColor: '#00D4FF40' }}
            >
              <div className="text-gray-500">Block {step.blockNum}:</div>
              <div><span className="text-gray-500">Cipher:</span> <span className="text-code-green">{step.cipherHex}</span></div>
              <div><span className="text-gray-500">XOR ⊕</span> <span className="text-imperial-purple">{step.iv}</span> <span className="text-gray-500">→</span> <span className="text-electric-cyan">{step.decryptedHex}</span></div>
              <div><span className="text-gray-500">Plain →</span> <span className="text-ghost-white font-bold">{step.decryptedText}</span></div>
            </motion.div>
          ))}
        </div>
      )}

      {decryptedText && (
        <div className="p-3 rounded border font-mono text-xs" style={{ background: '#00D4FF10', borderColor: '#00D4FF' }}>
          <span className="text-gray-500">Decrypted: </span>
          <span className="text-electric-cyan">{decryptedText}</span>
        </div>
      )}
    </div>
  );
}
