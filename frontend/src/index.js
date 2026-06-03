import { store } from './app/store.js';
import { App } from './app/components/App.js';

// Mount the app
const root = document.getElementById('root');
if (root) {
  const app = new App(store);
  app.mount(root);
}
