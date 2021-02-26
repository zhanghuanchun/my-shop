<template>
	<div>
		<keep-alive :exclude="['Search','Shop']">
			<router-view></router-view>
		</keep-alive>

		<FooterGuide v-show="$route.meta.showFooterGuide" />
	</div>
</template>

<script type="text/ecmascript-6">
	import FooterGuide from './components/FooterGuide/FooterGuide'
	export default {
		mounted() {
			this.$store.dispatch('autoLogin')
		},
		components: {
			FooterGuide,
		},
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
