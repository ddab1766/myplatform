import React, {useEffect, useState} from 'react';
import {Col, Container, ListGroup, ListGroupItem, Row} from 'reactstrap';
import {Link} from "react-router-dom";
import {JIKJONGTOP_SIMPLE} from "../../variables/common";
import {AuthUrls} from "../../constants/urls";
import axios from 'axios'
import TextField from "@material-ui/core/TextField";
import {COMPANY_JIKJONG} from "../../variables/frequency_jikjong";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

function HrMainSearchModal(props) {
    const {handleSubmit} = props;
    const [jikjongTop, setJikjongTop] = useState(JIKJONGTOP_SIMPLE);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const timeoutRef = React.useRef(null);

    let initialValues = COMPANY_JIKJONG;

    const [options, setOptions] = React.useState(initialValues);

    const filterJikjong = (inputValue) => {
        setLoading(true);

        return axios.get(AuthUrls.JIKJONG_INFO, {
            headers: {
                "Content-Type": 'application/json',
            },
            params: {
                search: inputValue,
                index: 'jikjong'
            }})
            .then(({data})=>{
                const results = data.data;
                setSearchResult(results);

                let options = results.map((values) => {
                    return ({
                        jikjong_mid_cd: values.jikjong_mid_cd,
                        jikjong_mid_name: values.jikjong_mid_name,
                    })
                });
                const uniqueArray = options.filter((thing, index) => {
                    const _thing = JSON.stringify(thing);
                    return index === options.findIndex(obj => {
                        return JSON.stringify(obj) === _thing;
                    });
                });

                return uniqueArray
            }).then(value => {
                setOptions(value);
                setLoading(false);
            })

    };

    useEffect(() => {
        let word_check = true;
        for (let i=0; i<searchTerm.length; i++) {
            if (searchTerm.charCodeAt(i) < 44032 || searchTerm.charCodeAt(i) > 55203) {
                word_check = false;
            }
        }
        if(timeoutRef.current !== null){
            clearTimeout(timeoutRef.current)
        }
        if(searchTerm!=="" && searchTerm.length >= 1 && word_check){
            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = null;
                filterJikjong(searchTerm)
            }, 500);
        }
    }, [searchTerm]);

    return (
        <>
            <div className="modal-header text-left">
                <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={props.toggle}
                >
                    <i className="nc-icon nc-simple-remove" />
                </button>
                <h5 className="modal-title">
                    전문직종 등록하기
                </h5>
            </div>
            <div className="section" style={{
                // padding: "120px 0",
            }}>
                <Container>
                    <div className="main-search" style={{padding:"10px"}}>
                        <Row>
                            <Col md="5">
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="어떤 인재 DB에 강점을 가지고 계신가요?"
                                        variant="outlined"
                                        value={searchTerm}
                                        // onChange={handleChange}
                                        onChange={(e)=>setSearchTerm(e.target.value)}
                                        style={{width:'100%'}}
                                    />
                                    <div className="search-results" style={{width:'100%'}}>
                                        {/*{open && (*/}
                                        <ListGroup>
                                            {searchResult.length > 0 ?
                                                (
                                                    <ListGroupItem className="search-title">"{searchTerm}" 검색 결과</ListGroupItem>
                                                )
                                                : (
                                                    <>
                                                        <ListGroupItem>
                                                            <small>주 파견직종입니다</small>
                                                        </ListGroupItem>
                                                    </>
                                                )
                                            }
                                            {/*{searchTerm && (  )}*/}
                                            {options.map( (item) =>{
                                                // console.log('item', item)
                                                return (
                                                    <>
                                                        <Link to={{
                                                            pathname: `/hr/hrsp/${item.jikjong_mid_cd.substr(0,4)}`,
                                                            state: {
                                                                searchResults: searchResult,
                                                                selected: {
                                                                    'sec': 'mid', // 직종(중) 선택
                                                                    groupName: item.jikjong_mid_name,
                                                                    code_name: item.jikjong_mid_name,
                                                                    code_topcd: item.jikjong_mid_cd.substr(0, 4) + '00000',
                                                                    code_id: item.jikjong_mid_cd
                                                                }
                                                            }
                                                        }}>
                                                            <ListGroupItem
                                                                tag="button"
                                                                action="#"
                                                                style={{"textAlign":"left", width:"100%"}}
                                                            ><i className="fa fa-search"/>{' '}
                                                                {item.jikjong_mid_name}</ListGroupItem>
                                                        </Link>

                                                    </>
                                                )
                                            })}
                                            <Link to={'/HelpCenter/pagyeon'}>
                                                <ListGroupItem
                                                    tag="button"
                                                    style={{"textAlign":"left", width:"100%"}}
                                                ><i className="fa fa-info"/>{' '}
                                                    <small>파견 허용 직종 알아보기</small>

                                                    {/*<div className="col-md-3 ml-auto">*/}
                                                    {/*    <button className='btn'>닫기</button>*/}
                                                    {/*</div>*/}
                                                </ListGroupItem>
                                            </Link>
                                        </ListGroup>
                                        {/*)}*/}
                                    </div>
                                </form>
                            </Col>
                            <Col md="7">
                                <Card className="demo-icons" variant="outlined">
                                    <CardContent className="all-icons">
                                        <div id="icons-wrapper">
                                            <section>
                                                <ul>
                                                    {jikjongTop.map((value, index) => (
                                                            <li>
                                                                <Link
                                                                    to={{
                                                                        pathname: `/hr/hrsp/${value.code_id.substr(0,4)}`,
                                                                        // pathname: `User/signup/AA01`,
                                                                        state: {
                                                                            selected: {
                                                                                'sec': 'top', // 직종(대) 선택
                                                                                groupName: value.code_name,
                                                                                code_name: value.code_name,
                                                                                code_topcd: value.code_id,
                                                                                code_id: value.code_id
                                                                            }
                                                                        }
                                                                    }}
                                                                ><i className={value.iclassName}/><p>{value.code_name}</p></Link>
                                                            </li>
                                                        )
                                                    )}

                                                </ul>
                                            </section>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default HrMainSearchModal;