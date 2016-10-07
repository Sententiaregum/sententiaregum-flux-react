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
import { stub } from 'sinon';

describe('sententiaregum-flux-react', () => {
  function generateStore() {
    return store({
      EVENT: {
        function: ({ text }) => {
          return { text };
        }
      }
    });
  }
  function generateActionCreator() {
    return () => ({
      EVENT: publish => publish({ text: 'Goodbye!' })
    });
  }

  it('connects store with state', () => {
    const testStub      = stub();
    const testStore     = generateStore();
    const actionCreator = generateActionCreator();

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

        // log execution times
        testStub();
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
    rendered.unmount();
    runAction('EVENT', actionCreator);
    expect(testStub.calledOnce).to.equal(true);
  });

  it('executes `componentDidMount` and `componentWillUnmount` of the parent component', () => {
    const testStub      = stub();
    const mountHook     = stub();
    const unmountHook   = stub();
    const testStore     = generateStore();
    const actionCreator = generateActionCreator();

    const Cmp = subscribeStores(class extends Component {
      constructor() {
        super();
        this.state = { text: 'Hi!' };
      }
      componentDidMount() {
        mountHook();
      }
      componentWillUnmount() {
        unmountHook();
      }
      render() {
        return <h1>{this.state.text}</h1>;
      }
      refresh() {
        // delegate calls to further methods
        // to ensure that context is bound correctly
        this.modify(testStore.getStateValue('text'));

        // log execution times
        testStub();
      }
      modify(newText) {
        this.setState({ text: newText });
      }
    }, {
      'refresh': testStore
    });

    const rendered = mount(<Cmp />);
    expect(mountHook.calledOnce).to.equal(true);
    expect(rendered.text()).to.equal('Hi!');
    runAction('EVENT', actionCreator);
    expect(rendered.text()).to.equal('Goodbye!');
    rendered.unmount();
    expect(unmountHook.calledOnce).to.equal(true);
  });
});
