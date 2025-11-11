import { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { fetchHabits, createHabit, updateHabit, deleteHabit, logEmotion, fetchEmotionLogs } from '../services/habitService.js';

export function useHabitService(dispatch) {
  const bootstrap = useCallback(async () => {
    try {
      dispatch({ type: 'setSyncing', payload: { isSyncing: true } });
      const [habitResponse, logs] = await Promise.all([fetchHabits(), fetchEmotionLogs()]);
      dispatch({ type: 'setHabits', payload: { habits: habitResponse } });
      dispatch({ type: 'setEmotionLogs', payload: { logs } });
    } catch (error) {
      console.warn('Failed to bootstrap habits', error);
    } finally {
      dispatch({ type: 'setSyncing', payload: { isSyncing: false } });
    }
  }, [dispatch]);

  const completeOnboarding = useCallback(() => {
    dispatch({ type: 'completeOnboarding' });
  }, [dispatch]);

  const createHabitAction = useCallback(
    async (data) => {
      dispatch({ type: 'setSyncing', payload: { isSyncing: true } });
      try {
        const habit = await createHabit(data);
        dispatch({ type: 'createHabit', payload: { habit } });
      } finally {
        dispatch({ type: 'setSyncing', payload: { isSyncing: false } });
      }
    },
    [dispatch]
  );

  const updateHabitAction = useCallback(
    async (data) => {
      dispatch({ type: 'setSyncing', payload: { isSyncing: true } });
      try {
        const habit = await updateHabit(data);
        dispatch({ type: 'updateHabit', payload: { habit } });
      } finally {
        dispatch({ type: 'setSyncing', payload: { isSyncing: false } });
      }
    },
    [dispatch]
  );

  const deleteHabitAction = useCallback(
    async (id) => {
      dispatch({ type: 'setSyncing', payload: { isSyncing: true } });
      try {
        await deleteHabit(id);
        dispatch({ type: 'deleteHabit', payload: { habitId: id } });
      } finally {
        dispatch({ type: 'setSyncing', payload: { isSyncing: false } });
      }
    },
    [dispatch]
  );

  const logEmotionAction = useCallback(
    async ({ habitId, emotionLabel, emotionTone, note, successRate }) => {
      dispatch({ type: 'setSyncing', payload: { isSyncing: true } });
      try {
        const response = await logEmotion({
          habitId,
          emotionLabel,
          emotionTone,
          note,
          successRate,
          loggedAt: dayjs().toISOString()
        });
        dispatch({ type: 'addEmotionLog', payload: { log: response } });
      } finally {
        dispatch({ type: 'setSyncing', payload: { isSyncing: false } });
      }
    },
    [dispatch]
  );

  const actions = useMemo(
    () => ({
      completeOnboarding,
      createHabit: createHabitAction,
      updateHabit: updateHabitAction,
      deleteHabit: deleteHabitAction,
      logEmotion: logEmotionAction
    }),
    [completeOnboarding, createHabitAction, updateHabitAction, deleteHabitAction, logEmotionAction]
  );

  return { bootstrap, actions };
}
