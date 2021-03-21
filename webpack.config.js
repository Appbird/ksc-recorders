module.exports = {
    mode: 'development',
  
    entry: './src/ts/host/index.ts',
    output: {
        path: `${__dirname}/build/host/js`,
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