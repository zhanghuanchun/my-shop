<template>
	<ul class="footer-guide">
		<li
			class="guide-item"
			:class="{on:$route.path==='/msite'}"
			@click="goto('/msite')"
		>
			<i class="iconfont icon-waimai"></i>
			<span>{{$t('footer_home')}}</span>
		</li>
		<li
			class="guide-item"
			:class="{on:$route.path==='/search'}"
			@click="goto('/search')"
		>
			<i class="iconfont icon-search"></i>
			<span>{{$t('footer_search')}}</span>
		</li>
		<li
			class="guide-item"
			:class="{on:$route.path==='/order'}"
			@click="goto('/order')"
		>
			<i class="iconfont icon-dingdan"></i>
			<span>{{$t('footer_order')}}</span>
		</li>
		<li
			class="guide-item"
			:class="{on:$route.path==='/profile'}"
			@click="goto('/profile')"
		>
			<i class="iconfont icon-geren"></i>
			<span>{{$t('footer_own')}}</span>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
	export default {
		methods: {
			goto(path) {
				if (path !== this.$route.path) this.$router.replace(path)
				else window.location = path
			},
		},
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixins.styl';

	.footer-guide {
		top-border-1px(#e4e4e4);
		z-index: 100;
		display: flex;
		position: fixed;
		width: 100%;
		height: 50px;
		left: 0;
		bottom: 0;
		background-color: #fff;

		.guide-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 25%;
			color: #999999;

			.iconfont {
				font-size: 22px;
			}

			span {
				margin-top: 3px;
				font-size: 12px;
			}
		}

		.on {
			color: $green;
		}
	}
</style>
