import React, {useEffect, useState} from "react";
// reactstrap components
import {Table} from "reactstrap";
import {connect} from "react-redux";
import {getUserProfile} from "../../actions/authActions";
import LoaderSpinner from "../Etc/LoaderSpinner";

// 포인트현황
const PointList = (props) => {
    const {type} = props.match.params;
    const user = props.user;
    const [userPoints, setUserPoints] = useState([]);

    useEffect(()=>{
        if(!user) props.getUserProfile();
    },[])

    useEffect(()=>{
        if(type==='chae'){
            setUserPoints(user.userpoint.filter( v => v.poi_type === 'GA0100000'))
        }else if(type==='adv'){
            setUserPoints(user.userpoint.filter( v => v.poi_type === 'GA0200000'))
        }else if(type==='intro'){
            setUserPoints(user.userpoint.filter( v => v.poi_type === 'GA0300000'))
        }
    }, [type])

    return user ? (
        <>
            <Table className="table-shopping">
                <thead>
                <tr>
                    <td>발생일시</td>
                    <td>종류</td>
                    <td>내용</td>
                    <td>점수</td>
                </tr>
                </thead>
                {userPoints ? (
                    <tbody>
                    {userPoints.map((list) => (
                            <tr>
                                <td>{list.created_time}</td>
                                <td>{list.poi_type_nm}</td>
                                <td>{list.poi_content}</td>
                                <td>{list.poi_point.toLocaleString(navigator.language, {minimumFractionDigits:0})}</td>
                            </tr>
                        )
                    )}
                    </tbody>
                ):(
                    <tbody>해당 내역이 없습니다.</tbody>
                )}
            </Table>


        </>
    ) : (<LoaderSpinner/>)
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, {getUserProfile})(PointList);



