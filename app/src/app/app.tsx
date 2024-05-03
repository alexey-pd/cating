import { useEffect } from 'react';

import Router from '@/pages';
import { useTelegram } from '@/shared';

import { RouterProvider } from './providers';

const App = (): JSX.Element => {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RouterProvider>
      <Router />
    </RouterProvider>
  );
};

export default App;
