<template>
    <view class='test1'>
        <nav-bar left-icon="arrowleft" title="标题" statusBar fixed @clickLeft="back" />
        <!-- banner -->
        <swiper circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
            <swiper-item v-for="item in swiperlist" :key="item.id">
                <image class="img" :src="item.image"></image>
            </swiper-item>
        </swiper>
        <!-- 列表 -->
        <view class="index-hot-play">
            <view class="title">热门视频</view>
            <waterfall :list="playlist"></waterfall>
        </view>
    </view>
</template>

<script>
import { onPageScroll, onShow, onReachBottom,onPullDownRefresh} from '@dcloudio/uni-app'
import { reactive, toRefs, onMounted } from 'vue'
import http from "../../service/http";
import waterfall from "../../components/waterfall.vue"
import navBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
export default {
    components: {
        waterfall,
        navBar
    },
    setup() {
        const state = reactive({
            showBg: false,
            display: 'block',
            navTop: 0,
            navHeight: 40,
            swiperlist: [],
            playlist: []
        })
        onMounted(() => {
            getList()
        })
        const getList = async () => {
            await http.get('/swipers/list').then((res) => {
                state.swiperlist = res.list
            })
            await http.get('/estate/list').then((res) => {
                state.playlist = res
            })
        }
        const scroll = function (e) {
            const scrollY = e.scrollTop
            // state.showBg = scrollY > 40 ? true : false
            // state.display = scrollY > 40 ? 'none' : 'block'
        }
        console.log('onPageScroll', onPageScroll)

        onPageScroll((e) => {
            scroll(e)
        })
        onReachBottom(() => {
            console.log('onReachBottom')
        })
        onPullDownRefresh(()=>{
            console.log('onPullDownRefresh')
        })
        onShow(() => {
            console.log('index onShow')
        })
        const back = () => {
            uni.navigateBack({
                delta: 1
            })

        }
        return {
            ...toRefs(state),
            back
        }
    }
}
</script>
<style  lang='scss'>
swiper {
    width: 750rpx;
    height: 380rpx;
    .img {
        width: 100%;
        height: 100%;
    }
}
.index-hot-play {
    height: 100vh;
    margin: 0 40rpx;
    .title {
        font-size: 40rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #2c2c2c;
        margin-bottom: 20rpx;
    }
}
</style>