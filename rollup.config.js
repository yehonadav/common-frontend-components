import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import css from "rollup-plugin-import-css";

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [css(), sass({ insert: true }), typescript()],
  external: ['react', 'react-dom']
}
