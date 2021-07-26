import React, {useState} from "react";
import {Icon, Pagination} from "rsuite";
import styled from "styled-components";
import useScroll from "./useScroll";

const StyleBtn = styled.div`
   position: fixed; 
  bottom: 2%; 
  z-index:9999;
  opacity: .5;
  cursor:pointer;
`;
const UpButton = () => {
const { y } = useScroll();
    return (
        <>
            <style jsx>{`
            .btn-up {
                position: fixed; 
                  bottom: 2%; 
                  z-index:9999;
                  opacity: .5;
                  cursor:pointer;
            }
            `}</style>
            {y > 500 && <div style={{textAlign:'center'}}>
            <Icon icon="chevron-circle-up"   className="btn-up" size="3x" onClick={()=>window.scrollTo(0, 0)}/>
        </div>}
            </>
    )
}


export default UpButton;
