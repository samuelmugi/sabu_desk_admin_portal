(this["webpackJsonprecruitment-portal"]=this["webpackJsonprecruitment-portal"]||[]).push([[21],{476:function(e,t,a){"use strict";a.r(t);var _=a(3),s=a(60),n=a.n(s),A=a(62),l=a(57),r=a(0),c=a.n(r),E=a(725),m=a(304),S=a(769),T=a(732),o=a(760),P=a(733),R=a(27),u=a(73),I=a(194),i=a.n(I),B=a(143),d=a(66),K=a(67),O=a.n(K),N=a(483),L=a.n(N),C=a(726),y=a(637),M=a(638),p=a(680),v=a(394),h=a(731),k=a(678);var b=Object({NODE_ENV:"production",PUBLIC_URL:"/sabu_desk_admin_portal",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_KB_PORTAL_BASE_URL:"http://localhost:5050/ImbankKB/",REACT_APP_KB_PORTAL_SIGN_IN:"KBAuth/signin",REACT_APP_KB_PORTAL_SIGN_OUT:"KBAuth/signout",REACT_APP_KB_PORTAL_IMBANKSYSTEM_SEARCH_BY_NAME:"ImBankSystem/searchBySystemName",REACT_APP_KB_PORTAL_IMBANKSYSTEM_CREATE:"ImBankSystem/create",REACT_APP_KB_PORTAL_IMBANKSYSTEM_SEARCH:"ImBankSystem/search",REACT_APP_KB_PORTAL_IMBANKSYSTEM_LIST:"ImBankSystem/listAll",REACT_APP_KB_PORTAL_IMBANKSYSTEM_ALL_LIST:"ImBankSystem/listAllSystems",REACT_APP_KB_PORTAL_IMBANKISSUE_CREATE:"ImBankIssue/create",REACT_APP_KB_PORTAL_IMBANKISSUE_ADD_RESOLUTION:"ImBankIssue/addResolution/",REACT_APP_KB_PORTAL_IMBANKISSUE_ADD_RATING:"ImBankIssue/addResolutionRating/",REACT_APP_KB_PORTAL_IMBANKISSUE_SEARCH:"ImBankIssue/search",REACT_APP_KB_PORTAL_IMBANKISSUE_LIST:'"ImBankIssue/listAll"'}).REACT_APP_KB_PORTAL_DASHBOARD_LIST_LATEST_ISSUES,f=Object({NODE_ENV:"production",PUBLIC_URL:"/sabu_desk_admin_portal",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_KB_PORTAL_BASE_URL:"http://localhost:5050/ImbankKB/",REACT_APP_KB_PORTAL_SIGN_IN:"KBAuth/signin",REACT_APP_KB_PORTAL_SIGN_OUT:"KBAuth/signout",REACT_APP_KB_PORTAL_IMBANKSYSTEM_SEARCH_BY_NAME:"ImBankSystem/searchBySystemName",REACT_APP_KB_PORTAL_IMBANKSYSTEM_CREATE:"ImBankSystem/create",REACT_APP_KB_PORTAL_IMBANKSYSTEM_SEARCH:"ImBankSystem/search",REACT_APP_KB_PORTAL_IMBANKSYSTEM_LIST:"ImBankSystem/listAll",REACT_APP_KB_PORTAL_IMBANKSYSTEM_ALL_LIST:"ImBankSystem/listAllSystems",REACT_APP_KB_PORTAL_IMBANKISSUE_CREATE:"ImBankIssue/create",REACT_APP_KB_PORTAL_IMBANKISSUE_ADD_RESOLUTION:"ImBankIssue/addResolution/",REACT_APP_KB_PORTAL_IMBANKISSUE_ADD_RATING:"ImBankIssue/addResolutionRating/",REACT_APP_KB_PORTAL_IMBANKISSUE_SEARCH:"ImBankIssue/search",REACT_APP_KB_PORTAL_IMBANKISSUE_LIST:'"ImBankIssue/listAll"'}).REACT_APP_KB_PORTAL_DASHBOARD_LIST_ALL_SYSTEM_COUNT_ISSUES,U=Object({NODE_ENV:"production",PUBLIC_URL:"/sabu_desk_admin_portal",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_KB_PORTAL_BASE_URL:"http://localhost:5050/ImbankKB/",REACT_APP_KB_PORTAL_SIGN_IN:"KBAuth/signin",REACT_APP_KB_PORTAL_SIGN_OUT:"KBAuth/signout",REACT_APP_KB_PORTAL_IMBANKSYSTEM_SEARCH_BY_NAME:"ImBankSystem/searchBySystemName",REACT_APP_KB_PORTAL_IMBANKSYSTEM_CREATE:"ImBankSystem/create",REACT_APP_KB_PORTAL_IMBANKSYSTEM_SEARCH:"ImBankSystem/search",REACT_APP_KB_PORTAL_IMBANKSYSTEM_LIST:"ImBankSystem/listAll",REACT_APP_KB_PORTAL_IMBANKSYSTEM_ALL_LIST:"ImBankSystem/listAllSystems",REACT_APP_KB_PORTAL_IMBANKISSUE_CREATE:"ImBankIssue/create",REACT_APP_KB_PORTAL_IMBANKISSUE_ADD_RESOLUTION:"ImBankIssue/addResolution/",REACT_APP_KB_PORTAL_IMBANKISSUE_ADD_RATING:"ImBankIssue/addResolutionRating/",REACT_APP_KB_PORTAL_IMBANKISSUE_SEARCH:"ImBankIssue/search",REACT_APP_KB_PORTAL_IMBANKISSUE_LIST:'"ImBankIssue/listAll"'}).REACT_APP_KB_PORTAL_DASHBOARD_TOP_RESOLTUIONS_PER_USER;t.default=function(){Object(B.a)();var e=O()(!1),t=Object(l.a)(e,3),a=(t[0],t[1],t[2],O()(!1)),s=Object(l.a)(a,3),I=(s[0],s[1],s[2],O()({LatestIssues:[],systemCountIssues:[],topResolutionsPerUser:[]})),K=Object(l.a)(I,3),N=(K[0],K[1]),D=K[2];Object(r.useEffect)((function(){Object(A.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g();case 2:case"end":return e.stop()}}),e)})))()}),[]);var g=function(){var e=Object(A.a)(n.a.mark((function e(){var t,a,s,A,l,r,c,E,m,S;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.getRequest(b);case 3:a=e.sent,s=null===(t=a.data)||void 0===t?void 0:t.payload,N((function(e){return Object(_.a)(Object(_.a)({},e),{},{LatestIssues:s})})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:return e.prev=11,e.next=14,d.a.getRequest(f);case 14:l=e.sent,r=null===(A=l.data)||void 0===A?void 0:A.payload,c=[],r.map((function(e){c.push({system:e._id.SYSTEM,noOfIssues:e.count})})),N((function(e){return Object(_.a)(Object(_.a)({},e),{},{systemCountIssues:c})})),e.next=24;break;case 21:e.prev=21,e.t1=e.catch(11),console.error(e.t1);case 24:return e.prev=24,e.next=27,d.a.getRequest(U);case 27:m=e.sent,S=null===(E=m.data)||void 0===E?void 0:E.payload,N((function(e){return Object(_.a)(Object(_.a)({},e),{},{topResolutionsPerUser:S})})),e.next=35;break;case 32:e.prev=32,e.t2=e.catch(24),console.error(e.t2);case 35:case"end":return e.stop()}}),e,null,[[0,8],[11,21],[24,32]])})));return function(){return e.apply(this,arguments)}}(),Y=c.a.createElement(R.a,null,D.current.topResolutionsPerUser.map((function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"media friendlist-box align-items-center justify-content-center m-b-20"},c.a.createElement("div",{className:"m-r-10 photo-table"},c.a.createElement("a",{href:u.a.BLANK_LINK},c.a.createElement("img",{className:"rounded-circle",style:{width:"40px"},src:i.a,alt:"activity-user"}))),c.a.createElement("div",{className:"media-body"},c.a.createElement("h6",{className:"m-0 d-inline"},null===e||void 0===e?void 0:e._id.resolutionBy),c.a.createElement("span",{className:"float-right d-flex  align-items-center"},null===e||void 0===e?void 0:e.countResols," \xa0",c.a.createElement("i",{className:"fa fa-smile-o f-22 m-r-10 text-c-yellow"})))))})));return c.a.createElement(R.a,null,c.a.createElement(E.a,null,c.a.createElement(m.a,null,c.a.createElement(S.a,null,c.a.createElement(S.a.Body,null,c.a.createElement("h6",{className:"mb-4"},"No Of Cases Raised to date."),c.a.createElement(C.a,{width:400,height:300,data:D.current.systemCountIssues,margin:{top:5,right:30,left:20,bottom:5},barSize:20},c.a.createElement(y.a,{dataKey:"system",scale:"point",padding:{left:10,right:10}}),c.a.createElement(M.a,null),c.a.createElement(p.a,null),c.a.createElement(v.a,null),c.a.createElement(h.a,{strokeDasharray:"3 3"}),c.a.createElement(k.a,{dataKey:"noOfIssues",fill:"#8884d8",background:{fill:"#eee"}})),c.a.createElement("h6",{className:"mb-4"},"ENZI HUB Systems"))))),c.a.createElement(E.a,null,c.a.createElement(m.a,null,c.a.createElement(S.a,{className:"Recent-Users"},c.a.createElement(S.a.Header,null,c.a.createElement(S.a.Title,{as:"h5"},"Recent Issues")),c.a.createElement(S.a.Body,{className:"px-0 py-2"},c.a.createElement(T.a,{responsive:!0,hover:!0},c.a.createElement("tbody",null,D.current.LatestIssues.map((function(e,t){return c.a.createElement(c.a.Fragment,null,c.a.createElement("tr",{className:"unread"},c.a.createElement("td",null,c.a.createElement("img",{className:"rounded-circle",style:{width:"40px"},src:i.a,alt:"activity-user"})),c.a.createElement("td",null,c.a.createElement("h6",{className:"mb-1"},null===e||void 0===e?void 0:e.title),c.a.createElement("p",{className:"m-0"},"SYSTEM:-"+(null===e||void 0===e?void 0:e.bankSystem.systemName)+" raised by "+(null===e||void 0===e?void 0:e.createdBy))),c.a.createElement("td",null,c.a.createElement("h6",{className:"text-muted"},c.a.createElement("i",{className:"fa fa-circle text-c-green f-10 m-r-15"}),L()(null===e||void 0===e?void 0:e.createdOn).format("dddd, MMM Do YYYY")))))}))))))),c.a.createElement(m.a,{className:"m-b-30"},c.a.createElement(o.a,{defaultActiveKey:"today",id:"uncontrolled-tab-example"},c.a.createElement(P.a,{eventKey:"today",title:"Top Issue Resolvers.."},Y)))))}}}]);
//# sourceMappingURL=21.226c73dc.chunk.js.map