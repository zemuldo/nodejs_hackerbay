'use strict';
const {hash,validate} = require('../tools/crypt')
const assert = require('assert');

describe('Test Hash password sha512', function() {
    describe('hash sha512', function() {
      it('should return true when valid', function() {
          let newHash  = hash('hackerbay');
        assert.equal(validate(newHash,'hackerbay'), true);
      });
    });
  });