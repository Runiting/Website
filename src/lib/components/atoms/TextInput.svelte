<script>
	export let placeholder;
	export let label;
	export let name;
	export let content;

	export let error = '';

	export let required = true;
	export let secret = false;
</script>

<div>
	<label for="{placeholder}-input">
		{label}

		{#if !required}
			<span>(optionnal)</span>
		{/if}
	</label>
	{#if secret}
		<input
			type="password"
			{name}
			id="{placeholder}-input"
			class="text-input"
			{placeholder}
			bind:value={content}
		/>
	{:else}
		<input
			type="text"
			{name}
			id="{placeholder}-input"
			class="text-input"
			{placeholder}
			bind:value={content}
		/>
	{/if}

	<p>
		{error || ''}
	</p>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;

		margin: 15px 0px;

		label {
			font-weight: 500;

			span {
				color: #4c4a4d;
				font-size: 0.6rem;
			}
		}

		input {
			padding: 5px 0px;
			margin-left: 5px;

			border: none;
			border-bottom: 1px solid #4c4a4d;
			outline: none;

			font-size: 0.9rem;
		}

		p {
			color: red;
			font-size: 0.8rem;
			margin: 5px;
		}
	}
</style>
