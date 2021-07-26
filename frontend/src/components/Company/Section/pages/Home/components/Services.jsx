import React from 'react';
import styled from 'styled-components';
import {useScrollFadeIn} from '../../../hooks';
import {serviceImage01, serviceImage02, serviceImage03} from '../../../assets';

const S = {
  Wrapper: styled.section`
    width: 100%;
    max-width: 1180px;
    margin: auto;
    padding: 120px 0;
    // margin-top: 680px;
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
    margin-bottom: 4rem;
  `,
  ItemWrapper: styled.ul`
    padding:0px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  `,
  ItemBox: styled.li`
    width: 380px;
    padding: 3rem 2rem;
    text-align: center;
    background-color: ${props => props.theme.palette.white};
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 16px 8px rgba(0, 0, 0, 0.03);
    border-radius: 0.5rem;
    margin-bottom:1rem;
  `,
  ItemTitle: styled.h3`
    ${props => props.theme.typography.heading};
    color: ${props => props.theme.palette.black};
    margin-bottom: 1rem;
  `,
  ItemDescription: styled.p`
    ${props => props.theme.typography.description};
    margin-bottom: 1.5rem;
  `,
  ItemImage: styled.div`
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
    align-self: center;
    border-radius: 0.5rem 0.5rem 0 0;
    background: no-repeat center/cover url(${props => props.image});
  `,
  ItemButton: styled.button`
    ${props => props.theme.typography.textbutton};
    color: ${props => props.theme.palette.secondary};
    margin-top: auto;
    cursor: pointer;
  `,
};

const SERVICES_ITEMS = [
  {
    title: '인사담당자',
    description:
      '간단히 채용의뢰서를 작성하여 인력을 요청함으로써, 여러 HR전문회사로부터 양질의 이력서를 한 곳에 모아 채용과정시 발생하는 기회비용을 절감할 수 있습니다.',
    button: '시작하기',
    image:serviceImage01
  },
    {
    title: '플랫폼',
    description:
      '인사담당자, HR전문회사등 채용 채널들을 한 공간에 모아 온디맨드 서비스를 제공함으로써, 채용을 쉽게 할 수 있도록 클라우드 마켓 플레이스를 제공합니다.',
    button: '시작하기',
    image:serviceImage03
  },
  {
    title: 'HR전문회사',
    description:
      '인사담당자들이 작성한 채용의뢰서 리스트에 확보하고 있는 인재를 제안함으로써, 영업비용을 절감하여 계약을 체결할 수 있습니다.',
    button: '시작하기',
    image:serviceImage02
  },

];

const Services = () => {
  const animatedItem = {
    0: useScrollFadeIn('up', 1, 0),
    1: useScrollFadeIn('up', 1, 0),
    2: useScrollFadeIn('up', 1, 0),
  };

  return (
    <S.Wrapper>
      <S.Label>제공 서비스</S.Label>
      <S.Title>
        B2B 채용 마켓플레이스
        {/*<br />*/}
        {/* 클라우드 마켓 플레이스,*/}
      </S.Title>
      <S.ItemWrapper>
        {SERVICES_ITEMS.map((item, index) => (
          <S.ItemBox key={item.title} {...animatedItem[index]}>
            <S.ItemImage image={item.image} />
            <S.ItemTitle>{item.title}</S.ItemTitle>
            <S.ItemDescription>{item.description}</S.ItemDescription>
            {/*<S.ItemButton>{item.button}</S.ItemButton>*/}
          </S.ItemBox>
        ))}
      </S.ItemWrapper>
    </S.Wrapper>
  );
};

export default Services;
