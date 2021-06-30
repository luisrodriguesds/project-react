import React from "react";

import { Container } from "react-bootstrap";
import Header from "./Header";

const Template: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Template;
