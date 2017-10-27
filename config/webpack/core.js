import path from 'path';
import flowRight from 'lodash.flowright';
import webpack from 'webpack';
import loader from 'webpack-partial/loader';
import plugin from 'webpack-partial/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import Clean from 'clean-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import * as partials from './partials';

export default function coreConfig(options) {
  return flowRight(
    partials.context(options.context),
    partials.entry({
      main: ['babel-polyfill', './src/app/client/index.js']
    }),
    partials.node({
      fs: 'empty'
    }),
    loader({
      test: /\.js|\.jsx$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader'
      }]
    }),
    loader({
      test: /\.scss$/i,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ]
      })
    }),
    loader({
      test: /\.hjson$/,
      loader: 'hson-loader'
    }),
    loader({
      test: /\.png|\.jpg|\.ico|\.gif$/,
      loader: 'file-loader',
      query: {
        name: `images/${options.assetOutputFilename}.[ext]`
      }
    }),
    loader({
      test: /\.(woff2?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
      query: {
        name: `fonts/${options.assetOutputFilename}.[ext]`
      }
    }),
    partials.output({
      path: options.outputPath,
      publicPath: '/',
      chunkFilename: `${options.outputFilename}.chunk.js`,
      filename: `${options.outputFilename}.bundle.js`
    }),
    plugin(new webpack.LoaderOptionsPlugin({
      options: {
        callbackLoader: {
          subEnvVar(varName, defaultValue) {
            return JSON.stringify(process.env[varName] || defaultValue);
          }
        }
      }
    })),
    plugin(new CaseSensitivePathsPlugin()),
    plugin(new Clean([options.outputFolder], {
      root: path.dirname(path.dirname(options.outputPath)),
      verbose: true
    })),
    plugin(new ExtractTextPlugin({
      filename: `${options.outputFilename}.css`,
      allChunks: true
    })),
    plugin(new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    })),
    plugin(new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    })),
    plugin(new AssetsPlugin({
      prettyPrint: true,
      path: path.dirname(options.outputPath),
      includeManifest: 'manifest'
    })),
    plugin(new HtmlWebpackPlugin({
      template: './src/index.html'
    }))
  );
}
