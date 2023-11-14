const path = require('path');

module.exports = {
  entry: './src/main.ts',  // 入口文件路径
  output: {
    filename: 'bundle.js',  // 输出文件名
    path: path.resolve(__dirname, 'dist'),  // 输出目录路径
  },
  resolve: {
    extensions: ['.ts', '.js'],  // 解析扩展名
  },
  module: {
    rules: [
      {
        test: /\.ts$/,  // 匹配以.ts结尾的文件
        exclude: /node_modules/,  // 排除node_modules目录
        use: 'ts-loader',  // 使用ts-loader处理TypeScript文件
      }
    ],
  },
};