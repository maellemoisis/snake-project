import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from './App';

const TEST_TITLE = 'TEST_TITLE';
let appComponent;

beforeEach(() => {
  appComponent = shallow(
    <App title={TEST_TITLE} />,
  );
});

it('Avec les même props, le composant ne change pas.', () => {
  expect(toJson(appComponent)).toMatchSnapshot();
});

it('Le composant a le bon titre.', () => {
  expect(appComponent.find('h1').at(0).text()).toBe(TEST_TITLE);
});

it('Le composant a la bonne classe monTitre', () => {
  expect(appComponent.find('h1').at(0).hasClass('monTitre')).toBeTruthy();
});
