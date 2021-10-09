import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
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
		axios.get("http://localhost:5000/api/v1/users/")
		.then(res => {
			if(res.data.length > 0) {
				this.setState({
					users: res.data.map(user => user.username),
					username: res.data[0].username,
				})
			}
		})
		.catch(err => console.log(err));
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

		axios.post('http://localhost:5000/api/v1/exercises/add', exercise)
		.then(res => {
			console.log(res.data)
			window.location = '/';
		});
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
							name="username"
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
					<div className="form-group">
						<input type="submit" value="Create Exercise Log" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}