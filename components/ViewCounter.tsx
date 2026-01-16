'use client';

import { useEffect, useState } from 'react';
import AnalyticsGraph from './AnalyticsGraph';

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const fetchCount = async () => {
      try {
        const response = await fetch('https://api.counterapi.dev/v1/yigitcancskun/hits/up');
        const data = await response.json();
        setCount(data.count);
      } catch {
        // Silently fail - counter is hidden anyway
      }
    };

    if (typeof window !== 'undefined') {
      fetchCount();
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground" style={{ color: 'var(--muted)' }}>
            Canlı Trafik
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold gradient-text">
            {count !== null ? count.toLocaleString() : '---'}
          </span>
          <span className="text-xs text-muted-foreground" style={{ color: 'var(--muted)', opacity: 0.7 }}>
            kez görüntülendi
          </span>
        </div>
      </div>
      
      {count !== null && <AnalyticsGraph totalViews={count} />}
    </div>
  );
}
