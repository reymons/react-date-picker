const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
    filename: "index.[contenthash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new HtmlPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules", path.resolve(__dirname, "public")],
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    compress: true,
    allowedHosts: "all",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendors",
    },
  },
};
