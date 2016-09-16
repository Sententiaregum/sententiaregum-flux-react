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

import connectStores from '../../src/util/connectStores';
import { Component } from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';

describe('connectStores', () => {
  it('attaches stores at a react component as context', () => {
    const callbackSpy = spy();
    class TestComponent extends Component {
      callback() {
        callbackSpy();
      }
    }

    const testObj = {};
    connectStores(TestComponent, new TestComponent(), {
      'callback': testObj
    }, 'alias', (callback, store) => {
      expect(testObj).to.equal(store);
      callback();
    });

    expect(callbackSpy.calledOnce).to.equal(true);
  });

  it('it connects an invalid component', () => {
    class TestComponent extends Component {
    }

    expect(() => {
      connectStores(TestComponent, new TestComponent(), {
        'callback': {}
      }, 'alias', () => {});
    }).to.throw('Method callback must be a function!');
  });
});
