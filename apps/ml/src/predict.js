export function predictHabitScore(inputs) {
  const total = Object.values(inputs).reduce((sum, value) => sum + Number(value || 0), 0);
  return total / Math.max(Object.keys(inputs).length, 1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const sample = { sleep: 7, hydration: 8, activity: 6 };
  console.log('Sample habit score:', predictHabitScore(sample));
}
