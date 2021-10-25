const WeightLiftingModal = props => (
	<table>
		<thead>
			<th>Weight</th>
			<th>Sets</th>
			<th>Reps</th>
		</thead>
		<tbody>
			<tr>
				<td>{props.weight}</td>
				<td>{props.sets}</td>
				<td>{props.reps}</td>
			</tr>
		</tbody>
	</table>
);

export default WeightLiftingModal;