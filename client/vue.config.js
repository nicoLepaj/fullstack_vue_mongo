//const path = require('path');

module.exports = {
//  outputDir: path.resolve(__dirname, '../server/public'),
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/': { 
        target: 'http://localhost:5000'
      }
    }
  },
};

