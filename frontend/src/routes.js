import React from "react";
import Dashboard from "views/Dashboard.jsx";
import Notifications from "./views/Company/Alarm";
//-----------------------관리자 메뉴 시작-----------------------------//
import Sugub_Admin from "./views/Admin/Sugub.jsx"
import CP from "./views/Admin/CP.jsx";
import HR from "./views/Admin/HR.jsx";
import Estimate from "./views/Admin/Estimate"
//-----------------------파견사업주 메뉴 시작-----------------------------//
//접수관리
import SugubList from "./components/Manager/Sugub/SugubList";
import SugubEdit from './components/Manager/Sugub/SugubDetailView.js';
import JobApplicant from "./views/Manager/JobApplicant.jsx";
import Chat from "./components/Chat/Chat";
//파견사원
import EmployeeList from "./views/Manager/EmployeeList";
//채팅관리
import ChatView from "./views/Chat/Chat";
//MY채마
import Fee from "./views/Manager/Fee";
import Invoice from "./views/Manager/Invoice";
import RefundHistory from "./components/Manager/RefundHistory";
// import Reviews from "./views/Company/Reviews";
// import PagyeonDetail from "./views/Manager/PagyeonDetail";
// import Jobad from "./views/Manager/JobAd.jsx";
// import CompanyList from "./components/Manager/CP/CPList";
// import CompanyEdit from "./components/Manager/CP/CompanyEdit";
//-----------------------기타-----------------------------//
import Login from "./views/Manager/Login.jsx";
import {Route, Switch} from "react-router-dom";
import store from "./store";
import {Provider} from "react-redux";
import HrProfile from "./views/Manager/HrProfile";
import HrProfileEdit from "./components/Manager/HrProfileEdit";
import AccountEdit from "./components/Manager/AccountForm";
//-----------------------관리자 메뉴 끝-----------------------------//
//-----------------------파견사업주 메뉴 끝-----------------------------//
// import SugubDetailList from "views/Manager/SugubDetailList";
// import SugubStatus from "./views/Company/SugubStatus";
// import ChaeStatus from "./views/Manager/ChaeStatus";
// import SugubDetailStatus from "./components/Manager/SugubDetailStatus";


const routes ={
  //관리자 메뉴
  admin:[
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "nc-icon nc-bank",
      component: Dashboard,
      layout: "/Mng",
    },
    {
      name: "기업관리",
      icon: "nc-icon nc-calendar-60",
      collapse: true,
      isVisible: true,
      state: "cpCollapse",
      views: [
        {
          path: "/admin/cplist",
          mini: "AD",
          name: "사용사업주",
          component: CP,
          layout: "/Mng",
          isVisible: true
        },
        {
          path: "/admin/hrlist",
          name: "파견사업주",
          mini: "List",
          component: HR,
          layout: "/Mng",
          isVisible: true
        },
      ]
    },
    {
      path: "/admin/sugub",
      name: "수급관리",
      icon: "nc-icon nc-calendar-60",
      component: Sugub_Admin,
      layout: "/Mng",
      isVisible: true,
    },
      {
      path: "/admin/estimate",
      name: "계약서관리",
      icon: "nc-icon nc-calendar-60",
      component: Estimate,
      layout: "/Mng",
      isVisible: true,
    },
  ],


  //파견사업주 메뉴
  hr : [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "nc-icon nc-bank",
      component: Dashboard,
      layout: "/Mng",
    },
    {
      path: "/Notifications",
      name: "Notifications",
      icon: "nc-icon nc-bank",
      component: Notifications,
      layout: "/Mng",
    },
    {
      path: "/profile",
      name: "profile",
      icon: "nc-icon nc-bank",
      component: HrProfile,
      layout: "/Mng",
    },
    {
      path: "/profile_edit",
      name: "profile",
      icon: "nc-icon nc-bank",
      component: HrProfileEdit,
      layout: "/Mng",
    },
    {
      path: "/account_edit",
      name: "profile",
      icon: "nc-icon nc-bank",
      component: AccountEdit,
      layout: "/Mng",
    },
    {
      isVisible: true,
      collapse: true,
      name: "접수관리",
      state: "sugubCollapse",
      icon: "nc-icon nc-single-copy-04",
      views: [
        {
          path: "/sugub",
          name: "접수하기",
          mini: "S",
          exact:true,
          component: SugubList,
          layout: "/Mng",
          isVisible: true,
        },
        {
          path: "/sugub/:id/",
          component: SugubEdit,
          layout: "/Mng",
        },
         {
          path: "/Chat/:receiver/:sugubid",
          component: Chat,
          layout: "/Mng",
        },
        {
          path: "/jobap",
          name: "접수내역",
          mini: "J",
          component: JobApplicant,
          layout: "/Mng",
          isVisible: true,
        },
      ]
    },
      {
      isVisible: true,
      collapse: true,
      name: "합격내역",
      state: "employeeCollapse",
      icon: "nc-icon nc-single-02",
      views: [
        {
          path: "/employee",
          name: "합격자 관리",
          mini: "E",
          exact:true,
          component: EmployeeList,
          layout: "/Mng",
          isVisible: true,
        },
      ]
    },
    {
      isVisible: true,
      collapse: true,
      name: "My채마",
      icon: "nc-icon nc-layout-11",
      state: "demandCollapse",
      views: [
        {
          path: "/Fee",
          name: "서비스 이용내역",
          mini: "M",
          exact:true,
          component: function () {
            return (
                <>
                  <Provider store={store}>
                      <Switch>
                        <Route exact path={'/Mng/Fee'} component={Fee} />
                      </Switch>
                  </Provider>
                </>
            )
          },
          layout: "/Mng",
          isVisible: true,
        },
        {
          path: "/Invoice",
          name: "청구 내역",
          mini: "I",
          exact:true,
          component: Invoice,
          layout: "/Mng",
          isVisible: true,
        },
        {
          path: "/Refund",
          name: "환불 내역",
          mini: "R",
          exact:true,
          // component: function () {
          //   return (
          //       <>
          //         <Provider store={store}>
          //             <Switch>
          //               <Route exact path={'/Mng/Refund'} component={RefundApply} />
          //             </Switch>
          //         </Provider>
          //       </>
          //   )
          // },
            component: RefundHistory,
          layout: "/Mng",
          isVisible: true,
        },
           {
          path: "/Refund/history",
          component: RefundHistory,
          layout: "/Mng",
        },
      ]
    },

    {
      isVisible: true,
      collapse: true,
      name: "채팅관리",
      state: "chatCollapse",
      icon: "nc-icon nc-chat-33",
      views: [
        {
          path: "/Chat",
          name: "채팅목록",
          mini: "c",
          component: function () {
            return (
                <>
                  <Provider store={store}>
                      <Switch>
                        <Route exact path={'/Mng/Chat'} component={ChatView} />
                        <Route path={'/Mng/Chat/:receiver/:sugubid'} component={Chat}/>
                      </Switch>
                  </Provider>
                </>
            )
          },
          layout: "/Mng",
          isVisible: true,
        },
      ]
    },



    {
      path: "/login",
      name: "Login",
      mini: "L",
      component: Login,
      layout: "/auth",
      isVisible: false
    },

  ]};

export default routes;
