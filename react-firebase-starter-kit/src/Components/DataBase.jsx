import React, { useState, useRef } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useFirestore } from '../customHooks/hooks'

const DataBase = () => {

	const [message, setMessage] = useState(false)
	const collectionRef = useRef()
	const [messageGet, setMessageGet] = useState(false)
	const collectionGetRef = useRef()
	const firstNameRef = useRef()
	const lastNameRef = useRef()
	const birthdayRef = useRef()
	const [loading, setLoading] = useState(false)
	const {addNewDoc, getDataCollection} = useFirestore()
	const [collectionData, setCollectionData] = useState()

	const handleSubmit = (e) => {
		e.preventDefault()

		const collection  = collectionRef.current.value
		const data = {
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			birthday: birthdayRef.current.value
		}

		setMessage(false)
		setLoading(true)


		try {
			addNewDoc(collection, data)
			.then((docRef) => {
				console.log('DocRef:', docRef)
				setMessage({type: 'success', message: `Your doccument ${docRef} is succesful upload`})
			})
			.catch((error) => {
				setMessage({type: 'error', message: error.message})
			}).finally(() => {
				setLoading(false)
			})
		} catch (error) {
			console.log('You just did an programming error:', error.message)
			setMessage({type: 'error', message: `You just did an programming error : ${error.message}`})
			setLoading(false)
		}

	}

	const handleGetSubmit = (e) => {
		e.preventDefault()

		const collection = collectionGetRef.current.value

		setMessageGet('')
		setLoading(true)
		setCollectionData(false)

		getDataCollection(collection)
		.then((docs) => {
			setCollectionData(docs)
			setMessageGet({type: 'success', message: 'Your collection is succesfully download'})
		})
		.catch((error) => {
			setMessageGet({type: 'error', message: error.message})
		}).finally(() => {setLoading(false)})

	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Add</h2>
					{message && <Alert variant={message.type === 'error' ? "danger" : 'success'}>{message.message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="collection">
							<Form.Label>Collection</Form.Label>
							<Form.Control type="text" ref={collectionRef} required/>
						</Form.Group>
						<Form.Group id="first-name">
							<Form.Label>FirstName</Form.Label>
							<Form.Control type="text" ref={firstNameRef}/>
						</Form.Group>
						<Form.Group id="last-name">
							<Form.Label>LastName</Form.Label>
							<Form.Control type="text" ref={lastNameRef}/>
						</Form.Group>
						<Form.Group id="birthday">
							<Form.Label>Birthday</Form.Label>
							<Form.Control type="date" ref={birthdayRef}/>
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">Add</Button>
					</Form>
				</Card.Body>
			</Card>
			<Card>
			<Card.Body>
				<h2 className="text-center mb-4">Get</h2>
				{messageGet && <Alert variant={messageGet.type === 'error' ? "danger" : 'success'}>{messageGet.message}</Alert>}
				<Form onSubmit={handleGetSubmit}>
					<Form.Group id="collectionGet">
						<Form.Label>Collection</Form.Label>
						<Form.Control type="text" ref={collectionGetRef} required/>
					</Form.Group>
					<Button disabled={loading} className="w-100" type="submit">Get</Button>
				</Form>
				{collectionData && (
					<div>
						{collectionData.map( (doc,i) => (
							<div key={doc.id} style={{border: '1px solid black', padding: '8px'}}> 
							<h2 style={{fontSize: '21px', textAlign: 'center'}}>{doc.id}</h2>
							{
								Object.keys(doc.data).map((key,j) => (
									<p key={`${doc.id}-${key}`}>{key} : {doc.data[key]}</p>
									
								))
							}
							</div>
						))}
					</div>
				)}
			</Card.Body>
		</Card>
	</>
	);
};

export default DataBase;