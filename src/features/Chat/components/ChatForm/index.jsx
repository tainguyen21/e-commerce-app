import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Form, Input, Row, Spinner } from "reactstrap";
import "./ChatForm.scss";
import { useForm } from "react-hook-form";

ChatForm.propTypes = {
  onSubmit: PropTypes.func,
  allUsers: PropTypes.array,
  messages: PropTypes.array,
  activeUser: PropTypes.string,
  onUserClick: PropTypes.func,
  chattingUser: PropTypes.object,
};

ChatForm.defaultProps = {
  onSubmit: null,
  allUsers: null,
  messages: null,
  activeUser: null,
  onUserClick: null,
  chattingUser: null,
};

function ChatForm(props) {
  const { register, handleSubmit, setValue } = useForm();
  const {
    onSubmit,
    allUsers,
    messages,
    activeUser,
    onUserClick,
    chattingUser,
  } = props;

  console.log("Chatting user: ", chattingUser);

  const submitForm = (data) => {
    if (onSubmit) {
      onSubmit(data, chattingUser);
      setValue("message", "");
    }
  };

  const message = register("message");

  useEffect(() => {
    let form = document.querySelector(".chat-form-message");

    if (form) {
      form.scrollTop = form.scrollHeight - form.offsetHeight;
    }
  });

  return (
    <div className="chat-form">
      <Row>
        <Col lg="4">
          <ul className="chat-form__user-list">
            {allUsers.length ? (
              allUsers.map((user, index) => (
                <li
                  className={`chat-form__user-item ${
                    activeUser === user.id ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => onUserClick(user.id, chattingUser)}
                >
                  <img
                    src="https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
                    alt="user"
                    className="chat-form__user-avatar"
                  />
                  <span className="chat-form__user-name">{user.name}</span>
                </li>
              ))
            ) : (
              <div>Dont' have message</div>
            )}
          </ul>
        </Col>
        <Col lg="8">
          <div className="chat-form__right">
            <ul className="chat-form-message">
              {messages.map((item, index) => (
                <li
                  className={`chat-form-message__item ${
                    item.other ? "" : "right"
                  }`}
                  key={index}
                >
                  {item.message}
                </li>
              ))}
            </ul>

            <Form
              className="chat-form__main"
              onSubmit={handleSubmit(submitForm)}
              autoComplete="off"
            >
              <Input
                className="chat-form__input"
                required
                name={message.name}
                onChange={message.onChange}
                onBlurCapture={message.onBlur}
                innerRef={message.ref}
              />
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChatForm;
