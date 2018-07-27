module.exports = {
  entry: './src/sudoku-core.js',
  output: {
    filename: 'sudoku-core.js',
    library: "sudoku-solver",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /test\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "transform-es2015-modules-commonjs"
            ]
          }
        }
      }
    ]
  },
};
