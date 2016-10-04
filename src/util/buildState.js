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

/**
 * Simple helper which builds a state array from the subscriptions.
 *
 * @param {Object} subscriptions The subscriptions to be evaluated.
 *
 * @returns {Object} The final state object.
 */
export default subscriptions => Object.keys(subscriptions).reduce((prev, index) => {
  const [store, propertyPath] = subscriptions[index];
  return Object.assign({}, prev, {
    [index]: store.getStateValue(propertyPath)
  });
}, {});
