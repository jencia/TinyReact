import babel from '@rollup/plugin-babel'

/** @type {Array<import('rollup').RollupOptions>} */
const config = [
    {
        input: './src/index.js',
        output: [
            {
                file: './dist/tiny-react.js',
                format: 'es',
                exports: 'auto',
                sourcemap: true
            }
        ],
        plugins: [
            babel({ babelHelpers: 'bundled' })
        ]
    },
    {
        input: './example/index.js',
        output: [
            {
                file: './dist/example.js',
                format: 'umd',
                sourcemap: true
            }
        ],
        plugins: [
            babel({ babelHelpers: 'bundled' })
        ]
    }
]

export default config
