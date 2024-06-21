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
</script>

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
<div class="table-wrapper">
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
</div>

<style>
	.table-wrapper {
		overflow: auto;
		height: 80vh;
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

	.cell-editable {
		animation: all;
		animation-duration: 0s;
		animation-name: slidein;
		outline: 0px solid rgba(255, 255, 255, 0.5);
	}
	@media (min-width: 600px) {
		th,
		td {
			padding-top: 1rem;
			padding-bottom: 1rem;
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}
		.table-wrapper {
			height: auto;
			overflow: visible;
		}
	}
</style>
