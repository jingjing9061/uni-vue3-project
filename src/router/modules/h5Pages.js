module.exports = [
  // #ifdef H5
  ...(process.env.VUE_APP_PLATFORM === "h5"
    ? [
        ///
      ]
    : []),
  // #endif
];
