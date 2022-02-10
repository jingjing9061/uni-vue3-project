//判断平台
export const isDefPlatfrom = () => {
  let platform = undefined;
  //#ifdef APP-PLUS
  platform = "APP-PLUS";
  //#endif

  //#ifdef APP-PLUS-NVUE
  platform = "APP-NVUE";
  //#endif

  //#ifdef H5
  platform = "H5";
  //#endif

  //#ifdef MP-WEIXIN
  platform = "MP-WEIXIN";
  //#endif

  //#ifdef MP-ALIPAY
  platform = "MP-ALIPAY";
  //#endif

  //#ifdef MP-BAIDU
  platform = "MP-BAIDU";
  //#endif

  //#ifdef MP-TOUTIAO
  platform = "MP-TOUTIAO";
  //#endif
  //#ifdef MP-QQ
  platform = "MP-QQ";
  //#endif
  //#ifdef MP-360
  platform = "MP-360";
  //#endif

  //#ifdef QUICKAPP-WEBVIEW
  platform = "QUICKAPP-WEBVIEW";
  //#endif

  //#ifdef QUICKAPP-WEBVIEW-UNION
  platform = "QUICKAPP-WEBVIEW-UNION";
  //#endif

  //#ifdef QUICKAPP-WEBVIEW-HUAWEI
  platform = "QUICKAPP-WEBVIEW-HUAWEI";
  //#endif

  return platform;
};

//防抖
export function debounce(fn, delay) {
  var delay = delay || 500;
  //#ifdef H5
  window.timer_d;
  //#endif

  return function () {
    var th = this;
    var args = arguments;

    //#ifndef H5
    if (getApp().globalData.timer_d) {
      clearTimeout(getApp().globalData.timer_d);
    }
    getApp().globalData.timer_d = setTimeout(function () {
      getApp().globalData.timer_d = null;
      fn.apply(th, args);
    }, delay);
    // #endif

    // #ifdef H5
    if (window.timer_d) {
      clearTimeout(window.timer_d);
    }
    window.timer_d = setTimeout(function () {
      window.timer_d = null;
      fn.apply(th, args);
    }, delay);
    // #endif
  };
}

export function checkIphonexMobile() {
  const { model } = uni.getSystemInfoSync();
  let iphoneXArr = [
    "iPhone X",
    "iPhone XR",
    "iPhone XS Max",
    "iPhone 12/13 mini",
    "iPhone 12/13 (Pro)",
    "iPhone 12/13 Pro Max",
  ];
  return iphoneXArr.includes(model);
}
