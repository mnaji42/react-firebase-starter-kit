import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Login = () => {

	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const { login } = useAuth()
	const history = useHistory()

	function handleSubmit(e) {
		e.preventDefault()

		const email = emailRef.current.value
		const password = passwordRef.current.value

		setError('')
		setLoading(true)
		login(email, password)
		.then( user => {
			history.push('/')
		})
		.catch( error => {
			setError(error.message)
		})
		setLoading(false)
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Log In</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required/>
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">Log In</Button>
					</Form>
					<div className="w-100 text-center mt-2">
						<Link to='/forgot-password'>Forgot Password?</Link>
					</div>	
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				You do not have an account ? <Link to='/signup'>Sign Up</Link>
			</div>	
		</>
	);
};

export default Login;