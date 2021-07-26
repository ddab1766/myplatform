import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import {getHrSugub} from "../../actions/sugubActions";
import SectionNoInfo from "./SectionNoInfo";
import SugubCard from "./SugubCard"
import SugubFilter from "../../components/Hr/SugubFilter"
import Paginations from "../../components/Hr/Paginations"
import SearchField from "react-search-field";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";
import Nothing from "../../components/Common/Nothing";
import InfoBox from "../../components/Common/InfoBox";
import UpButton from "../../components/Common/UpButton";


const SugubContainer = (props) => {
    const { user, company, hr, authenticated } = props;
    const [sugubs, setSugubs] = useState([]);
    const [searchLists, setSearchLists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);
    const [sString, setSString] = useState();
    const [loader, setLoader] = useState(false);
    const [filterSet, setFilterSet] = useState(false);
    useEffect(() => {
        setLoader(true);
        if(authenticated === false) return;
        getHrSugub().then( (data) => {
            console.log(data)
            setSugubs(data.results);
            setSearchLists(data.results);
        });
        setLoader(false);
    }, []);
    useEffect(() => {
        setCurrentPage(1)
    }, [searchLists]);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }
    const handleChange = (sString) => {
        const filtered = sugubs.filter(data => {
            return data.sugub_title.toLowerCase().includes(sString.toLowerCase())
        })
        setSString(sString);
        setSearchLists(filtered);
    }
    const handleFilter = () => setFilterSet(!filterSet);

    return user ? (
        <>
            <style jsx>{`
            .searchField { width: 100%; }
            `}</style>
            <UpButton />
            <div className="content">
                <Container>
                    {hr === null && (
                        <>
                        {/*<Messages type={'info'} title={''} showIcon={true} link={true}
                                  description={'자세한 채용의뢰서 확인을 위해 \'기업정보\'를 등록해야 합니다.'}
                        />*/}
                        <InfoBox url={'/Hr/Hrsignup'} text={'자세한 채용의뢰서 확인을 위해 \'기업정보\'를 등록해야 합니다.'}/>
                        </>
                    )}
                    <Card>
                        <CardContent>
                            <div className="mt-md-5">
                                <Row>
                                    <Col  className="col-md-7 col-auto">
                                        <h5>의뢰리스트</h5>
                                    </Col>
                                    <Col className="col-md-5">
                                        <div className="text-right">
                                            <SearchField
                                                placeholder="키워드를 입력해주세요"
                                                onChange={handleChange}
                                                classNames="searchField"
                                                style={{width:'100px'}}
                                            />
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                            <hr/>
                            <div>
                                {filterSet &&(
                                    <>
                                        <SugubFilter sugubs={sugubs} setSearchLists={setSearchLists}/>
                                        <br/>
                                    </>
                                )}
                                <Button className="btn-outline-danger btn-round pt-1 pb-1" onClick={handleFilter}>{filterSet ? '필터닫기' : '필터열기'}</Button>
                            </div>
                            <hr/>
                            {!loader ? (
                                <>
                                    {searchLists.length > 0 ?
                                        (
                                            <Row>
                                                <Col>
                                                    <SugubCard sugubs={currentPosts(searchLists)}/>
                                                    <Paginations current={currentPage} postsPerPage={postsPerPage} totalPosts={searchLists.length} paginate={setCurrentPage}></Paginations>
                                                </Col>
                                            </Row>

                                        ):(<Nothing/>)}
                                </>
                            )  :(<LoaderSpinner/>)}
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </>
    ) : (<SectionNoInfo />)
    // }
};

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
        user: state.auth.user,
        hr: state.auth.hr
    }
}

// export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(CompanyProfileView);
export default connect(mapStateToProps, {getUserProfile})(SugubContainer);

