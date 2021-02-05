import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth, useCurrentUser, useFirestore } from '../customHooks/hooks'
import { Link } from 'react-router-dom'

const UpdateProfile = () => {

	const emailRef = useRef()
	const firstNameRef = useRef()
	const lastNameRef = useRef()
	const birthdayRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [messageMail, setMessageMail] = useState(false)
	const [messageData, setMessageData] = useState(false)
	const [messagePassword, setMessagePassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const { updateEmail, updatePassword } = useAuth()
	const { updateUser, setUser } = useFirestore()
	const currentUser = useCurrentUser()

	const handleSubmitMail = (e) => {
		e.preventDefault()

		const email = emailRef.current.value

		setMessageMail(false)
		setLoading(true)

		if (email !== currentUser.auth.email) {
			updateEmail(currentUser.auth, email)
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
			updatePassword(currentUser.auth, password)
			.then(() => {
				setMessagePassword({type: 'success', message: 'Your password is modified'})
			})
			.catch((error) => {
				setMessagePassword({type: 'error', message: error.message})
			})
		}
		setLoading(false)
	}

	const handleSubmitData = (e) => {
		e.preventDefault()

		setMessageData(false)
		setLoading(true)

		if (currentUser.data) {
			updateUser(currentUser.auth.id, {
				firstName: firstNameRef.current.value,
				lastName: lastNameRef.current.value,
				birthday: birthdayRef.current.value
			}).then(() => {
				setMessageData({type: 'success', message: 'Your data is succesfull update'})
			}).catch((error) => {
				setMessageData({type: 'error', message: error.message})
			}).finally(() => {
				setLoading(false)
			})
		} else {
			setUser(currentUser.auth.uid, {
				firstName: firstNameRef.current.value,
				lastName: lastNameRef.current.value,
				birthday: birthdayRef.current.value
			}).then(() => {
				setMessageData({type: 'success', message: 'Your data is succesfull created'})
			}).catch((error) => {
				setMessageData({type: 'error', message: error.message})
			}).finally(() => {
				setLoading(false)
			})
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Update Auth</h2>
					<Form onSubmit={handleSubmitMail}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} defaultValue={currentUser.auth.email}/>
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
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Update Data</h2>
					<Form onSubmit={handleSubmitData}>
						{messageData && <Alert variant={messageData.type === 'error' ? "danger" : 'success'}>{messageData.message}</Alert>}
						<Form.Group id="firstName">
							<Form.Label>FirstName</Form.Label>
							<Form.Control type="text" ref={firstNameRef} defaultValue={currentUser.data ? currentUser.data.firstName : ''}/>
						</Form.Group>
						<Form.Group id="lastName">
							<Form.Label>LastName</Form.Label>
							<Form.Control type="text" ref={lastNameRef} defaultValue={currentUser.data ? currentUser.data.lastName : ''}/>
						</Form.Group>
						<Form.Group id="birthday">
							<Form.Label>birthday</Form.Label>
							<Form.Control type="date" ref={birthdayRef} defaultValue={currentUser.data ? currentUser.data.birthday : ''}/>
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">Update Data</Button>
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