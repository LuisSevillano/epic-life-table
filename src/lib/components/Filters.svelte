<script>
	import Range from '../ui/Range.svelte';
	export let label = '';
	import { years, maintenance } from '../../stores/stores.js';

	const doc = {
		years_title: 'Años',
		years_txt: 'Número de años invertidos en compensar las aportaciones iniciales',
		maintenance_title: 'Cuota mensual mantenimiento',
		maintenance_txt: 'Cuánto dedicaríamos mensualmente a un fondo para mantenimiento y mejoras'
	};
</script>

<div class="parent">
	<div class="sliders">
		<div class="slider">
			<div class="slider-header" style="border-top: none;">
				<div class="slider-title">
					{doc.years_title}
				</div>
				<div class="slider-value">
					<span>{$years} </span>
				</div>
			</div>
			<Range {label} min={2} max={20} step={1} showTicks={false} bind:value={$years} />
			<div class="slider-sub">
				{doc.years_txt}
			</div>
		</div>
		<div class="slider">
			<div class="slider-header" style="border-top: none;">
				<div class="slider-title">
					{doc.maintenance_title}
				</div>
				<div class="slider-value">
					<span>{$maintenance} €</span>
				</div>
			</div>
			<Range {label} min={0} max={250} step={5} showTicks={false} bind:value={$maintenance} />
			<div class="slider-sub">
				{doc.maintenance_txt}
			</div>
		</div>
	</div>
</div>

<!-- markup (zero or more items) goes here -->

<style>
	.slider {
		padding: 1rem;
		border: 1px solid rgb(80, 80, 80);
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
	}
	/* LAYOUT */
	.parent {
		display: grid;
		overflow: hidden;
		gap: 1px;
		max-width: 50rem;
		margin: 1rem auto;
		font-family: var(--sans);
		color: var(--c-black);
		font-size: 1.187rem;
	}

	.header,
	.sliders,
	.cuota,
	.casos {
		display: grid;
		gap: 1rem;
	}

	.header {
		padding: 1rem;
		border-bottom: 1px solid var(--c-border);
	}

	@media only screen and (min-width: 681px) {
		.parent {
			grid-template-columns: repeat(1, 1fr);
			grid-template-rows: repeat(5, auto);
			gap: 1px;
			margin-bottom: 3rem;
			grid-column-gap: 2rem;
		}

		.header {
			grid-area: 1 / 1 / 2 / 3;
		}
		.sliders {
			grid-area: 2 / 1 / 6 / 2;
			padding: 1rem;
			grid-template-columns: repeat(2, 1fr);
			grid-column-gap: 2rem;
		}
		.cuota {
			grid-area: 2 / 2 / 3 / 3;
			padding-top: 1rem;
		}
		.casos {
			grid-area: 3 / 2 / 6 / 3;
		}
	}

	/* TYPE */

	h4 {
		font-size: 1.2rem;
		font-family: var(--serif);
		font-weight: 900;
	}

	.large {
		font-size: 1.3rem;
		font-weight: 900;
	}

	span {
		color: var(--c-text);
		font-weight: 700;
		font-size: 1.2rem;
		font-family: var(--sans);
		font-weight: 900;
		font-feature-settings: 'tnum';
		font-variant-numeric: tabular-nums;
	}

	.slider-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 1.4rem;
		border-top: 1px solid var(--c-border);
	}

	.slider-title {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		padding-top: 0.75em;
	}
	.slider-sub {
		font-size: 1rem;
		font-weight: 200;
		margin-bottom: 1rem;
		line-height: 1.3rem;
		margin-top: -1.2rem;
		color: #c7c7c7;
	}
</style>
