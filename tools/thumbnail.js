'use strict';
const gm = require('gm');

module.exports = {
    resize:(inputStream, format, toWidth, toHeight, res) => {
        return gm(inputStream)
            .resize(toWidth, toHeight)
            .toBuffer(format, function (err, buffer) {
                if (err) res.send('<p>thumbnail error error</p>');
                res.end(buffer)
            })
    }
}