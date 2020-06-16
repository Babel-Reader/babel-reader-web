import React from 'react';
import { create } from 'react-test-renderer';
import TranslationPopup from '../TranslationPopup';

it('can match snapshot', () => {
  expect(
    create(<TranslationPopup>Test Content</TranslationPopup>)
  ).toMatchSnapshot();
});
