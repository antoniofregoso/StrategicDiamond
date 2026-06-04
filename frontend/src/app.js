import { Router } from '@customerjourney/cj-router';
import { home, login, dashboard } from './pages/index.js';

export const App = new Router();
App.on('/', home);
App.on('/login', login);
App.on('/dashboard', dashboard);
App.on('/dashboard/{id}', dashboard);