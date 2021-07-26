import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {apiUrls, vUrls} from "../../../constants/urls";
// import { useDispatch } from "react-redux";
import defaultClient from '../../../utils/defaultClient';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import {Card, CardBody,} from "reactstrap";
import {connect} from "react-redux";
import axios from "axios";

const { SearchBar } = Search;
const CPList = (props) => {

    const [changeFlg, setChangeFlg] = useState(true);
    const [company, setCompany] = useState([]);
    const toggle = () => setChangeFlg(!changeFlg);

    useEffect(() => {
        defaultClient.get(vUrls.CUSTOM_COMPANY_PROFILE, {
            headers: {
                authorization: 'Token ' + props.token
            }
        })
            .then(( {data} ) => {
            console.log(data)
            setCompany(data)
        })
    }, [changeFlg]);

    const handleUpdateStatus = (id, status) => {

        let statuscd;
        if (status == 1) { //승인
            statuscd = 'CB0200000';
        } else if (status == 2) { //거부
            statuscd = 'CB0300000';
        }

        // updateHrStatusCd(id,statuscd).then((res) => {
        //     console.log(res)
        //      toggle();
        // })
         defaultClient
                .patch(apiUrls.CUSTOM_COMPANY_PROFILE + id + '/', { status_cd: statuscd }, {
                    headers: {
                        authorization: 'Token ' + props.token,
                    }
                })
                .then((response) => {
                    window.notify.onChange('회사 정보가 정상적으로 수정되었습니다.');
                    toggle();
                })
                .catch((error) => {
                    console.log('updateHrProfile error', error);
                });
        // defaultClient.patch(AuthUrls.CUSTOM_COMPANY_PROFILE + id + "/",
        //     { status_cd: statuscd }
        // ).then(res => {
        //     console.log("success  ", company);
        //     toggle();
        // }).catch(error => console.log(error.response.data))
    }

    const columns = [
        {
            text: 'ID',
            dataField: 'id',
            sort: true,
        },
        {
            text: '기업명',
            dataField: 'custname',
            sort: true,
            formatter : (cell, row) => {
                return <Link to={{ pathname: props.match.url + '/' + row.id, state: { comp: row } }}>{row.custname}</Link>
            },
        },
        {
            text: '승인상태',
            dataField: 'status_cd.code_name',
            sort: true,
        },
        {
            text: '사업자번호',
            dataField: 'custid',
            sort: true,
        },
        {
            text: '임직원수',
            dataField: 'emp_count',
            sort: true,
        },
        {
            text: '매출액',
            dataField: 'gross_total',
            sort: true,
        },
        {
            text: '홈페이지',
            dataField: 'homepage',
            sort: true,
        },
        {
            text: '회사지역',
            dataField: 'address.code_name',
            sort: true,
        },
        {
            text: '이메일',
            dataField: 'manager_email',
            sort: true,
        },
        {
            text: '연락처',
            dataField: 'manager_phone',
            sort: true,
        },
        {
            text: '',
            dataField: '',
            //minWidth: "200px",
            sort: false,
            formatter : (cell, row) => {
                return <div><button style={{margin: "1px 1px"}} className="btn btn-primary btn-sm" onClick={() => handleUpdateStatus(row.id, 1)}>승인</button>
            <button style={{margin: "1px 1px"}} className="btn btn-danger btn-sm" onClick={() => handleUpdateStatus(row.id, 2)}>거부</button></div>
            },
            // cell: row => <div><button style={{margin: "6px 1px"}} className="btn btn-primary btn-sm" onClick={() => handleUpdateStatus(row.id, 1)}>승인</button>
            // <button style={{margin: "6px 1px"}} className="btn btn-primary btn-sm" onClick={() => handleUpdateStatus(row.id, 2)}>거부</button></div>,
        },

    ];
     const defaultSorted = [{
          dataField: 'id',
          order: 'desc'
        }];
    return company && (
        <>
            <Card>
                <CardBody>
                    <ToolkitProvider
                        keyField='id'
                        data={company}
                        condensed
                        bootstrap4
                        columns={columns}
                        search

                    >
                        {
                            props => (
                                <div>
                                    <SearchBar {...props.searchProps} />
                                    <hr />
                                    <BootstrapTable
                                        bordered={ false }
                                        noDataIndication="데이터가 없습니다."
                                        // selectRow={selectRow}
                                        hover
                                        defaultSorted={ defaultSorted }
                                        pagination={paginationFactory()}
                                        {...props.baseProps}
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </CardBody>
            </Card>

        </>
    ) ;
}
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    company: state.auth.company,
    hr: state.auth.hr,
      token:state.auth.token
  }
}
export default connect(mapStateToProps)(CPList);
//export default withRouter(CompanyList);