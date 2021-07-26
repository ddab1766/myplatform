import React, {useEffect, useState} from "react";
import {getNotification} from "../../actions/userActions";
import NotificationList from "../../components/Manager/NotificationList";

const Notifications = (props) => {
    const [noti, setNoti] = useState(props.location.state ? props.location.state.noti : null);

    useEffect(()=>{
        if(noti) return null;
        getNotification().then(({data})=>{
            // console.log('useEffect noti !!')
            setNoti(data)
        })
    },[]);

    return (
        <div className="content">
            <div className="title">
                <h5>공지사항</h5>
            </div>
            {/* 공지사항 리스트 */}
            <NotificationList noti={noti}/>
        </div>
    )
};

export default Notifications

