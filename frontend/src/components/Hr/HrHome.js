import React, {useEffect, useState} from "react";
import ChannelService from "../ChannelService";
import {connect} from "react-redux";
import {getRecUser, getUserProfile} from "../../actions/authActions";
import {Feature, Services, Works} from "./Section/pages/Home/components";
import {ThemeProvider} from 'styled-components';
import {theme} from './Section/styles';
import Figure from "./Section/pages/Home/components/Figure";
import Banner from "./Section/pages/Home/components/Banner";

const HrHome = ( props ) => {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("index");
        return function cleanup() {
            document.body.classList.remove("index");
        };
    });

    const [recUser, setRecUser] = useState(props.match.params.recuser);

    useEffect( ()=>{
        // if(props.user) return false;
        // props.getUserProfile();
        props.getRecUser(recUser);
    },[]);

    const channelTalk = () => {
        if(window.location.pathname.match('/Hr')) {
            return (
                ChannelService.boot({
                    "pluginKey": "fcc2eadf-5d9b-4d5d-a4eb-6687478b2485" //please fill with your plugin key
                })
            )
        }
    }

    const renderHome = () => {
        if(props.authenticated){
            return (
                <div>
                    {/*<SugubContainer/>*/}
                    <ThemeProvider theme={theme}>
                        <Works />
                        {/*<HrMainSearch/>*/}
                        <Services />
                        <Feature />
                        {/*<SectionHrSugub/>*/}
                        <Figure />
                        <Banner />
                        {/*<SectionHrMain1/>*/}
                    </ThemeProvider>
                    {/*<SectionHrMain2/>*/}
                </div>
            )
        }else{
            return (
                <div>
                    <ThemeProvider theme={theme}>
                        <Works />
                        {/*<HrMainSearch/>*/}
                        <Services />
                        <Feature />
                        {/*<SectionHrSugub/>*/}
                        <Figure />
                        <Banner />
                        {/*<SectionHrMain1/>*/}
                    </ThemeProvider>
                    {/*<SectionHrMain2/>*/}
                </div>
            )
        }
    }

    return (
        <>
            { renderHome() }
            { channelTalk() }
            {/* 채널톡 */}
            {/* {
                ChannelService.boot({
                    "pluginKey": "fcc2eadf-5d9b-4d5d-a4eb-6687478b2485" //please fill with your plugin key
                })
            }*/}
        </>
    );
}


function mapStateToProps(state) {
    return {
        user: state.auth.user,
        authenticated: state.auth.authenticated,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps, {getUserProfile, getRecUser})(HrHome)
