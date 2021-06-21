import React from "react";

import GenericCard from "../Components/GenericCard";
import { Container, Row, Col } from "reactstrap";

const SignIn: React.FC = () => {
  const handleSubmit = (email: string, password: string) => {
    console.log(email, password, "aqui");
  };

  return (
    <Container className="vh-100">
      <Row className="mx-auto mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
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
