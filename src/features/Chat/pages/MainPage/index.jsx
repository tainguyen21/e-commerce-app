import { doc, getDoc, onSnapshot, updateDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import { setMessages } from "features/Auth/userSlice";
import ChatForm from "features/Chat/components/ChatForm";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { Container } from "reactstrap";
import db from "utils/db";
import "./MainPage.scss";

ChatPage.propTypes = {};

function ChatPage(props) {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = match.params.id;
  const currentUser = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [currentUserMessages, setCurrentUserMessages] = useState({});
  const [activeUser, setActiveUser] = useState(null);

  const currentUserMessagesRef = useRef(null);
  const chattingUserMessagesRef = useRef(null);

  const onSubmit = async (data) => {
    //Chatted
    if (currentUserMessagesRef.current[userId]) {
      currentUserMessagesRef.current = {
        ...currentUserMessagesRef.current,
        [userId]: [
          ...currentUserMessagesRef.current[userId],
          {
            message: data.message,
            other: false,
          },
        ],
      };

      setCurrentUserMessages(currentUserMessagesRef.current);

      await updateDoc(doc(db, `users/${currentUser.id}`), {
        messages: currentUserMessagesRef.current,
      });
    } else {
      currentUserMessagesRef.current = {
        ...currentUserMessagesRef.current,
        [userId]: [
          {
            message: data.message,
            other: false,
          },
        ],
      };

      setCurrentUserMessages(currentUserMessagesRef.current);

      await updateDoc(doc(db, `users/${currentUser.id}`), {
        messages: currentUserMessagesRef.current,
      });
    }

    if (chattingUserMessagesRef.current[currentUser.id]) {
      chattingUserMessagesRef.current = {
        ...chattingUserMessagesRef.current,
        [currentUser.id]: [
          ...chattingUserMessagesRef.current[currentUser.id],
          {
            message: data.message,
            other: true,
          },
        ],
      };

      await updateDoc(doc(db, `users/${userId}`), {
        messages: chattingUserMessagesRef.current,
      });
    } else {
      chattingUserMessagesRef.current = {
        ...chattingUserMessagesRef.current,
        [currentUser.id]: [
          {
            message: data.message,
            other: true,
          },
        ],
      };

      await updateDoc(doc(db, `users/${userId}`), {
        messages: chattingUserMessagesRef.current,
      });
    }
  };

  const onUserClick = (id) => {
    history.push(`/chat/${id}`);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      let userInChatWithId = {};

      const allUsers = [];
      for (let key in currentUser.messages) {
        const userSnapshot = await getDoc(doc(db, `users/${key}`));

        if (userId === key)
          userInChatWithId = {
            ...userSnapshot.data(),
            id: key,
          };

        allUsers.push({
          ...userSnapshot.data(),
          id: key,
        });
      }

      if (allUsers.length >= 1) {
        if (!userId) {
          setUsers(allUsers);
          setActiveUser(allUsers[0].id);
          chattingUserMessagesRef.current = allUsers[0].messages;

          return;
        }

        if (Object.keys(userInChatWithId).length === 0) {
          const newUserSnapshot = await getDoc(doc(db, `users/${userId}`));
          userInChatWithId = {
            ...newUserSnapshot.data(),
            id: userId,
          };
        }

        const filteredUsers = allUsers.filter((user) => user.id !== userId);

        filteredUsers.unshift(userInChatWithId);
        chattingUserMessagesRef.current = userInChatWithId.messages;
        setUsers(filteredUsers);
        setActiveUser(userId);
      } else {
        if (userId) {
          const newUserSnapshot = await getDoc(doc(db, `users/${userId}`));
          userInChatWithId = {
            ...newUserSnapshot.data(),
            id: userId,
          };
          chattingUserMessagesRef.current = userInChatWithId.messages;
          setUsers([userInChatWithId]);
          setActiveUser(userId);
        }
      }
    };

    fetchAllUsers();
  }, [currentUser, userId]);

  useEffect(() => {
    if (Object.keys(currentUser).length) {
      const unsub = onSnapshot(
        doc(db, `users/${currentUser.id}`),
        async (newData) => {
          if (
            Object.keys(newData.data().messages).length !==
            Object.keys(currentUserMessagesRef.current).length
          ) {
            const allUsers = [];
            for (let key in newData.data().messages) {
              const userSnapshot = await getDoc(doc(db, `users/${key}`));
              allUsers.push({
                ...userSnapshot.data(),
                id: key,
              });
            }

            setUsers(allUsers);
            dispatch(setMessages(newData.data().messages));
          }

          const chattingUserSnapshot = await getDoc(doc(db, `users/${userId}`));
          const chattingUser = chattingUserSnapshot.data();
          if (chattingUser) {
            chattingUserMessagesRef.current = chattingUser.messages;
          }
          setCurrentUserMessages(newData.data().messages);
          currentUserMessagesRef.current = newData.data().messages;
        }
      );

      return () => unsub();
    }
  }, [currentUser, dispatch, userId]);

  useEffect(() => {
    setCurrentUserMessages(currentUser.messages);
    currentUserMessagesRef.current = currentUser.messages;
  }, [currentUser.messages, dispatch]);

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="chat-section">
        <Container>
          <ChatForm
            onSubmit={onSubmit}
            allUsers={users}
            messages={
              (currentUserMessages && currentUserMessages[activeUser]) || []
            }
            activeUser={activeUser}
            onUserClick={onUserClick}
          />
        </Container>
      </section>

      <Footer />
    </div>
  );
}

export default ChatPage;
