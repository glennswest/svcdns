'use strict';

function create(defaults, validators) {
  return this.mixin({}, defaults, validators);
}

module.exports = create;
