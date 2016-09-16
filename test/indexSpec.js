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

import subscribeStores from '../src/index';
import React, { Component } from 'react';
import { store, runAction } from 'sententiaregum-flux-container';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { jsdom } from 'jsdom';

describe('sententiaregum-flux-react', () => {
  before(() => {
    global.window    = jsdom('<html><head></head><body></body></html>').defaultView;
    global.document  = window.document;
    global.navigator = window.navigator;
  });

  it('connects store with state', () => {
    const testStore = store({
      EVENT: {
        params:   ['text'],
        function: text => {
          return { text };
        }
      }
    });

    const actionCreator = publish => ({
      EVENT: () => publish({ text: 'Goodbye!' })
    });

    const Cmp = subscribeStores(class extends Component {
      constructor() {
        super();
        this.state = { text: 'Hi!' };
      }
      render() {
        return <h1>{this.state.text}</h1>;
      }
      refresh() {
        // delegate calls to further methods
        // to ensure that context is bound correctly
        this.modify(testStore.getStateValue('text'));
      }
      modify(newText) {
        this.setState({ text: newText });
      }
    }, {
      'refresh': testStore
    });

    const rendered = mount(<Cmp />);

    expect(rendered.text()).to.equal('Hi!');

    runAction('EVENT', actionCreator);

    expect(rendered.text()).to.equal('Goodbye!');
  });
});
