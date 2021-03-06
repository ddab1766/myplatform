import React, {useEffect} from "react";
import "assets/css/paper-dashboard_mng.css"
import ChannelService from "./ChannelService";
import {getComCode} from "../actions/commonActions";
import {connect} from "react-redux";
import styled from "styled-components";
import {Link} from "react-router-dom";

const S = {
    Header: styled.h1`
     width: 100%;
    max-width: 1180px;
    margin: auto;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    text-align:center;
    `,
    HeaderDes:styled.div`
    text-align:center;
    padding-top:1rem;
    padding-bottom:2rem;
    font-size:1rem;
    line-height:2rem;
    `,
    Wrapper: styled.section`
    width: 100%;
    max-width: 974px;
    margin: auto;
    padding: 120px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 500px){
    padding:50px 0;
    }
  `,
    Title: styled.h2`
  font-weight:bold;
  padding-top:5rem;
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
    @media screen and (max-width:760px){
        justify-content:center;
    }
  `,
    ItemBox: styled.li`
    width: 296px;
    height:280px;
    padding: 5rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    // box-shadow: 0 0 16px 8px rgba(0, 0, 0, 0.03);
    // border-radius: 0.5rem;
    border:3px solid rgba(255,255,255,0.25);
    transition: 0.4s all ease;
    margin-bottom: 1rem;
    
    &:hover{
     background-color: #ffffff;
    color: #252525;
    transition: 0.4s all ease;
    cursor:pointer;
    transform: scale(1.1);
    }
  `,

    ItemTitle: styled.h3`
    margin-bottom: 1rem;
    font-weight:bold;
    font-size:1.5rem;
    // color: #6bd098;
  `,
    ItemDescription: styled.p`
    margin-bottom: 1.5rem;
  `,
    ItemButton: styled.button`
    margin-top: auto;
    cursor: pointer;
  `,
};


const SelectIndex = ( props ) => {

    const channelTalk = () => {
        if(window.location.pathname.match('/')) {
            return (
                ChannelService.shutdown()
            )
        }
    };
    // ????????????
    useEffect(()=>{
        // console.log('length:',props.comcode.length)
        if(props.comcode) return;
        getComCode()
    },[]);

    return (
        <>
            <style jsx>{`
                 .item-btn{
                 background-color:#ffffff;
                 border-color:#ffffff !important;
                 }
                 a{
                 color:#ffffff;
                 }
                 a:hover {
                color: #ffffff;
                text-decoration: none;
                 }
            `}</style>
            { channelTalk() }

            {/*<Navbar className={classnames("fixed-top", '')} expand="lg">*/}
            {/*    <Container>*/}

            {/*        <div className="navbar-translate">*/}
            {/*            <Link to={'/'}>*/}
            {/*                <NavbarBrand*/}
            {/*                    data-placement="bottom"*/}
            {/*                    title="*For Employee"*/}
            {/*                >CHAEGONG*/}
            {/*                </NavbarBrand>*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*    </Container>*/}
            {/*</Navbar>*/}
            <div className="main-canvas"  style={{
                color: '#FFFFFF',
                backgroundImage: "url(" + require("../assets/img/sec-bg.jpg") + ")",
                backgroundSize: 'cover',
                height: '100vh',
                top: '-50px',
                position: 'relative',
                overflowX:'hidden',
            }}>


                <S.Wrapper>
                    <S.Title>
                        ?????? ????????? ???????????????????
                    </S.Title>
                    <S.ItemWrapper>
                        <S.ItemBox>
                            <S.ItemTitle>?????????</S.ItemTitle>
                            <S.ItemDescription>- ????????? -</S.ItemDescription>
                        </S.ItemBox>
                        <Link to='/Company'>
                            <S.ItemBox>
                                <S.ItemTitle>???????????????</S.ItemTitle>
                                <S.ItemDescription>??????????????? ?????? ????????? <br/>???????????????</S.ItemDescription>
                                {/*<Button className="item-btn btn-outline-default btn-round">????????????</Button>*/}
                            </S.ItemBox>
                        </Link>
                        <Link to='/Hr'>
                            <S.ItemBox>
                                <S.ItemTitle>???????????????</S.ItemTitle>
                                <S.ItemDescription>????????????????????? ???????????????<br/> ????????? ???????????????</S.ItemDescription>
                                {/*<Button className="item-btn btn-outline-default btn-round">????????????</Button>*/}
                            </S.ItemBox>
                        </Link>
                    </S.ItemWrapper>
                     <S.Header>
                    <S.HeaderDes>
                        ??????????????? ?????? ???????????? ??? ????????? ?????? ???????????? ???????????? ??????????????????, <br/>????????? ????????? ?????? ??? ??? ????????? ???????????? ?????? ??????????????? ???????????????.
                    </S.HeaderDes>
                </S.Header>
                </S.Wrapper>

            </div>

            {/*<div className=""*/}
            {/*     style={{backgroundColor:"#1d4354", height:"344px", marginTop: "-50px"}}*/}
            {/*>*/}
            {/*    <Container>*/}
            {/*        <NavbarBrand*/}
            {/*            data-placement="bottom"*/}
            {/*            title="*For Employee"*/}
            {/*        >*/}
            {/*            <NavbarBrand*/}
            {/*                data-placement="bottom"*/}
            {/*                title="*For Employee"*/}
            {/*            >*/}
            {/*                <font color="#ffffff">CHAEGONG</font>*/}
            {/*            </NavbarBrand>*/}
            {/*        </NavbarBrand>*/}
            {/*    </Container>*/}
            {/*</div>*/}
            {/*<div className=""*/}
            {/*     style={{marginLeft:"5%", marginRight:"5%", marginTop: "-250px"}}*/}
            {/*>*/}
            {/*    <Container>*/}
            {/*        <Row>*/}
            {/*            <Col md="12">*/}
            {/*                <Card className="main-icons" style={{backgroundColor:"#ffffff"}}>*/}
            {/*                    <CardHeader>*/}
            {/*                        <div className="text-center">*/}
            {/*                            <h3>*/}
            {/*                                ?????? ????????? ???????????????????*/}
            {/*                                /!*<br/>*!/*/}
            {/*                                /!*<small>asdf???</small>*!/*/}
            {/*                            </h3>*/}
            {/*                        </div>*/}
            {/*                    </CardHeader>*/}
            {/*                    <CardBody className="all-icons">*/}
            {/*                        <div id="icons-wrapper">*/}
            {/*                            <section>*/}
            {/*                                <ul>*/}
            {/*                                    <Row>*/}
            {/*                                        <Col md="4">*/}
            {/*                                            <Link to={''}>*/}
            {/*                                                <li>*/}
            {/*                                                    <div className="card-icon icon-primary">*/}
            {/*                                                        <i className="nc-icon nc-box"/>*/}
            {/*                                                    </div>*/}
            {/*                                                    <h6>*/}
            {/*                                                        ?????????????????? <br/>*/}
            {/*                                                        <div className="description">(????????? ?????????)</div>*/}
            {/*                                                    </h6>*/}
            {/*                                                </li>*/}

            {/*                                            </Link>*/}
            {/*                                        </Col>*/}
            {/*                                        <Col md="4">*/}
            {/*                                            <Link to='/Company'>*/}
            {/*                                                <li>*/}
            {/*                                                    <div className="card-icon icon-primary">*/}
            {/*                                                        <i className="nc-icon nc-spaceship"/>*/}
            {/*                                                    </div>*/}
            {/*                                                    <h6>*/}
            {/*                                                        ?????????????????? ???????????????<br/>*/}
            {/*                                                        <div className="description">(???????????????, ...)</div>*/}
            {/*                                                    </h6>*/}
            {/*                                                </li>*/}

            {/*                                            </Link>*/}
            {/*                                        </Col>*/}
            {/*                                        <Col md="4">*/}
            {/*                                            <Link to='/Hr'>*/}
            {/*                                                <li>*/}
            {/*                                                    <div className="card-icon icon-primary">*/}
            {/*                                                        <i className="nc-icon nc-spaceship"/>*/}
            {/*                                                    </div>*/}
            {/*                                                    <h6>*/}
            {/*                                                        ??????????????? ????????? ?????????<br/>*/}
            {/*                                                        <div className="description">(HR??????, ???????????? ...)</div>*/}
            {/*                                                    </h6>*/}
            {/*                                                </li>*/}

            {/*                                            </Link>*/}
            {/*                                        </Col>*/}
            {/*                                    </Row>*/}
            {/*                                </ul>*/}
            {/*                            </section>*/}
            {/*                        </div>*/}
            {/*                    </CardBody>*/}
            {/*                    <CardFooter>*/}
            {/*                        /!*{' '}<br/>*!/*/}
            {/*                    </CardFooter>*/}
            {/*                </Card>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Container>*/}
            {/*</div>*/}
            {/*<div className="section section-dark">*/}
            {/*    <div className="text-center">*/}
            {/*        Trusted By 1 businesses<br/>*/}
            {/*        KT M&S...*/}
            {/*    </div>*/}
            {/*</div>*/}

        </>
    )
};

// export default SelectIndex;

function mapStateToProps(state) {
    return {
        comcode: state.comcode.comcode
    }
}
// export default App
export default connect(mapStateToProps)(SelectIndex);