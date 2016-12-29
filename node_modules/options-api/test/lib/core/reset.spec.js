'use strict';

var chai = require('chai');
var expect = chai.expect;

var optionsApi = require('../../..');

describe('api.reset()', function() {

  beforeEach(function() {
    this.api = optionsApi.create();
  });

  afterEach(function() {
    this.api = null;
  });

  it('should reset options back default values', function() {
    var defaults = {
      'option1': 'value1',
      'option2': 'value2'
    };

    this.api.defaults(defaults);

    this.api.set('option1', 'another value1');
    this.api.set('option2', 'another value2');
    this.api.set('option3', 'another value3');

    this.api.reset();

    expect(this.api.get('option1')).to.equal('value1');
    expect(this.api.get('option2')).to.equal('value2');
    expect(this.api.get('option3')).to.be.undefined;
  });

});
