import React from 'react';
import { create } from 'react-test-renderer';
import Reading from '../Reading';
import { BookContext } from '../../home/Home';

it('can match snapshot', () => {
  expect(
    create(
      <BookContext.Provider
        value={{
          languages: {
            in: {},
            out: {},
          },
        }}
      >
        <Reading />
      </BookContext.Provider>
    )
  ).toMatchSnapshot();
});
