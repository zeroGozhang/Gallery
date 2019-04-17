/* eslint-disable */
// https://cli.vuejs.org/zh/config

// const fs = require("fs");
const path = require("path");
// const lessToJs = require('less-vars-to-js');
// const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

const isProd = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  baseUrl: isProd !== "production" ? "/" : "/dist/",
  assetsDir: "static",
  devServer: {
    disableHostCheck: true,
    port: 8080

    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理

    // proxy: !isProd
    //   ? {
    //       "^/login": {
    //         target: "http://localhost:8080"
    //       },
    //       "/config": {
    //         target: "http://localhost:8080"
    //       },
    //       "/api": {
    //         target: "http://mgmt-gateway.dev.jianke.com",
    //         ws: true,
    //         changeOrigin: true,
    //         pathRewrite: {
    //           "^/api": ""
    //         }
    //       }
    //     }
    //   : {} // 配置多个代理
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("static", resolve("src/static"));
  },
  // pluginOptions: {
  //   presets: ["@vue/app"],
  //   plugins: [
  //     [
  //       "import",
  //       { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
  //     ]
  //   ],
  // },
  css: {
    loaderOptions: {
      // less: {
      //   modifyVars: {
      //     /* less 变量覆盖，用于自定义 ant design 主题 */

      //     'primary-color': '#13C2C2',
      //     'link-color': '#13C2C2',
      //     'border-radius-base': '2px',
      //   },
      //   // modifyVars: themeVariables,
      //   javascriptEnabled: true
      // }
      // 先做默认值设置，后期会加上修改主体配置
      less: {
        modifyVars: {
          'primary-color': '#13C2C2',
          'link-color': '#13C2C2',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true
      }
    }
  }
};
