// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/server.ts', // src下に書いていくので　src/server.tsにしとく
  target: 'node', // Module not found: Error: Can't resolve 'fs'とかいっぱい出たら、この行書き忘れ
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
        exclude: [/node_modules/],
        options: {
          configFile: 'tsconfig.dev.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
