const path = require('path')

module.exports = {
  entry: './index.ts',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  mode: 'none',
  node: false,
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'micropub-client.js',
    library: {
      name: 'micropub-client',
      type: 'commonjs-module'
    }
  }
}
