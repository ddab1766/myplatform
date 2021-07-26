import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Container, Table, UncontrolledTooltip,} from "reactstrap";
import Switch from "react-bootstrap-switch";
import axios from "axios"
import {apiUrls} from "../../constants/urls";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {getUserProfile} from "../../actions/authActions";
import {connect} from "react-redux";

function UserSpecialList(props) {
    const info = props.special;
    const [isOpen, setIsOpen] = useState(info.open_yn);
    const [alert, setAlert] = useState(null);
    // const [special, setSpecial] = useState(props.special);

    console.log('info', info);

    // todo 전문분야 삭제시 이력서도 삭제됨 => 지원이력 확인
    const warningWithConfirmMessage = (list) => {
        setAlert(
            (
                <ReactBSAlert
                    warning
                    style={{display: "block", marginTop: "100px"}}
                    title="해당 전문분야를 삭제하시겠습니까?"
                    onConfirm={() => successDelete(list)}
                    onCancel={() => hideAlert()}
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="삭제"
                    cancelBtnText="취소"
                    showCancel
                >
                    삭제시 복구할 수 없습니다.
                </ReactBSAlert>
            )
        );
    };

    const hideAlert = () => {
        setAlert(null);
    };

    const successDelete = (list) => {
        axios
            .delete(apiUrls.USER_SPECIAL + list.id + '/')
            .then((res) => {
                // setSpecial([]);
                setAlert(
                    (
                        <ReactBSAlert
                            success
                            style={{display: "block", marginTop: "100px"}}
                            title="삭제되었습니다!"
                            onConfirm={() => hideAlert()}
                            onCancel={() => hideAlert()}
                            confirmBtnBsStyle="info"
                        >
                            {/*Your imaginary file has been deleted.*/}
                        </ReactBSAlert>
                    )
                );
                props.getUserProfile()
            });

    };

    return info && (
        <>
            <Container>
                <hr/>
                {info.length !== 0 && (
                    <Table className="table-shopping">
                        <tbody>
                        <tr>
                            <td className="td-name">
                                <Link className="nav-link"
                                      to={{
                                          pathname: `/User/special_edit/${info.id}`,
                                          state: {
                                              special: info
                                          }
                                      }}
                                >
                                    {info.jikjong_top.code_name}<br/>
                                </Link>
                                <small>{ info.jikjong_mid.code_name}</small>
                                {/*<small>{ special.answers_json.map(value => JSON.stringify(value).replace(/{|}/g,'')).join(',\n')}</small>*/}
                                {/*{
                                    special.answers.map( value => (
                                        <>
                                        <small>
                                            <cite>{value.question.question_comment}</cite>
                                            {value.answer_comment}<br/>
                                            </small>
                                        </>
                                    ))
                                }*/}
                                {/*<TagsInput*/}
                                {/*            value={tags}*/}
                                {/*            //onChange={this.handleTagsinput}*/}
                                {/*            tagProps={{className: "react-tagsinput-tag"}}*/}
                                {/*            inputProps={{placeholder:'Tag 입력'}}*/}
                                {/*        />*/}
                                <br/>
                            </td>
                            <td className="td-number">
                                <p className="category">{""}</p>
                                <Link to={`/User/Resume/${info.id}`}>
                                    <Button
                                        className="btn-neutral"
                                        // color="success"
                                        id="tooltip159182736"
                                        // onClick={()=>{}}
                                        size="sm"
                                        type="button"
                                    >
                                        <i className="fa fa-edit" />
                                    </Button>
                                </Link>
                                <UncontrolledTooltip
                                    delay={0}
                                    target="tooltip159182736"
                                >
                                    이력서 확인하기
                                </UncontrolledTooltip>{' '}

                                <Switch
                                    defaultValue={info.open_yn}
                                    // value={info.open_yn}
                                    onChange={() => setIsOpen(!isOpen)}
                                    // onChange={onBtnClick(isOpen)}
                                    onText="공개"
                                    offText="Off"
                                    onColor="default"
                                    offColor="default"
                                />
                                <Button
                                    className="btn-neutral"
                                    color="default"
                                    data-placement="left"
                                    onClick={() => warningWithConfirmMessage(info)}
                                    // id="tooltip848814788"
                                    title=""
                                    type="button"
                                >
                                    <i className="nc-icon nc-simple-remove"/>
                                </Button>

                            </td>

                        </tr>
                        경력 : {info.career_gigan} <br/>
                        희망연봉 : {info.hope_salary} <br/>
                        최종수정: {info.modified_time}
                        </tbody>
                    </Table>
                )}
                {alert}
            </Container>

        </>
    );
}


function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}
// export default UserSpecialList;

export default connect(mapStateToProps, {getUserProfile})(UserSpecialList);
//
// function mapStateToProps(state) {
//     return {
//         user: state.auth.user,
//         user_special: state.auth.user_special
//     }
// }
//
// export default connect(mapStateToProps, {getUserProfile })(UserProfile);