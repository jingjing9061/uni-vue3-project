<template>
  <div>
    222
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
export default {
    name: 'listItem',
    setup() {
        const data = reactive({})
        onMounted(() => {
        })
        return {
            ...toRefs(data),
        }
    },
}

</script>
<style scoped lang='scss'>
</style>