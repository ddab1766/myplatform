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

const FEAURE_ITEMS = [
  'A lacus vestibulum sed arcu non odio euismod lacinia.',
  'In tellus integer feugiat scelerisque.',
  'Feugiat in fermentum posuere urna nec tincidunt',
];
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
    // centerMode: true,
    autoplay: true,
        // prevArrow: <SamplePrevArrow />,
        // variableWidth: true,
        // className: "slider variable-width slides",
    };
  return (
      <>
       <style jsx>{`
                  .slick-slider {
                    width:100%;
                    .slick-list{
                  padding:0 !important;
                  }
            `}</style>
    <S.Wrapper>
        <S.Label {...animatedItem[0]}>관리자 페이지</S.Label>
        <S.Title {...animatedItem[1]}>
          이력서 접수부터 합격자 관리 까지 <br />
          모두 관리자 페이지 처리
        </S.Title>
        <S.Description {...animatedItem[2]}>
          간편한 이력서접수, 채용의뢰서 조회, 합격자 관리를 간편하게 사용 가능합니다.
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
