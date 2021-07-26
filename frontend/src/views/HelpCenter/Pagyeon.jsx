import React from "react";
import {Container} from "reactstrap";
import {Table} from "rsuite";

const fakeLargeData = [
    {
        code: 120,
        role: '컴퓨터관련 전문가의 업무',
        bigo: ''
    },
    {
        code: 16,
        role: '행정, 경영 및 재정 전문가의 업무',
        bigo: '행정 전문가(161)의 업무는 제외'
    },
    {
        code: 17131,
        role: '특허 전문가의 업무',
        bigo: ''
    },
    {
        code: 181,
        role: '기록 보관원, 사서 및 관련 전문가의 업무',
        bigo: '사서(18120)의 업무는 제외'
    },
    {
        code: 1822,
        role: '번역가 및 통역가의 업무',
        bigo: ''
    },
    {
        code: 183,
        role: '창작 및 공연예술가의 업무',
        bigo: ''
    },
    {
        code: 16,
        role: '행정, 경영 및 재정 전문가의 업무',
        bigo: '행정 전문가(161)의 업무는 제외'
    },
    {
        code: 16,
        role: '행정, 경영 및 재정 전문가의 업무',
        bigo: '행정 전문가(161)의 업무는 제외'
    },
    {
        code: 16,
        role: '행정, 경영 및 재정 전문가의 업무',
        bigo: '행정 전문가(161)의 업무는 제외'
    },
    {
        code: 16,
        role: '행정, 경영 및 재정 전문가의 업무',
        bigo: '행정 전문가(161)의 업무는 제외'
    },
    {
        code: 16,
        role: '행정, 경영 및 재정 전문가의 업무',
        bigo: '행정 전문가(161)의 업무는 제외'
    }
]

const PagyeonView = ( props ) => {
    const { Column, HeaderCell, Cell, Pagination } = Table;

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h5>파견허용직종</h5>
                </div>
                <div className="content">
                    <div className="description">
                        근로자파견사업은 제조업의 직접생산공정업무를 제외하고 전문지식·기술·경험 또는 업무의 성질 등을 고려하여 적합하다고 판단되는 업무로서 다음의 열거된 업무를 대상으로 합니다
                    </div>
                    <hr/>
                    <Table
                        // virtualized
                        height={400}
                        data={fakeLargeData}
                        onRowClick={data => {
                            console.log(data);
                        }}
                    >
                        <Column width={300} align="center" fixed>
                            <HeaderCell>한국표준직업분류</HeaderCell>
                            <Cell dataKey="code" />
                        </Column>

                        <Column width={300}>
                            <HeaderCell>대상 업무</HeaderCell>
                            <Cell dataKey="role" />
                        </Column>

                        <Column width={300}>
                            <HeaderCell>비고</HeaderCell>
                            <Cell dataKey="bigo" />
                        </Column>


                    </Table>

                    <hr/>
                    <h5>근로자파견 예외적 허용</h5>
                    <div className="description">
                        - 위의 파견 대상 업무가 아니더라도 출산·질병·부상 등으로 결원이 생긴 경우 또는 일시적·간헐적으로 인력을 확보해야 필요가 있는 경우에는 파견이 허용됩니다
                    </div>
                    <div className="description">
                        - 파견근로자를 사용하려는 경우 사용사업주는 해당 사업 또는 사업장에 근로자의 과반수로 조직된 노동조합이 있는 경우에는 그 노동조합, 근로자의 과반수로 조직된 노동조합이 없는 경우에는 근로자의 과반수를 대표하는 자와 사전에 성실하게 협의해야 합니다
                    </div>

                    <hr/>
                    <h5>근로자파견 금지 업무</h5>
                    <div className="description">
                        - 위 허용사유의 유무에 상관없이 다음의 업무에 대해서는 근로자파견사업이 금지됩니다.<br/>
                         > 건설공사현장에서 이루어지는 업무 <br/>
                         > 「항만운송사업법」 제3조제1호, 「한국철도공사법」 제9조제1항제1호, 농수산물 유통 및 가격안정에 관한 법률」 제40조, 「물류정책기본법」 제2조제1항제1호의 하역(荷役)업무로서「직업안정법」 제33조에 따라 근로자공급사업 허가를 받은 지역의 업무 <br/>
                         > 「선원법」 제2조제1호에 따른 선원의 업무 <br/>
                         > 「산업안전보건법」 제58조에 따른 유해하거나 위험한 업무 <br/>
                         > 「진폐의 예방과 진폐근로자의 보호 등에 관한 법률」 제2조제3호에 따른 분진작업을 하는 업무 <br/>
                         > 「산업안전보건법」 제137조에 따른 건강관리카드의 발급대상 업무 <br/>
                         > 「의료법」 제2조에 따른 의료인의 업무 및 「의료법」 제80조의2에 따른 간호조무사의 업무 <br/>
                         > 「의료기사 등에 관한 법률」 제3조에 따른 의료기사의 업무 <br/>
                         > 「여객자동차 운수사업법」 제2조제3호에 따른 여객자동차운송사업에서의 운전업무 <br/>
                         > 「화물자동차 운수사업법」 제2조제3호에 따른 화물자동차운송사업에서의 운전업무 <br/>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default PagyeonView;

