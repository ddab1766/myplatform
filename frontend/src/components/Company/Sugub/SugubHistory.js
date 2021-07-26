import React, {useEffect, useState} from "react";
import {Search} from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from '@material-ui/core/TableContainer';
import store from "../../../store";
import {initialize} from "redux-form";
import {Link} from "react-router-dom";

const { SearchBar } = Search;

const SugubHistory = (props) => {
    const {company} = props;
    const [sugubs, setSugubs] = useState();

    //수급내역 행 클릭 이벤트
    const handleClick = (row) => {
        //폼에 값 전달
        store.dispatch(initialize('SugubEditForm', row));
        //모달 닫기
        props.toggle();
    }

    useEffect(() => {
        setSugubs(company);
    }, []);

    //날짜 필드 (YYYY-MM-DD)
    function dateFormatter(cell, row) {
        let date = cell.substring(0,10)
        return (
            <span>{date}</span>
        );
    }

    //헤더 (보류중..)
    const columns = [
        {
            text: '신청일',
            dataField: 'created_at',
            sortable: true,
            formatter: dateFormatter,
        },
        {
            text: '신청자',
            dataField: 'user_nm',
            sortable: true,
        },
        {
            text: '수급제목',
            dataField: 'sugub_title',
            sortable: true,
        },
    ];

    //css
    const useStyles = makeStyles({
        tr: {
            // cursor:'pointer',
        },
        td:{
            whiteSpace: 'nowrap',
            padding: '10px',
        },
        container: {
            maxHeight: 440,
        },
    });
    const classes = useStyles();
    
    console.log('SugubHistory sugubs', sugubs);
    return sugubs && sugubs.length > 0 ? (
        <>
            <TableContainer className={classes.container}>
            <Table size="small" >
                <TableBody>
                    {sugubs.length > 0 ? sugubs.map((list,index) => (
                        list.sugub_status !== 'CC0100000' &&
                            <TableRow key={index} hover className={classes.tr}>
                                <TableCell className={classes.td}>{list.created_at.substring(0,10)}</TableCell>
                                <TableCell className={classes.td}>{list.user_nm}</TableCell>
                                <TableCell className={classes.td}>
                                    <Link to={{pathname: '/Company/SugubDetailForm/', state:{ sugub: list }}} >
                                        {list.sugub_title}
                                    </Link></TableCell>
                                <TableCell className={classes.td}>{list.work_position}</TableCell>
                            </TableRow>

                        )) :
                        (
                            <TableRow hover>
                                <TableCell colSpan={7}> 수급이 존재하지 않습니다. </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            </TableContainer>
            {/*<ToolkitProvider*/}
            {/*  keyField='id'*/}
            {/*  data={sugubs}*/}
            {/*  bootstrap4*/}
            {/*  columns={columns}*/}
            {/*  search*/}
            {/*>*/}
            {/*  {*/}
            {/*    props => (*/}
            {/*      <div>*/}
            {/*        <SearchBar {...props.searchProps} />*/}
            {/*        <BootstrapTable*/}
            {/*          rowEvents={ rowEvents }*/}
            {/*          condensed*/}
            {/*          hover*/}
            {/*          {...props.baseProps}*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  }*/}
            {/*</ToolkitProvider>*/}
        </>
    ) : (<div></div>);
}
export default SugubHistory;