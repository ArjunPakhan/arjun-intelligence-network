import { useState, useCallback } from 'react';
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

function fakeAESBlock(block, key = 'SECRET_KEY_12345') {
  // Visual simulation — not real AES, but visually correct
  let result = '';
  for (let i = 0; i < block.length; i++) {
    const encrypted = ((block.charCodeAt(i) ^ key.charCodeAt(i % key.length)) + 128) % 256;
    result += encrypted.toString(16).padStart(2, '0').toUpperCase();
  }
  return result;
}

function xorBlocks(a, b) {
  let result = '';
  for (let i = 0; i < Math.max(a.length, b.length); i += 2) {
    const byteA = parseInt(a.slice(i, i + 2) || '00', 16);
    const byteB = parseInt(b.slice(i, i + 2) || '00', 16);
    result += ((byteA ^ byteB)).toString(16).padStart(2, '0').toUpperCase();
  }
  return result;
}

export default function AESVisualizer() {
  const [plaintext, setPlaintext] = useState('Hello World!');
  const [blocks, setBlocks] = useState([]);
  const [encrypting, setEncrypting] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(-1);
  const [ciphertext, setCiphertext] = useState([]);
  const [iv] = useState('A1B2C3D4E5F6G7H8');

  const encrypt = useCallback(() => {
    setEncrypting(true);
    setBlocks(textToBlocks(plaintext));
    setCiphertext([]);
    setCurrentBlock(0);

    const textBlocks = textToBlocks(plaintext);
    let prevCipher = iv;

    textBlocks.forEach((block, i) => {
      setTimeout(() => {
        setCurrentBlock(i);

        // XOR with previous ciphertext (CBC mode)
        const xored = xorBlocks(
          Array.from(block).map(c => c.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()).join(''),
          prevCipher
        );
        const encrypted = fakeAESBlock(xored);
        prevCipher = encrypted;

        setCiphertext(prev => [...prev, { block: encrypted, index: i }]);

        if (i === textBlocks.length - 1) {
          setTimeout(() => setEncrypting(false), 500);
        }
      }, i * 600);
    });
  }, [plaintext]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          placeholder="Enter message to encrypt..."
          className="flex-1 bg-navy-mid border border-terminal-border rounded px-3 py-2 font-mono text-sm text-ghost-white placeholder-gray-600 outline-none focus:border-cuda-orange transition-colors"
        />
        <button
          onClick={encrypt}
          disabled={encrypting}
          className="px-4 py-2 font-mono text-xs rounded border transition-all"
          style={{
            background: encrypting ? '#1A1F2B' : '#FF6B00',
            borderColor: encrypting ? '#2A3040' : '#FF6B00',
            color: encrypting ? '#666' : '#fff',
          }}
        >
          {encrypting ? 'ENCRYPTING...' : 'AES-256 ENCRYPT'}
        </button>
      </div>

      {/* IV display */}
      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="text-gray-500">IV:</span>
        <span className="text-imperial-purple">{iv}</span>
      </div>

      {/* Plaintext blocks */}
      {blocks.length > 0 && (
        <div className="space-y-2">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Plaintext Blocks</div>
          <div className="flex flex-wrap gap-2">
            {blocks.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: currentBlock === i ? 1.1 : 1,
                  borderColor: currentBlock === i ? '#FF6B00' : '#2A3040',
                }}
                className="px-3 py-2 rounded border font-mono text-xs"
                style={{
                  background: currentBlock === i ? '#FF6B0010' : '#0D1117',
                }}
              >
                <div className="text-gray-500 text-[9px] mb-1">Block {i + 1}</div>
                <div className="text-ghost-white text-[11px]">{block}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Ciphertext blocks */}
      {ciphertext.length > 0 && (
        <div className="space-y-2">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Ciphertext (CBC Mode)</div>
          <div className="flex flex-wrap gap-2">
            {ciphertext.map((ct) => (
              <motion.div
                key={ct.index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-3 py-2 rounded border font-mono text-xs"
                style={{ background: '#0D1117', borderColor: '#FF6B00' }}
              >
                <div className="text-gray-500 text-[9px] mb-1">Cipher {ct.index + 1}</div>
                <div className="text-cuda-orange text-[11px] break-all">{ct.block}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Algorithm info */}
      <div className="p-3 rounded border font-mono text-[11px] text-gray-400" style={{ background: '#0A0E17', borderColor: '#2A3040' }}>
        <span className="text-sith-red">AES-256-CBC</span> — Each plaintext block is XORed with the previous ciphertext block
        before encryption. The IV (Initialization Vector) ensures identical messages produce different ciphertext.
        Block size: 16 bytes. Key size: 256 bits.
      </div>
    </div>
  );
}
