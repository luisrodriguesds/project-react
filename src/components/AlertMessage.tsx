import React, { HTMLAttributes } from "react";
import { Alert } from "reactstrap";

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
      <div className="d-flex justify-content-between">
        {message}
        <span
          data-testid="btn-alert-close"
          onClick={() => handleIsOpen(false)}
          style={{ cursor: "pointer", lineHeight: "10px" }}
        >
          ×
        </span>
      </div>
    </Alert>
  );
};

export default AlertMessage;
