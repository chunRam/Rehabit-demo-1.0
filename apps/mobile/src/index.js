import { runUserJourney } from './app.js';

export function bootstrapMobileApp() {
  console.log('Rehabit mobile app bootstrap sequence initiated.');
  const { timeline } = runUserJourney();
  for (const event of timeline) {
    console.log(`[mobile] ${event.type}`, event.metadata);
  }
  return timeline;
}

// 조건문 없이 앱 시작 함수를 바로 호출합니다.
bootstrapMobileApp();

export { runUserJourney };
