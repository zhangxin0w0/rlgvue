module.exports = {
  lintOnSave: false,

  publicPath: process.env.NODE_ENV === 'production'
    ? '/rlgvue/'
    : '/',

  devServer: {
    proxy: {
      '/portal': {
        target: 'http://122.51.32.207:8089', // 后端服务器域名
        ws: true,//是否代理websockets
        changeOrigin: true,  // 设置同源 默认false，是否需要改变原始主机头为目标URL
      }
    },
    disableHostCheck: true
  },

};
