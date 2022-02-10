// listHandle.js 列表项处理的方法
const listHandle = {
    add(resData, listData, limit) {
      var ret = {
        nomore: false,
        empty: false,
        data: []
      }
      if (resData) {
        if (resData.length < limit) {
          // 获取数据条数小于页码数，显示已到底
          ret.nomore = true
        }
        ret.data = listData.concat(resData)
      } else {
        ret.data = listData
        ret.nomore = true
        if (!listData.length) {
          // 请求已无返回数据且当前列表无数据，显示为空
          ret.empty = true
        }
      }
      return ret
    },
    update(resData, limit) {
      var ret = {
        nomore: false,
        empty: false,
        data: []
      }
      if (resData) {
        if (resData.length < limit) {
          // 获取数据条数小于页码数，显示已到底
          ret.nomore = true
        }
        ret.data = resData
      } else {
        ret.nomore = true
        // 请求已无返回数据且，显示为空
        ret.empty = true
      }
      return ret
    }
  }
  
  module.exports = listHandle
  
  