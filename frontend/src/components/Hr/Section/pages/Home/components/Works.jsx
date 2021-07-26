import React from 'react';
import styled from 'styled-components';
import {worksImage01, worksImage02, worksImage03} from '../../../assets';
import {Button} from '../../../components';
import {useScrollFadeIn} from '../../../hooks';
import SectionHrSugub from "./SectionHrSugub";
import {Container, Modal} from "reactstrap";
import {Link} from "react-router-dom";
import PopupLogin from "../../../../../auth/PopupLogin";
import {connect} from "react-redux";

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

const WORKS_ITEMS = [
  {
    image: worksImage01,
    title: 'Volutpat odio',
    label: 'Dec 14th, 2019',
    description:
        'Facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing. In hac habitasse platea dictumst.',
  },
  {
    image: worksImage02,
    title: 'Arcu ac tortor dignissim',
    label: 'Dec 14th, 2019',
    description:
        'Convallis aenean et tortor at. Pretium viverra suspendisse potenti nullam ac tortor vitae purus.',
  },
  {
    image: worksImage03,
    title: 'Eros donec ac odio',
    label: 'Dec 14th, 2019',
    description:
        'Tempor orci dapibus ultrices. Elementum nibh tellus molestie nunc. Et magnis dis parturient montes nascetur.',
  },
];

const Works = (props) => {
  const [loginModal, setLoginModal] = React.useState(false);
  const toggleModalLogin = () => setLoginModal(!loginModal)
  const animatedItem = {
    0: useScrollFadeIn('down', 1),
    1: useScrollFadeIn('down', 1, 0.2),
    2: useScrollFadeIn('down', 1, 0.4),
  };

  const renderButton = () => {
    if(!props.authenticated) {
      return (
          <Button fill="outline"
                  style={{marginBottom: '2rem'}}
                  onClick={toggleModalLogin}
          >더 많은 의뢰서보기</Button>
      )
    }else if(props.hr === null) {
      return (
          <Link to="/Hr/SugubList">
            <Button fill="outline"
                    style={{marginBottom: '2rem'}}
            >더 많은 의뢰서보기</Button>
          </Link>
      )
    }else if(props.hr !== null) {
      return (
          <Link to="/Hr/SugubList">
            <Button fill="outline"
                    style={{marginBottom: '2rem'}}
            >더 많은 의뢰서보기</Button>
          </Link>
      )
    }
  }

  return (
      <S.Wrapper style={{maxWidth:'none'}}>
        <Container style={{textAlign:'center',padding:0}}>
          <S.Label {...animatedItem[0]}>다양한 직종의 채용의뢰</S.Label>
          <S.Title {...animatedItem[1]}>
            인사담당자들의 채용의뢰를<br />
            한곳에 모아,
          </S.Title>
          <S.Description {...animatedItem[2]}>
            확보하고 있는 인재를 접수하여 계약을 체결하세요.
          </S.Description>
          <S.List>
            <SectionHrSugub />
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

          {renderButton()}

          <Modal isOpen={loginModal} style={{width: '368px'}} toggle={toggleModalLogin}>
            <PopupLogin loginSubmit={toggleModalLogin} toggle={toggleModalLogin} url={'Hr'}/>
          </Modal>
        </Container>
      </S.Wrapper>
  );
};


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    hr: state.auth.hr,
  }
}

export default connect(mapStateToProps)(Works);
