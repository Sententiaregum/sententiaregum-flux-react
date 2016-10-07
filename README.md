# React.js bridge for `flux-container`


[![Build Status](https://travis-ci.org/Sententiaregum/flux-container.svg?branch=master)](https://travis-ci.org/Sententiaregum/sententiaregum-flux-react)
[![NPM Version](https://badge.fury.io/js/sententiaregum-flux-react.svg)](https://www.npmjs.com/package/sententiaregum-flux-react)
[![Build status](https://ci.appveyor.com/api/projects/status/sb90yve8u7i7xgf2?svg=true)](https://ci.appveyor.com/project/Ma27/sententiaregum-flux-react)

This package simplifies the state refresh of a store and the re-rendering of the connected views.

## Install


You can install this package by typing:

``` shell
npm install sententiaregum-react-flux --save
```

The package requires at least ``Node 6.x`` and ``NPM 3`` is recommended.

## Docs

The usage is quite simple: you simply have to "tell" the component which stores
to subscribe:

``` javascript
import React, { Component } from 'react';
import { subscribeStores } from 'sententiaregum-flux-react';
import postStore from '../stores/postStore';

const component = props => {
  return (
    <div>
      <h1>{props.header}</h1>
      <p>
        <div style={props.style}>{props.text}</div>
        <ul>
          {props.textItems.map(item => <li>{item}</li>}
        </ul>
      </p>
    </div>
  );
};

export default subscribeStores(component, {
  header:    [postStore, 'texts.header'],
  text:      [postStore, 'texts.info'],
  textItems: [postStore, 'textItems']
});
```

So each item of the `props` object needs a definition which is an array. The first array element defines the store where the information should be taken from,
the second item is a property path that needs to be evaluated by the store in order to find the value.

## Contributing

Further information about contributing can be found in the [CONTRIBUTING.md](https://github.com/Sententiaregum/sententiaregum-flux-react/blob/master/.github/CONTRIBUTING.md)

## License

Please review the [`LICENSE`](https://github.com/Sententiaregum/sententiaregum-flux-react/blob/master/LICENSE) file that was distributed with this source code.

## v1.0

`v1.0` contained an approach which relied on inheritance. Although it worked quite well, it had the huge downside
that no functional/pure components could be used and it was a bit more complicated as it dug into the prototype of the class.

`v1.0` is also supported and can be found at the [`v1.0.x` branch](https://github.com/Sententiaregum/sententiaregum-flux-react/tree/v1.0.x).
