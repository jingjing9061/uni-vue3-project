const files = hotRequire.context("./modules", true, /\.js$/);
const modules = [];
files.keys().forEach((key) => {
  if (key === "./index.js") return;
  const item = files(key);
  modules.push(...item);
});
module.exports = modules;
