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

		margin-bottom: 15px;

		label {
			font-weight: 500;
			margin-bottom: 8px;

			span {
				color: var(--gray-900);
				font-size: 0.6rem;
			}
		}

		input {
			padding: 5px 16px;
			margin-left: 5px;

			border: 1px solid var(--gray-900);
			border-radius: 10px;
			outline: none;

			font-size: 14px;
			height: 46px;
		}

		p {
			color: var(--red-500);
			font-size: 12px;
			margin: 8px 0px 0 16px;
		}
	}
</style>
