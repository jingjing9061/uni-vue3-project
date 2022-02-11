<template>
  <view
    class="pull-refresh-wrapper"
    :style="{ transform: `translateY(${position}px)` }"
    :class="{ 'reset-pull': status != 'pulling' }"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <view class="pulling" v-if="status == 'pulling'"> </view>
    <slot></slot>
    <view class="__anchor__"></view>
  </view>
</template>
<script>
import { isWechatMP } from "@/tools";
const MAX_POSITION = 60; // 最大偏移量
const END_POSITION = 40;
const DAMP_NUM = 0.5; // 阻尼系数
export default {
  props: {
    rootWrapper: {
      type: String,
      default: "wrapper",
    },
    // 接收数据list, 判断list发送变化，来重置下拉刷新，底部加载状态
    list: {
      type: Array,
      default: ()=>{
        return []
      },
    },
    // 是否开启无限加载
    reachBottom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      position: 0,
      status: "default", // pulling / default
    };
  },
  watch: {
    list(val) {
      if (val.length && this.reachBottom) {
        this._bindObserver();
      } else {
        this._unBindObserver();
      }
      if (this.reaching) {
        this.reaching = false;
      }
      this._resetPos();
    },
  },
  beforeUpdate() {
    if (this.list.length == 0 && this.listChange) {
      this.listChange = false;
      setTimeout(() => {
        this._resetPos();
      }, 300);
    }
  },
  mounted() {
    this.touch = {};
  },
  destroyed() {
    this._unBindObserver();
  },
  onPageHide() {
    this._unBindObserver();
  },
  methods: {
    onTouchStart(e) {
      if (this._getScrollTop() > 0) {
        return;
      }
      this.touch.startY = e.touches[0].pageY;
    },
    onTouchMove(e) {
      if (this._getScrollTop() > 0) {
        return;
      }
      if (this.status === "pulling") {
        return;
      }
      const delta = (e.touches[0].pageY - this.touch.startY) * DAMP_NUM;
      if (delta < 0) {
        return;
      }
      this.position = Math.min(delta, MAX_POSITION);
    },
    onTouchEnd(e) {
      if (this._getScrollTop() > 0) {
        return;
      }
      if (this.position >= END_POSITION) {
        this.position = END_POSITION;
        this.status = "pulling";
      }
      if (this.status !== "pulling") {
        this.position = 0;
        return;
      }
      // 加个延时是不想让他太快刷新完
      this.listChange = true;
      setTimeout(() => {
        this.$emit("onRefresh");
      }, 300);
    },
    _bindObserver() {
      if (!this._observer) {
        this._observer = this.createIntersectionObserver();
        this._observer
          .relativeToViewport({
            bottom: 80,
          })
          .observe(".__anchor__", (item) => {
            if (item.intersectionRatio > 0 && !this.reaching) {
              this.reaching = true;
              this.$emit("onReachBottom");
            }
          });
      }
    },
    _unBindObserver() {
      if (this._observer) {
        this._observer.disconnect();
      }
    },
    _getScrollTop() {
      let scrollTop = 0;
      if (isWechatMP()) {
        wx.createSelectorQuery()
          .select(`.${this.rootWrapper}`)
          .boundingClientRect()
          .selectViewport()
          .scrollOffset()
          .exec(function (res) {
            scrollTop = res[1].scrollTop;
          });
      } else {
        scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
      }
      return scrollTop;
    },
    _resetPos() {
      if (this.status != "default") {
        this.status = "default";
        this.position = 0;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pull-refresh-wrapper {
  position: relative;
}
.pulling {
  position: absolute;
  top: -48rpx;
  left: 50%;
  margin-left: -36rpx;
  height: 27rpx;
  width: 72rpx;
  background-image: url(https://imagetest.dejiplaza.com/images/3f429b9027484866aca7ce586fa6e81b-144-1164.png);
  background-size: 72rpx auto;
  max-height: 27rpx;
  background-position: 0 bottom;
  background-repeat: no-repeat;
  animation-duration: 2s;
  animation: logoLoading steps(15, end) 1.5s infinite;
}
// 这里必须设置高度，否则微信小程序无法监听
.__anchor__ {
  background: #fff;
  opacity: 0;
  height: 20rpx;
}
.reset-pull {
  transform: translateY(0px);
  transition-duration: 0.3s;
  transition-property: transform;
}
@keyframes logoLoading {
  0% {
    background-position: 0 bottom;
  }
  100% {
    background-position: 0 top;
  }
}
</style>
