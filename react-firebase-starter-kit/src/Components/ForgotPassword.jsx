import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ForgotPassword = () => {

	const emailRef = useRef()
	const [error, setError] = useState('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const { resetPassword } = useAuth()

	const handleSubmit = (e) => {
		e.preventDefault()

		const email = emailRef.current.value

		setError('')
		setMessage('')
		setLoading(true)
		resetPassword(email)
		.then(
			setMessage('Check your inbox for further instructions')
		)
		.catch( error => {
			setError(error.message)
		})
		setLoading(false)
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Forgot Password ?</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required/>
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">Send Email</Button>
					</Form>
					<div className="w-100 text-center mt-2">
						<Link to='/login'>Login</Link>
					</div>	
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				You do not have an account ? <Link to='/signup'>Sign Up</Link>
			</div>	
		</>
	);
};

export default ForgotPassword