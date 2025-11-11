export function bootstrapMobileApp() {
  console.log('Rehabit mobile app bootstrap sequence initiated.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  bootstrapMobileApp();
}
