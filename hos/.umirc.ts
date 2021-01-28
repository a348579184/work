// ref: https://umijs.org/config/
import { resolve } from 'path';
const zbContext  = require('./src/utils/zbws')
export default {
  treeShaking: true,
  targets: {
    ie: 11,
  },
  hash:true,
  context: {
    docSaved: zbContext.docSaved,
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'hos',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  theme: './src/utils/theme.js',

  disableCSSModules: true,

  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    models: resolve(__dirname, './src/models'),
    services: resolve(__dirname, './src/services'),
    utils: resolve(__dirname, './src/utils'),
  },

  proxy: {
    '/api': {
       target: 'http://47.95.213.112:8091',
      // target: 'http://127.0.0.1:7778/',
      //演示服务器
      // target: 'http://192.168.201.162:9900/',
      changeOrigin: false,
      pathRewrite: { '^/api': '/' },
    },

  },
};
