import React, { HTMLAttributes } from "react";
import { Form } from "react-bootstrap";

import { Card } from "react-bootstrap";
import Button from "../Components/Button";

type varients =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

export interface IInputCard {
  name?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  type?: string;
}

interface ICard extends HTMLAttributes<HTMLDivElement> {
  header?: any;
  title?: string;
  varient: varients;
  footer?: string;
  image?: string;
  inputs?: IInputCard[];
  handleInput?: (input: IInputCard[]) => void;
  onSubmitForm?: (input: IInputCard[]) => void;
  buttonsubmit?: {
    label: string;
    isLoading: boolean;
  };
}

const CardLogin: React.FC<ICard> = ({
  header,
  title,
  footer,
  image,
  varient,
  children,
  className,
  inputs,
  handleInput,
  onSubmitForm,
  buttonsubmit,
  ...rest
}) => {
  function onChange(input: IInputCard, value: any) {
    const findInput = inputs?.find((item) => item.name === input.name);
    if (!findInput) {
      return;
    }
    const newInputs = inputs?.map((item) => {
      if (item.name === input.name) {
        return {
          ...item,
          value,
        };
      }
      return item;
    });
    handleInput && newInputs && handleInput(newInputs);
  }

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
        {inputs?.length && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitForm && onSubmitForm(inputs);
            }}
          >
            {inputs.map((input, i) => (
              <Form.Group
                key={`${i}`}
                className="mb-3"
              >
                <Form.Label>{input.label}</Form.Label>
                <Form.Control
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  onChange={(e) => onChange(input, e.target.value)}
                />
              </Form.Group>
            ))}

            <Button
              variant="dark"
              loading={buttonsubmit?.isLoading}
              title={buttonsubmit?.label || ""}
              type="submit"
              className="w-100"
            />
          </Form>
        )}
        {/* {children} */}
      </Card.Body>
      {footer && (
        <Card.Footer
          className={`${varient === "light" ? "dark" : "white"} text-center`}
        >
          {footer}
        </Card.Footer>
      )}
    </Card>
  );
};

export default CardLogin;
