import React, { HTMLAttributes } from "react";
import { Modal as ModalWindow, Button, Image } from "react-bootstrap";

interface IModal extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  handleIsOpen: () => void;
  repository: {
    id: number;
    full_name: string;
    description: string;
    owner: {
      login?: string;
      avatar_url: string;
    };
  };
}

const ModalRepository: React.FC<IModal> = ({
  isOpen,
  handleIsOpen,
  repository,
}) => {
  return (
    <ModalWindow show={isOpen} onHide={handleIsOpen}>
      <ModalWindow.Header>
        <ModalWindow.Title>{repository.owner?.login}</ModalWindow.Title>
      </ModalWindow.Header>
      <ModalWindow.Body>
        <div className="text-center">
          <Image src={repository.owner.avatar_url} rounded />
        </div>
        <hr />
        <h2>{repository.full_name}</h2>
        {repository.description}
      </ModalWindow.Body>
      <ModalWindow.Footer>
        <Button variant="secondary" onClick={handleIsOpen}>
          Close
        </Button>
        <Button variant="secondary" onClick={handleIsOpen}>
          Start
          <i className="bi bi-star" style={{ marginLeft: "8px" }}></i>
        </Button>
      </ModalWindow.Footer>
    </ModalWindow>
  );
};

export default ModalRepository;
