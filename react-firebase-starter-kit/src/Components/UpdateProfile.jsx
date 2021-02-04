import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { Link } from 'react-router-dom'

const UpdateProfile = () => {

	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [messageMail, setMessageMail] = useState(false)
	const [messagePassword, setMessagePassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const { currentUser, updateEmail, updatePassword } = useAuth()

	const handleSubmitMail = (e) => {
		e.preventDefault()

		const email = emailRef.current.value

		setMessageMail(false)
		setLoading(true)

		if (email !== currentUser.email) {
			updateEmail(email)
			.then(() => {
				setMessageMail({type: 'success', message: 'Your email is modified'})
			})
			.catch((error) => {
				setMessageMail({type: 'error', message: error.message})
			})
		}
		setLoading(false)
	}

	const handleSubmitPassword = (e) => {
		e.preventDefault()

		const password = passwordRef.current.value
		const confirmPassword = passwordConfirmRef.current.value

		setMessagePassword(false)
		setLoading(true)

		if (password !== confirmPassword) {
			return setMessagePassword({type: 'error', message: 'Password do not match'})
		}

		if (password !== '') {
			updatePassword(password)
			.then(() => {
				setMessagePassword({type: 'success', message: 'Your password is modified'})
			})
			.catch((error) => {
				setMessagePassword({type: 'error', message: error.message})
			})
		}
		setLoading(false)
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Update Profile</h2>
					<Form onSubmit={handleSubmitMail}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} defaultValue={currentUser.email}/>
						</Form.Group>
						{messageMail && <Alert variant={messageMail.type === 'error' ? "danger" : 'success'}>{messageMail.message}</Alert>}
						<Button disabled={loading} className="w-100" type="submit">Update Mail</Button>
					</Form>
					<Form onSubmit={handleSubmitPassword}>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/>
						</Form.Group>
						{messagePassword && <Alert variant={messagePassword.type === 'error' ? "danger" : 'success'}>{messagePassword.message}</Alert>}
						<Button disabled={loading} className="w-100" type="submit">Update Password</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Link to='/'>Back Home</Link>
			</div>	
		</>
	);
};

export default UpdateProfile