module.exports = {
    mode: 'development',
  
    entry: './src/ts/host/index.ts',
    output: {
        path: `${__dirname}/build/js`,
        filename: "main.js"
    },
    module: {
      rules: [
        {
          test: /\.\/src\/ts\/\.ts$/,
          use: 'ts-loader',
          exclude: /\.\/src\/ts\/server\/\.ts$/
        },
      ],
    },
    resolve: {
      extensions: [
        '.ts', '.js',
      ],
    },
  };