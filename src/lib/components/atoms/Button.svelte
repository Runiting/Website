<script>
	export let content;

	export let width = 100;

	export let clickFunction;
</script>

<button on:click={clickFunction} style="width: {width}%">{content}</button>

<style lang="scss">
	button {
		background: #41295a;
		border: none;

		height: 56px;

		border-radius: 10px;
		color: #fff;

		&:hover {
			cursor: pointer;
		}
	}
</style>
