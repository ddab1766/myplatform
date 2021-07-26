import React, {useEffect, useState} from "react";
import ChannelService from "../ChannelService";
import {connect} from "react-redux";
import {getRecUser, getUserProfile} from "../../actions/authActions";
import CompanyMainSearch from "./CompanyMainSearch";
import {ThemeProvider} from "styled-components";
import {theme} from "../Hr/Section/styles";
import {Banner, Feature, Services, Works} from "./Section/pages/Home/components";

const CompanyHome = ( props ) => {
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
        if(window.location.pathname.match('/Company')) {
            return (
                ChannelService.boot({
                    "pluginKey": "fcc2eadf-5d9b-4d5d-a4eb-6687478b2485" //please fill with your plugin key
                })
            )
        }
    }

    return (
        <>
            <div>
                 <ThemeProvider theme={theme}>
                     <CompanyMainSearch/>
                    <Services />
                    <Feature />
                    <Works />
                    {/*<Figure />*/}
                    <Banner />
                    {/*<SectionHrMain1/>*/}
                </ThemeProvider>


                {/*<SectionCompanyMain/>*/}
                {/*<SectionCompanyMain2/>*/}
                {/*<SectionCompanyMain3/>*/}
                {/*<SectionCompanyMain4/>*/}
            </div>
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
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, {getUserProfile, getRecUser})(CompanyHome)
