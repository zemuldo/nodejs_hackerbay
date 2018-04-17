'use strict';
const request = require('request')
const
    env = require('./env'),
    assert = require('assert'),
    {resize} = require('../tools/thumbnail');

describe('image resize', function () {
    it('should download and process an image and return a buffer of the image', function () {
        this.timeout(3000);
        return resize(request.get('http://www.nasa.gov/sites/default/files/images/nasaLogo-570x450.png'),'png', 100, 100,)
        .then(o=>{
            assert.equal(true,Buffer.isBuffer(o) );
        })
    });
});