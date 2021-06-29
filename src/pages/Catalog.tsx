import { useAuth } from "../contexts/auth";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, ButtonGroup, Card } from "react-bootstrap";
// import Card from "../Components/Card";
// import Page from "../Components/Page";
import ModalRepository from "../Components/ModalRepository";
import Template from "../weigets/Template";
import { searchRepositories } from "../services/githubApi";

interface IRepository {
  id: number;
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
  };
}

const Catalog: React.FC = () => {
  const { checkIfFavorite, addFavorite, removeFavorite } = useAuth();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("a");
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

  // const header = (res: any) => (
  //   <React.Fragment>
  //     {res.name}
  //     <i
  //       style={{ marginLeft: "10px", color: "yellow" }}
  //       onClick={() =>
  //         checkIfFavorite(res) ? removeFavorite(res) : addFavorite(res)
  //       }
  //       className={checkIfFavorite(res) ? "bi bi-star-fill" : "bi bi-star"}
  //     ></i>
  //   </React.Fragment>
  // );
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
      {/* <Modal show={modalShow}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            id={modalInfo?.id + "card"}
            varient="light"
            className="p-4"
            header={header(modalInfo)}
            style={{
              background: "#ecd3d3",
              height: "90%",
              width: "90%",
              position: "relative",
              top: "5%",
              bottom: "5%",
            }}
            image={modalInfo?.owner?.avatar_url}
            inputs={[
              {
                name: "Full name",
                value: modalInfo.full_name,
                placeholder: modalInfo.full_name,
                label: "Full name",
                type: "text",
              },
              {
                name: "Description",
                value: modalInfo.description,
                placeholder: modalInfo.description,
                label: "Description",
                type: "textarea",
              },
            ]}
            onSubmitForm={() => setModal(false)}
            buttonsubmit={{
              label: "Close",
              isLoading: false,
            }}
          ></Card>
        </Modal.Body>
      </Modal> */}
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
                  <Button variant="secondary">
                    Start
                    <i className="bi bi-star" style={{ marginLeft: "8px" }}></i>
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <div
        className="neumorphism mt-4"
        style={{
          // position: "fixed",
          // inset: "10% 5% 15% 5%",
          padding: "1%",
        }}
      >
        <Container
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: "calc(100vh - 180px)",
          }}
        >
          <Row>
            {repos?.map((res) => (
              <Col key={res.id} className="spacing mb-4" lg="4" sm="4" xs="12">
                <Card
                  id={res.id + "card"}
                  varient="light"
                  className="p-4"
                  header={header(res)}
                  style={{
                    background: "#ecd3d3",
                    position: "relative",
                    top: "5%",
                    bottom: "5%",
                  }}
                  image={res.owner.avatar_url}
                  inputs={[
                    {
                      name: "Full name",
                      value: res.full_name,
                      placeholder: res.full_name,
                      label: "Full name",
                      type: "text",
                    },
                    {
                      name: "Description",
                      value: res.description,
                      placeholder: res.description,
                      label: "Description",
                      type: "textarea",
                    },
                  ]}
                  onSubmitForm={(data) => {
                    setModalInfo(res);
                    setModal(true);
                  }}
                  buttonsubmit={{
                    label: "View more",
                    isLoading: false,
                  }}
                ></Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Page maxValue={10} value={page} onValueChange={(val) => setPage(val)} /> */}
    </Template>
  );
};

export default Catalog;
