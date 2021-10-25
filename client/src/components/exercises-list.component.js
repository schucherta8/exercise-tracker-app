import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoreInfoModal from './modals/more-info-modal.component';
import axios from 'axios';


const Activity = props => (
	<tr>
		<td>{props.activity.username}</td>
		<td>{props.activity.name}</td>
		<td>{props.activity.description}</td>
		<td>{props.activity.date.substring(0,10)}</td>
		<td>
			<Link to={"/edit/"+props.activity._id}>edit</Link> | 
			<button className="btn btn-primary" onClick={() => 
				{props.deleteActivity(props.activity._id)}}>Delete</button>
				{" "}
			<button 
				type="button" 
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#moreInfoModal">More Info</button>
			<MoreInfoModal exercise={props.activity.exercise} />
			{/* <a href="#" onClick={() => 
				{props.deleteActivity(props.exercise._id)}}>Delete</a> */}
		</td>
	</tr>
);

export default class ExercisesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: [],
		};
		this.deleteActivity = this.deleteActivity.bind(this);
	}

	componentDidMount() {
		axios.get("http://localhost:5000/api/v1/activities/")
		.then(res => {
			this.setState({activities: res.data});
		})
		.catch(err => console.log(err));
	}

	deleteActivity(id) {
		axios.delete("http://localhost:5000/api/v1/activities/activity/"+id)
		.then(res => {
			console.log(res.data);
		})
		.catch(err => console.log(err));

		this.setState({
			activities: this.state.activities.filter(activity => 
			activity._id !== id)
		});
	}
	
	exerciseList() {
		return
	}

	render() {
		return (
			<div>
				<h3>All Activities</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Activity Name</th>
							<th>Description</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.activities.map(activity => 
							<Activity 
								activity={activity} 
								deleteActivity={this.deleteActivity}
								key={activity._id}
							/>)
						}
					</tbody>
				</table>
			</div>
		)
	}
}