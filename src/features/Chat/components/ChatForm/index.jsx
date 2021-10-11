import React from "react";
import PropTypes from "prop-types";
import { Col, Form, Input, Row } from "reactstrap";
import "./ChatForm.scss";
import { useForm } from "react-hook-form";

ChatForm.propTypes = {
  onSubmit: PropTypes.func,
};

ChatForm.defaultProps = {
  onSubmit: null,
};

function ChatForm(props) {
  const { register, handleSubmit, setValue } = useForm();
  const { onSubmit } = props;

  const submitForm = (data) => {
    if (onSubmit) {
      onSubmit(data);
      setValue("message", "");
    }
  };

  const message = register("message");

  return (
    <div className="chat-form">
      <Row>
        <Col lg="4">
          <ul className="chat-form__user-list">
            <li className="chat-form__user-item">
              <img
                src="https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
                alt="user"
                className="chat-form__user-avatar"
              />
              <span className="chat-form__user-name">Ryannnn</span>
            </li>
          </ul>
        </Col>
        <Col lg="8">
          <div className="chat-form__right">
            <ul className="chat-form-message">
              <li className="chat-form-message__item">Hello guys</li>
              <li className="chat-form-message__item other">Hello guys</li>
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
