import { useAuth } from "../contexts/auth";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, ButtonGroup, Card } from "react-bootstrap";
// import Card from "../Components/Card";
// import Page from "../Components/Page";
import ModalRepository from "../Components/ModalRepository";
import Template from "../weigets/Template";
import { searchRepositories } from "../services/githubApi";
import { useStar } from "../contexts/star";

interface IRepository {
  id: number;
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
  };
}

const Catalog: React.FC = () => {
  const { handleStar, checkStar } = useStar();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("abc");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCurrentItem, setModalCurrentItem] = useState<IRepository>({
    id: 0,
    full_name: "",
    description: "",
    owner: {
      avatar_url: "",
    },
  });
  const [repos, setRepos] = useState<IRepository[]>([]);

  // useEffect(() => {
  //   fetch(
  //     `https://api.github.com/search/repositories?q=${query}&per_page=10&page=${page}`,
  //     {
  //       headers: {
  //         authorization: "token " + userTOKEN,
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => setRepos(res.items));
  // }, [query, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchRepositories({
        repository: query,
      }).then((response) => {
        setRepos(response.items as any);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [query]);

  function handleSetCurrentRepository(repository: IRepository) {
    setModalCurrentItem(repository);
    handleModalIsOpen();
  }

  function handleModalIsOpen() {
    setModalIsOpen(!modalIsOpen);
  }

  function textLimit(text: string) {
    if (!text) {
      return "";
    }
    return text.length >= 36 ? `${text.substring(0, 36)} ...` : text;
  }

  return (
    <Template>
      <ModalRepository
        isOpen={modalIsOpen}
        handleIsOpen={handleModalIsOpen}
        repository={modalCurrentItem}
      />
      <Row className="mb-4">
        <Col sm="12" lg="6" md="8" className="mx-auto d-flex">
          <Form.Control
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Repo on Github!"
            className=""
          />
          <Button variant="secondary" style={{ flex: "1" }}>
            Search!
          </Button>
        </Col>
      </Row>
      <Row>
        {repos.map((repository) => (
          <Col sm="12" lg="4" md="4" key={`${repository.id}`} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`${repository.owner.avatar_url}`}
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{repository.full_name}</Card.Title>
                <Card.Text className="">
                  {textLimit(repository.description) || "None description"}
                </Card.Text>
                <ButtonGroup aria-label="Basic example" className="w-100">
                  <Button
                    variant="secondary"
                    style={{ borderRight: "2px solid white" }}
                    onClick={() => handleSetCurrentRepository(repository)}
                  >
                    View
                    <i
                      className="bi bi-window"
                      style={{ marginLeft: "8px" }}
                    ></i>
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
                      className={`bi ${
                        checkStar({
                          repository_id: repository.id,
                          user_id: user.id,
                        })
                          ? `bi-star-fill`
                          : `bi-star`
                      }`}
                      style={{ marginLeft: "8px" }}
                    ></i>
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/*
      <Page maxValue={10} value={page} onValueChange={(val) => setPage(val)} /> */}
    </Template>
  );
};

export default Catalog;
