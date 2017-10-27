import path from 'path';
import flowRight from 'lodash.flowright';
import coreConfig from './config/webpack/core';
import coreDefine from './config/webpack/define';

const outputFolder = 'build/client';
const outputPath = path.resolve(__dirname, outputFolder);

const devConfig = flowRight(
  coreConfig({
    context: path.resolve(__dirname),
    outputFolder,
    outputPath,
    outputFilename: '[name]',
    assetOutputFilename: '[name]'
  }),
  coreDefine
);

export default devConfig({
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: process.env.DEV_SERVER_PORT || 8080,
    contentBase: outputFolder
  }
});
