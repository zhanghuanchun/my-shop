<template>
	<div>
		<div class="goods">
			<div
				class="menu-wrapper"
				ref="left_goods"
			>
				<ul ref="left_list">
					<li
						class="menu-item"
						:class="{current:currentIndex===index}"
						v-for="(good,index) in goods"
						:key="index"
						@click="scrollRightList(index)"
					>

						<span class="text bottom-border-1px">
							<img
								class="icon"
								:src="good.icon"
								v-if="good.icon"
							>
							{{good.name}}
						</span>
					</li>

				</ul>
			</div>

			<div
				class="foods-wrapper"
				ref="right_goods"
			>
				<ul ref="right_list">
					<li
						class="food-list-hook"
						v-for="(good,index) in goods"
						:key="index"
					>
						<h1 class="title">{{good.name}}</h1>
						<ul>
							<li
								class="food-item bottom-border-1px"
								v-for="food in good.foods"
								:key="food.name"
								@click.stop="showFood(food)"
							>
								<div class="icon">
									<img
										width="57"
										height="57"
										:src="food.icon"
									>
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span>
										<span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<span
											class="old"
											v-show="food.oldPrice"
										>￥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<CartControl :food="food" />
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<Food
				:food="currentFood"
				ref="food"
			/>
		</div>
		<ShopCart />
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState } from 'vuex'
	import BScroll from 'better-scroll'
	import Food from '../../components/Food/Food'
	import ShopCart from '../../components/ShopCart/ShopCart'
	import { saveShopCartList } from '../../utils'
	export default {
		data() {
			return {
				rightListTops: [],
				scrollTop: 0,
				currentFood: {},
			}
		},
		mounted() {
			if (this.goods.length > 0) {
				this.initBScroll()
				this.initRightListTops()
			}
			window.addEventListener('unload', () => {
				saveShopCartList(this.id, this.shopcartlist)
			})
		},
		computed: {
			...mapState({
				id: (state) => state.shop.id,
				goods: (state) => state.shop.goods,
				shopcartlist: (state) => state.shop.shopcartlist,
			}),
			currentIndex() {
				let index = this.rightListTops.findIndex((element, index) => {
					return (
						this.scrollTop >= element &&
						this.scrollTop < this.rightListTops[index + 1]
					)
				})
				if (index !== this.index && this.leftscroll && !this.leftclick) {
					this.index = index
					const el = this.$refs.left_list.children[index]
					el && this.leftscroll.scrollToElement(el, 300)
				}
				return index
			},
		},
		methods: {
			initBScroll() {
				if (!this.leftscroll) {
					this.leftscroll = new BScroll(this.$refs.left_goods, {
						click: true,
						probeType: 1,
					})
					this.rightscroll = new BScroll(this.$refs.right_goods, {
						probeType: 1,
					})
					this.rightscroll.on('scroll', this.getScrollTop)
					this.rightscroll.on('scrollEnd', this.getScrollTop)
				} else {
					this.leftScroll && this.leftScroll.refresh()
					this.rightScroll && this.rightScroll.refresh()
				}
			},
			getScrollTop({ x, y }) {
				this.leftclick = false
				this.scrollTop = Math.abs(y)
			},
			initRightListTops() {
				const lis = Array.prototype.slice.call(
					this.$refs.right_list.children
				)
				let top = 0
				this.rightListTops.push(top)
				lis.forEach((element) => {
					top += element.offsetHeight
					this.rightListTops.push(top)
				})
			},
			scrollRightList(index) {
				let top = this.rightListTops[index]
				this.leftclick = true
				this.scrollTop = top
				this.rightscroll.scrollTo(0, -top, 1000)
			},
			showFood(food) {
				this.currentFood = food
				this.$refs.food.toggleShowFood()
			},
		},
		watch: {
			goods() {
				this.$nextTick(() => {
					this.initBScroll()
					this.initRightListTops()
				})
			},
		},
		components: {
			Food,
			ShopCart,
		},
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixins.styl';

	.goods {
		display: flex;
		position: absolute;
		top: 225px;
		bottom: 46px;
		width: 100%;
		background: #fff;
		overflow: hidden;

		.menu-wrapper {
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;

			.menu-item {
				display: table;
				height: 54px;
				width: 56px;
				padding: 0 12px;
				line-height: 14px;

				&.current {
					position: relative;
					z-index: 10;
					margin-top: -1px;
					background: #fff;
					color: $green;
					font-weight: 700;

					.text {
						border-none();
					}
				}

				.icon {
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
				}

				.text {
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					bottom-border-1px(rgba(7, 17, 27, 0.1));
					font-size: 12px;
				}
			}
		}

		.foods-wrapper {
			flex: 1;

			.title {
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147, 153, 159);
				background: #f3f5f7;
			}

			.food-item {
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				bottom-border-1px(rgba(7, 17, 27, 0.1));

				&:last-child {
					border-none();
					margin-bottom: 0;
				}

				.icon {
					flex: 0 0 57px;
					margin-right: 10px;
				}

				.content {
					flex: 1;

					.name {
						margin: 2px 0 8px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7, 17, 27);
					}

					.desc, .extra {
						line-height: 10px;
						font-size: 10px;
						color: rgb(147, 153, 159);
					}

					.desc {
						line-height: 12px;
						margin-bottom: 8px;
					}

					.extra {
						.count {
							margin-right: 12px;
						}
					}

					.price {
						font-weight: 700;
						line-height: 24px;

						.now {
							margin-right: 8px;
							font-size: 14px;
							color: rgb(240, 20, 20);
						}

						.old {
							text-decoration: line-through;
							font-size: 10px;
							color: rgb(147, 153, 159);
						}
					}

					.cartcontrol-wrapper {
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}
	}
</style>


