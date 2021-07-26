import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getEmployeeList, uploadContract} from "../../actions/employeeActions"
import {makeStyles} from "@material-ui/core";
import {Loader} from "rsuite";
import {fileViewerUrl} from "../../function/common";

const EmployeeList = (props) => {
    const [employees, setEmployees] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    // 관련 공고 받아오기
    useEffect(() => {
        setLoading(true);
        getEmployeeList().then((data) => {

                console.log(data);
                setEmployees(data.results)
            setLoading(false);
            }).catch(err => {
                setLoading(false);
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
    const handleChangeChk = (employee_id,current) => {
        // setSubmitting(true);
        console.log(current)
        let formValues = new FormData();
        formValues.append(`is_confirm`,current);

        uploadContract(formValues,employee_id).then((data) => {
            window.notify.onChange('정상처리되었습니다.');
            // toggleModal();
            // setSubmitting(false);
        }).catch(error => {
            console.log(error.response.data)
        })
    }
    const columns = [
        {
            name: "id",
            label: "ID"
        },
        {
            name: "employee",
            label: "이름",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Link to='#'>{value.emp_name}</Link>
                    );
                }
            }
        },
        {
            name: "employee",
            label: "생년월일",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {return value.emp_birth}
            }
        },
        {
            name: "employee",
            label: "연락처",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {return value.emp_phone}
            }
        },
        {
            name: "telno",
            label: "파견사업주"
        },
        {
            name: "telno",
            label: "사용사업주"
        },
        {
            name: "contract_gigan",
            label: "채용기간"
        },
        {
            name: "direct_cost",
            label: "직접비"
        },
        {
            name: "mng_id",
            label: "이력서"
        },
        {
            name: "created_time",
            label: "등록일자",
        },

        {
            name: "contract_file",
            label: "계약서",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    if (value.length > 0) {
                       return(
                           <Link to={{
                            pathname:  `${fileViewerUrl(value[0].contract_file)}`,
                        }} target="_blank">보기</Link>
                       )
                    } else{
                        return "없음"
                    }
                    // return <Contract employee_id={value} handleReload={handleReload} />
                }
            }
        },
        {
            name: "is_confirm",
            label: "확인",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                       return(
                           <input type="checkbox" defaultChecked={value} onChange={(e) => handleChangeChk(tableMeta.rowData[0],e.target.checked)} />
                       )
                }
            }
        },
    ];



    const options = {
        selectableRows: true,
        filterType: 'checkbox',
        textLabels: {
            pagination : {
                rowsPerPage : ""
            },
            body: {
                noMatch: '지원자가 존재하지 않습니다.',
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
        onRowClick: (rowData, rowState) => {
            /*if(jobAds) {
                let _id = rowData[0]
                props.history.push({
                    pathname: `/Mng/chae/${_id}`,
                    state: {jobAds: jobAds.filter(value => value.id === _id)[0]}
                })
            }*/
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
    //상태변환시 리로드
    const handleReload = () => {
        // setUsers([]);
        // defaultClient.get(AuthUrls.JOB_ADVERTISE_LIST, {params:{
        //         sugub:selectId,
        //     }}).then(({ data }) => {
        //         console.log(data)
        //     if(data.length > 0){
        //             if(data[0].jobapplicants.length > 0){
        //                 let users = data[0].jobapplicants.filter(v => v.hrprofile.id === props.hr.id);
        //                 setUsers(users);
        //             } else{
        //                 setUsers([]);
        //             }
        //         } else{
        //             setUsers([]);
        //         }
        // });
    }
    if(loading) return <Loader backdrop content="로딩중..." vertical />
    return (
        <div className="content">
            <div className="title">
                {/* <h5>HR회사 이력서 지원 페이지</h5> */}
            </div>


            <MUIDataTable
                data={employees}
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

export default connect(mapStateToProps)(EmployeeList);