import test from 'node:test';
import assert from 'node:assert/strict';
import { RehabitMobileApp, runUserJourney } from '../src/app.js';

test('user journey completes all core steps', () => {
  const { timeline, state } = runUserJourney({
    user: { id: 'tester-1', name: '테스트 사용자' },
    program: { id: 'sleep-reset', title: 'Sleep Reset' },
    tasks: [
      { id: 'sleep-log', title: '수면 패턴 기록' },
      { id: 'sleep-habit', title: '취침 전 루틴 작성' },
    ],
  });

  const eventTypes = timeline.map((event) => event.type);
  assert.deepEqual(eventTypes, [
    'launch',
    'authenticate',
    'select-program',
    'complete-task',
    'complete-task',
    'flow-complete',
  ]);

  assert.equal(state.authenticatedUser.id, 'tester-1');
  assert.equal(state.activeProgram.id, 'sleep-reset');
  assert.equal(state.completedTasks.length, 2);
  assert.equal(state.launched, true);
});

test('RehabitMobileApp enforces required identifiers', () => {
  const app = new RehabitMobileApp({ analytics: {} });

  assert.throws(() => app.authenticate({}), /User information is required/);
  app.launch();
  app.authenticate({ id: 'user-42' });
  assert.throws(() => app.selectProgram({}), /Program identifier is required/);
  app.selectProgram({ id: 'program-1' });
  assert.throws(() => app.completeTask({}), /Task identifier is required/);
});
