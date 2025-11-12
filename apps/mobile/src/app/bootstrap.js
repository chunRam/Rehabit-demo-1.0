import { registerRootComponent } from 'expo';
import App from './App.js';

export function bootstrapMobileApp() {
  registerRootComponent(App);
}
