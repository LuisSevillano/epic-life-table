<script>
	import Filters from '../lib/components/Filters.svelte';
	import Table from '../lib/components/Table.svelte';
	import { siteTitle, siteDescription, siteLongDesc } from '$lib/config';
</script>

<main>
	<header>
		<h1>{siteTitle}</h1>
	</header>
	<section>
		<p>{@html siteLongDesc}</p>
	</section>
	<section>
		<Filters />
		<Table />
	</section>
</main>

<style>
	section p {
		max-width: 50rem;
		line-height: 1.3rem;
		margin: 0 auto;
		padding: 0 1rem;
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
	}
	h3 {
		font-weight: lighter;
		margin-top: 0.25rem;
	}
</style>
