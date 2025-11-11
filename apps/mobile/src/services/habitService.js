import dayjs from 'dayjs';
import { apiGet, apiPost, apiPatch, apiDelete } from './apiClient.js';

const HABITS_PATH = '/habits';
const EMOTIONS_PATH = '/habits/emotions';

export async function fetchHabits() {
  try {
    const response = await apiGet(HABITS_PATH);
    return response.habits ?? [];
  } catch (error) {
    console.warn('Falling back to local habits due to API error', error.message);
    return [
      {
        id: 'habit-demo-1',
        name: 'Morning meditation',
        description: 'Spend 10 minutes on mindful breathing to start the day with clarity.',
        cadence: 'daily',
        successRate: 0.6
      },
      {
        id: 'habit-demo-2',
        name: 'Evening gratitude journal',
        description: 'Reflect on three positive events and log emotions before sleep.',
        cadence: 'daily',
        successRate: 0.8
      }
    ];
  }
}

export async function createHabit(habit) {
  try {
    const response = await apiPost(HABITS_PATH, habit);
    return response.habit;
  } catch (error) {
    console.warn('createHabit failed, returning local habit', error.message);
    return {
      ...habit,
      id: `local-${Date.now()}`,
      successRate: 0
    };
  }
}

export async function updateHabit(habit) {
  try {
    const response = await apiPatch(`${HABITS_PATH}/${habit.id}`, habit);
    return response.habit;
  } catch (error) {
    console.warn('updateHabit failed, using optimistic update', error.message);
    return habit;
  }
}

export async function deleteHabit(id) {
  try {
    await apiDelete(`${HABITS_PATH}/${id}`);
  } catch (error) {
    console.warn('deleteHabit failed, deferring removal', error.message);
  }
}

export async function fetchEmotionLogs() {
  try {
    const response = await apiGet(EMOTIONS_PATH);
    return response.logs ?? [];
  } catch (error) {
    console.warn('Falling back to sample emotion logs', error.message);
    return [
      {
        id: 'emotion-demo-1',
        habitId: 'habit-demo-1',
        loggedAt: dayjs().subtract(2, 'day').toISOString(),
        emotionLabel: 'Balanced',
        emotionTone: 'primary',
        note: 'Felt more present and calm',
        successRate: 0.64
      },
      {
        id: 'emotion-demo-2',
        habitId: 'habit-demo-2',
        loggedAt: dayjs().subtract(1, 'day').toISOString(),
        emotionLabel: 'Grateful',
        emotionTone: 'success',
        note: 'Noticed positive progress this week',
        successRate: 0.81
      }
    ];
  }
}

export async function logEmotion(entry) {
  try {
    const response = await apiPost(EMOTIONS_PATH, entry);
    return response.log;
  } catch (error) {
    console.warn('logEmotion failed, using local log entry', error.message);
    return {
      ...entry,
      id: `emotion-${Date.now()}`
    };
  }
}
