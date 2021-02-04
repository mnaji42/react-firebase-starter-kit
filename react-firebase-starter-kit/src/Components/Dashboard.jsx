import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const Dashboard = () => {

	const [error, setError] = useState()
	const { currentUser, logout } = useAuth()
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
					<strong>email :</strong> {currentUser.email}
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