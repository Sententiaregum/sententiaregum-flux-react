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

import invariant from 'invariant';

/**
 * Private class to handle the component binding behavior.
 */
const container = new class {
  /**
   * Constructor.
   *
   * @returns {void}
   */
  constructor() {
    this.handlers = {};
  }

  /**
   * Binds a function onto a context.
   *
   * @param {Function} method  The function to bind.
   * @param {Object}   context The context to bind.
   * @param {String}   alias   The alias of the bound function (faster callback handling).
   *
   * @returns {Function} The recreated function.
   */
  bind(method, context, alias) {
    return !this.handlers[alias] ? this.handlers[alias] = method.bind(context) : this.handlers[alias];
  }
};

/**
 * Simple higher order function which handles store subscriptions.
 *
 * @param {React.Component} Component     The component to connect.
 * @param {React.Component} context       The actual context (the parent class, not the recreated class).
 * @param {Object}          subscriptions The subscriptions defined by the parent.
 * @param {String}          alias         The alias of the instance.
 * @param {Function}        handler       The function which will be executed for each subscription.
 *
 * @returns {void}
 */
export default (Component, context, subscriptions, alias, handler) => Object.keys(subscriptions).forEach(method => {
  invariant(
    typeof Component.prototype[method] === 'function',
    `Method ${method} must be a function!`
  );

  handler(container.bind(Component.prototype[method], context, `${alias}::${method}`), subscriptions[method]);
});
