import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth, useCurrentUser } from '../customHooks/hooks'
import { Link, useHistory } from 'react-router-dom'

const Dashboard = () => {

	const [error, setError] = useState()
	const currentUser = useCurrentUser()
	const { logout } = useAuth()
	const history = useHistory()

	const handleLogOut = () => {
		setError('')

		logout()
		.then(
			history.push('/')
		)
		.catch( error => {
			setError(error.message)
		})
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="w-100 text-center mb-4">Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<strong>email :</strong> {currentUser.auth.email}
					<p>
						{currentUser.data ? (
							<>
								<strong>first name: </strong>{currentUser.data.firstName}<br/>
								<strong>last name:</strong> {currentUser.data.lastName}<br/>
								<strong>birthday:</strong> {currentUser.data.birthday}<br/>
							</>
							):
							 "You don't have data, update your profile to add them"
						}
					</p>
					<Link to='/update-profile' className="btn btn-primary w-100">Updtate Profile</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogOut}>Log Out</Button>
			</div>
		</>
	);
};

export default Dashboard;