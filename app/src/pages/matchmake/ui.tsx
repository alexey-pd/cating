import { FC } from 'react';

import { Box } from '@radix-ui/themes';
import config from '@/config';
import {
  Card,
  events,
  gates,
  init as initPersons,
  selectors,
} from '@/entities';
import { MatchSwipe } from '@/features';
import { DISABLED_BY_ANIM_ID } from '@/shared';

initPersons();

const MatchMake: FC = () => {
  const list = selectors.usePersons();
  gates.usePersonsGate();

  return (
    <Box
      position="fixed"
      style={{ width: '300vw', height: '100vh', left: '-100%' }}
    >
      <MatchSwipe
        list={list}
        handler={events.removeLast}
        buttonBlockSelector={`button[${DISABLED_BY_ANIM_ID}]`}
        swipeEnabled={config.swipeEnabled}
      >
        {({ index, handler }) => (
          <Card
            {...list[index]}
            onClickLeft={() => handler(-1, index)}
            onClickRight={() => handler(1, index)}
          />
        )}
      </MatchSwipe>
    </Box>
  );
};

export default MatchMake;
