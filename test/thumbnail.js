'use strict';

var
    env = require('./env'),
    assert = require('assert'),
    resizer = require('../tools/thumbnail');

describe('resizer', function () {
    it('should download and process an image', function (done) {
        resizer('http://www.nasa.gov/sites/default/files/images/nasaLogo-570x450.png', 100, 100, 'center', 'middle', function (buffer, contentType) {
            assert.equal('image/png', contentType);
            done();
        });
    });
});