(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d9547938"],{2532:function(e,t,a){"use strict";var n=a("23e7"),i=a("5a34"),l=a("1d80"),r=a("ab13");n({target:"String",proto:!0,forced:!r("includes")},{includes:function(e){return!!~String(l(this)).indexOf(i(e),arguments.length>1?arguments[1]:void 0)}})},"308f":function(e,t,a){"use strict";var n=a("9e85"),i=a.n(n);i.a},"5a34":function(e,t,a){var n=a("44e7");e.exports=function(e){if(n(e))throw TypeError("The method doesn't accept regular expressions");return e}},"9e85":function(e,t,a){},ab13:function(e,t,a){var n=a("b622"),i=n("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(a){try{return t[i]=!1,"/./"[e](t)}catch(n){}}return!1}},b0c0:function(e,t,a){var n=a("83ab"),i=a("9bf2").f,l=Function.prototype,r=l.toString,s=/^\s*function ([^ (]*)/,c="name";!n||c in l||i(l,c,{configurable:!0,get:function(){try{return r.call(this).match(s)[1]}catch(e){return""}}})},bd5a:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"appSurvey"},[a("div",{staticClass:"appSurveyContainer"},[a("div",{staticClass:"headContainer"},[a("div",{staticClass:"pagetarge"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"自定义事件",name:"left"}}),a("el-tab-pane",{attrs:{label:"用户点击排行",name:"right"}})],1),e._m(0)],1)]),a("div",{directives:[{name:"show",rawName:"v-show",value:"left"==e.activeName,expression:"activeName=='left'"}],staticClass:"surveyContainer"},[a("div",{staticClass:"videoDataTop"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"box",attrs:{span:8}},[a("span",[e._v("时间：")]),a("el-date-picker",{staticClass:"commonClass",attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始","end-placeholder":"结束","picker-options":e.pickerOptions},model:{value:e.echartDefaultDate,callback:function(t){e.echartDefaultDate=t},expression:"echartDefaultDate"}})],1),a("el-col",{staticClass:"box",attrs:{span:8}},[a("span",[e._v("事件名称：")]),a("el-select",{staticClass:"commonClass1",attrs:{multiple:"","collapse-tags":"",placeholder:"请选择"},model:{value:e.tagValue,callback:function(t){e.tagValue=t},expression:"tagValue"}},e._l(e.tagOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),a("div",{staticClass:"Allbtn"},[a("el-row",{staticClass:"btndata"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.searchBtn()}}},[e._v("查询")])],1)],1)],1),a("div",{staticClass:"videoDataBottom"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.recentData,"header-cell-style":{background:"#E2E2EB",color:"#333"}}},[a("el-table-column",{attrs:{prop:"dateTime",label:"日期",align:"center"}}),a("el-table-column",{attrs:{prop:"world",label:"事件名称",align:"center"}}),a("el-table-column",{attrs:{prop:"pv",label:"事件数量",align:"center"}}),a("el-table-column",{attrs:{prop:"uv",label:"事件人数",align:"center"}})],1)],1)]),a("div",{directives:[{name:"show",rawName:"v-show",value:"right"==e.activeName,expression:"activeName=='right'"}],staticClass:"surveyContainer"},[a("div",{staticClass:"videoDataTop"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"box",attrs:{span:8}},[a("span",[e._v("时间：")]),a("el-date-picker",{staticClass:"commonClass",attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始","end-placeholder":"结束","picker-options":e.pickerOptions},on:{change:e.changeUserTime},model:{value:e.userDefaultDate,callback:function(t){e.userDefaultDate=t},expression:"userDefaultDate"}})],1)],1)],1),a("div",{staticClass:"videoDataBottom"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.recentData,"header-cell-style":{background:"#E2E2EB",color:"#333"}}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center"}}),a("el-table-column",{attrs:{prop:"nickname",label:"用户昵称",align:"center"}}),a("el-table-column",{attrs:{prop:"userid",label:"用户id",align:"center"}}),a("el-table-column",{attrs:{prop:"clickpv",label:"点击商品次数",align:"center"}})],1),a("el-pagination",{attrs:{"current-page":e.currentPage4,"page-sizes":[50,100,150,200],"page-size":50,layout:"total, sizes, prev, pager, next, jumper",total:e.totalDate},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])])},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{staticClass:"arget"},[a("div",{staticClass:"argetTxt"},[a("h3",[e._v("指标：")]),a("p",[e._v("浏览量（PV）：当天网站的页面浏览量")]),a("p",[e._v("访客数（UV）：当天网站的页面浏览用户数")]),a("p",[e._v("IP数（IP）：当天网站的页面浏览ip数")]),a("p",[e._v("视频播放量：当天网站的视频总播放量")]),a("p",[e._v("人均播放量：当天网站的视频播放量与视频总播放人数比")]),a("p",[e._v("人均观看时长：当天网站的视频播放时长与视频总播放人数比")])])])}],l=(a("caad"),a("b0c0"),a("2532"),a("b1d0")),r=a("1271"),s={name:"videoData",data:function(){return{title:"用户行为数据",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}},{text:"全部",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6479136e5),e.$emit("pick",[a,t])}}]},echartDefaultDate:[],userDefaultDate:[],tagValue:[],tagOptions:[{label:"全部",value:0},{label:"上热门按钮点击",value:1},{label:"上热门tab选中",value:2},{label:"上热门支付按钮的点击",value:3},{label:"支付成功订单",value:4}],recentData:[],currentPage:1,pageIndex:1,pageIndex1:1,loading:!1,downloadExcelUrl:"",disabled:!0,activeName:"left",currentPage4:1,totalDate:0,pageSize:50}},created:function(){document.title=this.title},activated:function(){document.title=this.title},mounted:function(){this.echartDefaultDate.push(this.common.formatDate(-3),this.common.formatDate(0)),this.userDefaultDate.push(this.common.formatDate(-3),this.common.formatDate(0)),this.searchBtn()},methods:{changeUserTime:function(){this.loading=!0;var e=this,t={starttime:e.userDefaultDate[0],endtime:e.userDefaultDate[1],pageIndex:e.pageIndex1,pageSize:e.pageSize};t=JSON.stringify(t),Object(l["a"])({method:"POST",url:r["a"].recordUrl.UserClickAction,data:t,headers:{"Content-Type":"application/json"}}).then((function(t){e.loading=!1,e.recentData=t.data.data,e.totalDate=t.data.count})).catch((function(e){console.log(e)}));var a=[],n=[];n[0]=e.userDefaultDate[0]+"至"+e.userDefaultDate[1],n[1]=e.tagValue,n[2]="用户点击排行榜",a.push(n),a=JSON.stringify(a),window.LogList.checkLog("二郎神后台管理系统",e.title,"查询",a)},handleClick:function(e,t){"left"==e.name?(this.activeName="left",this.searchBtn()):"right"==e.name&&(this.activeName="right",this.changeUserTime())},searchBtn:function(){(0==this.tagValue.length||this.tagValue.includes(0))&&(this.tagValue=[1,2,3]),this.loading=!0;var e=this,t={startTime:e.echartDefaultDate[0],endTime:e.echartDefaultDate[1],ActionType:e.tagValue};t=JSON.stringify(t),Object(l["a"])({method:"POST",url:r["a"].recordUrl.bdgAppUserAction,data:t,headers:{"Content-Type":"application/json"}}).then((function(t){e.loading=!1,e.recentData=t.data})).catch((function(e){console.log(e)}));var a=[],n=[];n[0]=e.echartDefaultDate[0]+"至"+e.echartDefaultDate[1],n[1]=e.tagValue,n[2]="自定义事件",a.push(n),a=JSON.stringify(a),window.LogList.checkLog("二郎神后台管理系统",e.title,"查询",a)},handleSizeChange:function(e){console.log("每页 ".concat(e," 条")),this.pageSize=e,this.changeUserTime()},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.pageIndex1=e,this.changeUserTime()},videoTypeOr:function(e){return 100==e.isplubic?"小视频":200===e.distributable?"横屏视频":"全部"},distributableOr:function(e){return 0==e.distributable?"否":1===e.distributable?"是":"全部"}}},c=s,o=(a("308f"),a("2877")),u=Object(o["a"])(c,n,i,!1,null,"3c029883",null);t["default"]=u.exports},caad:function(e,t,a){"use strict";var n=a("23e7"),i=a("4d64").includes,l=a("44d2"),r=a("ae40"),s=r("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:!s},{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),l("includes")}}]);
//# sourceMappingURL=chunk-d9547938.880bfb6831ef964c471f.1618470402363.js.map