module.exports = {
  entry: "./src/index"
};

module.exports = {
  entry: {
    home: "./src/home/index", // 首页JS
    about: "./src/about/index" // 关于页JS
  }
};

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"), // 输出路径
    filename: "scripts/[name].[hash:8].js", // 输出JS模块的文件名规范
    chunkFilename: "scripts/[name].[chunkhash:8].js", // 公共JS的配置
    publicPath: "/" // 资源路径前缀，一般会使用CDN地址，这样图片和CSS就会使用CDN的绝对URL
  }
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ["css-loader"]
      }
    ]
  }
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: "css-loader!less-loader" // 多个loader中用感叹号分隔
      },
      {
        test: /\.css/,
        use: ["css-loader"] //数组形式
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          // loader传递参数时建议该方法
          {
            loader: "file-loader",
            options: {
              // file-loader自己的参数，跟webpack无关
              name: "images/[name].[hash:8].js"
            }
          }
        ]
      }
    ]
  }
};

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  plugins: [new CleanWebpackPlugin()]
};
new MiniCssPlugin({
  filename: "styles/[name].[contenthash:8].css",
  chunkFilename: "styles/[name].[contenthash:8].css"
});
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 名为vendor的chunk
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        },
        styles: {
          // 名为styles的chunk
          name: "styles",
          test: /\.css$/,
          chunks: "all"
        }
      }
    }
  }
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|gif|jpg)/,
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // 排除指定的模块
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.ts/,
        loader: "ts-loader"
      }
    ]
  }
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  plugins: [new HtmlWebpackPlugin()]
};

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  plugins: [new CleanWebpackPlugin()]
};

const MiniCssPlugin = require("mini-css-extract-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssPlugin({
      filename: "styles/[name].[contenthash:8].css",
      chunkFilename: "styles/[name].[contenthash:8].css"
    })
  ]
};
