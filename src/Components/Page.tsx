import React from 'react';
import {Pagination} from "react-bootstrap";

type paginationProps= {
  maxValue:number,
  value:number,
  onValueChange:(val:number)=>void
}

const Page: React.FC<paginationProps> = ({maxValue,value,onValueChange}) => {


  return (
    <React.Fragment>
      <Pagination style={{display:"flex",position:"fixed", width:"40%",bottom:'2%',left:'35%' }}>
        <Pagination.First onClick={()=>onValueChange(1)} disabled={value===1} />
        <Pagination.Prev onClick={()=>onValueChange(value-1)} disabled={value===1} />
        <Pagination.Item>{value}</Pagination.Item>

        <Pagination.Next onClick={()=>onValueChange(value+1)} disabled={value===maxValue} />
        <Pagination.Last onClick={()=>onValueChange(maxValue)} disabled={value===maxValue}/>
      </Pagination>
    </React.Fragment>
  );
};

export default Page;
