import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {Card, CardBody, CardFooter, CardHeader, Col, Container, ListGroup, ListGroupItem, Row} from 'reactstrap';
import {Link} from "react-router-dom";
import {JIKJONGTOP_SIMPLE} from "../../variables/common";
import axios from "axios";
import {AuthUrls} from "../../constants/urls";
import {USER_JIKJONG} from "../../variables/frequency_jikjong";

function MainSearch(props) {
    const {handleSubmit} = props;
    const [jikjongTop, setJikjongTop] = useState(JIKJONGTOP_SIMPLE);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const timeoutRef = React.useRef(null);

    let initialValues = USER_JIKJONG;

    const [options, setOptions] = React.useState(initialValues);

    const filterJikjong = (inputValue) => {

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
            })

    };

    useEffect(() => {
        let word_check = true;
        // for (let i=0; i<searchTerm.length; i++) {
        //     if (searchTerm.charCodeAt(i) < 44032 || searchTerm.charCodeAt(i) > 55203) {
        //         word_check = false;
        //     }
        // }
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
        <div>
            <div className="section">
                <Container>
                    <div className="main-search" style={{padding:"10px"}}>
                        <h1>
                            <div className="">안녕하세요! <br/>구직중이신가요? </div>
                        </h1>
                        <Row>
                            <Col md="5">
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="어떤 분야의 전문가이신가요?"
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
                                                            <small>인사담당자분들이 자주 찾으시는 직종입니다</small>
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
                                                            pathname: `/User/signup/${item.jikjong_mid_cd.substr(0,4)}`,
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
                                            <Link to={'/HelpCenter'}>
                                                <ListGroupItem
                                                    tag="button"
                                                    style={{"textAlign":"left", width:"100%"}}
                                                ><i className="fa fa-info"/>{' '}
                                                    <small>자주 묻는 질문(FAQ)</small>

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
                                <Card className="demo-icons">
                                    <CardHeader>
                                    </CardHeader>
                                    <CardBody className="all-icons">
                                        <div id="icons-wrapper">
                                            <section>
                                                <ul>
                                                    {jikjongTop.map((value, index) => (
                                                            <li>
                                                                <Link
                                                                    to={{
                                                                        pathname: `/User/signup/${value.code_id.substr(0, 4)}`,
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
                                    </CardBody>
                                    <CardFooter>
                                        {' '}<br/>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                </Container>
            </div>
            <hr/>
        </div>
    );
}

export default MainSearch;