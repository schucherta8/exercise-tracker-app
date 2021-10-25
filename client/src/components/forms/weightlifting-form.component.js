import React from 'react';

const WeightLiftingForm = props => (
	<React.Fragment>
		<div className="form-group">
			<label>Weight: </label>
			<input
				type="number"
				name="weight"
				required
				className="form-control"
				value={props.weight}
				onChange={props.onChange} />
		</div>
		<div className="form-group">
			<label>Reps: </label>
			<input
				type="number"
				name="reps"
				required
				className="form-control"
				value={props.reps}
				onChange={props.onChange} />
		</div>
		<div className="form-group">
			<label>Sets: </label>
			<input
				type="number"
				name="sets"
				required
				className="form-control"
				value={props.sets}
				onChange={props.onChange} />
		</div>
	</React.Fragment>
);

export default WeightLiftingForm;
