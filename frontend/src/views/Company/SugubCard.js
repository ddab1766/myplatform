import React, {useEffect, useRef, useState} from "react";
import {Col, Modal, Row} from "reactstrap";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core";
import * as common from "../../function/common";
import {deleteSugub} from "../../actions/sugubActions";
import Rating from "@material-ui/lab/Rating";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {Dropdown, FlexboxGrid, Icon, Tag, TagGroup, Whisper, Popover} from "rsuite";
import {useSelector} from "react-redux";
import PopoverItem from "../../components/Common/PopoverItem";
import useStore from "../../components/Manager/Sugub/useStore";
import {fileViewerUrl} from "../../function/common";
import {isMobile} from "react-device-detect"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Menu = ({onSelect, data, deleteAlert}) => (
    <Dropdown.Menu onSelect={onSelect}>
        {data.sugub_status.code_id === 'CC0100000' && (// 수급검토중
            data.percentage < 70 ?
                <Link className="mr-1"
                      to={{
                          pathname: `/Company/SugubDetailForm/${data.id}`,
                          state: {
                              sugub: data
                          }
                      }}>
                    <PopoverItem key={data.id} id={data.id}
                                 data={data}
                                 item={{
                                     text: '수정',
                                     title: '채용의뢰서 완성도',
                                     body: '완성도가 높을수록 채용 확률이 올라가요 !',
                                     placement: 'bottom'
                                 }}/>
                </Link>
                :
                <Dropdown.Item eventKey={1}>
                    <Link className="mr-1"
                          to={{
                              pathname: `/Company/SugubDetailForm/${data.id}`,
                              state: {
                                  sugub: data
                              }
                          }}>
                        수정</Link></Dropdown.Item>
        )}
        {data.sugub_status.code_id === 'CC0300000' && ( //종료
            data.sugub_reviews.length > 0 ?
                <Dropdown.Item eventKey={2}>리뷰보기</Dropdown.Item>
                :
                <Dropdown.Item eventKey={3}>
                    <Link className="m-0"
                          to={{
                              pathname: `/Company/Review/${data.id}`,
                          }}>리뷰작성 </Link>
                </Dropdown.Item>
        )}
        <Dropdown.Item eventKey={4}> <Link to={{pathname: '/Company/SugubDetailForm/', state: {sugub: data}}}>
            재등록
        </Link>
        </Dropdown.Item>
        {data.sugub_status.code_id === 'CC0100000' &&
        <Dropdown.Item eventKey={5}>삭제</Dropdown.Item>
        }
    </Dropdown.Menu>
);

const MenuPopover = ({onSelect, item, deleteAlert, ...rest}) => (
    <Popover {...rest} full>
        <Menu onSelect={onSelect} data={item} deleteAlert={deleteAlert}/>
    </Popover>
);
let tableBody;
const CustomWhisper = ({item, children, deleteAlert, toggleModal, handleDelete}) => {
    const handleSelectMenu = (eventKey, event) => {
        if (eventKey === 5) { //삭제
            handleDelete(item.id, item.sugub_status.code_id)
        } else if (eventKey === 2) { //리뷰보기
            toggleModal()
        }
    }
    return (
        <Whisper
            placement="bottomEnd"
            trigger="click"
            container={() => {
                return tableBody;
            }}
            speaker={<MenuPopover onSelect={handleSelectMenu} item={item} deleteAlert={deleteAlert}/>}
        >
            {children}
        </Whisper>
    );
}

const useStyles = makeStyles({
    container: {
        background: '#4c4c4c',
        color: '#ffffff',
        "&:hover": {
            backgroundColor: '#272727'
        }
    },
});


const SugubCard = (props) => {
    const {sugubs, setSugubs, setSearchLists} = props;
    const classes = useStyles();

    const [modal, setModal] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const toggleModal = () => setModal(!modal);
    const hideAlert = () => {
        setDeleteAlert(false);
    };
    const popoverRef = useRef()
    const [popoverOpen, setPopoverOpen] = useState(false);

    useEffect(() => {
        if (popoverRef.current) setPopoverOpen(true);
    }, [popoverRef.current])

// const popover = React.createRef();

    console.log('popoverRef:', popoverRef)
    console.log('popoverOpen:', popoverOpen)

    const handleDelete = (id, sugub_status) => {
        if (sugub_status !== 'CC0100000') {
            alert('검토중인 상태에서만 가능합니다.')
            return false
        }
        setDeleteAlert(
            <ReactBSAlert
                warning
                style={{display: "block", marginTop: "100px"}}
                title="해당 의뢰서를 삭제하시겠습니까?"
                onConfirm={() => {
                    console.log('handleDelete id:', id)
                    setSugubs(sugubs.filter(v => v.id !== id));
                    setSearchLists(sugubs.filter(v => v.id !== id));
                    deleteSugub(id).then(() =>
                            hideAlert()
                        /*<ReactBSAlert
                        success
                        style={{display: "block", marginTop: "100px"}}
                        title="삭제되었습니다!"
                        // onConfirm={() => hideAlert()}
                        onCancel={() => hideAlert()}
                        confirmBtnBsStyle="info"
                        >
                        </ReactBSAlert>*/
                    )
                }}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="info"
                cancelBtnBsStyle="danger"
                confirmBtnText="삭제"
                cancelBtnText="취소"
                showCancel
            >
            </ReactBSAlert>
        )
    };

    return sugubs.map((data, index) => {
// console.log('sugubs. data', data)
        return (
            <>
                <style jsx>{`
.card:hover{ background-color:#fafafa }
.row-content{
display: block; /* Fallback for non-webkit */
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 4;
line-height: 1em;
overflow: hidden;
text-overflow: ellipsis;
}}
`}</style>
                {deleteAlert}
                <Card key={index} className="card" variant="outlined" style={{maxHeight: '380px', overflow: 'visible'}}>
                    <div className="card-header" style={{paddingBottom: '16px', borderBottom: '1px solid #dddddd'}}>
                        <Row>
                            <Col className={`mb-1 ${isMobile ? 'col-auto' : 'col-6'} `}>
                                <TagGroup>
                                    <Tag color="blue" style={{fontSize: '12px'}}>{data.sugub_status.code_name}</Tag>
                                    <Tag color="green" style={{fontSize: '12px'}}>{data.chae_cd.code_name}</Tag>
                                    {data.chae_cd.code_id === "AC0100000" &&
                                    <Tag color="cyan"
                                         style={{fontSize: '12px'}}>{data.chae_gigan}{data.chae_gigan_type && data.chae_gigan_type.code_name}</Tag>}
                                </TagGroup>
                            </Col>

                            <Col className={`text-right ${isMobile ? '' : 'col-6'} `}>
                                {isMobile ?
                                    data.percentage < 70 ? (
                                            <Link className="mr-1"
                                                  to={{
                                                      pathname: `/Company/SugubDetailForm/${data.id}`,
                                                      state: {
                                                          sugub: data
                                                      }
                                                  }}>
                                                <PopoverItem key={data.id} id={data.id}
                                                             data={data}
                                                             item={{
                                                                 text: '수정',
                                                                 title: '채용의뢰서 완성도',
                                                                 body: '완성도가 높을수록 채용 확률이 올라가요 !',
                                                                 placement: 'bottom'
                                                             }}/>
                                            </Link>
                                        ) :

                                        <CustomWhisper item={data} deleteAlert={deleteAlert} toggleMobal={toggleModal}
                                                       handleDelete={handleDelete}>
                                            <IconButton appearance="subtle"
                                                        style={{padding: 0}}><MoreHorizIcon/></IconButton>
                                        </CustomWhisper>
                                    : (
                                        <>
                                            {data.sugub_status.code_id === 'CC0100000' && ( // 수급검토중
                                                <>
                                                    <Link className="mr-1"
                                                          to={{
                                                              pathname: `/Company/SugubDetailForm/${data.id}`,
                                                              state: {
                                                                  sugub: data
                                                              }
                                                          }}
                                                    >
                                                        {data.percentage < 70 ? (
                                                                <PopoverItem key={data.id} id={data.id}
                                                                             data={data}
                                                                             item={{
                                                                                 text: '수정',
                                                                                 title: '채용의뢰서 완성도',
                                                                                 body: '완성도가 높을수록 채용 확률이 올라가요 !',
                                                                                 placement: 'bottom'
                                                                             }}/>
                                                            ) :
                                                            (<Button size="small" variant="contained"
                                                                     className={classes.container}>수정</Button>)
                                                        }
                                                    </Link>
                                                </>
                                            )}

                                            {data.sugub_status.code_id === 'CC0300000' && ( //종료
                                                <>
                                                    {/*<Link to={{pathname: '/Company/SugubCreate', state:{ sugub:data }}} >
<Button size="small" variant="outlined" className={`mr-1 `}>재등록</Button>
</Link>*/}
                                                    {data.sugub_reviews.length > 0 ? (
                                                            <Button size="small" variant="contained"
                                                                    className={classes.container}
                                                                    onClick={(e) => toggleModal()}
                                                            >리뷰보기</Button>
                                                        )
                                                        : (
                                                            <Link className="m-0"
                                                                  to={{
                                                                      pathname: `/Company/Review/${data.id}`,
// state: {
//     sugub: list
// }
                                                                  }}
                                                            ><Button size="small" variant="contained"
                                                                     className={classes.container}>리뷰작성</Button>
                                                            </Link>
                                                        )}
                                                </>
                                            )}
                                            <Link to={{pathname: '/Company/SugubDetailForm/', state: {sugub: data}}}>
                                                <Button size="small" variant="outlined" className={`mr-1 `}>재등록</Button>
                                            </Link>
                                            {/*삭제*/}
                                            {data.sugub_status.code_id === 'CC0100000' &&
                                            <>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon fontSize="small"
                                                                onClick={() => handleDelete(data.id, data.sugub_status.code_id)}/>
                                                </IconButton>
                                                {deleteAlert}
                                            </>
                                            }
                                        </>)}
                            </Col>
                        </Row>

                        <div style={{fontSize: '1.2em'}}>
                            <Row>
                                <Col className="col-6 col-auto">
                                    {data.sugub_status.code_id === 'CC0200000' || data.sugub_status.code_id === 'CC0300000' ? (
                                        <Link className="m-0"
                                              to={{
                                                  pathname: `/Company/SugubInfo/${data.id}`,
                                                  state: {
// sugub: data
                                                  }
                                              }}
                                        >{data.sugub_title}
                                        </Link>
                                    ) : (
                                        <>
                                            <Link className="m-0 mr-1 pb-1 pt-1"
                                                  to={{
                                                      pathname: `/Company/SugubDetailForm/${data.id}`,
                                                      state: {
                                                          sugub: data
                                                      }
                                                  }}
                                            >{data.sugub_title}</Link>
                                        </>
                                    )}
                                </Col>
                                <Col className="text-right col-6 col-auto">
                                    <small style={{
                                        color: '#9ca0a5',
                                        fontSize: '12px'
                                    }}>접수마감일</small><br/><small>{data.sugub_end_dt}</small>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-auto col-md-3">
                                    <small>
                                        {data.sugub_jikjong_top.code_name} {data.sugub_jikjong_mid.code_name}
                                    </small>
                                </Col>
                                <Col className="text-right">
                                    {data.sugub_status.code_id === 'CC0100000' ? (
                                        <>
                                            {data.jobadvertise[0] && data.jobadvertise[0].jobadvertise_status.code_id === 'CA0200000' && ( // 공고대기중
                                                <TagGroup>
                                                    {/*<Tag color="red" style={{fontSize:'12px'}}>접수대기중</Tag>*/}
                                                </TagGroup>
                                            )}
                                            <TagGroup>
                                                {/*<small>채용의뢰서 완성도</small>
<Tag color="red" style={{fontSize:'12px'}}>{data.percentage} % </Tag>*/}
                                            </TagGroup>
                                        </>
                                    ) : (
                                        <TagGroup>
                                            <Tag color="red"
                                                 style={{fontSize: '12px'}}>{data.jobadvertise[0] && data.jobadvertise[0].applicants_count}명
                                                지원중</Tag>
                                        </TagGroup>
                                    )}
                                    {/*<small>{common.getCountTotalJobApplicant(data)} 지원중</small>*/}
                                    {/*<small>{data.jobadvertise[0] && data.jobadvertise[0].applicants_count} 지원중</small>*/}
                                </Col>
                            </Row>
                        </div>
                        {/*<hr />*/}
                    </div>
                    <CardContent className="pb-2  row-content">
                        <Row>
                            <Col className="col-auto col-md-3">
                                <dl>
                                    <dt>경력</dt>
                                    <dd>{data.sugub_career_gb && data.sugub_career_gb.code_name}</dd>
                                </dl>

                            </Col>
                            <Col className="col-auto col-md-3">
                                <dl>
                                    <dt>급여({data.salary_gubun.code_name})</dt>
                                    <dd>
                                        {data.salary_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        {' '} ~ {' '}
                                        {data.salary_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </dd>
                                </dl>

                            </Col>
                            <Col className="col-auto col-md-3">
                                <dl>
                                    <dt>학력</dt>
                                    <dd>{data.education_cd && data.education_cd.code_name}</dd>
                                </dl>
                            </Col>
                            <Col className="col-auto col-md-3">

                            </Col>
                        </Row>
                        <div className="">
                            <dl>
                                <dt>실근무지</dt>
                                <dd>{data.work_load_addr}</dd>
                            </dl>
                            <dl>
                                <dt>필수우대</dt>
                                <dd>{common.limitedText(data.spec)}</dd>
                            </dl>
                            <dl>
                                <dt>담당업무</dt>
                                <dd>{common.limitedText(data.work_role)}</dd>
                            </dl>

                        </div>
                        <br/>
                        <div className="">
                            <Row>
                                <Col>

                                </Col>
                                <Col className="text-right">

                                    {/*<Link to={{ pathname:'/Mng/sugub/' + data.id, state: { sugub: data } }}>*/}
                                    {/*<button className="btn btn-danger btn-sm" onClick={() => handleReceiveClick(data)}*/}
                                    {/*>이력서접수하기</button>*/}
                                </Col>
                            </Row>
                        </div>
                    </CardContent>
                </Card>
                {/* 리뷰 Modal */}
                {data.sugub_reviews[0] && (
                    <Modal isOpen={modal} toggle={toggleModal}>
                        <div className="modal-header">
                            <button
                                aria-label="Close"
                                className="close"
                                type="button"
                                onClick={toggleModal}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                            <h5
                                className="modal-title text-center"
                                id="shareModal"
                            >
                                리뷰
                            </h5>
                        </div>

                        <div className="modal-body">
                            <div>
                                {data.sugub_reviews[0].sugubreview_point.map(value => {
                                    return (
                                        <dl>
                                            <dt>{value.point_gubun.code_name}</dt>
                                            <dd><Rating value={value.point} size={"small"} readOnly/></dd>
                                        </dl>
                                    )
                                })}
                                <dl>
                                    <dt>코멘트</dt>
                                    <dd>{data.sugub_reviews[0].review_comment}</dd>
                                </dl>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <Button className="btn-link" color="danger" type="button"
                                    onClick={toggleModal}>
                                확인
                            </Button>
                        </div>
                    </Modal>
                )}
            </>
        )
    })

};


export default SugubCard;