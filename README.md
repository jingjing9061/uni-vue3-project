# uni-vue3-project  vue3+uniapp

# 搭建流程
## 全局安装vue-cli脚手架
npm install -g @vue/cli 

## 创建 uni-app+vue3.0项目
vue create -p dcloudio/uni-preset-vue#vue3 uni-vue3-project

## 配置模块化及热重载 
安装 npm i uni-pages-hot-modules -S

## 安装node-sass (版本太高会出现兼容问题，卸载之前的 安装7的版本) 
npm install sass-loader node-sass -D

## 运行不起来 提示 npm install --save @vue/shared   ？？？
npm i vue-shares

## sitemap 配置
https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/sitemap.html



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
