<template>
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
		<div :style="activeStyle"><slot name="item-text"></slot></div>
	</div>
</template>

<script>
	export default {
		name:'TabBarItem',
		props:{
			path: String,
			activecolor : {
				type:String,
				default:'red'
			}
		}
		,
		data(){
			return {
				// isActive : false
			}
		},
		computed:{
			isActive(){
				return this.$route.path.indexOf(this.path) !== -1 
			},
			activeStyle(){
				return this.isActive? {color:this.activecolor} : {}
			}
		}
		,
		methods:{
			itemClick(){
				this.$router.push(this.path)
			}
		}
	}
</script>

<style>
	.tab-bar-item{
		flex : 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}
	.tab-bar-item img {
		width: 24px;
		height: 24px;
		margin-top: 3px;
		vertical-align: middle;/* 图片 和下面文字间的距离  */
		margin-bottom: 2px;
	}
</style>
