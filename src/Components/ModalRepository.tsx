import React, { HTMLAttributes } from "react";
import { Modal as ModalWindow, Button, Image } from "react-bootstrap";
import { useAuth } from "../contexts/auth";
import { useStar } from "../contexts/star";

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
  const { user } = useAuth();
  const { handleStar, checkStar } = useStar();

  return (
    <ModalWindow show={isOpen} size="xl" onHide={handleIsOpen}>
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
        <Button
          variant="secondary"
          onClick={() =>
            handleStar({
              repository_id: repository.id,
              user_id: user.id,
            })
          }
        >
          Start
          <i
            className={`ml-sm bi ${
              checkStar({
                repository_id: repository.id,
                user_id: user.id,
              })
                ? `bi-star-fill`
                : `bi-star`
            }`}
          ></i>
        </Button>
      </ModalWindow.Footer>
    </ModalWindow>
  );
};

export default ModalRepository;
