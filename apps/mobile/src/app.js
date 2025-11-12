const createEvent = (type, metadata = {}) => ({
  type,
  at: new Date().toISOString(),
  metadata,
});

export class RehabitMobileApp {
  constructor({ analytics = console } = {}) {
    this.analytics = analytics;
    this.state = {
      launched: false,
      authenticatedUser: null,
      activeProgram: null,
      completedTasks: [],
    };
    this.timeline = [];
  }

  launch() {
    if (this.state.launched) return this;
    this.state.launched = true;
    this.timeline.push(createEvent('launch'));
    this.analytics.log?.('App launched');
    return this;
  }

  authenticate(user) {
    if (!user?.id) {
      throw new Error('User information is required');
    }
    this.state.authenticatedUser = user;
    this.timeline.push(createEvent('authenticate', { userId: user.id }));
    this.analytics.log?.('User authenticated', user.id);
    return this;
  }

  selectProgram(program) {
    if (!program?.id) {
      throw new Error('Program identifier is required');
    }
    this.state.activeProgram = program;
    this.timeline.push(
      createEvent('select-program', {
        programId: program.id,
        title: program.title,
      }),
    );
    this.analytics.log?.('Program selected', program.id);
    return this;
  }

  completeTask(task) {
    if (!task?.id) {
      throw new Error('Task identifier is required');
    }
    this.state.completedTasks.push(task);
    this.timeline.push(
      createEvent('complete-task', {
        taskId: task.id,
        programId: this.state.activeProgram?.id ?? null,
      }),
    );
    this.analytics.log?.('Task completed', task.id);
    return this;
  }

  finishFlow(summary) {
    this.timeline.push(createEvent('flow-complete', summary ?? { success: true }));
    this.analytics.log?.('Flow complete');
    return this;
  }

  getTimeline() {
    return [...this.timeline];
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}

export function runUserJourney({
  user = { id: 'demo-user', name: 'Demo User' },
  program = { id: 'hydration-reset', title: 'Hydration Reset' },
  tasks = [
    { id: 'hydrate-morning', title: 'Drink 250ml of water' },
    { id: 'hydrate-afternoon', title: 'Log afternoon hydration' },
  ],
} = {}) {
  const app = new RehabitMobileApp({ analytics: { log: () => {} } });
  app.launch().authenticate(user).selectProgram(program);

  for (const task of tasks) {
    app.completeTask(task);
  }

  app.finishFlow({ success: true, completedTasks: tasks.length });
  return {
    timeline: app.getTimeline(),
    state: app.getState(),
  };
}
