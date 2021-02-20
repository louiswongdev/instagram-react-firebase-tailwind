import { firestore } from '../lib/firebase';

export async function doesUserNameExist(username) {
  const userRef = firestore.collection('users');
  const query = userRef.where('username', '==', username).limit(1);
  // get back an array of users with that query condition
  const userDoc = (await query.get()).docs;

  return userDoc.length > 0;
}
