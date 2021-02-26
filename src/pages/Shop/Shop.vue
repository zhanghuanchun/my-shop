<template>
	<div>
		<ShopHeader />
		<div class="tab">
			<div class="tab-item">
				<router-link
					:to="`/shop/${id}/goods`"
					replace
				>点餐</router-link>
			</div>
			<div class="tab-item">
				<router-link
					:to="`/shop/${id}/ratings`"
					replace
				>评价</router-link>
			</div>
			<div class="tab-item">
				<router-link
					:to="`/shop/${id}/info`"
					replace
				>商家</router-link>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import ShopHeader from '../../components/ShopHeader/ShopHeader'
	import { mapState } from 'vuex'
	import { saveShopCartList } from '../../utils'
	export default {
		props: ['id'],
		mounted() {
			// this.$store.dispatch('getShop', this.id)
		},
		beforeRouteEnter(to, from, next) {
			next((vm) => {
				vm.$store.dispatch('getShop', vm.id)
			})
			next()
		},
		computed: {
			...mapState({
				goods: (state) => state.shop.goods,
				shopcartlist: (state) => state.shop.shopcartlist,
			}),
		},
		components: {
			ShopHeader,
		},
		beforeDestroy() {
			//把购物车数据存入sessionStorage
			saveShopCartList(this.id, this.shopcartlist)
		},
		beforeRouteLeave(to, from, next) {
			saveShopCartList(this.id, this.shopcartlist)
			next()
		},
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixins.styl';

	.tab {
		height: 40px;
		line-height: 40px;
		background: #fff;
		bottom-border-1px(rgba(7, 17, 27, 0.1));

		.tab-item {
			float: left;
			width: 33.33333%;
			text-align: center;
			font-size: 14px;
			color: rgb(77, 85, 93);

			a {
				display: block;
				position: relative;

				&.router-link-active {
					color: #02a774;

					&::after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 1px;
						width: 35px;
						height: 2px;
						transform: translateX(-50%);
						background: #02a774;
					}
				}
			}
		}
	}
</style>
