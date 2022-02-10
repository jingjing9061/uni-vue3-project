module.exports = [
  // #ifndef H5
  // 不支持条件编译，需要自己通过process.env.UNI_PLATFORM来判断
  ...(process.env.VUE_APP_PLATFORM !== "h5"
    ? [
        //
      ]
    : []),
  // #endif
];
