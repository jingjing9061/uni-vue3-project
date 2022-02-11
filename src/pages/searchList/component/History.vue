<template>
  <view class="history">
      <view v-for="item in historyList" 
            :key="item" 
            class="item" 
            @click="clickHander(item)">
             {{item}}
      </view>
  </view>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
export default {
    name: 'history',
    props:{
        emits:['clickTipsItem'],
        historyList:{
            type:Array,
            defalut:()=>{
                return []
            },
        }
    },
    setup(props, ctx) {
        const data = reactive({
        })
        const clickHander =(val)=>{
            ctx.emit('clickTipsItem',val)
        }
        onMounted(() => {

        })
        return {
            ...toRefs(data),
            clickHander
        }
    },
}

</script>
<style scoped lang='scss'>
.history{
    display: flex;
    flex-wrap: wrap;
    margin: 0 20rpx;
    .item {
        background: #f9f5f5;
        border-radius: 4rpx;
        padding: 4rpx 6rpx;
        margin:0 4rpx;
    }
}

</style>