'use strict';

function disable(key) {
  this.set(key, false);
  return this;
}

module.exports = disable;
