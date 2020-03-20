const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  entry: {
    // 入口配置，每个页面一个入口JS
    home: "./src/home/index", // 首页
    about: "./src/about/index" // 关于页
  },
  output: {
    // 输出配置
    path: path.resolve(__dirname, "dist"), // 输出资源目录
    filename: "scripts/[name].[hash:8].js", // 入口点JS命名规则
    chunkFilename: "scripts/[name]:[chunkhash:8].js", // 公共模块命名规则
    publicPath: "/" // 资源路径前缀
  },

  module: {
    rules: [
      {
        test: require.resolve("zepto"),
        loader: "exports-loader?window.Zepto!script-loader" // 将window.Zepto包装为CommonJS模块
      },
      {
        test: /\.less$/,
        use: [MiniCssPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/i,
        loader: "html-withimg-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理发布目录
    new HtmlWebpackPlugin({
      chunks: ["home", "vendor", "styles"], // 声明本页面使用到的模块，有主页，公共JS以及公共CSS
      filename: "index.html", // 输出路径，这里直接输出到dist的根目录，也就是dist/index.html
      template: "./src/home/index.html", // HTML模板文件路径
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true // 合并空格
      }
    }),
    new HtmlWebpackPlugin({
      chunks: ["about", "vendor", "styles"],
      filename: "about/index.html", // 输出到dist/about/index.html
      template: "./src/about/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssPlugin({
      filename: "styles/[name].[contenthash:8].css",
      chunkFilename: "styles/[name].[contenthash:8].css"
    }),
    new webpack.NamedModulesPlugin(), // 热加载使用
    new webpack.HotModuleReplacementPlugin() // 热加载使用
  ],
  devServer: {
    contentBase: "./dist", // 开发服务器配置
    hot: true // 热加载
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10 // 优先级
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all"
        }
      }
    }
  }
};
