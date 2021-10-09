import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			description: '',
			duration: 0,
			date: new Date(),
			users: [],
		};
		this.onChange = this.onChange.bind(this);
		this.onDate = this.onDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			users: ['test user'],
			username: 'test user',
		});
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onDate(date) {
		this.setState({date: date});
	}

	onSubmit(e) {
		e.preventDefault();

		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date,
		};
		//Submit Exercise to database
		window.location = '/';
	}
	render() {
		return (
			<div>
				<h3>Create New Exercise</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<select 
							ref="userInput"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChange}>
							{
								this.state.users.map(user => 
								<option
									key={user}
									value={user}>
									{user}
								</option>)
							}	
						</select>
					</div>
					<div className="form-group">
						<label>Description: </label>
						<input
							type="text"
							name="description"
							required
							className="form-control"
							value={this.state.description}
							onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Duration (in minutes): </label>
						<input
							type="text"
							name="duration"
							required
							className="form-control"
							value={this.state.duration}
							onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Date: </label>
						<DatePicker
							selected={this.state.date}
							onChange={this.onDate}
						/>
					</div>

					<button 
						type="submit" 
						className="btn btn-primary">
					Create Exercise Log
					</button>
				</form>
			</div>
		)
	}
}