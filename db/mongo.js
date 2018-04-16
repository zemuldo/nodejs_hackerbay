const MongoClient = require('mongodb').MongoClient;
const logger = require('../tools/logger')
const config = require('../conf')
const node_env = process.env.NODE_ENV || 'developement'

logger.status('Setting up database client...')

const env =  config[node_env]
 
// Connection URL
const url = `mongodb://${env.dbHost}:${env.dbPort}`;
 
// Database Name

let db
 
// Use connect method to connect to the server
MongoClient.connect(url, function(e, client) {
  if(e) {
      console.log(e)
      logger.error(JSON.stringify(e))
      throw {error:'Database connection failed'}
  }
  logger.success("Connected to MongoDB , DBName: nodejs_hackerbay");
  logger.system({
      "Startup Status":'Application started succesfully',
      "Memory Usage":process.memoryUsage(),
      "Process ID":process.pid
  })
  db = client.db(env.dbName);
});

module.exports = {
    db:db
}