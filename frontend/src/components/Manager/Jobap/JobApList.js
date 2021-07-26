import React, {useEffect, useState} from "react";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {connect} from "react-redux";
import {getHrJobApp} from "../../../actions/userActions";
import JobAppContainer from "./JobAppContainer"
import Filter from "./Filter"
import {FlexboxGrid, Loader, Panel} from "rsuite";
import Paginations from "./Paginations";
import Nothing from "../../Common/Nothing";
import moment from "moment";

const JobApList = (props) => {
    const {applyList} = props
    const [jobaps, setJobAp] = useState();
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        ['applied_at_min']:moment(new Date(new Date().setMonth(new Date().getMonth() - 1))).format('YYYY-MM-DD'),
        ['applied_at_max']:moment(new Date(new Date().setDate(new Date().getDate() + 1))).format('YYYY-MM-DD'),
        page : 1})
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        setLoading(true)
        document.getElementsByClassName('main-panel')[0].scrollTop = 0
        getHrJobApp(filter).then(data => {
            console.log(data)
            setJobAp(data.results);
            setTotalPosts(data.count)
            setLoading(false)
        }).catch(error => {
            setLoading(false)
        });

    }, [filter]);

    return  (
        <>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={20}>
                    <Panel style={{background:'white'}}>
                        <Filter setJobAp={setJobAp} setFilter={setFilter} filter={filter} paginate={setCurrentPage}/>
                        <JobAppContainer jobap={jobaps} loading={loading} setFilter={setFilter} filter={filter} paginate={setCurrentPage}/>
                        <Paginations totalPosts = {totalPosts} postsPerPage={postsPerPage}
                                     current={currentPage} paginate={setCurrentPage}
                                     setFilter={setFilter} filter={filter} ></Paginations>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </>
    )


}
function mapStateToProps(state, props) {
    return {
        applyList: state.auth.applied
    }
}
export default connect(mapStateToProps)(JobApList);