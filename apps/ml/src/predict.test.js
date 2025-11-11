import test from 'node:test';
import assert from 'node:assert/strict';
import { predictHabitScore } from './predict.js';

test('averages numeric values', () => {
  const score = predictHabitScore({ a: 8, b: 6, c: 10 });
  assert.equal(score, 8);
});

test('treats missing values as zero', () => {
  const score = predictHabitScore({ a: 4, b: undefined });
  assert.equal(score, 2);
});
