const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const dist = path.resolve(__dirname, "dist");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['> 1%', 'not chrome < 59' ],
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      [
        'babel-plugin-styled-components', {
        displayName: true,
        fileName: false,
      },
      ],
    ],
    babelrc: false,
  },
};

module.exports = {
  entry: {
    pollyfill: path.join(__dirname, 'src/polyfill.js'),
    src: "./src/index.js",
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: dist,
  },
  devServer: {
    contentBase: dist,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "crate")
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.wasm'],
    modules: ['node_modules', 'src' ],
  },
  module: {
    rules: [
      {
        test: /\.jsx*?$/,
        exclude: /node_modules/,
        use: [
          babelLoader
        ],
      },
    ],
  },
};
