import { firestore } from '../firebase/firebase'
import firebase from 'firebase/app'

class Firestore {

	// CollectionPath must have an odd number of segments
	// Collection/doc/collection/doc/collection/...

	// Get a ref of a collection (it doesn't send a request)
	getCollectionRef = (collectionPath) => {
		return firestore.collection(collectionPath)
	}

	// Get a ref of a document (it doesn't send a request)
	getDocumentRef = (collectionPath, document) => {
		return firestore.collection(collectionPath).doc(document)
	}



	// *************** Set Data ************** //

	// Add a new doc in a collection (create collection to if it doesn't exist)
	// Create a random id for the document
	addNewDoc = (collectionPath, data) => {
		return firestore.collection(collectionPath).add(data)
	}

	// Create a new document or replace a document if it's already exist
	setNewDoc = (collectionPath, doc, data) => {
		return firestore.collection(collectionPath).doc(doc).set(data)
	}

	// Add filed to existing doc (if it doeasnt exit it create it like setNewDoc)
	mergeField = (collectionPath, doc, data) => {
		return firestore.collection(collectionPath).doc(doc).set(data, { merge: true })
	}

	// Update Field in document
	// Exemple with nested object :
	// setNewDoc('users', 'frank', {name: "Frank",favorites: { food: "Pizza", color: "Blue", subject: "recess" },age: 12})
	// updateFiled('users', 'frank', {"age": 13,"favorites.color": "Red"})
	updateField = (collectionPath, doc, data) => {
		return firestore.collection(collectionPath).doc(doc).update(data)
	}

	// Add value in a array of field (if value does already exist it's not add the value)
	addValueInFieldArray = (collectionPath, doc, field, value) => {
		return firestore.collection(collectionPath).doc(doc).update({
			[field]: firebase.firestore.FieldValue.arrayUnion(value)
		})
	}

	// Remove value in a array of field
	removeValueInFieldArray = (collectionPath, doc, field, value) => {
		return firestore.collection(collectionPath).doc(doc).update({
			[field]: firebase.firestore.FieldValue.arrayRemove(value)
		})
	}

	// Increment a field by value (if the field is not a number it do nothing)
	incrementField = (collectionPath, doc, field, value) => {
		firestore.collection(collectionPath).doc(doc).update({
			[field]: firebase.firestore.FieldValue.increment(value)
		})
	}


	//Get a collection 
	getCollection = (collectionPath) => {
		return firestore.collection(collectionPath).get()
	}

	//Delete a document from de collection
	deleteDoc = (collectionPath, doc) => {
		return firestore.collection(collectionPath).doc(doc).delete()
	}

	//Delete Field in a document (un champs)
	deleteField = (collectionPath, doc, field) => {
		var docRef = this.getDocumentRef(collectionPath).doc(doc)

		return docRef.update({
			[field]: firebase.firestore.FieldValue.delete()
		})
	}


	// *************************************

	// return an object = {{}}
	getDataCollection = (collectionPath) => {
		return new Promise((resolve, reject) => {
			firestore.collection(collectionPath).get()
			.then((querySnapshot) => {
				if (querySnapshot.empty) {
					reject({type: 'error', message : 'This collection does not exist or it is empty'})
				}
				else {
					const docs = []
					console.log(querySnapshot)
					querySnapshot.forEach((doc) => {
						// collectionData.push(doc.data())
						docs.push({id : doc.id, data: doc.data()})
						// docs[doc.id] = doc.id
					})
					resolve(docs)
				}
			})
			.catch((error) => {
				reject(error)
			})
		})
	}

	// *********** Users *************

	getDataUser = (userId) => {
		return new Promise(resolve => {
			firestore.collection('users').doc(userId).get()
			.then(usr => {
				if (!usr.exists) {
					resolve(null)
				}
				resolve(usr.data())
			})
			.catch(error => {
				console.log("User's data can't be load:", error.message)
				resolve(null)
			})
		})
	}

	setUser = (userId, data) => {
		console.log('yoyo:', userId)
		return this.setNewDoc('users', userId, data)
	}

	updateUser = (userId, data) => {
		console.log(userId)
		return this.updateField('users', userId, data)
	}
}

export function useFirestore() {
	return new Firestore()
}

export default new Firestore()