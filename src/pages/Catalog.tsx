import { useAuth } from "../contexts/auth";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Card from "../Components/Card";
import Template from "../weigets/Template";

const userTOKEN = `${process.env.REACT_APP_GITHUB_TOKEN}`;
const Catalog: React.FC = () => {
  const { checkIfFavorite, addFavorite, removeFavorite } = useAuth();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("a");
  const [repos, setRepos]: [
    any[],
    React.Dispatch<React.SetStateAction<never[]>>
  ] = useState([]);

  const header = (res: any) => (
    <React.Fragment>
      {res.name}
      <i
        style={{ marginLeft: "10px", color: "yellow" }}
        onClick={() =>
          checkIfFavorite(res) ? removeFavorite(res) : addFavorite(res)
        }
        className={checkIfFavorite(res) ? "bi bi-star-fill" : "bi bi-star"}
      ></i>
    </React.Fragment>
  );
  useEffect(() => {
    fetch(
      `https://api.github.com/search/repositories?q=${query}&per_page=10&page=${page}`,
      {
        headers: {
          authorization: "token " + userTOKEN,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setRepos(res.items));
  }, [query, page]);

  return (
    <Template>
      <Row>
        <Col sm="12" lg="6" md="8" className="mx-auto">
          <InputGroup>
            <Input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Repo on Github!"
            />
            <InputGroupAddon addonType="append">
              <Button color="secondary">Search!</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      <div
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
                  onSubmitForm={(data) => console.log(data)}
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
      <Pagination
        aria-label="Page navigation example"
        style={{
          display: "flex",
          position: "fixed",
          width: "40%",
          bottom: "2%",
          left: "35%",
        }}
      >
        <PaginationItem disabled={page === 1} onClick={(event) => setPage(1)}>
          <PaginationLink first />
        </PaginationItem>
        <PaginationItem
          disabled={page === 1}
          onClick={(event) => setPage(page - 1)}
        >
          <PaginationLink previous />
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">{page}</PaginationLink>
        </PaginationItem>

        <PaginationItem
          disabled={page === 10}
          onClick={(event) => setPage(page + 1)}
        >
          <PaginationLink next />
        </PaginationItem>
        <PaginationItem disabled={page === 10} onClick={(event) => setPage(10)}>
          <PaginationLink last href="#" />
        </PaginationItem>
      </Pagination>
    </Template>
  );
};

export default Catalog;
