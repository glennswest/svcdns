'use strict';

function enable(key) {
  this.set(key, true);
  return this;
}

module.exports = enable;
