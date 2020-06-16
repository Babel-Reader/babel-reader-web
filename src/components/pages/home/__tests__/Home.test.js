import React from 'react';
import { create } from 'react-test-renderer';
import { BookContext } from 'App';
import Home from 'components/pages/home';
import { MemoryRouter } from 'react-router-dom';

let languageList = [
  {
    key: 'auto',
    name: 'auto detect',
    nativeName: 'auto detect',
  },
  {
    key: 'en',
    name: 'English',
    nativeName: 'English',
  },

  {
    key: 'fr',
    name: 'French',
    nativeName: 'Français',
  },
  {
    key: 'es',
    name: 'Spanish',
    nativeName: 'Español',
  },
];
it('can match snapshot', () => {
  expect(
    create(
      <BookContext.Provider
        value={{
          file: 'testFile',
          languageList,
          languages: {
            in: languageList[0],
            out: languageList[2],
          },
        }}
      >
        <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
          <Home/>
        </MemoryRouter>
      </BookContext.Provider>,
    ),
  ).toMatchSnapshot();
});
