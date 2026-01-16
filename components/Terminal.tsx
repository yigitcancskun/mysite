'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypingEffect({ text, speed = 30, delay = 0, onComplete, className = '' }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="cursor" />}
    </span>
  );
}

interface CommandLineProps {
  command: string;
  children: React.ReactNode;
  delay?: number;
  cellNumber?: number;
}

export function CommandLine({ command, children, delay = 0, cellNumber }: CommandLineProps) {
  const [showOutput, setShowOutput] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setShowOutput(true), delay + 500);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="command-line">
      <div className="command-prompt">
        <span className="prompt-symbol">In [{cellNumber || ''}]:</span>
        <TypingEffect text={command} delay={delay} className="prompt-text" />
      </div>
      <div className="command-output" style={{ 
        opacity: showOutput ? 1 : 0,
        transform: showOutput ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.3s ease'
      }}>
        {showOutput && cellNumber && (
          <span className="output-label">Out[{cellNumber}]:</span>
        )}
        {children}
      </div>
    </div>
  );
}

interface SkillBarProps {
  name: string;
  level: number;
}

export function SkillBar({ name, level }: SkillBarProps) {
  const filled = Math.round(level / 10);
  const empty = 10 - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  
  return (
    <div className="skill-bar">
      <span className="skill-name">{name}</span>
      <span className="skill-progress">[{bar}]</span>
      <span className="skill-percent">{level}%</span>
    </div>
  );
}

interface OutputProps {
  children: React.ReactNode;
  dim?: boolean;
  className?: string;
}

export function Output({ children, dim = false, className = '' }: OutputProps) {
  return (
    <div className={`${dim ? 'dim' : ''} ${className}`} style={{ 
      color: dim ? 'var(--terminal-text-dim)' : 'var(--terminal-text)',
      marginBottom: '4px'
    }}>
      {children}
    </div>
  );
}

export function TerminalDivider() {
  return <hr className="terminal-divider" />;
}
