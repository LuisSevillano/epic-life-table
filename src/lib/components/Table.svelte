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
	} from '../../stores/stores.js';
	import { randomNames } from '../data.js';
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
		}
	}
	function removeRow(index) {
		$defaultData.splice(index, 1);
		$defaultData = $defaultData;
	}

	function format(n) {
		if (n !== undefined) {
			return n.toLocaleString('es-AR', {
				minimumFractionDigits: 0,
				maximumFractionDigits: 1
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

		let sortModifier = sortBy.ascending ? 1 : -1;

		let sort = (a, b) =>
			a[column] < b[column] ? -1 * sortModifier : a[column] > b[column] ? 1 * sortModifier : 0;

		$data = $data.sort(sort);
	};
</script>

<div class="table-wrapper">
	<div class="table-details top">
		<p>
			* La máxima aportación la realiza {$maxItem['nombre']} con {format(
				$maxItem['inversión inicial']
			)} €
		</p>
	</div>
	<table>
		<thead>
			<tr>
				{#each cols as colHeader}
					<th on:click={sort(colHeader)}>{colHeader}</th>
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
						<Icon name={'subtract'} on:click={() => removeRow(index)} />
					</td>
				</tr>
			{/each}
			<tr style="color: grey" class="new-row">
				{#each newRow as column, index}
					{#if index === 2}
						<td class="cell-editable" style="cursor:pointer">
							<div>
								<input type="number" name="" id="" placeholder={column} bind:value={column} />
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
			<h4>Explicación columnas</h4>
		<p>
			<b>Diff. maxima inversión</b>: Cantidad incial aportada menos la máxima inversión realizada ({$maxItem['nombre']} con {format($maxItem['inversión inicial'])} €).
		</p>
		<p>
			<b>Compensación mensual</b>: Differencia entre la maxima inversión dividido entre el número de meses de
			compensación ({$months}).
		</p>
		<p>
			<b>Cuota mensual</b>: Cuota mensual mantenimiento ({$maintenance} €) menos la Cuota de compensación mensual. Es la cantidad que tendría que pagar cada persona al mes durante {$years} años.
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

	td div {
		max-height: 50px;
	}
	h4 {
		font-size: 1.2rem;
		display: inline-block;
		border-bottom: 1px solid rgb(225, 225, 225);
		padding-bottom: 0.5rem;
		margin: 0;
		margin-bottom: 0.5rem;
	}
	.table-wrapper {
		max-width: 70rem;
		margin: 0 auto;
		overflow-x: clip;
		position: relative;
	}
	thead tr {
		background-color: #2f3032;
		text-transform: uppercase;
		border-bottom-width: 1px;
		border-color: rgb(99, 105, 114);
	}
	thead tr th {
		font-weight: lighter;
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
		padding-left: 0.15rem;
		padding-right: 0.15rem;
		text-align: left;
	}
	@media (min-width: 600px) {
		th,
		td {
			padding-top: 1rem;
			padding-bottom: 1rem;
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}
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
		position: -webkit-sticky;
		top: 0;
	}
	.new-row:hover {
		outline: 1px solid rgba(255, 255, 255, 0.2);
	}
	.cell-editable {
		animation: all;
		animation-duration: 0s;
		animation-name: slidein;
		outline: 0px solid rgba(255, 255, 255, 0.5);
	}
	.total-money-box-father {
		display: flex;
		justify-content: flex-end;
	}
	.total-money {
		font-size: 3rem;
	}
	.total-money-box p {
		margin: 1rem;
	}
	.total-money-box {
		display: flex;
		flex-direction: column;
		text-align: right;
		padding: 1.5rem;
		border: 1px solid rgb(80, 80, 80);
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
	}
	.total-money-box span {
	}
	.total-money-box p {
		display: inline-block;
	}
	.table-details p {
		margin-bottom: 0;
		max-width: 500px;
	}
	.table-details {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
	}
	.table-details.top {
		margin: 1rem 0;
	}
</style>
