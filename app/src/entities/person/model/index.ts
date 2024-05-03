import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from 'effector';
import { createGate, useGate, useStore } from 'effector-react';
import { produce } from 'immer';

import { persons } from '@/__fixtures__';
import type { Person } from '@/shared';

export const removeLast = createEvent();
export const PersonGate = createGate();

export const getPersonListFx = createEffect(() => Promise.resolve(persons));

const personsInitialState: Person[] = [];

export const $persons = createStore<Person[]>(personsInitialState)
  .on(getPersonListFx.doneData, (state, payload) => [...payload, ...state])
  .on(removeLast, (state) =>
    produce(state, (draft) => {
      draft.pop();
    })
  );

export const $lastInPerson = $persons.map((persons) => persons.length === 1);

export const init = () => {
  sample({
    source: {
      lastInPerson: $lastInPerson,
    },
    clock: removeLast,
    filter: ({ lastInPerson }) => lastInPerson,
    target: getPersonListFx,
  });

  forward({ from: PersonGate.state, to: getPersonListFx });

  $persons.reset(PersonGate.close);
};

const usePersons = (): Person[] => useStore($persons);

const usePersonsGate = () => useGate(PersonGate);

export const events = {
  removeLast,
};

export const gates = {
  usePersonsGate,
};

export const effects = {
  getPersonListFx,
};

export const selectors = {
  usePersons,
};
