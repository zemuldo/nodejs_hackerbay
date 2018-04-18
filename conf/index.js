module.exports = {
    developement:{
        dbHost:process.env.DB_HOST || '127.0.0.1',
        dbName:process.env.DB_NAME || 'nodejs_hackerbay',
        dbPort:process.env.DB_PORT || 27017
    },
    dev:{
        dbHost:process.env.DB_HOST || '127.0.0.1',
        dbName:process.env.DB_NAME || 'nodejs_hackerbay',
        dbPort:process.env.DB_PORT || 27017
    },
    production:{
        dbHost:process.env.DB_HOST || '127.0.0.1',
        dbName:process.env.DB_NAME || 'nodejs_hackerbay',
        dbPort:process.env.DB_PORT || 27017
    },
    jwtSecret:process.env.JWT_KEY || 'sommmmeeeveeeeeryunguessablestring'
}