import { useAuth } from "../contexts/auth";
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Input, InputGroup, InputGroupAddon, Pagination, PaginationItem,PaginationLink, Row} from "reactstrap";
import Card, {IInputCard} from "../Components/Card";

const userTOKEN='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';
const Catalog: React.FC = () => {
  const {checkIfFavorite,addFavorite,removeFavorite}=useAuth()
  const [page,setPage]=useState(1)
  const [query,setQuery] = useState('a')
  const [repos,setRepos]:[any[], React.Dispatch<React.SetStateAction<never[]>>] = useState([])

  const header=(res:any)=><React.Fragment>{res.name}
    <i style={{marginLeft:"10px",color:"yellow"}} onClick={()=>checkIfFavorite(res)?removeFavorite(res):addFavorite(res)} className={checkIfFavorite(res)?"bi bi-star-fill":"bi bi-star"}>

    </i></React.Fragment>
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
      <InputGroup style={{display:"flex",position:"fixed", width:"40%",top:'1%',left:'30%' }}>
        <Input onChange={event => setQuery(event.target.value)} />
        <InputGroupAddon addonType="append">
          <Button color={"secondary"}>Search!</Button>
        </InputGroupAddon>
      </InputGroup>
      <div className={'neumorphism'} style={{display:"flex",position:"fixed",inset: '10% 5% 15% 5%',flexDirection:"column",padding:"1%" }}>
        <Container style={{overflowY:"scroll",overflowX:"hidden"}}>
          <Row>
            {repos?.map(res => (<Col key={res.id} className="spacing" lg="3" sm="4" xs="12">
              <Card id={res.id +"card"} varient="light" className="p-4" header={header(res)}
                    style={{background:'#ecd3d3',height:"90%",width:'90%',position:"relative",top:"5%",bottom:"5%"}}
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
                    onSubmitForm={(data)=>console.log(data)}
                    buttonsubmit={{
                      label: "View more",
                      isLoading: false,
                    }}
              ></Card>

            </Col>))}
          </Row>
        </Container>
      </div>
      <Pagination aria-label="Page navigation example"  style={{display:"flex",position:"fixed", width:"40%",bottom:'2%',left:'35%' }}>
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
