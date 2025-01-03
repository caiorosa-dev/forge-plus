import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  externals: {
    // Faz com que "require('electron')" venha de fora (do runtime Electron),
    // e não seja empacotado
    electron: 'commonjs2 electron',
    fs: 'commonjs2 fs',
    path: 'commonjs2 path',
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
