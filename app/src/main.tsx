import { createRoot } from 'react-dom/client';

import App from './app/app';
import { Theme } from './shared';

import '@radix-ui/themes/styles.css';
import './app/styles.css';

const container = document.getElementById('app');
const root = createRoot(container as HTMLElement);

root.render(
  <Theme>
    <App />
  </Theme>
);
