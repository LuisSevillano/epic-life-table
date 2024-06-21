<script>
	import CollapsibleSection from '../ui/CollapsibleSection.svelte';
	import Table from './Table.svelte';
	import TableBottomDetails from './TableBottomDetails.svelte';
</script>

<CollapsibleSection headerText={'Mostrar tabla'}>
	<Table />
	<TableBottomDetails />
</CollapsibleSection>

<style>
</style>
