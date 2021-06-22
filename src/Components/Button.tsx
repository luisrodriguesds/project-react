import React, { ButtonHTMLAttributes } from "react";

import { Button as Btn, Spinner } from "react-bootstrap";

type varients =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: varients;
  title: string;
  loading?: boolean;
}

const Button: React.FC<IButton> = ({
  title,
  variant,
  loading = false,
  ...rest
}) => {
  return (
    <Btn variant={variant} {...rest}>
      {!loading ? title : <Spinner animation="border" size="sm" />}
    </Btn>
  );
};

export default Button;
