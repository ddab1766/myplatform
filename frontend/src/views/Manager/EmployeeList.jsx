import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getEmployeeList} from "../../actions/employeeActions"
import {makeStyles} from "@material-ui/core";
import Contract from "../../components/Manager/Employee/Contract";
import {
    Checkbox,
    CheckboxGroup,
    Dropdown,
    FlexboxGrid,
    Icon,
    IconButton,
    List,
    Loader,
    Panel,
    Popover, SelectPicker,
    Whisper
} from "rsuite";
import Filter from "../../components/Manager/Employee/Filter";
import JobAppContainer from "../../components/Manager/Jobap/JobAppContainer";
import Paginations from "../../components/Manager/Jobap/Paginations";
import EmployeeContainer from "../../components/Manager/Employee/EmployeeContainer"
import Nothing from "../../components/Common/Nothing";
import moment from "moment";

const selectData = [
    {
        "label": "최신 등록 순",
        "value": 1,
    },
    // {
    //     "label": "마감 임박 순",
    //     "value": 2,
    // },
    // {
    //     "label": "지원자 순",
    //     "value": 3,
    // },
]
const EmployeeList = (props) => {
    const [employees, setEmployees] = useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        ['created_time_min']:moment(new Date(new Date().setMonth(new Date().getMonth() - 1))).format('YYYY-MM-DD'),
        ['created_time_max']:moment(new Date(new Date().setDate(new Date().getDate() + 1))).format('YYYY-MM-DD'),
        page : 1})
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(10);


    // 관련 공고 받아오기
    useEffect(() => {
        setLoading(true);
        getEmployeeList(filter).then((data) => {
            document.getElementsByClassName('main-panel')[0].scrollTop = 0
            console.log(data.results);
            setEmployees(data.results)
            setTotalPosts(data.count)
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })

    }, [reload,filter]);

    //상태변환시 리로드
    const handleReload = () => {
        setReload(!reload);
    }
    const handleSortChange = (v) => {
        // setFilter({...filter,['ordering']:v});
    }
    return (
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={20}>
                <Panel style={{background:'white'}}>
                    <Filter setEmployees={setEmployees} setFilter={setFilter} filter={filter} paginate={setCurrentPage}/>
                    <hr/>
                    <FlexboxGrid justify="end">
                        <FlexboxGrid.Item >
                            <SelectPicker
                                data={selectData}
                                defaultValue={1}
                                appearance="subtle"
                                searchable={false}
                                style={{ width: 150 }}
                                cleanable={false}
                                onChange={handleSortChange}
                            />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <div style={{textAlign:'center',padding: '0 20px 0 20px'}}>
                        {!loading ?
                            employees && employees.length > 0 ?
                                (<>
                                    <EmployeeContainer employees={employees} loading={loading} handleReload={handleReload}/>
                                </>) : (<Nothing text={'해당'}/>)
                            : <Loader content="로딩중..." vertical />}
                    </div>
                    <Paginations totalPosts = {totalPosts} postsPerPage={postsPerPage}
                                 current={currentPage} paginate={setCurrentPage}
                                 setFilter={setFilter} filter={filter} ></Paginations>
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>


    )
};


function mapStateToProps(state) {
    return {
        // user: state.auth.user,
        // company: state.auth.company
    }
}

export default connect(mapStateToProps)(EmployeeList);