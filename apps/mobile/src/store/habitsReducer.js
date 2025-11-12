import { nanoid } from '../utils/nanoid.js';

export const initialState = {
  onboardingComplete: false,
  habits: [],
  emotionLogs: [],
  isSyncing: false,
  lastSyncedAt: null
};

export function habitsReducer(state, action) {
  switch (action.type) {
    case 'completeOnboarding':
      return { ...state, onboardingComplete: true };
    case 'setHabits':
      return { ...state, habits: action.payload.habits };
    case 'createHabit': {
      const newHabit = { ...action.payload.habit, id: action.payload.habit.id || nanoid(), successRate: action.payload.habit.successRate ?? 0 };
      return { ...state, habits: [newHabit, ...state.habits] };
    }
    case 'updateHabit':
      return {
        ...state,
        habits: state.habits.map((habit) => (habit.id === action.payload.habit.id ? { ...habit, ...action.payload.habit } : habit))
      };
    case 'deleteHabit':
      return { ...state, habits: state.habits.filter((habit) => habit.id !== action.payload.habitId) };
    case 'addEmotionLog': {
      const updatedLogs = [{ ...action.payload.log, id: action.payload.log.id || nanoid() }, ...state.emotionLogs];
      return {
        ...state,
        emotionLogs: updatedLogs,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.log.habitId
            ? { ...habit, successRate: action.payload.log.successRate }
            : habit
        )
      };
    }
    case 'setEmotionLogs':
      return { ...state, emotionLogs: action.payload.logs };
    case 'setSyncing':
      return { ...state, isSyncing: action.payload.isSyncing, lastSyncedAt: action.payload.isSyncing ? state.lastSyncedAt : Date.now() };
    default:
      return state;
  }
}
