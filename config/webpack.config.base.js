const path = require("path"); // 导入Node.js的path模块

module.exports = {
  mode: "development", // 工作模式
  entry: "./src/index", // 入口点
  output: {
    // 输出配置
    path: path.resolve(__dirname, "dist"), // 输出文件的目录
    filename: "scripts/[name].[hash:8].js", // 输出JS模块的配置
    chunkFilename: "scripts/[name].[chunkhash:8].js", // 公共JS配置
    publicPath: "/" // 资源路径前缀，一般会使用CDN地址，这样图片和CSS就会使用CDN的绝对URL
  },
  module: {
    rules: [
      {
        test: /\.(png|gif|jpg)$/, // 图片文件
        use: [
          {
            loader: "file-loader", // 使用file-loader加载
            options: {
              // file-loader使用的加载选项
              name: "images/[name].[hash:8].[ext]" // 图片文件打包后的输出路径配置
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 插件配置
    new CleanWebpackPlugin()
  ]
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ["css-loader"]
      },


    ]
  }
};
