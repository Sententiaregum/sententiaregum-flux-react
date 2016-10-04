/*
 * This file is part of the Sententiaregum project.
 *
 * (c) Maximilian Bosch <maximilian.bosch.27@gmail.com>
 * (c) Ben Bieler <benjaminbieler2014@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import { subscribeStores } from '../src/index';
import React from 'react';
import { store, runAction, subscribe } from 'sententiaregum-flux-container';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { stub } from 'sinon';

describe('sententiaregum-flux-react', () => {
  function generateStore() {
    return store({
      EVENT: subscribe(subscribe.chain()(({ text }) => ({ text })))
    }, { text: 'Hi!' });
  }
  function generateActionCreator() {
    return () => ({
      EVENT: publish => publish({ text: 'Goodbye!' })
    });
  }

  it('connects store with state', () => {
    const testStore     = generateStore();
    const actionCreator = generateActionCreator();

    const component = props => <h1>{props.header}</h1>;
    const Cmp       = subscribeStores(component, {
      header: [testStore, 'text']
    });

    const rendered = mount(<Cmp />);
    expect(rendered.find('h1').text()).to.equal('Hi!');
    runAction('EVENT', actionCreator);
    expect(rendered.text()).to.equal('Goodbye!');
    rendered.unmount();
    runAction('EVENT', actionCreator);
  });
});
