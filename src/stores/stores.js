import { writable, derived } from 'svelte/store';
import { members } from '../lib/data.js';

export const years = writable(6);
export const months = derived(years, ($years) => $years * 12);
export const maintenance = writable(5);
export const defaultData = writable(members);

export const max = derived(defaultData, ($defaultData) =>
	Math.max(...$defaultData.map((d) => d['inversión inicial']))
);
export const sortBy = writable();
const sorting = derived(sortBy, ($sortBy) => {
	if ($sortBy === undefined) return;
	let sortModifier = $sortBy.ascending ? 1 : -1;
	return function (a, b) {
		return a[$sortBy.col] < b[$sortBy.col]
			? -1 * sortModifier
			: a[$sortBy.col] > b[$sortBy.col]
				? 1 * sortModifier
				: 0;
	};
});

export const data = derived(
	[maintenance, max, months, defaultData, sorting],
	([$maintenance, $max, $months, $defaultData, $sorting]) => {
		return $defaultData
			.map((d, i) => {
				const value = d['inversión inicial'];
				const diff = value - $max;
				const compensacionMensual = diff / $months;
				const cuotaMensualTotal = $maintenance - compensacionMensual;
				const total = value + cuotaMensualTotal * $months;
				const output = {
					id: i + 1,
					nombre: d.nombre,
					'inversión inicial': value,
					value,
					name: d.nombre,
					'Diff. maxima inversión': diff,
					'Compensación mensual': compensacionMensual,
					'Cuota mensual': cuotaMensualTotal,
					'Total invertido': total
				};

				return output;
			})
			.sort($sorting);
	}
);

export const totalValue = derived(data, ($data) =>
	$data.reduce((partialSum, a) => partialSum + a['inversión inicial'], 0)
);
export const maxItemIndex = derived([data, max], ([$data, $max]) =>
	$data.map((d) => d['inversión inicial']).indexOf($max)
);
export const maxItem = derived(
	[data, maxItemIndex],
	([$data, $maxItemIndex]) => $data[$maxItemIndex]
);

export const maxItems = derived([data, max], ([$data, $max]) =>
	$data.filter((d) => d.value === $max)
);

export const anualSave = derived(
	data,
	($data) => $data.reduce((partialSum, a) => partialSum + a['Cuota mensual'], 0) * 12
);
