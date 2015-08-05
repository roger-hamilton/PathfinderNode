var path = require('path');
module.exports = {
    entry: {
      app: ["webpack/hot/dev-server","./src/app.js"]
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'src'),
              loader: 'babel-loader' }
        ]
    }
};
