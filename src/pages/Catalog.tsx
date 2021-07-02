import React, { useEffect, useState } from "react";

import { useAuth } from "../contexts/auth";
import {
  Button,
  Col,
  Form,
  Row,
  ButtonGroup,
  Card,
  Spinner,
} from "react-bootstrap";
import { searchRepositories } from "../services/githubApi";
import { useStar } from "../contexts/star";

import ModalRepository from "../components/ModalRepository";
import Template from "../components/Template";
import Paginate from "../components/Paginate";

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

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingRepository, setLoadingRepository] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
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
    setLoadingRepository(true);
    const timer = setTimeout(() => {
      searchRepositories({
        repository: query,
        perPage,
        page,
      })
        .then((response) => {
          setRepos(response.items);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoadingPage(false);
          setLoadingRepository(false);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, [query, perPage, page]);

  // Go to the first page when the user is typing
  useEffect(() => {
    setPage(1);
  }, [query]);

  function handleSetCurrentRepository(repository: IRepository) {
    setModalCurrentItem(repository);
    handleModalIsOpen();
  }

  function handleModalIsOpen() {
    setModalIsOpen(!modalIsOpen);
  }

  function textLimit(text: string, limit = 36) {
    if (!text) {
      return "";
    }
    return text.length >= limit ? `${text.substring(0, limit)} ...` : text;
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
      {loadingPage && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      )}
      <div className={loadingPage === true ? "d-none" : "d-block"}>
        {loadingRepository && (
          <div className="d-flex justify-content-center mb-4">
            <Spinner animation="border" />
          </div>
        )}
        <Row>
          {repos.map((repository, i) => (
            <Col
              sm="12"
              lg="4"
              md="4"
              key={`${repository.id}`}
              className="mb-4"
              data-testid={`repo-item-${i + 1}`}
            >
              <Card className="card-shadow">
                <Card.Img
                  variant="top"
                  src={`${repository.owner.avatar_url}`}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>{textLimit(repository.full_name, 26)}</Card.Title>
                  <Card.Text className="height-desction-card">
                    {textLimit(repository.description, 52) ||
                      "None description"}
                  </Card.Text>
                  <ButtonGroup aria-label="Basic example" className="w-100">
                    <Button
                      variant="secondary"
                      className="btn-line-group"
                      onClick={() => handleSetCurrentRepository(repository)}
                    >
                      View
                      <i className="bi bi-window ml-sm"></i>
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
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {loadingRepository && (
          <div className="d-flex justify-content-center mt-4">
            <Spinner animation="border" />
          </div>
        )}
        <Row>
          <Col lg="3">
            <select
              className="form-select"
              onChange={(e) => setPerPage(Number(e.target.value))}
              value={perPage}
            >
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
              <option value="15">15</option>
            </select>
          </Col>
          <Col className="d-flex justify-content-end">
            <Paginate handleCurrentPage={setPage} currentPage={page} />
          </Col>
        </Row>
      </div>
    </Template>
  );
};

export default Catalog;
