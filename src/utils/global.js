import Vue from 'vue'
import { routerBack, isWechatMP, getElementNode } from '@/tools'


Vue.prototype.Toast = function (e) {
    const msg = typeof e === 'string' ? { message: e, type: 'none' } : e
    uni.showToast({
        title: msg.message,
        mask: true,
        icon: msg.type,
        ...msg,
    })
}
Vue.prototype.Confirm = function (o) {
    let opt = {
        cancelText: o.cancelText || '取消',
        confirmText: o.confirmText || '确定',
        confirmColor: o.confirmColor || '#000000',
        success: function (res) {
            if (res.confirm) {
                o.confirm && o.confirm();
            } else if (res.cancel) {
                o.cancel && o.cancel();
            }
        },
    }
    if (o.title) {
        opt.title = o.title
    }
    if (o.content) {
        opt.content = o.content
    }
    uni.showModal(opt);
}



Vue.prototype.$routerBack = routerBack;
Vue.prototype.$getElementNode = getElementNode;


const toString = Object.prototype.toString
function isObject(value) {
    return toString.call(value) === '[object Object]'
}
function isString(value) {
    return toString.call(value) === '[object String]'
}

function openPage(args, str) {
    let name, query = {}, queryStr = null, path, type, isName = false
    switch (true) {
        case isObject(args):
            ({ name, path, query = {} } = args)
            break
        case isString(args):
            name = args
            break
        default:
            throw new Error('参数必须是对象或者字符串')
    }
    if (isObject(query)) {
        queryStr = encodeURIComponent(JSON.stringify(query))
    } else {
        throw new Error('query数据必须是Object')
    }

    return new Promise((resolve, reject) => {
        let url;
        if (str === 'switchTab') {
            url = path;
            getApp().globalData.state.options.query = query
        } else {
            url = `${path}?query=${queryStr}`;
        }
        uni[str]({
            url: url,
            success: resolve,
            fail: reject
        })
    })
}

Vue.prototype.$Router = {
    go: function (delta) {
        uni.navigateBack({ delta: Math.abs(delta) })
    },
    push: function (args) {
        let pages = getCurrentPages()
        if(pages.length > 9 && isWechatMP()) {
            let name, query = {}, queryStr = null, path, type, isName = false
            switch (true) {
                case isObject(args):
                    ({ name, path, query = {} } = args)
                    break
                case isString(args):
                    name = args
                    break
                default:
                    throw new Error('参数必须是对象或者字符串')
            }
            if (isObject(query)) {
                queryStr = encodeURIComponent(JSON.stringify(query))
            } else {
                throw new Error('query数据必须是Object')
            }
            uni.reLaunch({ url: `${path}?query=${queryStr}`})
        }else {
            const ar = isString(args) ? {
                path: args,
            } : args
            const tabPages = ['/pages/home/index', '/pages/goodsCategory/index', '/pages/shoppingCart/index', '/pages/personalCenter/index'];
            if (tabPages.indexOf(ar.path) > -1) {
                openPage(ar, 'switchTab')
            } else {
                openPage(ar, 'navigateTo')
            }
        }
    },
    replace: function (args) {
        const ar = isString(args) ? {
            path: args,
        } : args
        openPage(ar, 'redirectTo')
    }
}

Vue.prototype.showLoading = function (msg, mask = true) {
    uni.showLoading({
        title: msg || '加载中',
        mask,
    })
}
Vue.prototype.cancelLoading = function (req) {
    uni.hideLoading()
}

