const CardioModal = props => (
	<table>
		<thead>
			<tr>
				<th>Duration</th>
				<th>Distance</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{props.exercise.duration}</td>
				<td>{props.exercise.distance}</td>
			</tr>
		</tbody>
	</table>
);

export default CardioModal;