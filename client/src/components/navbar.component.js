function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">Exercise Tracker</a>
				<div className="collpase navbar-collapse">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="navbar-item">
							<a className="nav-link active" aria-current="page" href="/">All User Activities</a>
						</li>
						<li className="navbar-item">
							<a className="nav-link active" href="/activity">Create Activity</a>
						</li>
						<li className="navbar-item">
							<a className="nav-link active" href="/user">Create User</a>
						</li>
						<li className="navbar-item">
							<a className="nav-link active" href="/group">Create Group</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;