import React, { createContext, useState, useEffect} from 'react'
import { auth } from '../firebase/firebase'
import { useFirestore } from '../customHooks/hooks'


export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {

	const [userAuth, setUserAuth] = useState()
	const [userData, setUserData] = useState(null)
	const [loading, setLoading] = useState(true)
	const { getDataUser } = useFirestore()

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			getDataUser(user.uid).then(dataUser => {
				setUserData(dataUser)
			})
			setUserAuth(user)
			setLoading(false)
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