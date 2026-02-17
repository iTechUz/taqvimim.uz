import { useState, useCallback, useEffect } from 'react';

export interface ChecklistState {
  roza: boolean;
  namoz: boolean;
  quron: boolean;
  zikr: boolean;
  sadaqa: boolean;
  goodDeed: boolean;
}

const defaultState: ChecklistState = {
  roza: false,
  namoz: false,
  quron: false,
  zikr: false,
  sadaqa: false,
  goodDeed: false,
};

function storageKey(date: string) {
  return `checklist_${date}`;
}

export function getChecklistForDate(date: string): ChecklistState {
  const saved = localStorage.getItem(storageKey(date));
  if (saved) {
    try { return JSON.parse(saved); } catch { /* ignore */ }
  }
  return { ...defaultState };
}

export function useChecklist(date: string) {
  const [state, setState] = useState<ChecklistState>(() => getChecklistForDate(date));

  useEffect(() => {
    setState(getChecklistForDate(date));
  }, [date]);

  const toggle = useCallback((key: keyof ChecklistState) => {
    setState(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(storageKey(date), JSON.stringify(next));
      return next;
    });
  }, [date]);

  const total = Object.keys(state).length;
  const completed = Object.values(state).filter(Boolean).length;
  const progress = Math.round((completed / total) * 100);

  return { state, toggle, progress, completed, total };
}

export function calculateStreak(timetable: { dateGregorian: string }[]): number {
  let streak = 0;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  for (let i = timetable.length - 1; i >= 0; i--) {
    if (timetable[i].dateGregorian > todayStr) continue;
    const cl = getChecklistForDate(timetable[i].dateGregorian);
    if (cl.roza && cl.namoz) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
