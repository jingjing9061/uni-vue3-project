##### NewPullRefresh 下拉刷新组件

| 参数          | 说明                                                            | 类型     | 默认值 | 是否必传 |
| ------------- | --------------------------------------------------------------- | -------- | ------ | -------- |
| rootWrapper   | 根节点元素 className                                            | String   | warp   | true     |
| list          | 接收数据 list, 判断 list 发送变化，来重置下拉刷新，底部加载状态 | Arrary   | []     | false    |
| reachBottom   | 触底自动加载                                                    | Boolean  | false  | false    |
| onRefresh     | 执行下拉刷新回调                                                | Function | -      | false    |
| onReachBottom | 触底回调                                                        | Function | -      | false    |

```vue
<template>
  <NewPullRefresh
    rootWrapper="home"
    @onRefresh="onRefresh()"
    @onReachBottom="onReachBottom()"
  >
    <view class="home"> </view>
  </NewPullRefresh>
</template>

<script>
import NewPullRefresh from "@/components/NewPullRefresh";

export default {
  data() {
    return {};
  },
  components: {
    NewPullRefresh,
  },
  methods: {
    onRefresh() {
      console.log("onRefresh");
    },
    onReachBottom() {
      console.log("onReachBottom");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
}
</style>
```
