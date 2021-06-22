import React, { HTMLAttributes } from "react";

import { Card } from "react-bootstrap";

type varients =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface ICard extends HTMLAttributes<HTMLDivElement> {
  header?: string;
  title?: string;
  varient: varients;
  footer?: string;
  image?: string;
}

const CardLogin: React.FC<ICard> = ({
  header,
  title,
  footer,
  image,
  varient,
  children,
  className,
  ...rest
}) => {
  return (
    <Card bg={varient} text={varient === "light" ? "dark" : "white"} {...rest}>
      {header && <Card.Header>{header}</Card.Header>}
      {image && (
        <Card.Img
          variant="top"
          src={image}
          className="align-self-center"
          style={{ maxWidth: "130px" }}
        />
      )}
      <Card.Body className={className}>
        {title && <Card.Title>{title}</Card.Title>}
        {children}
        {/* <Card.Text>
          With supporting text below as a natural lead-in to additional content.
          sadgfsadf sjafgaksjfgas dfashdgfasldfas dfasdhfgasjdfgjsdgfjkasgdfasd
          asdfasfgljk
        </Card.Text> */}
      </Card.Body>
      {footer && (
        <Card.Footer className="text-white text-center">{footer}</Card.Footer>
      )}
    </Card>
  );
};

export default CardLogin;
