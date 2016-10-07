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

import { store } from 'sententiaregum-flux-container';
import buildState from '../../src/util/buildState';
import { expect } from 'chai';

describe('util::buildState', () => {
  it('builds a state to a given store', () => {
    const testStore = store({}, {
      foo: 'bar',
      bar: 'baz',
      baz: {
        test: ['blah']
      }
    });

    expect(buildState({ foo: [testStore, 'foo'], bar: [testStore, 'baz.test[0]'] })).to.deep.equal({
      foo: 'bar',
      bar: 'blah'
    });
  });
});
