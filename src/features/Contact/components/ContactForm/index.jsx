import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormFeedback, FormGroup, Input } from "reactstrap";
import * as yup from "yup";
import "./ContactForm.scss";

ContactForm.propTypes = {};

const schema = yup.object({
  fullname: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("This field is required")
    .email("Email is invalid"),
  subject: yup.string().required("This field is required"),
  message: yup.string().required("This field is required"),
});

function ContactForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fullname = register("fullname");
  const email = register("email");
  const subject = register("subject");
  const message = register("message");

  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <Form
      className="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <FormGroup className="contact-form__field">
        <Input
          className="contact-form__input"
          placeholder="Full name"
          innerRef={fullname.ref}
          name={fullname.name}
          onChange={fullname.onChange}
          onBlur={fullname.onBlue}
          invalid={errors.fullname && true}
        />
        <FormFeedback>
          {errors.fullname && errors.fullname.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup className="contact-form__field">
        <Input
          className="contact-form__input"
          placeholder="E-Mail Address"
          innerRef={email.ref}
          name={email.name}
          onChange={email.onChange}
          onBlur={email.onBlue}
          invalid={errors.email && true}
        />
        <FormFeedback>{errors.email && errors.email.message}</FormFeedback>
      </FormGroup>
      <FormGroup className="contact-form__field">
        <Input
          className="contact-form__input"
          placeholder="Subject"
          innerRef={subject.ref}
          name={subject.name}
          onChange={subject.onChange}
          onBlur={subject.onBlue}
          invalid={errors.subject && true}
        />
        <FormFeedback>{errors.subject && errors.subject.message}</FormFeedback>
      </FormGroup>
      <FormGroup className="contact-form__field">
        <Input
          className="contact-form__input"
          type="textarea"
          rows="6"
          placeholder="Your message"
          innerRef={message.ref}
          name={message.name}
          onChange={message.onChange}
          onBlur={message.onBlue}
          invalid={errors.message && true}
        />
        <FormFeedback>{errors.message && errors.message.message}</FormFeedback>
      </FormGroup>
      <Button className="button button--red" type="submit">
        Send Message
      </Button>
    </Form>
  );
}

export default ContactForm;
