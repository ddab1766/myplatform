/*
import React, {useEffect, useState} from 'react';
import SugubEditForm from './SugubEditForm';
import {CardTitle, Container} from "reactstrap"

const SugubEdit = (props) => {
    const [sugub, setSugub] = useState(null);
    const id = props.match.params.id;
    console.log('Admin SugubEdit sugub', sugub)
    useEffect(() => {
        setSugub({
            ...props.location.state.sugub,
            company_name_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].company_name_yn : false,
            salary_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].salary_yn : false,
            main_work_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].main_work_yn : false,
            dpt_name_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].dpt_name_yn : false,
            condition_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].condition_yn : false,
            special_condition_yn: props.location.state.sugub.jobadvertise[0] ? props.location.state.sugub.jobadvertise[0].special_condition_yn : false
        });

    }, []);

    return sugub && (
        <Container>
               <CardTitle tag="h3">수급의뢰서</CardTitle><hr/>
                    <SugubEditForm history={props} sugubs={sugub} />
        </Container>
    )
}

export default SugubEdit;
*/
