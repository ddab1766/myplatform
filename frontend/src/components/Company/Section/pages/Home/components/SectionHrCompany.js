import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import HrCard from "../../../../HrCard";
import {connect} from "react-redux";
import LoaderSpinner from "../../../../../Etc/LoaderSpinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import {getHrCard} from "../../../../../../actions/commonActions";

const ImageContainer = styled.div`
  margin: 0 16px;
`;
const SectionHrSugub = (props) => {
    const [loginModal, setLoginModal] = useState(false);
    const [hr, setHr] = useState(null);
    const [loader, setLoader] = useState(false);
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        // prevArrow: <SamplePrevArrow />,
        variableWidth: true,
        className: "slider variable-width slides",
    };
    useEffect(()=>{
        setLoader(true)
        console.log('???')
         getHrCard().then((data)=>{
         // getHrList().then((data)=>{
            setHr(data)
             setLoader(false)
        }).catch(err => setLoader(false));

    },[]);


    return !loader ? (hr && (
        <>
            <style jsx>{`
            
                  .slick-prev:before {
                    color:black;
                    font-size:1.5rem;
                  }
                  .slick-next:before {
                    color:black;
                    font-size:1.5rem;
                  }
                
            `}</style>
            <div className="section" style={{
                marginTop: "0px",
                padding: "30px 9px 0 30px",
            }}>

            {/*<Container className="text-center">*/}
                <Slider {...settings}>
                    {hr.map((val, index)=>{
                        return (
                            <div style={{ width: 270}} key={index}>
                                <ImageContainer>
                                    <HrCard hr={val} />
                                </ImageContainer>
                            </div>
                        )
                    })}
                </Slider>

            {/*</Container>*/}
            <br/>
        </div>
            </>
    )) : (<LoaderSpinner/>);
}


export default connect()(SectionHrSugub);
