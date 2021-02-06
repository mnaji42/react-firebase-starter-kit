import React, { createContext, useState, useEffect} from 'react'
import { auth, firestore } from '../firebase/firebase'

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {

	const [userAuth, setUserAuth] = useState()
	const [userData, setUserData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				firestore.collection('users').doc(user.uid).onSnapshot(snapshot => {
					if (snapshot.exists)
						setUserData(snapshot.data())
					setUserAuth(user)
					setLoading(false)
				}, (error) => {
					console.log(error)
					setUserAuth(user)
					setLoading(false)
				})
			}
			else {
				setUserAuth(user)
				setLoading(false)
			}
		})

		return unsubscribe
	}, [])

	const currentUser = {
		auth: userAuth,
		data: userData
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			{!loading && children}
		</CurrentUserContext.Provider>
	);
};

export default CurrentUserContext;