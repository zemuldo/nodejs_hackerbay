const winston = require('winston');
var config = winston.config;
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return new Date().toISOString();
      },
      formatter: function(options) {
        return options.timestamp() + ' ' +
          config.colorize(options.level, options.level.toUpperCase()) + ' ' +
          (options.message ? options.message : '') +
          config.colorize(options.level,(options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' ))
      },
      prettyPrint: true
    })
  ]
});
winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'green'
});

module.exports = {
    error: (mess) => {

        logger.error('error', { mess: mess, worker: { pid: process.pid } });

    },
    warn: (mess) => {

        logger.warn('warning', { mess: mess, worker: { pid: process.pid } });
    },
    success: (mess) => {

        logger.info('success', { mess: mess, worker: { pid: process.pid } });

    },
    system: (mess) => {

        logger.log('system', { mess: mess, worker: { pid: process.pid } });

    },
    fail: (mess) => {

        logger.log('failed', { mess: mess, worker: { pid: process.pid } });

    },
    internal: (mess) => {

        logger.info('Internal', { mess: mess, worker: { pid: process.pid } });
    },
    status: (mess) => {

        logger.info('status', { mess: mess, worker: { pid: process.pid } });

    },
    timeout: (mess) => {

        logger.error('error', { mess: mess, worker: { pid: process.pid } });
    },
    db: (mess) => {

        logger.sql('db', { mess: mess, worker: { pid: process.pid } });

    }
}