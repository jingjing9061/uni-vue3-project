<template>
    <view class="content">
        <view>
            <text class="title">111</text>
            <button @click="clickHanlder">jump</button>
        </view>
    </view>
</template>

<script >
    export default {
        setup() {
            const clickHanlder = ()=>{
                console.log(11111)
                uni.navigateTo({
                    url:'/packageA/test1/index'
                })
            }
            return {
                clickHanlder
            }
        }

    }
</script>

<style>
    .content {
        text-align: center;
        height: 400upx;
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
</style>
