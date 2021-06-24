import React from "react";

import { Container } from "react-bootstrap";
import Header from "../Components/Header";
// import { Container } from './styles';

const Template: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Template;
