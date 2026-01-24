import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const addUser = async (userId: string, firstName: string, lastName: string, image: string = '') => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    userId,
    firstName,
    lastName,
    image,
  });
};
