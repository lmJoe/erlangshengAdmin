(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b1ab6e26"],{2452:function(e,t,a){},"6a6e":function(e,t,a){"use strict";var l=a("2452"),n=a.n(l);n.a},a434:function(e,t,a){"use strict";var l=a("23e7"),n=a("23cb"),r=a("a691"),i=a("50c4"),o=a("7b0b"),s=a("65f0"),c=a("8418"),u=a("1dde"),p=a("ae40"),d=u("splice"),b=p("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,v=Math.min,g=9007199254740991,m="Maximum allowed length exceeded";l({target:"Array",proto:!0,forced:!d||!b},{splice:function(e,t){var a,l,u,p,d,b,y=o(this),f=i(y.length),D=n(e,f),x=arguments.length;if(0===x?a=l=0:1===x?(a=0,l=f-D):(a=x-2,l=v(h(r(t),0),f-D)),f+a-l>g)throw TypeError(m);for(u=s(y,l),p=0;p<l;p++)d=D+p,d in y&&c(u,p,y[d]);if(u.length=l,a<l){for(p=D;p<f-l;p++)d=p+l,b=p+a,d in y?y[b]=y[d]:delete y[b];for(p=f;p>f-l+a;p--)delete y[p-1]}else if(a>l)for(p=f-l;p>D;p--)d=p+l-1,b=p+a-1,d in y?y[b]=y[d]:delete y[b];for(p=0;p<a;p++)y[p+D]=arguments[p+2];return y.length=f-l+a,u}})},ac37:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"appSurvey"},[a("div",{staticClass:"appSurveyContainer"},[e._m(0),a("div",{staticClass:"surveyContainer"},[a("div",{staticClass:"surveyTop"},[a("h3",[e._v("数据总览")]),e._m(1),e._l(e.recentData,(function(t,l){return a("div",{key:l,staticClass:"surveyDataBottom"},[a("div",{staticClass:"grid-content bg-purple surveyDatatitle"},[e._v(e._s(t.dateStr))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.newUserNum))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.activeUserNum))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.uploadNum))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.upload_ok_num))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.upload_audit_num))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.upload_auditpass_num))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.audit_pass_num))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.shenHeNum))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.faBuNum))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.gsratio))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.auditRate))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.yzfbNum))]),a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[e._v(e._s(t.videoPlayCost))])])}))],2),a("div",{staticClass:"videoBox"},[a("div",{staticClass:"videoBoxType"},[a("el-radio-group",{on:{change:function(t){return e.changeDataBoxBtn()}},model:{value:e.videoBoxType,callback:function(t){e.videoBoxType=t},expression:"videoBoxType"}},[a("el-radio-button",{attrs:{label:"0"}},[e._v("基础数据")]),a("el-radio-button",{attrs:{label:"1"}},[e._v("账号属性发布数据")]),a("el-radio-button",{attrs:{label:"2"}},[e._v("账号类目发布数据")])],1)],1),a("el-date-picker",{staticClass:"surveyTime",attrs:{"el-date-picker":"","value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},on:{change:e.changeEchartTime},model:{value:e.echartDefaultDate,callback:function(t){e.echartDefaultDate=t},expression:"echartDefaultDate"}}),a("div",{staticClass:"basicData"},[0==e.videoBoxType?a("el-select",{staticClass:"accountTypeList",attrs:{placeholder:"请选择"},on:{change:function(t){return e.changeAccountType()}},model:{value:e.accountTypeModel,callback:function(t){e.accountTypeModel=t},expression:"accountTypeModel"}},e._l(e.accountTypeList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1):e._e(),a("div",{ref:"surveyEchart",staticClass:"surveyEchart"},[a("div",{staticClass:"surveyEchartBox"},[a("div",{staticClass:"surveyEchartlist"},[0==e.videoBoxType?a("el-tabs",{on:{"tab-click":function(t){return e.changeEchartBtn()}},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"新增账户",name:"1"}}),a("el-tab-pane",{attrs:{label:"活跃账号",name:"2"}}),a("el-tab-pane",{attrs:{label:"当日上传量",name:"3"}}),a("el-tab-pane",{attrs:{label:"当日成功上传量",name:"4"}}),a("el-tab-pane",{attrs:{label:"当日成功上传审核量",name:"5"}}),a("el-tab-pane",{attrs:{label:"当日上传审核通过量",name:"6"}}),a("el-tab-pane",{attrs:{label:"总审核通过量",name:"7"}}),a("el-tab-pane",{attrs:{label:"当日总审核量",name:"8"}}),a("el-tab-pane",{attrs:{label:"发布量",name:"9"}}),a("el-tab-pane",{attrs:{label:"当日上传过审率",name:"10"}}),a("el-tab-pane",{attrs:{label:"审核过审率",name:"11"}}),a("el-tab-pane",{attrs:{label:"优质账号发布量",name:"12"}}),a("el-tab-pane",{attrs:{label:"发布视频总时长",name:"13"}})],1):e._e()],1),a("div",{staticClass:"surveyEchartimg"},[a("div",{staticStyle:{height:"400px"},attrs:{id:e.IDNAME}})])])]),a("div",{staticClass:"surveyDetailBox"},[a("div",{staticClass:"DetailBoxTop"},[0==e.videoBoxType?a("a",{staticClass:"surveyDown",attrs:{id:"surveyDown",href:e.downloadExcelUrl}},[e._v("下载数据")]):e._e(),1==e.videoBoxType?a("a",{staticClass:"accountNatDown",attrs:{id:"accountNatDown",href:e.downloadNatExcelUrl}},[e._v("下载数据")]):e._e(),2==e.videoBoxType?a("a",{staticClass:"accountTypeDown",attrs:{id:"accountTypeDown",href:e.downloadTypeExcelUrl}},[e._v("下载数据")]):e._e()]),0==e.videoBoxType?a("div",{staticClass:"DetailBoxBottom"},[a("el-table",{staticStyle:{"font-size":"10px",width:"100%"},attrs:{data:e.tableData,"header-cell-style":{background:"#E2E2EB",color:"#333"},"row-style":{height:"30px"},"cell-style":{padding:"10px"}}},[a("el-table-column",{attrs:{prop:"dateId",label:"日期",align:"center"}}),a("el-table-column",{attrs:{prop:"newUserNum",label:"新增账户",align:"center"}}),a("el-table-column",{attrs:{prop:"activeUserNum",label:"活跃账号",align:"center"}}),a("el-table-column",{attrs:{prop:"uploadNum",label:"当日上传量",align:"center"}}),a("el-table-column",{attrs:{prop:"upload_ok_num",label:"当日成功上传量",align:"center"}}),a("el-table-column",{attrs:{prop:"upload_audit_num",label:"当日成功上传审核量",align:"center"}}),a("el-table-column",{attrs:{prop:"upload_auditpass_num",label:"当日上传审核通过量",align:"center"}}),a("el-table-column",{attrs:{prop:"audit_pass_num",label:"总审核通过量",align:"center"}}),a("el-table-column",{attrs:{prop:"shenHeNum",label:"当日总审核量",align:"center"}}),a("el-table-column",{attrs:{prop:"faBuNum",label:"发布量",align:"center"}}),a("el-table-column",{attrs:{prop:"gsratio",label:"当日上传过审率",align:"center"}}),a("el-table-column",{attrs:{prop:"auditRate",label:"审核过审率",align:"center"}}),a("el-table-column",{attrs:{prop:"yzfbNum",label:"优质账号发布量",align:"center"}}),a("el-table-column",{attrs:{prop:"videoPlayCost",label:"发布视频总时长",align:"center"}})],1)],1):e._e(),1==e.videoBoxType?a("div",{staticClass:"natureDetailBoxBottom"},[a("el-table",{staticStyle:{"font-size":"10px",width:"100%"},attrs:{data:e.accountTableData,"header-cell-style":{background:"#E2E2EB",color:"#333"},"row-style":{height:"30px"},"cell-style":{padding:"10px"}}},[a("el-table-column",{attrs:{fixed:"",prop:"0.1",label:"日期",align:"center",width:"110"}}),a("el-table-column",{attrs:{prop:"1.1",label:"普通用户",align:"center"}}),a("el-table-column",{attrs:{prop:"2.1",label:"个人合作",align:"center"}}),a("el-table-column",{attrs:{prop:"3.1",label:"重点用户",align:"center"}}),a("el-table-column",{attrs:{prop:"4.1",label:"品牌用户",align:"center"}}),a("el-table-column",{attrs:{prop:"5.1",label:"seo用户",align:"center"}}),a("el-table-column",{attrs:{prop:"6.1",label:"自制用户",align:"center"}}),a("el-table-column",{attrs:{prop:"7.1",label:"包装用户",align:"center"}}),a("el-table-column",{attrs:{prop:"8.1",label:"机构合作",align:"center"}}),a("el-table-column",{attrs:{prop:"9.1",label:"百度上传用户",align:"center"}}),a("el-table-column",{attrs:{prop:"10.1",label:"采集用户",align:"center"}}),a("el-table-column",{attrs:{prop:"11.1",label:"匠星普通",align:"center"}}),a("el-table-column",{attrs:{prop:"12.1",label:"匠星精品",align:"center"}}),a("el-table-column",{attrs:{prop:"13.1",label:"外部SEO",align:"center"}}),a("el-table-column",{attrs:{prop:"14.1",label:"匠星原创",align:"center"}}),a("el-table-column",{attrs:{prop:"15.1",label:"MCN",align:"center"}}),a("el-table-column",{attrs:{prop:"16.1",label:"视频合作",align:"center"}}),a("el-table-column",{attrs:{prop:"17.1",label:"小视频",align:"center"}}),a("el-table-column",{attrs:{prop:"18.1",label:"官方号",align:"center"}})],1)],1):e._e(),2==e.videoBoxType?a("div",{staticClass:"typeDetailBoxBottom"},[a("el-table",{staticStyle:{"font-size":"10px",width:"100%"},attrs:{data:e.accountTableData,"header-cell-style":{background:"#E2E2EB",color:"#333"},"row-style":{height:"30px"},"cell-style":{padding:"10px"}}},[a("el-table-column",{attrs:{fixed:"",prop:"0.1",label:"日期",align:"center",width:"110"}}),a("el-table-column",{attrs:{prop:"1.1",label:"健康",align:"center"}}),a("el-table-column",{attrs:{prop:"2.1",label:"娱乐",align:"center"}}),a("el-table-column",{attrs:{prop:"3.1",label:"奇闻",align:"center"}}),a("el-table-column",{attrs:{prop:"4.1",label:"情感",align:"center"}}),a("el-table-column",{attrs:{prop:"5.1",label:"社会",align:"center"}}),a("el-table-column",{attrs:{prop:"6.1",label:"搞笑",align:"center"}}),a("el-table-column",{attrs:{prop:"7.1",label:"军事",align:"center"}}),a("el-table-column",{attrs:{prop:"8.1",label:"历史",align:"center"}}),a("el-table-column",{attrs:{prop:"9.1",label:"生活",align:"center"}}),a("el-table-column",{attrs:{prop:"10.1",label:"美女",align:"center"}}),a("el-table-column",{attrs:{prop:"11.1",label:"帅哥",align:"center"}}),a("el-table-column",{attrs:{prop:"12.1",label:"影视",align:"center"}}),a("el-table-column",{attrs:{prop:"13.1",label:"舞蹈",align:"center"}}),a("el-table-column",{attrs:{prop:"14.1",label:"音乐",align:"center"}}),a("el-table-column",{attrs:{prop:"15.1",label:"时尚",align:"center"}}),a("el-table-column",{attrs:{prop:"16.1",label:"动漫",align:"center"}}),a("el-table-column",{attrs:{prop:"17.1",label:"游戏",align:"center"}}),a("el-table-column",{attrs:{prop:"18.1",label:"曲艺",align:"center"}}),a("el-table-column",{attrs:{prop:"19.1",label:"体育",align:"center"}}),a("el-table-column",{attrs:{prop:"20.1",label:"星座运势",align:"center"}}),a("el-table-column",{attrs:{prop:"21.1",label:"美食",align:"center"}}),a("el-table-column",{attrs:{prop:"22.1",label:"旅游",align:"center"}}),a("el-table-column",{attrs:{prop:"23.1",label:"财经",align:"center"}}),a("el-table-column",{attrs:{prop:"24.1",label:"房产",align:"center"}}),a("el-table-column",{attrs:{prop:"25.1",label:"萌宠",align:"center"}}),a("el-table-column",{attrs:{prop:"26.1",label:"汽车",align:"center"}}),a("el-table-column",{attrs:{prop:"27.1",label:"母婴",align:"center"}}),a("el-table-column",{attrs:{prop:"28.1",label:"少儿",align:"center"}}),a("el-table-column",{attrs:{prop:"29.1",label:"科技",align:"center"}}),a("el-table-column",{attrs:{prop:"30.1",label:"数码",align:"center"}}),a("el-table-column",{attrs:{prop:"31.1",label:"健身",align:"center"}}),a("el-table-column",{attrs:{prop:"32.1",label:"教育",align:"center"}})],1)],1):e._e()])],1)],1)])])])},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"headContainer"},[a("div",{staticClass:"pagetarge"},[a("span",{},[e._v("视频发布报表")]),a("span",{staticClass:"arget"},[a("div",{staticClass:"argetTxt"},[a("h3",[e._v("指标：")]),a("p",[e._v("当日上传过审率：当日上传审核通过量比当日成功上传量")]),a("p",[e._v("审核过审率：总审核通过量比当日总审核量")])])])]),a("div",{staticClass:"rightSelect"})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"surveyDataTop"},[a("div",{staticClass:"grid-content bg-purple surveyDatatitle"},[e._v("昨日")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("新增账户")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("活跃账号")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("当日上传量")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("当日成功上传量")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("当日成功上传审核量")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("当日上传审核通过量")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("总审核通过量")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("当日总审核量")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("发布量")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("当日上传过审率")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("审核过审率")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("优质账号发布量")]),a("div",{staticClass:"grid-content bg-purple surveySort"},[e._v("发布视频总时长")])])}],r=(a("4160"),a("a15b"),a("a434"),a("b0c0"),a("ac1f"),a("1276"),a("159b"),a("b1d0")),i=a("1271"),o=a("313e"),s=a.n(o),c=(a("1531"),{name:"videoDistrRopret",data:function(){return{title:"视频发布报表",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},echartDefaultDate:[],tableData:[],accountTableData:[],recentData:"",partData:"",rightName:1,loading:!0,activeName:"1",IDNAME:"echart1",Valuename:"新增账户",btnType:1,downloadExcelUrl:"",downloadTypeExcelUrl:"",downloadNatExcelUrl:"",videoBoxType:0,accountTypeModel:"",accountTypeList:[{value:"",label:"账号类目"},{value:"健康",label:"健康"},{value:"娱乐",label:"娱乐"},{value:"奇闻",label:"奇闻"},{value:"情感",label:"情感"},{value:"社会",label:"社会"},{value:"搞笑",label:"搞笑"},{value:"军事",label:"军事"},{value:"历史",label:"历史"},{value:"生活",label:"生活"},{value:"美女",label:"美女"},{value:"帅哥",label:"帅哥"},{value:"影视",label:"影视"},{value:"舞蹈",label:"舞蹈"},{value:"音乐",label:"音乐"},{value:"时尚",label:"时尚"},{value:"动漫",label:"动漫"},{value:"游戏",label:"游戏"},{value:"曲艺",label:"曲艺"},{value:"体育",label:"体育"},{value:"星座运势",label:"星座运势"},{value:"美食",label:"美食"},{value:"旅游",label:"旅游"},{value:"财经",label:"财经"},{value:"房产",label:"房产"},{value:"萌宠",label:"萌宠"},{value:"汽车",label:"汽车"},{value:"母婴",label:"母婴"},{value:"少儿",label:"少儿"},{value:"科技",label:"科技"},{value:"数码",label:"数码"},{value:"健身",label:"健身"},{value:"教育",label:"教育"},{value:"风月",label:"风月"},{value:"其他",label:"其他"}],videoPie:"",pieValueName:""}},created:function(){document.title=this.title},activated:function(){document.title=this.title},mounted:function(){this.bindDrawal(),this.getAppRecentData()},methods:{bindDrawal:function(){this.echartDefaultDate.push(this.common.formatDate(-6),this.common.formatDate(0)),this.getPartData(),this.getDetails()},getAppRecentData:function(){var e=this;Object(r["a"])({method:"get",url:i["a"].recordUrl.getvideoGetGeneralData,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){e.loading=!1,e.recentData=t.data,console.log("that.recentData",e.recentData)})).catch((function(e){console.log(e)}))},changeEchartBtn:function(){console.log("activeName",this.activeName),1==this.activeName?(this.Valuename="新增账户",this.IDNAME="echart1",this.btnType=1):2==this.activeName?(this.Valuename="活跃账号",this.IDNAME="echart2",this.btnType=1):3==this.activeName?(this.Valuename="当日上传量",this.IDNAME="echart3",this.btnType=1):4==this.activeName?(this.Valuename="当日成功上传量",this.IDNAME="echart4",this.btnType=1):5==this.activeName?(this.Valuename="当日成功上传审核量",this.IDNAME="echart5",this.btnType=1):6==this.activeName?(this.Valuename="当日上传审核通过量",this.IDNAME="echart6",this.btnType=1):7==this.activeName?(this.Valuename="总审核通过量",this.IDNAME="echart7",this.btnType=1):8==this.activeName?(this.Valuename="当日总审核量",this.IDNAME="echart8",this.btnType=1):9==this.activeName?(this.Valuename="发布量",this.IDNAME="echart9",this.btnType=1):10==this.activeName?(this.Valuename="当日上传过审率",this.IDNAME="echart10",this.btnType=3):11==this.activeName?(this.Valuename="审核过审率",this.IDNAME="echart11",this.btnType=3):12==this.activeName?(this.Valuename="优质账号发布量",this.IDNAME="echart12",this.btnType=1):13==this.activeName&&(this.Valuename="发布视频总时长",this.IDNAME="echart13",this.btnType=2),this.getPartData();var e=[],t=[];t[0]=this.Valuename,e.push(t),e=JSON.stringify(e),window.LogList.checkLog("二郎神后台管理系统",this.title,"趋势图分类选择",e)},getPartData:function(){var e=this;Object(r["a"])({method:"get",url:i["a"].recordUrl.getvideoBasePartData+"?type="+e.activeName+"&startTime="+e.echartDefaultDate[0]+"&endtime="+e.echartDefaultDate[1]+"&AccountClass="+e.accountTypeModel,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){if(e.loading=!1,0==t.code){e.partData=t.data,console.log("趋势图数据",e.partData);var a=[],l=[];e.partData.forEach((function(e,t){var n=e.dateStr,r=n.split("");r.splice(4,0,"-"),r.splice(7,0,"-"),r=r.join(""),l.push(1*e.value),a.push(r)})),e.downloadE(),e.showechart(l,a,e.Valuename,e.IDNAME,e.btnType)}})).catch((function(e){console.log(e)}))},getDetails:function(){var e=this;Object(r["a"])({method:"get",url:i["a"].recordUrl.getvideoBaseGetDetails+"?accountclass="+e.accountTypeModel+"&StartTime="+e.echartDefaultDate[0]+"&EndTime="+e.echartDefaultDate[1],data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){e.loading=!1,e.tableData=t.data,console.log("表格数据",e.tableData)})).catch((function(e){console.log(e)}))},getAccountDetails:function(){var e=this;Object(r["a"])({method:"get",url:i["a"].recordUrl.getvideoAccountDetail+"?type="+e.videoBoxType+"&StartTime="+e.echartDefaultDate[0]+"&EndTime="+e.echartDefaultDate[1],data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){e.loading=!1;var a=t.data.title,l=t.data.data;l.forEach((function(t,l){e.trans([a,t])}))})).catch((function(e){console.log(e)}))},trans:function(e){var t=[];return e.forEach((function(e){e.forEach((function(e,a){var l=t[a]=t[a]||[];l.push(e)}))})),this.accountTableData.push(t),t},compare:function(e){return function(t,a){var l=t[e],n=a[e];return n-l}},pieMoneyChart:function(){var e=this;Object(r["a"])({method:"get",url:i["a"].recordUrl.getvideoTypeAccountData+"?Type="+e.videoBoxType+"&startTime="+e.echartDefaultDate[0]+"&endtime="+e.echartDefaultDate[1],data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){if(e.loading=!1,0==t.code){var a=t.data,l=[];a.forEach((function(e,t){var a=e.label,n=1*e.value,r={};r.name=a,r.value=n,l.push(r)})),l.sort(e.compare("value")),console.log("饼状图数据",l),e.showpieCharet(l,e.pieValueName,e.IDNAME)}})).catch((function(e){console.log(e)}))},downloadE:function(){this.downloadExcelUrl=i["a"].recordUrl.getvideoBaseDetailsExport+"?accountclass="+this.accountTypeModel+"&startTime="+this.echartDefaultDate[0]+"&endtime="+this.echartDefaultDate[1]},accountTypeDown:function(){this.downloadTypeExcelUrl=i["a"].recordUrl.getvideoAccountDetailExport+"?Type="+this.videoBoxType+"&startTime="+this.echartDefaultDate[0]+"&endtime="+this.echartDefaultDate[1]},changeEchartTime:function(){var e=this;console.log(this.echartDefaultDate),1==this.videoBoxType||2==this.videoBoxType?this.$nextTick((function(){e.pieMoneyChart(),e.getAccountDetails()})):0==this.videoBoxType&&this.$nextTick((function(){e.getPartData(),e.getDetails()}));var t=[],a=[];a[0]=echartDefaultDate[0],a[1]=echartDefaultDate[1],t.push(a),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"数据日期选择",t)},changeAccountType:function(e){console.log("accountTypeModel",this.accountTypeModel),this.getPartData(),this.getDetails();var t=[],a=[];a[0]=this.accountTypeModel,t.push(a),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"账户类目选择",t)},changeDataBoxBtn:function(){var e=this;console.log("videoBoxType",this.videoBoxType),1==this.videoBoxType?(this.IDNAME="echart2_1",this.pieValueName="账号属性",this.$nextTick((function(){e.pieMoneyChart(),e.getAccountDetails()}))):2==this.videoBoxType?(this.IDNAME="echart3_1",this.pieValueName="账号类目",this.$nextTick((function(){e.pieMoneyChart(),e.getAccountDetails()}))):0==this.videoBoxType&&(this.IDNAME="echart1",this.pieValueName="新增账户",this.$nextTick((function(){e.getPartData(),e.getDetails()})));var t=[],a=[];a[0]=this.pieValueName,t.push(a),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"数据分类选择",t)},showechart:function(e,t,a,l,n){var r,i,o,c,u=s.a.init(document.getElementById(l)),p=[];u.clear(),2==n?(e.forEach((function(e){p.push(e)})),r=Math.round(1.2*Math.max.apply(null,p)),o={trigger:"axis",formatter:function(e){var t="00:00";if(e[0].value>0){var a=Math.floor(e[0].value/3600),l=Math.floor(e[0].value%3600/60),n=Math.floor((e[0].value-60*l)%60);a<10&&(a="0"+a),l<10&&(l="0"+l),n<10&&(n="0"+n),t=a+":"+l+":"+n}else t="00:00:00";var r="";r+='<div><span style="color:#fff;">'+e[0].name+"</span><br/> ";for(var i=0;i<e.length;i++)r+='<span style="width: 8px;height: 8px;margin-right:5px;display:inline-block;border-radius: 50%;background-color:'+e[i].color+'"></span><span style="color:#fff;">'+e[i].seriesName+':</span><span style="color:#fff;">'+t+"</span><br/>";return r+="</div>",r}},c={textStyle:{color:"#666"},formatter:function(e){if(e>0){var t=Math.floor(e/3600),a=Math.floor(e%3600/60),l=Math.floor((e-60*a)%60);return t<10&&(t="0"+t),a<10&&(a="0"+a),l<10&&(l="0"+l),t+":"+a+":"+l}return"00:00:00"}}):3==n?(e.forEach((function(e){p.push(e)})),r=Math.round(1.2*Math.max.apply(null,p)),o={trigger:"axis",formatter:function(e){var t="";t+='<div><span style="color:#fff;">'+e[0].name+"</span><br/> ";for(var a=0;a<e.length;a++)t+='<span style="width: 8px;height: 8px;margin-right:5px;display:inline-block;border-radius: 50%;background-color:'+e[a].color+'"></span><span style="color:#fff;">'+e[a].seriesName+':</span><span style="color:#fff;">'+e[a].value+"&nbsp;%</span><br/>";return t+="</div>",t}},c={textStyle:{color:"#666"},formatter:function(e){return e+"%"}}):(e.forEach((function(e){p.push(e)})),r=Math.round(1.2*Math.max.apply(null,p)),o={trigger:"axis"},c={textStyle:{color:"#666"}}),u.setOption({tooltip:o,legend:{data:[]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:t,splitLine:{show:!1},axisLine:{lineStyle:{type:"solid",color:"#E6E6E6",width:"2"}},axisLabel:{textStyle:{color:"#666"}}},yAxis:{type:"value",min:i,max:r,splitLine:{lineStyle:{type:"dashed"}},axisLine:{lineStyle:{type:"solid",color:"#E6E6E6",width:"2"}},axisLabel:c},series:[{name:a,type:"line",stack:"总量",itemStyle:{normal:{color:"#396FFF",lineStyle:{color:"#396FFF"}}},data:p}]})},showpieCharet:function(e,t,a){var l,n=s.a.init(document.getElementById(a));n.clear(),l={tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{orient:"vertical",left:10,data:[]},series:[{name:t,type:"pie",selectedMode:"single",radius:[0,"30%"],label:{position:"inner"},labelLine:{show:!1}},{name:t,type:"pie",radius:["40%","55%"],label:{formatter:"{b}({d}%) ",rich:{a:{color:"#999",lineHeight:22,align:"center"},hr:{borderColor:"#aaa",width:"100%",borderWidth:.5,height:0},b:{fontSize:15,lineHeight:20},per:{color:"#eee",backgroundColor:"#334455",padding:[2,4],borderRadius:2}}},data:e}]},n.setOption(l)}}}),u=c,p=(a("6a6e"),a("2877")),d=Object(p["a"])(u,l,n,!1,null,"35e8c25d",null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-b1ab6e26.880bfb6831ef964c471f.1618470402363.js.map