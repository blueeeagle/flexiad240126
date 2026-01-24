import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import { Chat, Message } from "./types";

export const getChatMessages = async (): Promise<Chat[]> => {
  const chatsCollection = collection(db, "chats");
  const snapshot = await getDocs(chatsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as unknown as Chat));
};

export const addMessageToChat = async (
  chatId: string,
  message: Message
): Promise<void> => {
  const chatRef = doc(db, "chats", chatId);
  await updateDoc(chatRef, {
    messages: arrayUnion(message),
  });
};

export const addNewChat = async (chat: Omit<Chat, "id">): Promise<string> => {
  const chatsCollection = collection(db, "chats");
  const docRef = await addDoc(chatsCollection, chat);
  return docRef.id;
};
