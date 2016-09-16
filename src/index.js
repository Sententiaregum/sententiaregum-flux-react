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

import { connector } from 'sententiaregum-flux-container';
import connectStores from './util/connectStores';

/**
 * Connects a react.js component with `flux-container`.
 *
 * To avoid duplicated code by declaring in each component connections to a store,
 * this simple factory tries to tackle this by hooking into the lifecycle methods to
 * connect in a more generic way.
 *
 * Example:
 *
 * import subscribeStores from 'sententiaregum-flux-react';
 * class TestComponent extends Component {
 *   render() {
 *     // ...
 *   }
 * }
 * export default subscribeStores(TestComponent, { 'newPosts': postStore });
 *
 * @param {React.Component} Component     The react component.
 * @param {Object}          subscriptions The subscriptions declared for each component.
 *
 * @returns {void}
 */
export default (Component, subscriptions) => class extends Component {
  /**
   * Lifecycle hook for react.js.
   * The `componentDidMount` is a hook which will be executed right after
   * the component was mounted. When it's mounted, the view can subscribe stores
   * and reload itself if the state is updated.
   *
   * Here the subscriptions for all defined stores will be created.
   *
   * @returns {void}
   */
  componentDidMount() {
    if (typeof Component.prototype.componentDidMount === 'function') {
      super.componentDidMount();
    }

    connectStores(Component, this, subscriptions, this._alias(), (method, store) => connector(store).subscribe(method));
  }

  /**
   * Lifecycle hook for react.js.
   * The `componentWillUnmount` is a hook which will be triggered right before
   * the component is about to be unmounted from the DOM. After that it's impossible
   * to update the state when a stores changes, so the subscriptions will be dropped.
   *
   * @returns {void}
   */
  componentWillUnmount() {
    if (typeof Component.prototype.componentWillUnmount === 'function') {
      super.componentWillUnmount();
    }

    connectStores(Component, this, subscriptions, this._alias(), (method, store) => connector(store).unsubscribe(method));
  }

  /**
   * Tiny helper to generate a unique ID.
   *
   * @returns {String} The class alias.
   * @private
   */
  _alias() {
    return !this.alias ? this.alias = `${this.constructor.name}::${Math.random()}` : this.alias;
  }
};
