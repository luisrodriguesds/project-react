import {Button, Card, CardBody, CardImg, CardTitle, Input, Row} from "reactstrap";
import React, {FunctionComponent, useState} from "react";
import {InputType} from "reactstrap/es/Input";

type TextDisplay= {value:string,type:InputType | undefined};
type SubmitButton={onSubmit:(subtitle:string,description:string)=>void,text:string}
type GenericProps={title:string,firstInput:string,img:string,secondInput:TextDisplay,button:SubmitButton}

const GenericCard : FunctionComponent<GenericProps>= ({children,title,firstInput,img,secondInput,button})=>{
    const [sub,setSub]= useState(firstInput)
    const [desc,setDesc]= useState(secondInput.value)
    return <Card style={{background:'#ecd3d3',height:"90%",width:'90%',position:"relative",top:"5%",bottom:"5%"}}>
        <CardImg top style={{height:'40%' }} src={img} alt="Card image cap" />
        <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
            <Row >
                <Input type="email" value={sub} onChange={event => setSub(event.target.value)}/>
            </Row>

            <Row >
                <Input type={secondInput.type} onChange={(event => setDesc(event.target.value))} value={desc}/>
            </Row>
            {children}
            <Button onClick={()=>button.onSubmit(sub,desc)}>{button.text}</Button>
        </CardBody>
    </Card>
}

export default GenericCard
