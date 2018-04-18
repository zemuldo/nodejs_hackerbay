const MongoClient = require('mongodb').MongoClient;
const logger = require('../tools/logger')
const config = require('../conf')
const node_env = process.env.NODE_ENV || 'developement'

logger.status('Setting up database client...')

const env =  config[node_env]
 
const url = `mongodb://${env.dbHost}:${env.dbPort}`;

let collections = {}
 
MongoClient.connect(url, function(e, client) {
  if(e) {
      console.log(e)
      logger.error(JSON.stringify(e))
      throw {error:'Database connection failed'}
  }
  logger.success('Connected to MongoDB , DBName: nodejs_hackerbay');
  logger.system({
      'Startup Status':'Application started succesfully',
      'Memory Usage':process.memoryUsage(),
      'Process ID':process.pid
  })

  let db = client.db(env.dbName);
  collections.users = db.collection('users')
  collections.patchUs = db.collection('patchUs')
});

module.exports = collections