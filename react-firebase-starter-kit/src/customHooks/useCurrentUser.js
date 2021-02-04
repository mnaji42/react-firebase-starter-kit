import { useContext } from 'react'
import CurrentUserContext from '../context/CurrentUserContext'

export const useCurrentUser = () => {
	return useContext(CurrentUserContext)
}

export default useCurrentUser