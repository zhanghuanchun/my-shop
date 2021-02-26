<template>
	<div class="cartcontrol">
		<transition name="move">
			<div
				class="iconfont icon-remove_circle_outline"
				v-show="food.count>0"
				@click.stop="foodCountControl(false)"
			></div>
		</transition>

		<div
			class="cart-count"
			v-show="food.count>0"
		>{{food.count}}</div>
		<div
			class="iconfont icon-add_circle"
			@click.stop="foodCountControl(true)"
		></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import throttle from 'lodash/throttle'
	export default {
		props: ['food'],
		methods: {
			foodCountControl: throttle(
				function (isAdd) {
					console.log('add-------')
					this.food &&
						this.$store.dispatch('foodCountControl', {
							isAdd,
							food: this.food,
						})
				},
				1000,
				{ trailing: false }
			),
		},
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixins.styl';

	.cartcontrol {
		font-size: 0;

		.cart-decrease {
			display: inline-block;
			padding: 6px;
			line-height: 24px;
			font-size: 24px;
			color: rgb(0, 160, 220);
		}

		.icon-remove_circle_outline {
			display: inline-block;
			padding: 6px;
			line-height: 24px;
			font-size: 24px;
			color: $green;

			&.move-enter-active, &.move-leave-active {
				transition: all 0.5s;
			}

			&.move-enter, &.move-leave-to { /* .move-leave-active below version 2.1.8 */
				opacity: 0;
				transform: translateX(15px) rotate(180deg);
			}
		}

		.cart-count {
			display: inline-block;
			vertical-align: top;
			width: 12px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			font-size: 10px;
			color: rgb(147, 153, 159);
		}

		.icon-add_circle {
			display: inline-block;
			padding: 6px;
			line-height: 24px;
			font-size: 24px;
			color: $green;
		}
	}
</style>

