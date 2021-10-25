import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			username: '',
			password: '',
			weight: 0,
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	};

	onSubmit(e) {
		e.preventDefault();
		const user = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			username: this.state.username,
			password: this.state.password,
			weight: this.state.weight,
		};

		axios.post('http://localhost:5000/api/v1/users/user', user)
		.then(res => console.log(res.data))
		.catch(err => console.error(err));
		
		this.setState({
			firstname: '',
			lastname: '',
			username: '',
			password: '',
			weight: 0,
		});
	}
	render() {
		return (
			<div>
				<h3>Create New User</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>First Name: </label>
						<input type="text"
							required
							className="form-control"
							name="firstname"
							value={this.state.firstname}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<label>Last Name: </label>
						<input type="text"
							required
							className="form-control"
							name="lastname"
							value={this.state.lastname}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<label>Username: </label>
						<input type="text"
							required
							className="form-control"
							name="username"
							value={this.state.username}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<label>Password: </label>
						<input type="password"
							required
							className="form-control"
							name="password"
							value={this.state.password}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<label>Weight: </label>
						<input type="number"
							required
							className="form-control"
							name="weight"
							value={this.state.weight}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Create User" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}