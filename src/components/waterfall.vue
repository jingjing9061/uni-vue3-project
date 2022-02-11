<template>
    <view class="waterfall_list">
        <view class="waterfall_left index-play">
            <view class="index-play-item" v-for="(item, index) in leftList" :key="index">
                <view class="image-wrapper">
                    <image class="img" :src="item.imgurl" mode="widthFix" :lazy-load="true" @load="considerPush">
                    </image>
                    <view class="zan-box">
                        <image class="zan-icon" src="../static/images/zan-icon2.png"></image>
                        <text class="zan-num">123</text>
                    </view>
                    <view class="user-info">
                        <image class="avatar" src="../static/images/default-avatar.png"></image>
                        <view class="name">{{ item.name }}</view>
                    </view>
                </view>
                <view class="type">{{ item.type }}</view>
                <!-- <view class="devname">{{ item.devname }}</view> -->
            </view>
        </view>
        <view class="waterfall_right index-play">
            <view class="index-play-item" v-for="(item, index) in rightList" :key="index">
                <view class="image-wrapper">
                    <image class="img" :src="item.imgurl" mode="widthFix" :lazy-load="true" @load="considerPush">
                    </image>
                    <view class="zan-box">
                        <image class="zan-icon" src="../static/images/zan-icon.png"></image>
                        <text class="zan-num">123</text>
                    </view>
                    <view class="user-info">
                        <image class="avatar" src="../static/images/default-avatar.png"></image>
                        <view class="name">{{ item.name }}</view>
                    </view>
                </view>
                <view class="type">{{ item.type }}</view>
                <!-- <view class="devname">{{ item.devname }}</view> -->
            </view>
        </view>
    </view>
</template>


<script>
export default {
	props: {
		list: {
			type: Array,
			required: true,
            default() {
                return []
            },
		}
	},
	data() {
		return {
			// 左侧列表
			leftList: [],
			// 右侧列表
			rightList: [],
			// 组件数据备份
			newList: [],
		};
	},
	created() {
	},
	mounted() {},
	watch: {
		list(newValue, oldValue) {
			this.touchOff(newValue, oldValue);
		},
		immediate: true
	},
	methods: {
		// 触发重新排列
		touchOff() {
			this.newList = [...this.list];
			if (this.newList.length != 0) {
				this.leftList.push(this.newList.shift()); //触发排列
			}
		},
		// 计算排列
		considerPush() {
			if (this.newList.length == 0) return; //没有数据了
			let leftH = this.leftHeight,
				rightH = this.rightHeight; //左右高度
			var query = uni.createSelectorQuery().in(this);
			query.selectAll('.waterfall_left').boundingClientRect();
			query.selectAll('.waterfall_right').boundingClientRect();
			query.exec(res => {
				leftH = res[0].length != 0 ? res[0][0].height : 0; //防止查询不到做个处理
				rightH = res[1].length != 0 ? res[1][0].height : 0;
				if (leftH == rightH || leftH < rightH) {
					// 相等 || 左边小
					this.leftList.push(this.newList.shift());
				} else {
					// 右边小
					this.rightList.push(this.newList.shift());
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.waterfall_list {
    // padding-bottom: 200rpx;
    .waterfall_left {
        margin-right: 15rpx;
    }
    .index-play {
        width: 325rpx;
        display: inline-block !important;
        vertical-align: top;
        padding: 6rpx;
        box-sizing: border-box;
        .index-play-item {
            margin-bottom: 45rpx;
            border-radius: 8rpx;
            .image-wrapper {
                position: relative;
                .img {
                    border: 1rpx solid #ffffff;
                    width: 100%;
                }
                .user-info {
                    display: flex;
                    align-items: flex-end;
                    position: absolute;
                    left: 25rpx;
                    bottom: -30rpx;
                    .avatar {
                        width: 64rpx;
                        height: 64rpx;
                        border-radius: 50%;
                    }
                    .name {
                        width: 190rpx;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 22rpx;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #888888;
                        margin-left: 12rpx;
                    }
                }
                .zan-box {
                    position: absolute;
                    right: -2rpx;
                    bottom: 14rpx;
                    width: 140rpx;
                    background-image: url(../static/images/zanbg-icon.png);
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    text-align: center;
                    .zan-icon {
                        width: 24rpx;
                        height: 24rpx;
                        margin-right: 4rpx;
                        vertical-align: middle;
                        border: none;
                    }
                    .zan-num {
                        font-size: 20rpx;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #ffffff;
                    }
                }
            }
            .type {
                width: 150px;
                font-size: 28rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #2c2c2c;
                margin: 40rpx 0 16rpx 0;
            }
            .devname {
                font-size: 22rpx;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #4170f9;
            }
        }
    }
}
</style>
