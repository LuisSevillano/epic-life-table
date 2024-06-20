<script>
	import Filters from '../lib/components/Filters.svelte';
	import Table from '../lib/components/Table.svelte';
	import { siteTitle, siteDescription, siteLongDesc } from '$lib/config';
	import { format, getMaxItems } from '../lib/utils.js';
	import {
		maintenance,
		max,
		data,
		maxItem,
		months,
		defaultData,
		totalValue,
		years,
		sortBy,
		maxItems
	} from '../stores/stores.js';
	$: sample = $data.find((d) => d.nombre === 'Mariano') || $data[0];
</script>

<main>
	<header>
		<h1>{siteTitle}</h1>
	</header>
	<section>
		<p>{@html siteLongDesc}</p>
		<p>
			Por ejemplo, partiendo de los datos del formulario inicial* y una vez anonimizadas las
			cantidades, {sample.name}, quien aporta inicialmente {format(sample.value)} €, tiene que pagar
			<span class="amount">
				{format(sample['Cuota mensual'])}€ / mes
			</span>
			durante <span class="amount small">{$years}</span> años para igualar la máxima aportación
			realizada por {getMaxItems($maxItems)} ({format($maxItem.value)} €).
		</p>
		<p>
			Al final de la tabla puedes añadir nuevos participantes si quieres imaginar diferentes
			escenarios.
		</p>
	</section>
	<section>
		<Filters />
		<Table />
	</section>
</main>

<style>
	.amount {
		text-align: center;
		width: 115px;
		background-color: rgb(100, 100, 100);
		color: #fff;
		max-width: 100%;
		overflow-x: auto;
		vertical-align: middle;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
		-webkit-box-shadow:
			inset 0 1px 10px rgba(0, 0, 0, 0.3),
			0 1px 0 rgba(255, 255, 255, 0.1),
			0 -1px 0 rgba(0, 0, 0, 0.5);
		-moz-box-shadow:
			inset 0 1px 10px rgba(0, 0, 0, 0.3),
			0 1px 0 rgba(255, 255, 255, 0.1),
			0 -1px 0 rgba(0, 0, 0, 0.5);
		box-shadow:
			inset 0 1px 10px rgba(0, 0, 0, 0.3),
			0 1px 0 rgba(255, 255, 255, 0.1),
			0 -1px 0 rgba(0, 0, 0, 0.5);
		white-space: pre;
		display: inline-block;
		margin: 0;
		font:
			14px / 1.625em Consolas,
			'Courier New',
			Courier,
			'Liberation Mono',
			monospace;
		padding: 0 0.5em;
	}
	.amount.small {
		width: 32px;
	}
	section {
		padding: 0 1rem;
	}
	section p {
		max-width: 50rem;
		margin-left: auto;
		margin-right: auto;
	}
	header {
		padding: 3rem 1rem 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		position: relative;
		margin-bottom: 0rem;
	}
	@media (min-width: 830px) {
		header {
			padding: 1rem 1rem;

			width: auto;
		}
	}
	h1 {
		font-size: 2.5rem;
	}
	h3 {
		font-size: 1.5rem;
	}
	h1,
	h3 {
		display: block;
		width: 100%;
		max-width: 50rem;
		margin: 0 auto;
		text-wrap: balance;
	}
	h3 {
		font-weight: lighter;
		margin-top: 0.25rem;
	}
</style>
