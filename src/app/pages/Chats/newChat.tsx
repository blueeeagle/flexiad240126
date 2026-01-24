import { doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

const addMessageToChat = async (chatId: string, senderId: string, message: string) => {
  const chatRef = collection(db, `chats/${chatId}/messages`);
  await addDoc(chatRef, {
    type: 'text',
    message,
    timeSent: serverTimestamp(),
    senderId,
  });
};
