import { auth } from '../firebase/firebase'

class Auth {
	
	signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	logout = () => {
		return auth.signOut()
	}

	resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email)
	}

	updateEmail = (userAuth, email) => {
		return userAuth.updateEmail(email)
	}

	updatePassword = (userAuth, password) => {
		return userAuth.updatePassword(password)
	}
}

export function useAuth() {
	return new Auth()
}

export default new Auth()