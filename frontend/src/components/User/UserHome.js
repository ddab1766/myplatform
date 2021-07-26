import React from "react";
// reactstrap components
import UserMainSearch from "./UserMainSearch";
import SectionMain from "../../views/user/SectionMain";
import SectionMain2 from "../../views/user/SectionMain2";
import SectionMain3 from "../../views/user/SectionMain3";
import SectionMain4 from "../../views/user/SectionMain4";
import ChannelService from "../ChannelService";

const UserHome = () => {
    // document.documentElement.classList.remove("nav-open");
    // React.useEffect(() => {
    //     document.body.classList.add("index");
    //     return function cleanup() {
    //         document.body.classList.remove("index");
    //     };
    // });
    const channelTalk = () => {
        if(window.location.pathname.match('/User')) {
            return (
                ChannelService.shutdown()
            )
        }
    }

    return (
        <>
            <div className="main">

                <UserMainSearch/>
                <SectionMain/>
                <SectionMain2/>
                <SectionMain3/>
                <SectionMain4/>
                { channelTalk() }
            </div>
        </>
    );
};


export default UserHome;
