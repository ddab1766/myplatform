import React, {useEffect, useState} from "react";
import {Container, Modal} from "reactstrap";

import UserSpecialList from "./UserSpecialList";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import JikjongSearchModal from "./JikjongSearchModal";

function UserSpecial(props) {
    const {user} = props;
    let addSpecial = '';
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    useEffect(()=>{
        // if(user.userspecial) return;
        if(user) return
        props.getUserProfile();
    },[user]);

    if(user.userspecial && user.userspecial.length !== 0){
        addSpecial = (
            <>
                {/*<Link className="btn mr-2"*/}
                {/*      to={{*/}
                {/*          pathname : `/User/special_edit/`,*/}
                {/*          state: {*/}
                {/*              user: user,*/}
                {/*              special:''*/}
                {/*          }*/}
                {/*      }}*/}
                {/*>전문분야 추가</Link>*/}
                <button className="btn btn-default"
                        onClick={()=>toggleModal()}
                    // to={`#`}
                >추가하기</button>
            </>
        )
    }else{
        addSpecial = (
            <>
                아직 등록하지 않으셨습니다.<br/>
                <button className="btn btn-default"
                        onClick={()=>toggleModal()}
                    // to={`#`}
                >등록하기</button>
                {/*<Link className="btn mr-2"*/}
                {/*      to={{*/}
                {/*          pathname : `/User/special_edit/`,*/}
                {/*          state: {*/}
                {/*              user: user,*/}
                {/*              special:''*/}
                {/*          }*/}
                {/*      }}>*/}
                {/*    등록하러 가기</Link><br/>*/}
            </>
        )
    }

    return (
        <>
            <Container>
                <div className="title">
                    <h5>나의 전문분야<br/>
                        <small>전문분야를 등록하면 매칭 확률이 올라갑니다.(최대 2개)</small>
                    </h5>
                </div>
                { user.userspecial && user.userspecial.length !== 0 && (
                    <>
                        {
                            user.userspecial.map((value, index) => (
                                <>
                                    <UserSpecialList special={value} key={index}/>
                                </>
                            ))
                        }
                    </>
                )}
                {addSpecial}
            </Container>
            <div className="modal-lg">
                <Modal size="lg" isOpen={modal} toggle={toggleModal} >
                    <JikjongSearchModal/>
                </Modal>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, {getUserProfile})(UserSpecial);
// export default UserSpecial;


