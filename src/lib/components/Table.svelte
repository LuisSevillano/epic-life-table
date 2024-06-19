<script>
	import { years, maintenance } from '../../stores/stores.js';
	import { members } from '../data.js';
	const cols = [
		'id',
		'nombre',
		'inversión inicial',
		'Diferencia con respecto a la máxima inversión',
		'Cuota de compensación mensual',
		'Cuota mensual total',
		'Total invertido'
	];
	const max = Math.max(...members.map((d) => d['inversión inicial']));
	const maxItemIndex = members.map((d) => d['inversión inicial']).indexOf(max);
	const maxItem = members[maxItemIndex];

	$: months = $years * 12;

	$: data = members.map((d, i) => {
		const value = d['inversión inicial'];
		const diff = value - max;
		const compensacionMensual = diff / months;
		const cuotaMensualTotal = $maintenance - compensacionMensual;
		const total = value + cuotaMensualTotal * months;
		return {
			id: i + 1,
			nombre: d.nombre,
			'inversión inicial': value,
			value,
			name: d.nombre,
			'Diferencia con respecto a la máxima inversión': diff,
			'Cuota de compensación mensual': compensacionMensual,
			'Cuota mensual total': cuotaMensualTotal,
			'Total invertido': total
		};
	});

	function format(n) {
		if (n !== undefined) {
			return n.toLocaleString('pt-PT', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			});
		}
	}
	let sortBy = { col: 'id', ascending: true };
	$: sort = (column) => {
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}

		// Modifier to sorting function for ascending or descending
		let sortModifier = sortBy.ascending ? 1 : -1;

		let sort = (a, b) =>
			a[column] < b[column] ? -1 * sortModifier : a[column] > b[column] ? 1 * sortModifier : 0;

		data = data.sort(sort);
	};
</script>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				{#each cols as colHeader}
					<th on:click={sort(colHeader)}>{colHeader}</th>
				{/each}</tr
			>
		</thead>
		<tbody>
			{#each data as person, index}
				<tr>
					{#each cols as colName, j}
						{#if j === 0}
							<td>{data[index][colName]}</td>
						{:else}
							<td>{format(data[index][colName])}</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="table-details">
		<p>* La máxima aportación la realiza {maxItem.name} con {maxItem.value} €</p>
		<h4>Explicación columnas</h4>
		<p>
			<b>Diferencia con respecto a la máxima inversión</b>: Cantidad aportada menos la máxima
			inversión
		</p>
		<p>
			<b>Cuota de compensación mensual</b>: Diferencia con respecto a la máxima inversión dividido
			entre el número de meses de compensación
		</p>
		<p>
			<b>Cuota mensual total</b>: Cuota mensual mantenimiento ({$maintenance}€) menos la Cuota de
			compensación mensual
		</p>
	</div>
</div>

<!-- markup (zero or more items) goes here -->

<style>
	h4 {
		display: inline-block;
		border-bottom: 1px solid rgb(225, 225, 225);
		padding-bottom: 0.5rem;
		margin: 0;
	}
	.table-wrapper {
		max-width: 70rem;
		margin: 0 auto;
	}
	thead tr {
		background-color: #2f3032;
		text-transform: uppercase;
		font-weight: bold;
		border-bottom-width: 1px;
		border-color: rgb(99, 105, 114);
	}
	tbody tr:nth-child(odd) {
		background-color: #2f3032;
	}
	table {
		text-align: left;
		width: 100%;
		text-indent: 0px;
		border-color: inherit;
		border-collapse: collapse;
	}
	th {
		cursor: pointer;
	}
	td,
	th {
		padding-top: 1rem;
		padding-bottom: 1rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}
	tr {
		/* border-bottom-width: 1px;
		border-color: rgb(99, 105, 114) */
	}
</style>
