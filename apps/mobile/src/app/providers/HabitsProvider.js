import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import { habitsReducer, initialState } from '../../store/habitsReducer.js';
import { useHabitService } from '../../hooks/useHabits.js';

const HabitsContext = createContext(null);

export function HabitsProvider({ children }) {
  const [state, dispatch] = useReducer(habitsReducer, initialState);
  const { bootstrap, actions } = useHabitService(dispatch);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const value = useMemo(
    () => ({
      state,
      actions
    }),
    [state, actions]
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabitsContext() {
  const ctx = useContext(HabitsContext);
  if (!ctx) {
    throw new Error('useHabitsContext must be used within HabitsProvider');
  }
  return ctx;
}
