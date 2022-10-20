<script>
	export let content;
	export let width = '100%';
	export let clickFunction;
	export let backgroundColor;
</script>

<button
	on:click={clickFunction}
	style="{backgroundColor ? `background: ${backgroundColor} !important` : ''}; width: {width}"
	>{content}</button
>

<style lang="scss">
	button {
		background: var(--button-color);
		border: none;

		height: 56px;

		border-radius: 10px;
		color: #fff;

		padding: 5px 15px;

		&:hover {
			cursor: pointer;
		}
	}
</style>
