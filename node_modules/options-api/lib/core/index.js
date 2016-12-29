'use strict';

var core = {
  reset: require('./reset'),
  defaults: require('./defaults'),
  validators: require('./validators'),
  set: require('./set'),
  enable: require('./enable'),
  disable: require('./disable'),
  unset: require('./unset'),
  config: require('./config'),
  list: require('./list')
};

// method aliases
core.get = core.set;
core.add = core.set;
core.remove = core.unset;

module.exports = core;
