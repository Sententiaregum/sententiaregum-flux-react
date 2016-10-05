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
import React, { Component } from 'react';
import buildState from './util/buildState';
import pure from './util/pure';

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
 *
 * const component = props => {
 *   return (
 *     <h1>{props.header}</h1>
 *     <div>
 *       <ul>
 *         {props.items.map(item => <li>{item}</li>)}
 *       </ul>
 *     </div
 *   );
 * };
 * export default subscribeStores(component, { foo: [postStore, 'header'], items: [postStore, 'data.items'] });
 *
 * Please note that the second argument is the property path evaluated by the store.
 *
 * @param {React.Component} Wrapped       The react component.
 * @param {Object}          subscriptions The subscriptions declared for each component.
 *
 * @returns {void}
 */
export const subscribeStores = (Wrapped, subscriptions) => class extends Component {
  /**
   * Simple getter which provides access for the wrapped instance.
   *
   * @returns {React.Component}
   */
  static wrapped() {
    return Wrapped;
  }

  /**
   * Constructor.
   * Simple shortcut to keep the `refresh` handler.
   *
   * @returns {void}
   */
  constructor() {
    super();

    this.state             = buildState(subscriptions);
    this.refreshChildState = this.refresh.bind(this);
  }

  /**
   * Hook to be executed when this component is mounted.
   * This is a component which wraps a child and hooks for the child into the store
   * processes and evaluates the definitions of the child to receive state from a store.
   *
   * This method traverses through the store definitions and connects them with this component.
   *
   * @returns {void}
   */
  componentDidMount() {
    Object.values(subscriptions).forEach(([store]) => connector(store).subscribe(this.refreshChildState));
  }

  /**
   * Hook to be executed when the component is about to be unmounted.
   *
   * @returns {void}
   */
  componentWillUnmount() {
    Object.values(subscriptions).forEach(([store]) => connector(store).unsubscribe(this.refreshChildState));
  }

  /**
   * Hook which refreshes the whole object state.
   * It re-evaluates the value for each subscription and passes it into the state
   * to cause a re-rendering of the whole tree.
   *
   * @returns {void}
   */
  refresh() {
    this.setState(buildState(subscriptions));
  }

  /**
   * Renders the component into the DOM.
   *
   * Basically it creates a `React.Element` instance from the parent component including its state values.
   */
  render() {
    return <Wrapped {...this.state} />;
  }
};

export { pure };
