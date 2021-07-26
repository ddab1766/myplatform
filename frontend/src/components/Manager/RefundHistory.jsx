import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getRefundHistory} from "../../actions/employeeActions"
import {makeStyles} from "@material-ui/core";

const RefundHistory = (props) => {
    const [data, setData] = useState([]);

    // 관련 공고 받아오기
    useEffect(() => {
        getRefundHistory().then((data) => {
            console.log(data)
            setData(data)
        })

    }, []);
    const useStyles = makeStyles((theme) => ({
        formControl: {
            //margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();
    const columns = [
        {
            name: "id",
            label: "ID"
        },
        {
            name: "contract",
            label: "이용날짜",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>{value.created_time}</>
                    );
                }
            }
        },
        {
            name: "contract",
            label: "채용형태",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>{value.chae_cd && value.chae_cd.code_name}</>
                    );
                }
            }
        },
        {
            name: "contract",
            label: "사원명",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Link to='#'>{value.employee && value.employee.emp_name}</Link>
                    );
                }
            }
        },
        {
            name: "contract",
            label: "직접비",
            options: {
                customBodyRender: (value => {
                    return (<>{value.direct_cost} 원</>)
                })
            }
        },
        {
            name: "contract",
            label: "계약기간",
            options: {
                customBodyRender: (value => {
                    return (<>{value.contract_gigan} 개월</>)
                })
            }
        },
        {
            name: "fee",
            label: "수수료"
        }
    ];

    const options = {
        selectableRows: true,
        filterType: 'checkbox',
        textLabels: {
            pagination : {
                rowsPerPage : ""
            },
            body: {
                noMatch: '이용내역이 존재하지 않습니다.',
                toolTip:'정렬'
            },
            toolbar: {
                search: '검색',
                downloadCsv : "csv다운로드",
                print:"프린트",
                viewColumns:"컬럼필터",
                filterTable:"테이블필터"
            },
            selectedRows:{
                text : "선택"
            }
        },
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
            let selectedData = selectedRows.data.map( (value, index) => {
                return displayData.filter(v => v.dataIndex === value.dataIndex)
            })
            return (
                <span>
                    {/*<FormControl className={classes.formControl}>*/}
                    {/*    <Select value={status}*/}
                    {/*            onChange={(e) => handleAppliedStatusChange(e, selectedData)}*/}
                    {/*    >*/}
                    {/*        {comcode.map((value, index) => (*/}
                    {/*            <MenuItem value={value.code_id}>{value.code_name}</MenuItem>*/}
                    {/*        ))}*/}
                    {/*    </Select>*/}
                    {/*    <FormHelperText>지원자 상태를 변경해주세요</FormHelperText>*/}
                    {/*</FormControl>*/}
                    {/*/!* 불합격사유 *!/*/}
                </span>
            )
        },

        setTableProps: () => (
            {
                style: {
                    // backgroundColor: 'red'
                },
                size:'small'
            }
        )
    };

    return (
        <div className="content">
            <h6>환불내역</h6>
            <MUIDataTable
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
};


function mapStateToProps(state) {
    return {
        // user: state.auth.user,
        // company: state.auth.company
    }
}

export default connect(mapStateToProps)(RefundHistory);