import React, { useEffect, useState } from "react";
import ChatForm from "features/Chat/components/ChatForm";
import Footer from "components/Footer";
import "./MainPage.scss";
import { Container } from "reactstrap";
import { useSelector } from "react-redux";
import { doc, getDoc } from "@firebase/firestore";
import db from "utils/db";
import { useLocation, useRouteMatch } from "react-router";

ChatPage.propTypes = {};

function ChatPage(props) {
  const match = useRouteMatch();
  const userId = match.params.id;
  const currentUser = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  const [activeUser, setActiveUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("User: ", currentUser);
    console.log("Data: ", data);
  };

  const onUserClick = (id) => {
    setActiveUser(id);
  };

  console.log("Active user: ", activeUser);
  console.log("All users: ", users);
  console.log("User id: ", userId);

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

      console.log("User in side: ", allUsers);

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
  }, [currentUser]);

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="chat-section">
        <Container>
          <ChatForm
            onSubmit={onSubmit}
            allUsers={users}
            messages={
              activeUser && currentUser ? currentUser.messages[activeUser] : []
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
