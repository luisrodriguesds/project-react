import React, { useState } from "react";

import { IInputCard } from "../components/Card";
import { Container, Row, Col } from "reactstrap";
import { useAuth } from "../contexts/auth";
import Alert from "../components/AlertMessage";
import Button from "../components/Button";
import { Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignIn: React.FC = () => {
  // const { signIn } = useAuth();
  const schema = yup.object({
    email: yup.string().required("Campo obrigatorio com yup"),
    password: yup.string().required("Campo obrigatorio com yup"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [messageError, setMessageError] = useState("");
  const [errorIsOpen, setErrorIsOpen] = useState(false);

  async function onSubmitForm(data: any) {
    console.log(data);
  }

  return (
    <Container className="vh-100 d-flex align-items-center">
      {console.log(errors)}
      <Row className="mx-auto">
        <Col sm="12" lg="12">
          <Alert
            message={messageError}
            isOpen={errorIsOpen}
            handleIsOpen={setErrorIsOpen}
            variant="danger"
          />
          <Card bg="light" text="dark" style={{ minWidth: "380px" }}>
            <Card.Body className="p-4">
              <Card.Title className="text-center mb-4">Login Page</Card.Title>
              <Form onSubmit={handleSubmit(onSubmitForm)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrer Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Entrer Password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.password.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Button
                  variant="dark"
                  title="Entrar"
                  type="submit"
                  className="w-100"
                  loading={false}
                />
              </Form>
            </Card.Body>

            <Card.Footer className="dark text-center">
              © Celfocus, June 2021
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
