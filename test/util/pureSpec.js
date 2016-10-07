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

import { subscribeStores } from '../../src/index';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { store } from 'sententiaregum-flux-container'
import React from 'react';
import pure from '../../src/util/pure';

describe('util::pure', () => {
  it('can do shallow rendering with managed components', () => {
    const component = props => <h1>{props.header}</h1>;
    const Cmp       = subscribeStores(component, {
      header: [store({}, { text: 'foo' }), 'text']
    });

    const markup = shallow(pure(Cmp, { header: 'foo' }));
    expect(markup.text()).to.equal('foo');
  });

  it('throws an error if an invalid component is given', () => {
    const component = () => <h1>Foo</h1>;
    expect(() => pure(component)).to.throw('Invalid component given! The `pure()` function can\'t handle functions that were not built by `subsribeStores()` as they can\'t provide the wrapped component easily!');
  });
});
