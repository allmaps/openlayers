import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import node from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import * as meta from './package.json'

const filename = meta.name.split('/').pop()

// import * as meta from './package.json'

// const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date()).getFullYear()} ${meta.author.name}`
// const name = meta.name.split('/')[1]

const config = {
  input: 'bundle.js',
  external: ['ol'],
  output: {
    indent: false,
    banner: `// ${meta.name} v${meta.version} Copyright Bert Spaan`
  },
  plugins: [
    peerDepsExternal(),
    commonjs(),
    json(),
    node()
  ]
}

export default [
  {
    ...config,
    output: {
      ...config.output,
      format: 'cjs',
      file: `dist/${filename}.cjs.js`
    }
  },
  {
    ...config,
    output: {
      ...config.output,
      // TODO: use variable
      name: 'allmapsLayers',
      format: 'umd',
      extend: true,
      file: `dist/${filename}.umd.js`,
      globals: { ol: 'ol' }
    }
  },
  {
    ...config,
    output: {
      ...config.output,
      // TODO: use variable
      name: 'allmapsLayers',
      format: 'umd',
      extend: true,
      file: `dist/${filename}.umd.min.js`,
      globals: { ol: 'ol' }
    },
    plugins: [
      ...config.plugins,
      terser({
        output: {
          preamble: config.output.banner
        }
      })
    ]
  }
]
