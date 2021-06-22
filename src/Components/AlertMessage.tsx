import React, { HTMLAttributes } from "react";
import { Alert, Button } from "reactstrap";

type varients =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface IAlertMessage extends HTMLAttributes<HTMLDivElement> {
  message: string;
  variant: varients;
  isOpen: boolean;
  handleIsOpen(isOpen: boolean): void;
}

const AlertMessage: React.FC<IAlertMessage> = ({
  message,
  variant,
  isOpen,
  handleIsOpen,
}) => {
  return (
    <Alert className={`alert-${variant}`} isOpen={isOpen}>
      <p>{message}</p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => handleIsOpen(false)}
          className={`btn-${variant}`}
        >
          Close Alert
        </Button>
      </div>
    </Alert>
  );
};

export default AlertMessage;
