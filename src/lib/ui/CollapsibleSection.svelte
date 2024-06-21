<script>
	// based on suggestions from:
	// Inclusive Components by Heydon Pickering https://inclusive-components.design/collapsible-sections/
	export let headerText;

	let expanded = false;
</script>

<div class="collapsible">
	<h3>
		<button aria-expanded={expanded} on:click={() => (expanded = !expanded)}
			>{headerText}
			<svg viewBox="0 0 20 20" fill="none">
				<path class="vert" d="M10 1V19" stroke=" rgb(182 165 99)" stroke-width="2" />
				<path d="M1 10L19 10" stroke=" rgb(182 165 99)" stroke-width="2" />
			</svg>
		</button>
	</h3>

	<div class="contents" hidden={!expanded}>
		<slot></slot>
	</div>
</div>

<style>
	.collapsible {
		max-width: 50rem;
		margin-left: auto;
		margin-right: auto;
		padding: 0 1rem;
	}
	.contents {
		border-bottom: 1px solid var(--gray-light, #eee);
	}

	h3 {
		margin: 0;
	}

	button {
		cursor: pointer;
		background-color: var(--background, rgb(60, 55, 25));
		color: var(--gray-darkest, #fff);
		color: rgb(182 165 99);
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		border: none;
		margin: 0;
		padding: 1em 0.5em;
	}

	button[aria-expanded='true'] {
		border-bottom: 1px solid var(--gray-light, #eee);
	}

	button[aria-expanded='true'] .vert {
		display: none;
	}

	button [aria-expanded='true'] rect {
		fill: currentColor;
	}

	svg {
		height: 0.7em;
		width: 0.7em;
	}
</style>
