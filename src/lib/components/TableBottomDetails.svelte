<script>
	import { maintenance, maxItem, months, totalValue, years } from '../../stores/stores.js';
	import { format, getMaxItems } from '../utils.js';
</script>

<div class="table-details bottom">
	<div>
		<h4>Explicación de las columnas</h4>
		<p>
			<b>Diff. maxima inversión</b>: Cantidad incial aportada menos la máxima inversión realizada ({$maxItem[
				'nombre'
			]} con {format($maxItem['inversión inicial'])} €).
		</p>
		<p>
			<b>Compensación mensual</b>: Differencia entre la maxima inversión dividido entre el número de
			meses de compensación ({$months}).
		</p>
		<p>
			<b>Cuota mensual</b>: Cuota mensual mantenimiento ({$maintenance} €) menos la Cuota de compensación
			mensual. Es la cantidad que tendría que pagar cada persona al mes durante {$years} años.
		</p>
		<hr />
	</div>
	<div class="total-money-box-father">
		<div class="total-money-box">
			<p class="total-money"><span>{format($totalValue)} €</span></p>
			<p>Presupuesto total</p>
		</div>
	</div>
</div>

<style>
	.table-section > .table-details p {
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
	hr {
		border-top: 1px solid rgb(60, 55, 25);
		margin-top: 1.3rem;
	}

	h4 {
		font-size: 1.2rem;
		display: inline-block;
		border-bottom: 1px solid rgb(225, 225, 225);
		padding-bottom: 0.25rem;
		margin: 0;
		margin-bottom: 0.5rem;
	}
	.table-details.bottom p {
		max-width: 500px;
	}
	@media (min-width: 600px) {
		.total-money-box-father {
			width: auto;
		}
		.total-money-box {
			margin: 0;
		}
		.table-details {
			flex-direction: row;
		}
	}
</style>
