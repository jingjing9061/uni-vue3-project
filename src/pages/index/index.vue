<template>
    <view class="content">
        <nav-bar title="首页" statusBar fixed />
        <view class="searchWrap" :style="{ top: titleBarHeight + 'px' }">
            <!-- <Search @inputClick="inputClick"></Search> -->
            <Search @confirm="search" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
                @cancel="cancel" @clear="clear">
            </Search>
        </view>

        <!-- <view>
            <button @click="clickHanlder">jump</button>
        </view> -->
    </view>
</template>

<script >
import navBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import { reactive, toRefs, onMounted } from 'vue'
import Search from '@/components/Search'
import { onPageScroll, onShow, onReady, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'

export default {
    components: {
        navBar,
        Search
    },
    setup() {
        const state = reactive({
            statusBarHeight: 0,
            titleBarHeight: 0,
            searchValue: ''
        })
        state.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
        // console.log(state.statusBarHeight)

        onReady(() => {
            state.titleBarHeight = (uni.getMenuButtonBoundingClientRect().top - state.statusBarHeight) * 2 +
                uni.getMenuButtonBoundingClientRect().height;
        })

        const clickHanlder = () => {
            uni.navigateTo({
                url: '/packageA/test1/index'
            })
        }

        const refresh = () => {
            getCMSList()
            loadData()
        }
        onMounted(() => {
            refresh();
        })
        const getCMSList = async () => {
            console.log(111)


        }
        const loadData = () => {
            console.log(2222)
        }

        const search = () => {
            uni.showToast({
                title: '搜索：' + res.value,
                icon: 'none'
            })
        }

        const blur = () => {}
        const input = () => {}
        const focus = (val) => {
            uni.navigateTo({
                url: '/pages/searchList/index'
            })
        }
        const cancel = () => {}
        const clear = () => {}
        return {
            ...toRefs(state),
            search,
            cancel,
            clear,
            blur,
            input,
            focus,
            clickHanlder
        }
    }
}
</script>

<style>
.content {
    /* text-align: center; */
    /* height: 400upx; */
}

.logo {
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
}

.title {
    font-size: 36upx;
    color: #8f8f94;
}
.searchWrap {
    padding: 15px;
    background-color: #ffffff;
}
</style>
