<template>
    <view class="box">
        <view class="txt">
            111
        </view>

    </view>

</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
export default {
    name: 'gooods',
    setup() {
        const data = reactive({

        })
        onMounted(() => {
        })
        return {
            ...toRefs(data),
        }
    },
}

</script>
<style scoped lang='scss'>
.box {
    .txt {
        background: $uni-color-primary;
    }
}
</style>