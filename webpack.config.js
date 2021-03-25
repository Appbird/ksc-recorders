module.exports = {
    mode: 'development',
  
    entry: './src/ts/client/index.ts',
    output: {
        path: `${__dirname}/build/js`,
        filename: "main.js"
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        },
      ],
    },
    resolve: {
      extensions: [
        '.ts', '.js',
      ],
    },
  };