import React from 'react';
import styled from 'styled-components';
import {manageImage1, manageImage2, manageImage3} from '../../../assets';
import {useScrollFadeIn} from '../../../hooks';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const S = {
  Wrapper: styled.section`
     width: 100%;
    max-width: 1180px;
    margin: auto;
    padding: 120px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Label: styled.p`
    display: inline-block;
    ${props => props.theme.typography.label};
    color: ${props => props.theme.palette.primary};
    margin-bottom: 1rem;
  `,
  Title: styled.h2`
    ${props => props.theme.typography.subtitle};
    color: ${props => props.theme.palette.black};
    margin-bottom: 1rem;
    text-align:center;
  `,
  Description: styled.p`
    ${props => props.theme.typography.description};
    color: ${props => props.theme.palette.black};
    margin-bottom: 2rem;
  `,
  List: styled.ul`
    width: fit-content;
    margin-bottom: 2rem;
  `,
  ListItem: styled.p`
    ${props => props.theme.typography.description};
    padding: 1rem 1rem 1rem 0;
    border-bottom: 1px solid ${props => props.theme.palette.lightgray};
    span {
      color: ${props => props.theme.palette.secondary};
    }
  `,
  TextButton: styled.button`
    width: fit-content;
    ${props => props.theme.typography.textbutton};
    color: ${props => props.theme.palette.secondary};
    cursor: pointer;
  `,
  Image1: styled.div`
    height: 472px ;
    background: no-repeat center/contain url(${manageImage1});
    @media screen and (max-width: 760px){
    height: 46vh;
    }
  `,
  Image2: styled.div`
    height: 472px ;
    background: no-repeat center/contain url(${manageImage2});
    @media screen and (max-width: 760px){
    height: 46vh;
    }
  `,
  Image3: styled.div`
    height: 472px ;
    background: no-repeat center/contain url(${manageImage3});
    @media screen and (max-width: 760px){
    height: 46vh;
    }
  `,
};


const ImageContainer = styled.div`
  margin: 0 50px;
   @media screen and (max-width: 760px){
    margin: 0;
    }
`;
const Feature = () => {
   const animatedItem = {
    0: useScrollFadeIn('down', 1),
    1: useScrollFadeIn('down', 1, 0.2),
    2: useScrollFadeIn('down', 1, 0.4),
  };
  const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
      autoplay: true,
    // centerMode: true,
      // variableWidth: true,
    // autoplay: true,
        // prevArrow: <SamplePrevArrow />,
        // className: "slider variable-width slides",
    };
  return (
      <>
       <style jsx>{`
                  .slick-slider {
                    width:100%;
                  }
                  .slick-list{
                  padding:0 !important;
            `}</style>
    <S.Wrapper>
        <S.Label {...animatedItem[0]}>플랫폼 특징</S.Label>
        <S.Title {...animatedItem[1]}>
          B2B채용에 필요한 모든 <br />
          과정을 플랫폼에서,
        </S.Title>
        <S.Description {...animatedItem[2]}>
          간편한 의뢰요청, 지원자 관리, 의뢰관리등 서비스를 제공합니다.
        </S.Description>
      <Slider {...settings}>
        <div>
          <ImageContainer>
            <S.Image1 />
          </ImageContainer>
        </div>
        <div>
          <ImageContainer>
            <S.Image2 />
          </ImageContainer>
        </div>
        <div>
          <ImageContainer>
            <S.Image3 />
          </ImageContainer>
        </div>
      </Slider>
    </S.Wrapper>
      </>
  );
};

export default Feature;
