import { useHabitsContext } from '../app/providers/HabitsProvider.js';

export function useHabits() {
  const { state, actions } = useHabitsContext();
  return {
    onboardingComplete: state.onboardingComplete,
    habits: state.habits,
    emotionLogs: state.emotionLogs,
    isSyncing: state.isSyncing,
    lastSyncedAt: state.lastSyncedAt,
    actions
  };
}
