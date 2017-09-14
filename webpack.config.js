module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "channels-web-tils.js",
    path: __dirname + "/bin/"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
}
