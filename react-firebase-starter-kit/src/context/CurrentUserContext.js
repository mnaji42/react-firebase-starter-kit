import React, { createContext, useState, useEffect} from 'react'
import { auth } from '../firebase/firebase'


export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {

	const [userAuth, setUserAuth] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUserAuth(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const currentUser = {
		auth: userAuth
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			{!loading && children}
		</CurrentUserContext.Provider>
	);
};

export default CurrentUserContext;