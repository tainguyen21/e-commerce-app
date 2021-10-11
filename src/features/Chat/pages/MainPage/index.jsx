import React from "react";
import PropTypes from "prop-types";
import ChatForm from "features/Chat/components/ChatForm";
import Footer from "components/Footer";
import "./MainPage.scss";
import { Container } from "reactstrap";
import { useSelector } from "react-redux";

ChatPage.propTypes = {};

function ChatPage(props) {
  const messages = useSelector((state) => state.user.messages);

  console.log("Messages: ", messages);

  const onSubmit = (data) => {
    console.log("Data: ", data);
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="chat-section">
        <Container>
          <ChatForm onSubmit={onSubmit} />
        </Container>
      </section>

      <Footer />
    </div>
  );
}

export default ChatPage;
