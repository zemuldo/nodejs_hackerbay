module.exports = {
    apps : [
        {
          name: 'Server 0 8098',
          script: './app.js',
          watch: true,
          env: {
              'PORT': 8098,
              'NODE_ENV': 'development'
          },
          env_production: {
              'PORT': 8098,
              'NODE_ENV': 'production',
          }
        },
        {
            name: 'Server 1 8099',
            script: './app.js',
            watch: true,
            env: {
                'PORT': 8099,
                'NODE_ENV': 'development'
            },
            env_production: {
                'PORT': 8099,
                'NODE_ENV': 'production',
            }
        }
    ]
  }