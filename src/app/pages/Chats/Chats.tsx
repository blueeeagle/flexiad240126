// import React, { useState, ChangeEvent, useCallback, useEffect, useRef } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import moment from "moment";
// import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";
// import { PageTitle } from "../../../_metronic/layout/core";
// import ChatList from "./ChatList";
// import ChatBox from "./ChatBox";
// import { Chat, Message, User } from "./types";
// import { collection, getDocs, query, orderBy, doc, setDoc, onSnapshot } from "firebase/firestore";
// import { db } from "./firebaseConfig";

// interface chatData {
//   data: any | [];
// }
// const notificationSound = new Audio('/notification.mp3');
// const Chats: React.FC = () => {
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [users, setUsers] = useState<User[]>([]); // New state for users
//   const [selectedChatId, setSelectedChatId] = useState<any | null>(null);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [showChatArea, setShowChatArea] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [data, setData] = useState<chatData[] | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [unreadMessages, setUnreadMessages] = useState<{ [key: number]: boolean }>({});
//   const unsubscribeRef = useRef<(() => void) | null>(null) ;
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const token = localStorage.getItem("token");
//   { loading } { error }

//   useEffect(() => {
//     if (Notification.permission === "default") {
//       Notification.requestPermission();
//     }
//   }, []);

//   const fetchDropdowns = useCallback(async () => {
//     try {
//       setError(null); 
//       setLoading(true); 
//       const urls = [
//         `${import.meta.env.VITE_APP_API_URL}/agent/dropdown `,
//         `${import.meta.env.VITE_APP_API_URL}/customer/dropdown`
//       ];

//       const responses = await Promise.all(
//         urls.map(url =>
//           fetch(url, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           })
//         )
//       );

//       const data = await Promise.all(responses.map(response => {
//         if (!response.ok) throw new Error("Network response was not ok");
//         return response.json();
//       }));
//       setData(data);


//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchDropdowns();
//   }, [fetchDropdowns]);

//   // Fetch all users
//   const fetchAllUsers = async () => {
//     try {
//       const usersCollection = collection(db, "users");
//       const querySnapshot = await getDocs(usersCollection);
//       const usersList: User[] = [];
//       querySnapshot.forEach((doc) => {
//         usersList.push(doc.data() as User);
//       });
//       setUsers(usersList);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const userid = users.map((user) => {

//     return user.userId; // if you want to store the userId values in an array
//   });

//   useEffect(() => {
//     fetchAllUsers(); // Call to fetch all users when the component mounts
//   }, []);

//   const addUserIfNotExist = async (selectedChatId: number, firstName: string, lastName: string) => {
//     const userRef = doc(db, "users", selectedChatId.toString());

//     if (!userid.includes(selectedChatId)) {
//       const newUser = {
//         selectedChatId,
//         firstName,
//         lastName,
//         image: "", // Add image URL if necessary
//       };
//       await setDoc(userRef, newUser);
//     }
//   };


//   const getMessages = async (selectedChatId: number) => {
//     try {
//       const chatRef = collection(db, "chats", selectedChatId.toString(), "messages");
//       const messagesQuery = query(chatRef, orderBy("timeSent"));

//       const querySnapshot = await getDocs(messagesQuery);
//       const messages: Message[] = [];

//       querySnapshot.forEach((doc) => {
//         messages.push(doc.data() as Message);
//       });

//       setMessages(messages);
//       // Sort messages by userId and timestamp
//       messages.sort((a, b) => a.sender.localeCompare(b.sender) || a.timeSent - b.timeSent);

//       return messages;
//     } catch (error) {
//       console.error("Error getting messages: ", error);
//       return [];
//     }
//   };

//   const addMessage = async (selectedChatId: number, messageText: string) => {
//     try {
//       const timestampId = Date.now().toString(); // timestamp as string
//       const chatRef = collection(db, "chats", selectedChatId.toString(), "messages");

//       const newMessage = {
//         type: "text",
//         message: messageText,
//         timeSent: Date.now(),
//         senderId: selectedChatId,
//       };

//       await setDoc(doc(chatRef, timestampId), newMessage);
//       getMessages(selectedChatId);
//     } catch (error) {
//       console.error("Error adding message: ", error);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (inputValue.trim() !== "" && selectedChatId !== null) {
//       const now = new Date();
//       const formattedTime = moment(now).format("hh:mm A");
//       const formattedDate = moment(now).format("YYYY-MM-DD");

//       const newMessage: Message = {
//         id: Date.now(),
//         text: inputValue,
//         sender: "You",
//         time: formattedTime,
//         date: formattedDate,
//         timeSent: undefined,
//         message: ""
//       };

//       // Add user if they do not exist in Firebase
//       await addUserIfNotExist(selectedChatId, "First", "Last");

//       // Add message to Firestore with a timestamp as the document ID
//       await addMessage(selectedChatId, inputValue);

//       // Update local chat state after message is sent
//       const updatedChats = chats.map((chat) =>
//         chat.id === selectedChatId
//           ? { ...chat, messages: [...chat.messages, newMessage] }
//           : chat
//       );


//       setChats(updatedChats);
//       setInputValue(""); // Clear the input
//     }
//   };


//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   const listenForMessages = (chatId: number) => {
//     const chatRef = collection(db, "chats", chatId.toString(), "messages");
//     const messagesQuery = query(chatRef, orderBy("timeSent"));

//     return onSnapshot(messagesQuery, (snapshot) => {
//       const newMessages: Message[] = [];
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           notificationSound.play();
//           newMessages.push(change.doc.data() as Message);
//         }
//       });

//       if (newMessages.length > 0) {

//         setMessages((prev) => [...prev, ...newMessages]);
//         showNotification(newMessages);
//       }
//     });
//   };


//   const showNotification = (newMessages: Message[]) => {
//     if (document.hidden) {
//       newMessages.forEach((message) => {
//         new Notification("New Message", { body: message.message });
//       });
//     }
//   };



//   const handleChatClick = (chatId: number) => {
//     setSelectedChatId(chatId);
//     setShowChatArea(true);
//     setUnreadMessages((prev) => ({ ...prev, [chatId]: false }));

//     if (unsubscribeRef.current) {
//       unsubscribeRef.current();
//     }

//     unsubscribeRef.current = listenForMessages(chatId);

//     getMessages(chatId).then(() => {
//       // Give React time to update the DOM before scrolling
//       setTimeout(() => {
//         scrollToBottom();
//       }, 100);
//     });
//   };

//   useEffect(() => {
//     return () => {
//       if (unsubscribeRef.current) {
//         unsubscribeRef.current();
//       }
//     };
//   }, []);

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);



//   return (
//     <Container fluid>
//       <div className="bg-none">
//         <PageTitle>CHATS</PageTitle>
//       </div>
//       <Row>
//         <Col
//           md={4}
//           className={`chatlist-col ${showChatArea ? "d-none d-md-block" : ""}`}
//         >
//           <ChatList
//             chats={chats}
//             data={data || []}
//             handleChatClick={handleChatClick}
//             activeChatId={selectedChatId ?? 0}        
//             unreadMessages={unreadMessages}
//             />
//         </Col>

//         <Col
//           md={8}
//           className={`chatbox-col ${!showChatArea ? "d-none d-md-block" : ""}`}
//         >
//           <ChatBox
//             messages={messages}
//             inputValue={inputValue}
//             handleInputChange={handleInputChange}
//             handleSendMessage={handleSendMessage}
//             messagesEndRef={messagesEndRef}
//           />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Chats;




import React, { useState, ChangeEvent, useCallback, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";
import { PageTitle } from "../../../_metronic/layout/core";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import { Chat, Message, User } from "./types";
import { collection, getDocs, query, orderBy, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./chat.scss"
interface chatData {
  data: any | [];
}
const notificationSound = new Audio('/notification.mp3');
const Chats: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<any | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [showChatArea, setShowChatArea] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<chatData[] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<{ [key: number]: boolean }>({});
  const unsubscribeRef = useRef<(() => void) | null>(null);
  // const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const token = localStorage.getItem("token");
  { error } { loading }

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
  document.body.classList.add("chat-page");
  return () => document.body.classList.remove("chat-page");
}, []);

  const fetchDropdowns = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const urls = [
        `${import.meta.env.VITE_APP_API_URL}/agent/dropdown `,
        `${import.meta.env.VITE_APP_API_URL}/customer/dropdown`
      ];

      const responses = await Promise.all(
        urls.map(url =>
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      const data = await Promise.all(responses.map(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      }));
      setData(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDropdowns();
  }, [fetchDropdowns]);

  const fetchAllUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const usersList: User[] = [];
      querySnapshot.forEach((doc) => {
        usersList.push(doc.data() as User);
      });
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const userid = users.map((user) => user.userId);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const addUserIfNotExist = async (selectedChatId: number, firstName: string, lastName: string) => {
    const userRef = doc(db, "users", selectedChatId.toString());

    if (!userid.includes(selectedChatId)) {
      const newUser = {
        selectedChatId,
        firstName,
        lastName,
        image: "",
      };
      await setDoc(userRef, newUser);
    }
  };

  const getMessages = async (selectedChatId: number) => {
    try {
      const chatRef = collection(db, "chats", selectedChatId.toString(), "messages");
      const messagesQuery = query(chatRef, orderBy("timeSent"));
      const querySnapshot = await getDocs(messagesQuery);
      const messages: Message[] = [];

      querySnapshot.forEach((doc) => {
        messages.push(doc.data() as Message);
      });

      setMessages(messages);
      messages.sort((a, b) => a.senderId.localeCompare(b.senderId) || a.timeSent - b.timeSent);

      return messages;
    } catch (error) {
      console.error("Error getting messages: ", error);
      return [];
    }
  };

  const addMessage = async (selectedChatId: number, messageText: string) => {
    try {
      const timestampId = Date.now().toString();
      const chatRef = collection(db, "chats", selectedChatId.toString(), "messages");

      const newMessage = {
        type: "text",
        message: messageText,
        timeSent: Date.now(),
        senderId: "admin",
      };

      await setDoc(doc(chatRef, timestampId), newMessage);
      getMessages(selectedChatId);
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };
  
  
  const filteredData = data?.[1]?.data?.filter((item: { _id: any; }) => item._id === selectedChatId) || [];

const firstNames = filteredData.map((item: { firstName: any; }) => item.firstName).sort();
const lastNames = filteredData.map((item: { lastName: any; }) => item.lastName).sort();


  const handleSendMessage = async () => {
    if (inputValue.trim() !== "" && selectedChatId !== null) {
      const now = new Date();
      const formattedTime = moment(now).format("hh:mm A");
      const formattedDate = moment(now).format("YYYY-MM-DD");

      const newMessage: Message = {
        id: Date.now(),
        text: inputValue,
        senderId: "You",
        time: formattedTime,
        date: formattedDate,
        timeSent: undefined,
        message: ""
      };


      await addUserIfNotExist(selectedChatId, firstNames, lastNames);
      await addMessage(selectedChatId, inputValue);

      const updatedChats = chats.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      );

      setChats(updatedChats);
      setInputValue("");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const listenForMessages = (chatId: number) => {
    const chatRef = collection(db, "chats", chatId.toString(), "messages");
    const messagesQuery = query(chatRef, orderBy("timeSent"));

    return onSnapshot(messagesQuery, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          notificationSound.play();
          newMessages.push(change.doc.data() as Message);
        }
      });

      if (newMessages.length > 0) {
        setMessages((prev) => [...prev, ...newMessages]);
        showNotification(newMessages);
      }
    });
  };

  const showNotification = (newMessages: Message[]) => {
    if (document.hidden) {
      newMessages.forEach((message) => {
        new Notification("New Message", { body: message.message });
      });
    }
  };

  const handleChatClick = (chatId: number) => {
    setSelectedChatId(chatId);
    setShowChatArea(true);
    setUnreadMessages((prev) => ({ ...prev, [chatId]: false }));

    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    unsubscribeRef.current = listenForMessages(chatId);

    getMessages(chatId).then(() => {
      setTimeout(() => {
        // scrollToBottom();
      }, 100);
    });
  };

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, 100);
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  return (
    <Container fluid className="chat-page"  >
      <div className="bg-none">
        <PageTitle>CHATS</PageTitle>
      </div>
      <Row>
        <Col
          md={4}
          className={`chatlist-col ${showChatArea ? "d-none d-md-block" : ""}`   }
          style={{height:"30%"}}
        >
    
          <ChatList
            chats={chats}
            data={data || []}
            handleChatClick={handleChatClick}
            activeChatId={selectedChatId ?? 0}
            unreadMessages={unreadMessages}
          />
        </Col>

        <Col
          md={8}
          className={`chatbox-col ${!showChatArea ? "d-none d-md-block" : ""}`}
        >
          <ChatBox
            messages={messages}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleSendMessage={handleSendMessage}
           
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Chats;
