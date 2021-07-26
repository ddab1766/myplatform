import React, {useEffect, useState} from 'react'
import {
    Button,
    Icon,
    DatePicker,
    Input,
    InputGroup
} from 'rsuite';
import {Col, Row} from "reactstrap";
import moment from "moment";

const Filter = ({filter,setFilter,paginate,setEmployees,employees,searchLists}) => {
    const [date1, setDate1] = useState(new Date(new Date().setMonth(new Date().getMonth(),1)));
    const [date2, setDate2] = useState(new Date(new Date().setMonth(new Date().getMonth())));


    const handleTextChange = (v) => {
        const filtered = searchLists.filter(data => {
            return data.contract.employee.emp_name.toLowerCase().includes(v.toLowerCase()) ||
                data.contract.employee.emp_phone.toLowerCase().includes(v.toLowerCase()) ||
                data.contract.companyprofile.custname.toLowerCase().includes(v.toLowerCase())
        })
        setEmployees(filtered)
        paginate(1)
    }
    const handleDateFilter = () => {
        setFilter({...filter,['created_time_min']:moment(date1).format('YYYY-MM-DD'),
            ['created_time_max']:moment(date2).format('YYYY-MM-DD')})
        paginate(1)
    }
    const handleDate = (v) => {
        setDate1(new Date(v.getFullYear(),v.getMonth(),1));
        setDate2(new Date(v.getFullYear(),v.getMonth()+1,0));
    }
    return (
        <>
            <style jsx>{`
                .rs-form-inline > *{
                margin-bottom: 0px;
                }
                .rs-dropdown-menu{
                width:100%;
                }
                .rs-dropdown{
                position:static;
                }
                .searchField { width: 100%; }
            `}</style>
            <div style={{marginBottom:20}}>

                <br/>
                <Row>
                    <Col  className="col-md-6 col-auto">
                        <DatePicker format="YYYY년 MM월" cleanable={false} defaultValue={new Date()} onChange={handleDate}
                                     style={{ width: 200 }}  onNextMonth ranges={[]}
                                     locale={{
                                         ok: '확인',
                                     }}
                        />
                        <Button appearance="primary" className="ml-2" onClick={handleDateFilter}>검색</Button>
                        <small> {`이용기간(${moment(date1).format('YYYY/MM/DD')} ~ ${moment(date2).format('YYYY/MM/DD')})`}</small>


                    </Col>
                    <Col className="col-md-6">
                        <div className="text-right">
                            <div style={{display: 'inline-block'}}>
                                <InputGroup style={{width:330,marginLeft:'9px'}}>
                                    <Input onChange={handleTextChange} placeholder="키워드를 입력해주세요.(이름,연락처,기업명)"/>
                                    <InputGroup.Button onClick={handleTextChange}>
                                        <Icon icon="search" />
                                    </InputGroup.Button>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>

                </Row>

            </div>


        </>
    )
}

export default Filter