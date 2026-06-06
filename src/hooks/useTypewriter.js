import { useState, useEffect, useCallback } from 'react';

export function useTypewriter(text, speed = 30, startDelay = 0, enabled = true) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setDisplayedText('');
    setIsComplete(false);
    setIsStarted(false);

    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, startDelay, enabled]);

  useEffect(() => {
    if (!isStarted || !enabled) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isStarted, text, speed, enabled]);

  return { displayedText, isComplete };
}

export function useSequentialTypewriter(lines, speed = 30, lineDelay = 100) {
  const [completedLines, setCompletedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [allComplete, setAllComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setAllComplete(true);
      return;
    }

    const line = lines[currentLineIndex];
    let charIndex = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (charIndex < line.text.length) {
          setCurrentText(line.text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setCompletedLines(prev => [...prev, line.text]);
            setCurrentText('');
            setCurrentLineIndex(prev => prev + 1);
          }, lineDelay);
        }
      }, speed);

      return () => clearInterval(interval);
    }, line.delay || 0);

    return () => clearTimeout(timeout);
  }, [currentLineIndex, lines, speed, lineDelay]);

  return { completedLines, currentText, allComplete, currentLineIndex };
}

export function useKeyboardShortcuts(handlers) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const handler = handlers[e.key];
      if (handler) handler(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}

export function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options.threshold]);

  return isInView;
}
