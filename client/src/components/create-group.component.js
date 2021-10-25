import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groupname: '',
			users: [],
			selectedUsers: [],
			selectedUser: '',
			enddate: new Date(),
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onDate = this.onDate.bind(this)
	}

	componentDidMount() {
		axios.get("http://localhost:5000/api/v1/users/")
		.then(res => {
			if(res.data.length > 0) {
				this.setState({
					users: res.data.map(user => {
						return {_id: user._id, username: user.username}
					}),
				});
			}
		})
		.catch(err => console.log(err));
	}

	onAdd() {
		const newUser = this.state.selectedUser;
		if (newUser === "none") return;
		let index = this.state.selectedUsers.findIndex(user => user.username === newUser);
		if(index >= 0){
			return;
		}
		index = this.state.users.findIndex(user => user.username === newUser);
		const user = this.state.users[index];
		const users = [...this.state.selectedUsers];
		this.setState({selectedUsers: [...users, user]})
	}

	onDelete(userId) {
		const oldUsers = this.state.users.filter(users => users._id !== userId);
		this.setState({selectedUsers: oldUsers});
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onDate(date) {
		this.setState({enddate: date});
	}

	onSubmit(e) {
		e.preventDefault();
		const selectedUsers = this.state.selectedUsers;
		const group = {
			groupname: this.state.groupname,
			users: selectedUsers,
			enddate: this.state.enddate,
		};

		axios.post("http://localhost:5000/api/v1/groups/add", group)
		.then(res => {
			console.log(res.data)
			window.location = '/';
		})
		.catch(err => console.log(`Error: ${err}`));
	}

	render() {
		return (
			<React.Fragment>
				<h3>Group Creation</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Group Name: </label>
						<input 
							type="text"
							required
							className="form-control"
							name="groupname"
							value={this.state.groupname}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<label>Date: </label>
						<DatePicker
							selected={this.state.enddate}
							onChange={this.onDate}
						/>
					</div>
					<div className="form-group">
						<input 
							type="submit"
							className="btn btn-primary"
							value="Create Group"
						/>
					</div>
				</form>
			</React.Fragment>
		);
	}
}