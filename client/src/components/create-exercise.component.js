import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import ExerciseForm from './forms/exercise-form.component';

import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			name: '',
			description: '',
			type: 'CARDIO',
			distance: 0,
			duration: 0,
			weight: 0,
			reps: 0,
			sets: 0,
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
					users: res.data,
					userId: res.data[0]._id,
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
		let exercise;
		if(this.state.type === 'CARDIO') {
			exercise = {
				distance: this.state.distance,
				duration: this.state.duration,
			}
		} else {
			exercise = {
				weight: this.state.weight,
				reps: this.state.reps,
				sets: this.state.sets,
			}
		}
		Object.assign(exercise, {type: this.state.type});
		const activity = {
			_id: this.state.userId,
			name: this.state.name,
			description: this.state.description,
			exercise: exercise,
			date: this.state.date,
		};
		axios.post('http://localhost:5000/api/v1/activities/activity', activity)
		.then(res => {
			console.log(res.data)
			window.location = '/';
		});
	}
	render() {
		return (
			<div>
				<h3>Create New Activity</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						{/* <select 
							required
							className="form-control"
							name="userId"
							value={this.state.userId}
							onChange={this.onChange}>
							{
								this.state.users.map(user => 
								<option
									key={user._id}
									value={user._id}>
									{user.username}
								</option>)
							}	
						</select> */}
						<input className="form-control"
							list="users-list-options" 
							id="user-data-list" 
							name="userId"
							onChange={this.onChange}
							placeholder="Type to search..." />
						<datalist id="users-list-options">
						{
							this.state.users.map(user => 
							<option
								key={user._id}
								value={user._id}>
								{user.username}
							</option>)
						}
						</datalist>
					</div>
					<div className="form-group">
						<label>Activity Name: </label>
						<input
							type="text"
							name="name"
							required
							className="form-control"
							value={this.state.name}
							onChange={this.onChange} />
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
						<label>Type: </label>
						<select
							required
							className="form-control"
							name="type"
							value={this.state.type}
							onChange={this.onChange}>
							<option
									key={0}
									value={"CARDIO"}>
									{"Cardio"}
							</option>
							<option
									key={1}
									value={"WEIGHTLIFTING"}>
									{"Weightlifting"}
							</option>
						</select>
					</div>
					<ExerciseForm 
						duration={this.state.duration}
						distance={this.state.distance}
						weight={this.state.weight}
						reps={this.state.reps}
						sets={this.state.sets}
						type={this.state.type}
						onChange={this.onChange} />
					<div className="form-group">
						<label>Date: </label>
						<DatePicker
							selected={this.state.date}
							onChange={this.onDate}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Create Activity Log" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}