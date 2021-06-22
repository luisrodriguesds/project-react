import React, { useState } from "react";

import GenericCard from "../Components/GenericCard";
import { Container, Row, Col } from "reactstrap";
import { useAuth } from "../contexts/auth";
import Alert from "../Components/AlertMessage";
const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const [messageError, setMessageError] = useState("");
  const [errorIsOpen, setErrorIsOpen] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    console.log(email, password, "aqui");
    if ([email, password].some((item) => item === "")) {
      setMessageError("Um ou mais campo então vazios");
      setErrorIsOpen(true);
      return;
    }

    // call the conext api
    try {
      await signIn({
        email,
        password,
      });
    } catch (error) {
      // error com alert
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center">
      <Row className="mx-auto mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Alert
            message={messageError}
            isOpen={errorIsOpen}
            handleIsOpen={setErrorIsOpen}
            variant="danger"
          />
          <GenericCard
            title={"Please Sign In"}
            secondInput={{ value: "", type: "password" }}
            firstInput={""}
            button={{
              text: "Sign In",
              onSubmit: handleSubmit,
            }}
            img={
              "https://borlabs.io/wp-content/uploads/2019/09/blog-wp-login.png"
            }
          >
            <input type={"checkbox"} />
          </GenericCard>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
