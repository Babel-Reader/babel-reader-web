import React from 'react';
import { create } from 'react-test-renderer';
import PageInput from '../PageInput';

it('can match snapshot', () => {
  expect(create(<PageInput />)).toMatchSnapshot();
});
