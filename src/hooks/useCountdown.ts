import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountdownResult {
  seconds: number;
  running: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useCountdown(initialSeconds: number): UseCountdownResult {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { clear(); setRunning(false); return 0; }
        return s - 1;
      });
    }, 1000);
    return clear;
  }, [running]);

  const start  = useCallback(() => { if (seconds > 0) setRunning(true); }, [seconds]);
  const pause  = useCallback(() => { clear(); setRunning(false); }, []);
  const reset  = useCallback(() => { clear(); setRunning(false); setSeconds(initialSeconds); }, [initialSeconds]);

  return { seconds, running, start, pause, reset };
}
