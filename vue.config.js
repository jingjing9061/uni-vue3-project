process.env.UNI_USING_VUE3 = true
process.env.UNI_USING_VUE3_OPTIONS_API = true

const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
  }

module.exports = {
  //这是配置路径引用的，可以不要
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("/src"))
      .set("@api", resolve("/api"))
      .set("@config", resolve("/src/config"))
      .set("@environment", resolve("/src/environment"));
  },
  productionSourceMap: false,

}
