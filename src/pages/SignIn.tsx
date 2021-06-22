import React, { useState } from "react";

// import GenericCard from "../Components/GenericCard";
import { Form } from "react-bootstrap";
import Card from "../Components/Card";
import { Container, Row, Col } from "reactstrap";
import { useAuth } from "../contexts/auth";
import Alert from "../Components/AlertMessage";
import Button from "../Components/Button";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const [messageError, setMessageError] = useState("");
  const [errorIsOpen, setErrorIsOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    setBtnLoading(true);

    e.preventDefault();
    console.log(email, password, "aqui");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      if ([email, password].some((item) => item === "")) {
        setMessageError("Um ou mais campo então vazios");
        setErrorIsOpen(true);
        return;
      }

      // call the conext api
      await signIn({
        email,
        password,
      });
    } catch (error) {
      // error com alert
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center">
      <Row className="mx-auto">
        <Col sm="12">
          <Card
            varient="light"
            className="p-4"
            header="Login Panel"
            style={{ minWidth: "380px" }}
            image="/assets/logo-login.png"
            footer={`© Celfocus, June 2021`}
          >
            <Alert
              message={messageError}
              isOpen={errorIsOpen}
              handleIsOpen={setErrorIsOpen}
              variant="danger"
            />
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button
                loading={btnLoading}
                variant="dark"
                title="Login"
                type="submit"
                disabled={btnLoading}
              />
            </Form>
          </Card>
          {/* <GenericCard
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
          </GenericCard> */}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
