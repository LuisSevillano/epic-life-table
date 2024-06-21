<script>
	import Icon from '../ui/Icon.svelte';
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
	} from '../../stores/stores.js';
	import { randomNames } from '../data.js';
	import { format, getMaxItems } from '../utils.js';
	const cols = [
		'id',
		'nombre',
		'inversión inicial',
		'Diff. maxima inversión',
		'Compensación mensual',
		'Cuota mensual',
		'Total invertido'
	];
	let newRow = [...cols];
	let value = '';
	let submittedValue = null;

	$: console.log(value);

	function getRandomName() {
		return randomNames[Math.floor(Math.random() * randomNames.length)];
	}

	function getNewRow(incomingData) {
		let value = 0;
		try {
			value = parseFloat(incomingData[2]);
		} catch (error) {}
		const newMax = Math.max($max, value);
		const diff = value - newMax;
		const compensacionMensual = diff / months;
		const cuotaMensualTotal = $maintenance - compensacionMensual;
		const total = value + cuotaMensualTotal * months;
		const i = $data.length;
		const nombre = getRandomName();
		return {
			id: i + 1,
			nombre,
			'inversión inicial': value,
			value,
			name: nombre,
			'Diff. maxima inversión': diff,
			'Compensación mensual': compensacionMensual,
			'Cuota mensual': cuotaMensualTotal,
			'Total invertido': total
		};
	}

	function addRow() {
		let value = parseFloat(newRow[2]);
		if (!isNaN(value)) {
			$defaultData = [...$defaultData, getNewRow(newRow)];
			newRow = [...cols];
			submittedValue = null;
		}
	}

	function removeRow(row) {
		const index = $defaultData.findIndex((d) => d.nombre === row.nombre);
		$defaultData.splice(index, 1);
		$defaultData = $defaultData;
	}

	function sort(column) {
		if ($sortBy !== undefined) {
			if ($sortBy.col === column) {
				$sortBy = { col: column, ascending: !$sortBy.ascending };
			} else {
				$sortBy = { col: column, ascending: false };
			}
		} else {
			$sortBy = { col: column, ascending: false };
		}
	}

	$: submittedValue, addRow();
</script>

<div class="table-wrapper">
	<div class="table-details top">
		<p>A continuación puedes ver una tabla con las cantidades recogidas en el primer GoogleForm.</p>
		<p>
			<small>
				{#if $maxItems.length > 1}
					* Las máximas aportaciones las realizan {getMaxItems($maxItems)} con {format(
						$maxItem['inversión inicial']
					)} €
				{:else}
					* La máxima aportación la realiza {$maxItem['nombre']} con {format(
						$maxItem['inversión inicial']
					)} €
				{/if}
			</small>
		</p>
	</div>
	<div class="arrow">
		<div class="pagination-arrow move">→</div>
	</div>
	<table>
		<thead>
			<tr>
				{#each cols as colHeader}
					<th on:click={() => sort(colHeader)}>{colHeader}</th>
				{/each}
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each $data as person, index}
				<tr>
					{#each cols as colName, j}
						{#if j === 0}
							<td>{$data[index][colName]}</td>
						{:else}
							<td>{format($data[index][colName])}</td>
						{/if}
					{/each}
					<td class="icon-cell">
						<Icon name={'subtract'} on:click={() => removeRow($data[index])} />
					</td>
				</tr>
			{/each}
			<tr style="color: grey" class="new-row">
				{#each newRow as column, index}
					{#if index === 2}
						<td class="cell-editable" style="cursor:pointer">
							<div>
								<form on:submit|preventDefault={() => (submittedValue = value)}>
									<input type="number" placeholder={column} bind:value={column} />
								</form>
							</div>
						</td>
					{:else}
						<td>
							<div>
								{column}
							</div>
						</td>
					{/if}
				{/each}
				<td class="icon-cell">
					<Icon name={'add'} on:click={addRow} />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="table-details">
		<div>
			<h4>Explicación de las columnas</h4>
			<p>
				<b>Diff. maxima inversión</b>: Cantidad incial aportada menos la máxima inversión realizada
				({$maxItem['nombre']} con {format($maxItem['inversión inicial'])} €).
			</p>
			<p>
				<b>Compensación mensual</b>: Differencia entre la maxima inversión dividido entre el número
				de meses de compensación ({$months}).
			</p>
			<p>
				<b>Cuota mensual</b>: Cuota mensual mantenimiento ({$maintenance} €) menos la Cuota de compensación
				mensual. Es la cantidad que tendría que pagar cada persona al mes durante {$years} años.
			</p>
			<hr />
			<p>
				* <small
					>Estos datos vienen del GoogleForm. que rellenamos la semana del 17 de junio de 2017. Se
					han anonimizado los datos.</small
				>
			</p>
		</div>
		<div class="total-money-box-father">
			<div class="total-money-box">
				<p class="total-money"><span>{format($totalValue)} €</span></p>
				<p>Presupuesto total</p>
			</div>
		</div>
	</div>
</div>

<style>
	hr {
		border-top: 1px solid rgb(60, 55, 25);
		margin-top: 1.3rem;
	}
	input[type='number'] {
		color: white;
		background-color: rgb(55 65 81 / 1);
		padding: 0.4rem 0.2rem;
		line-height: 1.25rem;
		border-width: 1px;
		border-radius: 5px;
		outline: none;
		max-width: 145px;
	}
	th:first-child,
	td:first-child {
		display: none;
	}
	td div {
		max-height: 50px;
	}
	h4 {
		font-size: 1.2rem;
		display: inline-block;
		border-bottom: 1px solid rgb(225, 225, 225);
		padding-bottom: 0.25rem;
		margin: 0;
		margin-bottom: 0.5rem;
	}
	.table-wrapper {
		max-width: 70rem;
		margin: 0 auto;
		overflow: auto;
		height: 80vh;
		position: relative;
		padding: 0 1rem;
	}
	thead tr {
		background-color: #2f3032;
		text-transform: uppercase;
		border-bottom-width: 1px;
		border-color: rgb(99, 105, 114);
	}
	thead tr th {
		font-weight: lighter;
		cursor: pointer;
		vertical-align: bottom;
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
		margin-bottom: 1rem;
	}
	th:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-bottom: 1px solid rgb(99, 105, 114);
	}
	th {
		cursor: pointer;
	}
	td,
	th {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		padding-left: 0.25rem;
		padding-right: 0.25rem;
		text-align: left;
	}

	/* td {
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 210px;
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	} */

	thead tr:first-child {
		position: sticky;
		top: 0;
	}
	.new-row:hover {
	}
	.cell-editable {
		animation: all;
		animation-duration: 0s;
		animation-name: slidein;
		outline: 0px solid rgba(255, 255, 255, 0.5);
	}
	.total-money-box-father {
		width: 100%;
	}
	.total-money {
		font-size: 3rem;
	}
	.total-money-box p {
		margin: 0rem;
	}
	.total-money-box {
		display: flex;
		flex-direction: column;
		text-align: right;
		padding: 1.5rem;
		border: 1px solid rgb(80, 80, 80);
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
		margin: 1.5rem 0;
	}
	.total-money-box p {
		display: inline-block;
	}
	.table-wrapper > .table-details p {
		max-width: none;
	}
	.table-details p {
		max-width: 500px;
	}
	.table-details {
		max-width: 50rem;
		margin-left: auto;
		margin-right: auto;
		gap: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		flex-direction: column-reverse;
	}
	.table-details.top {
		margin: 1rem 0;
	}
	@media (min-width: 600px) {
		.total-money-box-father {
			width: auto;
		}
		.table-wrapper {
			height: auto;
			overflow: visible;
		}
		.arrow {
			display: flex;
		}
		.total-money-box {
			margin: 0;
		}
		.table-details {
			flex-direction: row;
		}
		th,
		td {
			padding-top: 1rem;
			padding-bottom: 1rem;
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}
		.table-details p {
			margin-bottom: 0;
		}
	}
	.arrow {
		display: none;
		align-items: center;
		align-content: center;
		justify-content: center;
		background: #2f3032;
		padding: 1rem;
		width: 10px;
		height: 10px;
		position: absolute;
		z-index: 1;
	}
	.pagination-arrow {
		width: 20px;
		height: 20px;
		z-index: 1;
		margin-right: 5px;
	}
	.move {
		animation: move 1s infinite;
	}
	@keyframes move {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(5px);
		}
	}
</style>
