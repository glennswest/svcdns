'use strict';

var chai = require('chai');
var expect = chai.expect;

var optionsApi = require('../../..');

describe('api.list()', function() {

  beforeEach(function() {
    this.api = optionsApi.create();
  });

  afterEach(function() {
    this.api = null;
  });

  it('should return an empty object when no options as set', function() {
    expect(this.api.list()).to.be.an('object');
    expect(this.api.list()).to.deep.equal({});
  });

  it('should return defaults when no other options set', function() {
    var expected = {
      default1: 'value1',
      default2: 'value2',
      default3: 'value3'
    };
    this.api.defaults(expected);
    expect(this.api.list()).to.deep.equal(expected);
  });

  it('should retrieve an object with all options', function() {
    var expected = {
      default1: 'value1',
      default2: 'value2',
      default3: 'value3',
      key4: 'value4',
      key5: 'value5'
    };
    this.api.defaults({
      default1: 'value1',
      default2: 'value2',
      default3: 'value3'
    });
    this.api.set('key4', 'value4');
    this.api.set('key5', 'value5');
    expect(this.api.list()).to.deep.equal(expected);
  });

});
