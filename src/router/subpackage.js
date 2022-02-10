const files = hotRequire.context("./subModules", true, /\.js$/);
let subpackage = [];
files.keys().forEach((key) => {
  const item = files(key);
  if (process.env.VUE_APP_PLATFORM == "h5") {
    if (item && item.length > 0) {
      let root = item[0].root;
      item[0].pages.forEach((page) => {
        page.path = `${root}/${page.path}`;
      });
      subpackage.push(...item[0].pages);
    }
  } else {
    subpackage.push(...item);
  }
});
module.exports = subpackage;
