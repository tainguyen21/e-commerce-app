import { doc, getDoc, onSnapshot, updateDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import ChatForm from "features/Chat/components/ChatForm";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { Container } from "reactstrap";
import db from "utils/db";
import "./MainPage.scss";

ChatPage.propTypes = {};

function ChatPage(props) {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const userId = match.params.id;
  const currentUser = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [currentUserMessages, setCurrentUserMessages] = useState({});
  const [activeUser, setActiveUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentUserMessagesRef = useRef(null);

  const onSubmit = async (data, chattingUser) => {
    if (currentUserMessagesRef.current[userId]) {
      setCurrentUserMessages({
        ...currentUserMessagesRef.current,
        [userId]: [
          ...currentUserMessagesRef.current[userId],
          {
            message: data.message,
            other: false,
          },
        ],
      });
    } else {
      setCurrentUserMessages({
        ...currentUserMessagesRef.current,
        [userId]: [
          {
            message: data.message,
            other: false,
          },
        ],
      });
    }

    if (currentUser.messages[userId]) {
      await updateDoc(doc(db, `users/${currentUser.id}`), {
        messages: {
          ...currentUser.messages,
          [userId]: [
            ...currentUser.messages[userId],
            {
              message: data.message,
              other: false,
            },
          ],
        },
      });
    } else {
      await updateDoc(doc(db, `users/${currentUser.id}`), {
        messages: {
          ...currentUser.messages,
          [userId]: [
            {
              message: data.message,
              other: false,
            },
          ],
        },
      });
    }

    if (chattingUser.messages[currentUser.id]) {
      await updateDoc(doc(db, `users/${userId}`), {
        messages: {
          ...chattingUser.messages,
          [currentUser.id]: [
            ...chattingUser.messages[currentUser.id],
            {
              message: data.message,
              other: true,
            },
          ],
        },
      });
    } else {
      await updateDoc(doc(db, `users/${userId}`), {
        messages: {
          ...chattingUser.messages,
          [currentUser.id]: [
            {
              message: data.message,
              other: true,
            },
          ],
        },
      });
    }
  };

  const onUserClick = (id) => {
    setActiveUser(id);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
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

          setIsLoading(false);

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
        setUsers(filteredUsers);
        setActiveUser(userId);
      }

      if (Object.keys(currentUser).length) {
        setIsLoading(false);
      }
    };

    fetchAllUsers();
  }, [currentUser, userId]);

  useEffect(() => {
    if (Object.keys(currentUser).length) {
      const unsub = onSnapshot(doc(db, `users/${currentUser.id}`), (doc) => {
        setCurrentUserMessages(doc.data().messages);
        currentUserMessagesRef.current = doc.data().messages;
      });

      return () => unsub();
    }
  }, [currentUser]);

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
            isLoading={isLoading}
            onUserClick={onUserClick}
          />
        </Container>
      </section>

      <Footer />
    </div>
  );
}

export default ChatPage;
