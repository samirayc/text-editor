const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),
// TODO: Add and configure workbox plugins for a service worker
  //service worker
  new InjectManifest({
    swSrc: './src-sw.js',
    swDest: 'src-sw.js'
  }),
  // TODO: Add and configure workbox plugins for a manifest file
  //manifest.json
  new WebpackPwaManifest({
    fingerprints: false,
    inject: true,
    name: 'Just Another Text Editor',
    short_name: 'J.A.T.E',
    description: 'A way to take notes or keep track of tasks!',
    background_color: '#0F111A',
    theme_color: '#0F111A',
    start_url: './',
    publicPath: './',
    icons: [
      {
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join('assets', 'icons'),
      },
    ],
  })
  ],

    module: {
      rules: [ 
        //TODO: Add CSS loader to webpack
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        //TODO: Add babel to webpack
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
