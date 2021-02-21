import { firestore } from '../lib/firebase';

export async function doesUserNameExist(username) {
  const userRef = firestore.collection('users');
  const query = userRef.where('username', '==', username).limit(1);
  // get back an array of users with that query condition
  const userDoc = (await query.get()).docs;

  return userDoc.length > 0;
}

export async function getUserById(uid) {
  const snapshot = await firestore.collection('users').doc(`${uid}`).get();
  const userDoc = snapshot.data();

  return userDoc;
}

export async function createUserProfileDoc(user, additionalUserData) {
  if (!user) return;

  // Get a reference to the location in the Firestore where the user
  // document may or may not exist.
  const userRef = firestore.doc(`users/${user.uid}`);

  // fetch a document from that location
  const snapshot = await userRef.get();

  // if there's not document for newly signed up user, create one
  // with info provided
  if (!snapshot.exists) {
    const createdAt = Date.now();
    try {
      await userRef.set({
        uid: user.uid,
        createdAt,
        ...additionalUserData,
      });
    } catch (error) {
      console.error('Error creating user', error);
    }
  }

  // return user doc to store in UserContext
  return getUserDocument(user.uid);
}

export const getUserDocument = async uid => {
  if (!uid) return null;

  try {
    console.log('getUserDocument being called....');
    return firestore.collection('users').doc(uid);
  } catch (err) {
    console.error('Error fetching user', err.message);
  }
};
