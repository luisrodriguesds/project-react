import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Input, Row} from "reactstrap";
import React, {useState} from "react";
import {InputType} from "reactstrap/es/Input";

type TextDisplay= {value:string,type:InputType | undefined}

const GenericCard = ({title,subtitle,img,description}:{title:string,subtitle:string,img:string,description:TextDisplay})=>{

    const [desc,setDesc]= useState(description.value)
    return <Card className="App-header">
        <CardImg top width="100%" src={img} alt="Card image cap" />
        <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
            <Row >
                <Input type="email" placeholder={subtitle} />
            </Row>

            <Row >
                <Input type={description.type} placeholder={description.value} onChange={(event => setDesc(description.type==="textarea"?desc:event.target.value))}>{desc}</Input>
            </Row>

            <Button>Button</Button>
        </CardBody>
    </Card>
}

export default GenericCard