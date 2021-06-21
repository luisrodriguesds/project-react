import React, {useEffect, useState} from 'react';
import GenericCard from "../Components/GenericCard";
import {
  Button,
  CardColumns, Col, Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Pagination,
  PaginationItem,
  PaginationLink, Row
} from "reactstrap";

// import { Container } from './styles';
const userTOKEN='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';
const Catalog: React.FC = () => {
  const [page,setPage]=useState(1)
  const [query,setQuery] = useState('a')
  const [repos,setRepos]:[any[], React.Dispatch<React.SetStateAction<never[]>>] = useState([])

  useEffect(()=>{
    fetch(`https://api.github.com/search/repositories?q=${query}&per_page=100&page=${page}`,
      {
        headers: {
          authorization: "token "+userTOKEN
        }
      }).then(res=>res.json()).then(res=>setRepos(res.items))
  },[query,page])

  return (
    <React.Fragment>
      <InputGroup style={{display:"flex",position:"fixed", width:"40%",top:'5%',left:'30%' }}>
        <Input onChange={event => setQuery(event.target.value)} />
        <InputGroupAddon addonType="append">
          <Button color={"secondary"}>Search!</Button>
        </InputGroupAddon>
      </InputGroup>
      <div className={'neumorphism'} style={{display:"flex",position:"fixed",inset: '15% 5% 10% 5%',flexDirection:"column" }}>
        <Container style={{padding:'1%',overflowY:"scroll"}}>
          <Row>
            {repos?.map(res => (<Col key={res.id} className="spacing" lg="3" sm="4" xs="12">
              <GenericCard button={{text: 'view',onSubmit:res => console.log(res)}} secondInput={{value:res.description?res.description:'',type:"textarea"}}
                           firstInput={res.full_name} img={res.owner.avatar_url} title={res.name} />
            </Col>))}
          </Row>
        </Container>
      </div>
      <Pagination aria-label="Page navigation example"  style={{display:"flex",position:"fixed", width:"40%",bottom:'2%',left:'30%' }}>
        <PaginationItem disabled={page===1} onClick={event => setPage(1)}>
          <PaginationLink first />
        </PaginationItem>
        <PaginationItem disabled={page===1} onClick={event => setPage(page-1)}>
          <PaginationLink previous/>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#" >{page}</PaginationLink>
        </PaginationItem>

        <PaginationItem disabled={page===10} onClick={event => setPage(page+1)}>
          <PaginationLink next  />
        </PaginationItem>
        <PaginationItem disabled={page===10} onClick={event => setPage(10)}>
          <PaginationLink last href="#" />
        </PaginationItem>
      </Pagination>
    </React.Fragment>
  );
};

export default Catalog;
