import { db } from "./firebase"; 
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

/**
 * Create a new document in a Firestore collection
 * @param {string} collectionName - The collection name
 * @param {string} documentId - The document ID (usually unique like user ID)
 * @param {object} data - The data to store in the document
 * @returns {Promise<void>}
 */
export const createDocument = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, data);
    console.log(`${documentId} created successfully in ${collectionName}`);
  } catch (error) {
    console.error("Error creating document:", error);
  }
};

/**
 * Get a document from Firestore
 * @param {string} collectionName - The collection name
 * @param {string} documentId - The document ID
 * @returns {Promise<object|null>} - The document data or null if not found
 */
export const getDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};

/**
 * Get all documents in a collection
 * @param {string} collectionName - The collection name
 * @returns {Promise<Array>} - An array of document data
 */
export const getCollection = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => doc.data());
    return data;
  } catch (error) {
    console.error("Error getting collection:", error);
    return [];
  }
};

/**
 * Update a document in Firestore
 * @param {string} collectionName - The collection name
 * @param {string} documentId - The document ID
 * @param {object} data - The data to update in the document
 * @returns {Promise<void>}
 */
export const updateDocument = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);
    console.log(`${documentId} updated successfully in ${collectionName}`);
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

/**
 * Delete a document from Firestore
 * @param {string} collectionName - The collection name
 * @param {string} documentId - The document ID
 * @returns {Promise<void>}
 */
export const deleteDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    console.log(`${documentId} deleted successfully from ${collectionName}`);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
