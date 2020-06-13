import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

it('can match snapshot', () => {
  expect(
    create(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Home />
      </MemoryRouter>
    )
  ).toMatchSnapshot();
});
