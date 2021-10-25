import React from 'react';

const CardioForm = props => (
	<React.Fragment>
		<div className="form-group">
			<label>Duration (in minutes): </label>
			<input
				type="text"
				name="duration"
				required
				className="form-control"
				value={props.duration}
				onChange={props.onChange} />
		</div>
		<div className="form-group">
			<label>Distance (miles): </label>
			<input
				type="number"
				name="distance"
				required
				className="form-control"
				value={props.distance}
				onChange={props.onChange} />
		</div>
	</React.Fragment>
);

export default CardioForm;