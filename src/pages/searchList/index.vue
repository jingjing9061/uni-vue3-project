<template>
    <veiw>
        <nav-bar left-icon="arrowleft" title="标题" statusBar fixed @clickLeft="back" />
        <view class="searchBox">
            <Search class="searchContent" @confirm="search" clearButton="auto" cancelButton="none" :focus="true"
                v-model="searchValue" >
            </Search>
            <view class="searchBtn" @click="serach">搜索</view>
        </view>
        <view v-if="searchHistory.length>0">
            <history :historyList="searchHistory" @clickTipsItem="clickTips"></history>
        </view>
    </veiw>
</template>

<script>
import navBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import Search from '@/components/Search'
import history from './component/History.vue'
import { reactive, toRefs, onMounted } from 'vue'

export default {
    name: 'searchList',
    components: {
        navBar,
        Search,
        history
    },
    setup() {
        const state = reactive({
            searchValue: '',
            listData: [],
            searchHistory:[]
        })
        onMounted(() => {

        })
        const clickTips = (val)=>{
            console.log('clickTips',val)
            state.searchValue = val
            uni.showToast({
                title: `${val}被点击了～～`,
                icon:'none',
                duration: 2000
            });
        }
        const serach = () => {
            const searchText = state.searchValue.trim()
            if (state.searchValue == '') {
                return
            }
            //获取缓存的数据 
            try {
                state.searchHistory = JSON.parse(uni.getStorageSync("searchHistory")) 
            }catch(e){
                state.searchHistory = []
            }
            if( state.searchHistory.length >= 10){
                 state.searchHistory.pop()
            }
            state.searchHistory.unshift(searchText);
            uni.setStorageSync(
                "searchHistory",
                JSON.stringify([...new Set( state.searchHistory)])
            );
            setTimeout(()=>{
                state.searchValue = ''
            },500)
        }
        const back = () => {
            uni.navigateBack({
                delta: 1
            })
        }
        return {
            ...toRefs(state),
            serach,
            clickTips,
            back
        }
    },
}

</script>
<style scoped lang='scss'>
.searchBox {
    display: flex;
    align-items: center;
    .searchContent {
        flex: 1;
    }
    .searchBtn {
        margin-right: 6rpx;
        color: #695f5f;
    }
}
</style>