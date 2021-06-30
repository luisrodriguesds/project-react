import React, { useState } from "react";

// import GenericCard from "../Components/GenericCard";
import Card, { IInputCard } from "../components/Card";
import { Container, Row, Col } from "reactstrap";
import { useAuth } from "../contexts/auth";
import Alert from "../components/AlertMessage";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const [form, setForm] = useState<IInputCard[]>([
    {
      name: "email",
      value: "",
      placeholder: "Enter email",
      label: "Email Address",
      type: "email",
    },
    {
      name: "password",
      value: "",
      placeholder: "Password",
      label: "Password",
      type: "password",
    },
  ]);

  const [btnLoading, setBtnLoading] = useState(false);

  const [messageError, setMessageError] = useState("");
  const [errorIsOpen, setErrorIsOpen] = useState(false);

  function handleForm(value: IInputCard[]) {
    setForm(value);
  }

  async function onSubmitForm(formValues: IInputCard[]) {
    setBtnLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const [email, password] = Object.values(
      formValues.map((item) => item.value)
    );

    try {
      if (!email) {
        throw new Error("Email is empty...");
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Email is not valid...");
      }

      if (!password) {
        throw new Error("Password is empty...");
      }

      // call the conext api
      await signIn({
        email: email || "",
        password: password || "",
      });
    } catch (error) {
      setMessageError(error.message);
      setErrorIsOpen(true);
    } finally {
      setBtnLoading(false);
    }
  }

  return (
    <Container className="vh-100 d-flex align-items-center">
      <Row className="mx-auto">
        <Col sm="12">
          <Alert
            message={messageError}
            isOpen={errorIsOpen}
            handleIsOpen={setErrorIsOpen}
            variant="danger"
          />
          <Card
            id={"signinCard"}
            varient="light"
            className="p-4"
            header="Login Panel"
            style={{ minWidth: "380px" }}
            image="/assets/logo-login.png"
            footer={`© Celfocus, June 2021`}
            inputs={form}
            handleInput={handleForm}
            onSubmitForm={onSubmitForm}
            buttonsubmit={{
              label: "Sign In",
              isLoading: btnLoading,
            }}
          ></Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
