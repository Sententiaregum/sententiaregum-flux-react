# React.js bridge for `flux-container`


[![Build Status](https://travis-ci.org/Sententiaregum/flux-container.svg?branch=master)](https://travis-ci.org/Sententiaregum/sententiaregum-flux-react)
[![NPM Version](https://badge.fury.io/js/sententiaregum-flux-container.svg)](https://www.npmjs.com/package/sententiaregum-flux-react)
[![Build status](https://ci.appveyor.com/api/projects/status/qk0rs9ytq2k6c2xb/branch/master?svg=true)](https://ci.appveyor.com/project/Ma27/sententiaregum-flux-react/branch/master)

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
import subscribeStores from 'sententiaregum-flux-react';
import postStore from '../stores/postStore';

export default subscribeStores(class extends Component {
  constructor() {
    this.state = { posts: [] };
  }
  render() {
    // render the posting list
  }
  newPost() {
    this.setState({
      posts: postStore.getState()
    });
  }
}, {
  'newPost': postStore
});
```

So whenever the state of the `postStore` changes, the `newPost` method of this component will be triggered.

## Contributing

Further information about contributing can be found in the [CONTRIBUTING.md](https://github.com/Sententiaregum/sententiaregum-flux-react/blob/master/.github/CONTRIBUTING.md)

## License

Please review the [`LICENSE`](https://github.com/Sententiaregum/sententiaregum-flux-react/blob/master/LICENSE) file that was distributed with this source code.
