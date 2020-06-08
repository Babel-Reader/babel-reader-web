import React from 'react';
import { create } from 'react-test-renderer';
import { BookContext } from '../../home/Home';
import Header from '../Header';

it('can match snapshot', () => {
  expect(
    create(
      <BookContext.Provider
        value={{
          file: 'testFile',
          languages: {
            in: {},
            out: {},
          },
        }}
      >
        <Header />
      </BookContext.Provider>
    )
  ).toMatchSnapshot();
});
