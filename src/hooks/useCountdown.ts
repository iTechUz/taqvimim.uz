import { useState, useEffect } from 'react';

export interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  label: string;
  status: 'saharlik' | 'fasting' | 'iftor';
}

function parseTimeToday(timeStr: string): Date {
  const [h, m] = timeStr.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export function useCountdown(saharlik?: string, iftor?: string): CountdownState | null {
  const [state, setState] = useState<CountdownState | null>(null);

  useEffect(() => {
    if (!saharlik || !iftor) return;

    const tick = () => {
      const now = new Date();
      const saharlikTime = parseTimeToday(saharlik);
      const iftorTime = parseTimeToday(iftor);

      let target: Date;
      let label: string;
      let status: CountdownState['status'];

      if (now < saharlikTime) {
        target = saharlikTime;
        label = 'Saharlik tugashiga';
        status = 'saharlik';
      } else if (now < iftorTime) {
        target = iftorTime;
        label = 'Iftorgacha';
        status = 'fasting';
      } else {
        setState({ hours: 0, minutes: 0, seconds: 0, label: 'Iftor vaqti!', status: 'iftor' });
        return;
      }

      const diff = target.getTime() - now.getTime();
      setState({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        label,
        status,
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [saharlik, iftor]);

  return state;
}
