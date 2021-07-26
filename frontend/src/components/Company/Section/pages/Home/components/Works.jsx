import React from 'react';
import styled from 'styled-components';
import {Button} from '../../../components';
import {useScrollFadeIn} from '../../../hooks';
import SectionHrCompany from "../../../../../Company/Section/pages/Home/components/SectionHrCompany";
import {Container} from "reactstrap";
import {Link} from "react-router-dom";

const S = {
  Wrapper: styled.section`
    width: 100%;
    max-width: 1180px;
    margin: auto;
    padding: 120px 15px;
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
    text-align: center;
    margin-bottom: 1rem;
  `,
  Description: styled.p`
    ${props => props.theme.typography.description};
    color: ${props => props.theme.palette.black};
    // margin-bottom: 4rem;
  `,
  List: styled.ul`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-inline-start: 0px;
    display: inline-block;
    // margin-bottom: 4rem;
  `,
  ListItem: styled.li`
    width: 380px;
    box-shadow: 0 0 16px 8px rgba(0, 0, 0, 0.03);
    border-radius: 0.5rem;
  `,
  ItemImage: styled.div`
    width: 100%;
    height: 380px;
    border-radius: 0.5rem 0.5rem 0 0;
    background: no-repeat center/cover url(${props => props.image});
  `,
  TextContainer: styled.div`
    padding: 2rem;
  `,
  ItemTitle: styled.h3`
    ${props => props.theme.typography.heading};
    color: ${props => props.theme.palette.black};
    margin-bottom: 0.75rem;
  `,
  ItemLabel: styled.p`
    ${props => props.theme.typography.caption};
    color: ${props => props.theme.palette.gray};
    font-weight: 400;
    margin-bottom: 1.5rem;
  `,
  ItemDesciption: styled.p`
    ${props => props.theme.typography.description};
    margin-bottom: 1.5rem;
  `,
  TextButton: styled.button`
    width: fit-content;
    padding: 0;
    ${props => props.theme.typography.textbutton};
    color: ${props => props.theme.palette.secondary};
    cursor: pointer;
  `,
};



const Works = () => {
  const animatedItem = {
    0: useScrollFadeIn('down', 1),
    1: useScrollFadeIn('down', 1, 0.2),
    2: useScrollFadeIn('down', 1, 0.4),
  };

  return (
      <S.Wrapper style={{background:'white',maxWidth:'none'}}>
        <Container style={{textAlign:'center'}}>
          <S.Label {...animatedItem[0]}>파트너스</S.Label>
          <S.Title {...animatedItem[1]}>
            여러 HR전문회사들이
            함께하고 있습니다.
          </S.Title>
          <S.Description {...animatedItem[2]}>
            원하시는 HR전문회사를 선택해 계약을 체결해보세요.
          </S.Description>
          <S.List>
            <SectionHrCompany />
            {/*{WORKS_ITEMS.map((item, index) => (*/}
            {/*  <S.ListItem key={item.title} {...animatedItem[index]}>*/}
            {/*    <S.ItemImage image={item.image} />*/}
            {/*    <S.TextContainer>*/}
            {/*      <S.ItemTitle>{item.title}</S.ItemTitle>*/}
            {/*      <S.ItemLabel>{item.label}</S.ItemLabel>*/}
            {/*      <S.ItemDesciption>{item.description}</S.ItemDesciption>*/}
            {/*      <S.TextButton>Read more</S.TextButton>*/}
            {/*    </S.TextContainer>*/}
            {/*  </S.ListItem>*/}
            {/*))}*/}
          </S.List>
          <Link to={'/Company/Partners'}> <Button fill="outline" style={{marginBottom: '2rem'}}>더 많은 파트너스보기</Button></Link>
        </Container>
      </S.Wrapper>
  );
};

export default Works;
