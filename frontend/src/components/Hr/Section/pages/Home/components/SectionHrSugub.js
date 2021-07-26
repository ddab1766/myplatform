import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import SugubCard from "../../../../SugubCard";
import {getHrSugub,getSugub} from "../../../../../../actions/sugubActions";
import {connect} from "react-redux";
import LoaderSpinner from "../../../../../Etc/LoaderSpinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';

const ImageContainer = styled.div`
  margin: 0 16px;
  @media screen and (max-width:760px){
        margin: 0 13px;
    }
`;
const SectionHrSugub = (props) => {
    const [loginModal, setLoginModal] = useState(false);
    const [sugubs, setSugubs] = useState(null);
    const [loader, setLoader] = useState(false);
    const settings = {
        dots: true,
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
        getSugub().then((data) => {
            console.log(data.results)
            setSugubs(data.results)
            setLoader(false)
        }).catch(err => setLoader(false));
    },[]);

    // console.log('SectionHrSugub', sugubs);

    return !loader ? (sugubs && (
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
                  .slick-dots li{
                    margin:0;
                  }
                .section{
                padding: 30px 30px 0 30px;
                }
                 @media screen and (max-width:760px){
                    .section{
                    padding: 5px 0 0 0;
                    }
                    .slick-prev:before {
                    display:none;
                  }
                  .slick-next:before {
                    display:none;
                  }
                }
            `}</style>
            <div className="section" style={{
                marginTop: "0px",
                background:'#f8f9fa',
            }}>

            {/*<Container className="text-center">*/}
                <Slider {...settings}>
                    {sugubs.map((sugub, index)=>{
                        return (
                            <div  key={index}>
                                <ImageContainer>
                                    <SugubCard sugub={sugub} />
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
