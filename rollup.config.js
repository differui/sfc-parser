const path = require('path');
const alias = require('rollup-plugin-alias');
const typescript = require('rollup-plugin-typescript');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

export default {
  entry: './src/index.ts',
  dest: './dest/bundle.js',
  format: 'cjs',
  plugins: [
    alias({
      resolve: ['.ts'],
      '@': path.resolve(process.cwd(), './src'),
    }),
    typescript({
      exclude: 'node_modules/**',
    }),
    commonjs({
      namedExports: {},
    }),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
}
