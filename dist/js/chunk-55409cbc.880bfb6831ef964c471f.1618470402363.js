(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55409cbc"],{"18ea":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"appSurvey"},[a("div",{staticClass:"appSurveyContainer"},[e._m(0),a("div",{staticClass:"surveyContainer"},[a("div",{staticClass:"videoDataTop"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"box",attrs:{span:7}},[a("span",[e._v("选择日期：")]),a("el-date-picker",{staticClass:"commonClass",attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期","picker-options":e.expireTimeOption},on:{change:e.changeMedia},model:{value:e.echartDefaultDate.dateValue,callback:function(t){e.$set(e.echartDefaultDate,"dateValue",t)},expression:"echartDefaultDate.dateValue"}})],1)],1),a("el-row",{staticClass:"mediaContent",attrs:{gutter:20}},[a("el-col",{staticClass:"box",attrs:{span:7}},[a("span",[e._v("录入类型：")]),a("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:e.changeMedia},model:{value:e.mediaValue,callback:function(t){e.mediaValue=t},expression:"mediaValue"}},e._l(e.mediaList,(function(e){return a("el-option",{key:e.key,attrs:{label:e.value,value:e.key}})})),1)],1),a("el-col",{staticClass:"box",attrs:{span:7}},[a("span",[e._v("录入金额：")]),a("el-input",{staticClass:"commonClass",attrs:{placeholder:"请输入金额"},model:{value:e.mediaValueNum,callback:function(t){e.mediaValueNum=t},expression:"mediaValueNum"}})],1)],1),a("div",{staticClass:"Allbtn"},[a("el-row",{staticClass:"btndata"},[a("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"primary"},on:{click:function(t){return e.open()}}},[e._v("确认录入")])],1)],1)],1),a("div",{staticClass:"videoDataBottom"},[a("h3",[e._v("明细数据")]),a("div",{staticClass:"videoData"},[a("el-date-picker",{staticClass:"detailBoxTime",attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},on:{change:e.changeBoxTime},model:{value:e.detailBoxDate,callback:function(t){e.detailBoxDate=t},expression:"detailBoxDate"}})],1),a("div",{staticClass:"tableBox"},[a("div",{staticClass:"DetailBoxBottom"},[a("table",{staticClass:"detailTable",staticStyle:{border:"1px solid #dedede"},attrs:{id:"tab",border:"0",cellpadding:"0",cellspacing:"0"}},[a("tr",{staticClass:"biaotou"},[e._l(e.recentDataHeader,(function(t){return[a("th",{staticStyle:{}},[e._v(e._s(t))])]}))],2),e._l(e.recentData,(function(t){return[a("tr",{staticClass:"biaoCont"},[e._l(t,(function(t){return[a("td",{staticStyle:{}},[e._v(e._s(t))])]}))],2)]}))],2)])]),""!==e.count?a("el-pagination",{staticClass:"count",attrs:{"current-page":e.currentPage,"page-size":30,layout:"total, sizes, prev, pager, next, jumper",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1),a("div",{staticClass:"blogBox"},[a("h3",[e._v("更新日志")]),a("div",{staticClass:"blogBoxTop"},[a("el-date-picker",{staticClass:"detailBoxTime",attrs:{"el-date-picker":"","value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},on:{change:e.changeBlogTime},model:{value:e.blogBoxDate,callback:function(t){e.blogBoxDate=t},expression:"blogBoxDate"}})],1),a("div",{staticClass:"blogListAll"},e._l(e.tableData,(function(t,s){return a("div",{key:s},[a("div",{staticClass:"blogList"},[a("div",{staticClass:"dataTime"},[e._v(e._s(t.dateId))]),e._l(t.data,(function(t,s){return a("div",{key:s,staticClass:"dataList"},[a("p",[e._v(e._s(t.time))]),a("p",{staticClass:"accountSpan"},[e._v(e._s(t.userName))]),a("p",[e._v(e._s(t.message))])])}))],2)])})),0)])])]),a("keep-alive",[a("unlock")],1)],1)},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"headContainer"},[a("div",{staticClass:"pagetarge"},[a("span",{},[e._v("数据录入-视频分发部")]),a("span",{staticClass:"arget"},[a("div",{staticClass:"argetTxt"},[a("h3",[e._v("指标：")]),a("p",[e._v("浏览量（PV）：当天网站的页面浏览量")]),a("p",[e._v("访客数（UV）：当天网站的页面浏览用户数")]),a("p",[e._v("IP数（IP）：当天网站的页面浏览ip数")]),a("p",[e._v("视频播放量：当天网站的视频总播放量")]),a("p",[e._v("人均播放量：当天网站的视频播放量与视频总播放人数比")]),a("p",[e._v("人均观看时长：当天网站的视频播放时长与视频总播放人数比")])])])]),a("div",{staticClass:"rightSelect"})])}],n=(a("4160"),a("a9e3"),a("159b"),a("b1d0")),o=a("1271"),l=a("8b00"),c={name:"videoData",components:{unlock:l["a"]},data:function(){return{title:"数据录入-视频分发部",echartDefaultDate:{dateValue:""},detailBoxDate:[],blogBoxDate:[],expireTimeOption:{disabledDate:function(e){var t=(new Date).getTime(),a=3456e5,s=t-a;return e.getTime()>Date.now()||e.getTime()<s}},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},recentData:[],count:"",currentPage:1,pageIndex:1,fullscreenLoading:!1,mediaList:[],mediaValue:"",mediaValueNum:"",mediaValueName:"",mediaValueMiddle:0,recentDataHeader:[],tableData:[]}},created:function(){document.title=this.title},activated:function(){document.title=this.title},mounted:function(){this.echartDefaultDate.dateValue=this.timeDefault(),this.detailBoxDate.push(this.common.formatDate(-7),this.common.formatDate(-1)),this.blogBoxDate.push(this.common.formatDate(-6),this.common.formatDate(0)),this.detailData(),this.getVdList(),this.BolgList()},methods:{timeDefault:function(){var e=new Date,t=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+(e.getDate()-1);return t},changeBlogTime:function(){console.log("时间",this.blogBoxDate),this.BolgList()},changeEchartTime:function(){console.log("时间",this.echartDefaultDate.dateValue)},changeBoxTime:function(){this.detailData(),console.log("时间",this.detailBoxDate);var e=[],t=[];t[0]=this.detailBoxDate[0],t[1]=this.detailBoxDate[1],e.push(t),e=JSON.stringify(e),window.LogList.checkLog("二郎神后台管理系统",this.title,"明细日期选择",e)},BolgList:function(){var e=this;Object(n["a"])({method:"get",url:o["a"].recordUrl.getVdLog+"?StartTime="+e.blogBoxDate[0]+"&EndTime="+e.blogBoxDate[1],data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){e.loading=!1,e.tableData=t.data.response,console.log(e.tableData)})).catch((function(e){console.log(e)}))},changeMedia:function(e){var t=this;if(t.mediaList.forEach((function(a){a.key==e&&(t.mediaValueName=a.value)})),""==t.echartDefaultDate.dateValue)return t.$message({type:"success",message:"请选日期"}),!1;Object(n["a"])({method:"get",url:o["a"].recordUrl.GetVdOld+"?DateId="+t.echartDefaultDate.dateValue+"&CId="+t.mediaValue,data:{},headers:{"Content-Type":"application/json"}}).then((function(e){0==e.code?(t.fullscreenLoading=!1,t.mediaValueNum=e.data,t.mediaValueMiddle=e.data):1==e.code&&(t.fullscreenLoading=!1,t.$message({type:"success",message:e.message}))})).catch((function(e){t.$message({type:"success",message:res.data})}))},open:function(){var e=this;if(""!==this.mediaValueNum){var t='<div>您要录入的数据为:</div><div class="entryList" style="display:flex;flex-wrap:wrap;">';t+='<div style="">录入金额：<span style="color:#333;font-weight:600;margin-right:20px;">'.concat(this.mediaValueNum,"；</span></div>"),t+="</div>",this.$confirm(t,"录入提示",{confirmButtonText:"确定",cancelButtonText:"取消",dangerouslyUseHTMLString:!0}).then((function(){e.searchBtn()})).catch((function(){e.$message({type:"info",message:"已取消录入"})}))}else this.$message.error("请输入录入数据")},searchBtn:function(){var e={DateId:this.echartDefaultDate.dateValue,CId:this.mediaValue,value:this.mediaValueNum};e=JSON.stringify(e),console.log(e),this.fullscreenLoading=!0;var t=this;Object(n["a"])({method:"post",url:o["a"].recordUrl.pushVdData,data:e,headers:{"Content-Type":"application/json"}}).then((function(e){if(0==e.code){t.fullscreenLoading=!1,t.$message({type:"success",message:e.data}),t.detailData(),t.BolgList();var a,s=[],i=[];i[0]=t.mediaValueName,i[1]=t.mediaValueNum,s.push(i),s=JSON.stringify(s),0!==Number(t.mediaValueNum)&&0==t.mediaValueMiddle?a="录入":Number(t.mediaValueNum)!==t.mediaValueMiddle&&(a="修改"),window.LogList.checkLog("二郎神后台管理系统",t.title,a,s)}else 1==e.code&&(t.fullscreenLoading=!1,t.$message({type:"success",message:e.message}))})).catch((function(e){t.$message({type:"success",message:res.data})}))},getVdList:function(){this.fullscreenLoading=!0;var e=this;Object(n["a"])({method:"get",url:o["a"].recordUrl.getVdList,data:{},headers:{"Content-Type":"application/json"}}).then((function(t){0==t.code?(e.fullscreenLoading=!1,e.mediaList=t.data,e.mediaValue=t.data[0].key,e.mediaValueName=t.data[0].value,console.log("that.mediaList",e.mediaList),e.changeMedia()):1==t.code&&(e.fullscreenLoading=!1,e.$message({type:"success",message:t.message}))})).catch((function(t){e.$message({type:"success",message:t.data})}))},detailData:function(){this.fullscreenLoading=!0;var e=this;Object(n["a"])({method:"get",url:o["a"].recordUrl.getVdData+"?startTime="+e.detailBoxDate[0]+"&endtime="+e.detailBoxDate[1]+"&Page="+e.pageIndex+"&Rows=30",data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){e.fullscreenLoading=!1,e.recentDataHeader=t.data[0],e.recentData=[],t.data.forEach((function(t,a){a>0&&e.recentData.push(t)})),console.log("that.recentData",e.recentData)})).catch((function(e){}))},handleSizeChange:function(e){console.log("每页 ".concat(e," 条"))},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.pageIndex=e,this.searchBtn()}}},r=c,d=(a("67e0"),a("2877")),u=Object(d["a"])(r,s,i,!1,null,"62868819",null);t["default"]=u.exports},"3b29":function(e,t,a){"use strict";var s=a("9d4f"),i=a.n(s);i.a},"67e0":function(e,t,a){"use strict";var s=a("b6f2"),i=a.n(s);i.a},"8b00":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"unlock"},[1==e.modelboxShow?a("div",{staticClass:"modelbox"},[a("div",{staticClass:"modelbox_unlock"},[a("div",{staticClass:"unlock_title"},[e._v(" 您的账号被锁定，请解锁！ ")]),a("div",{staticClass:"form-group"},[a("div",{staticClass:"col-sm-12"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"lockmm",attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})])]),a("button",{staticClass:"unlockbtn",attrs:{type:"button"},on:{click:function(t){return e.unlockbtn()}}},[e._v("解锁")])])]):e._e()])},i=[],n=a("b1d0"),o=a("1271"),l={name:"App",data:function(){return{title:"",password:"",modelboxShow:!1}},watch:{"$store.state.code":function(e,t){console.log(e,t),90001==e?this.modelboxShow=!0:1001==e&&(window.location.href="https://pxtadmin.com/")}},activated:function(){document.title=this.title,console.log("store",this.$store.state.code);var e=this.$store.state.code;90001==e?this.modelboxShow=!0:1001==e&&(window.location.href="https://pxtadmin.com/")},mounted:function(){document.title=this.title;var e=this.$store.state.code;90001==e?this.modelboxShow=!0:1001==e&&(window.location.href="https://pxtadmin.com/")},methods:{unlockbtn:function(){var e=this,t={Pwd:e.password};t=JSON.stringify(t),Object(n["a"])({method:"post",url:o["a"].recordUrl.Unlock,data:t,headers:{"Content-Type":"application/json"}}).then((function(t){e.loading=!1,e.modelboxShow=!1,location.reload()})).catch((function(e){console.log(e)}))}}},c=l,r=(a("3b29"),a("2877")),d=Object(r["a"])(c,s,i,!1,null,"50d5a08a",null);t["a"]=d.exports},"9d4f":function(e,t,a){},a9e3:function(e,t,a){"use strict";var s=a("83ab"),i=a("da84"),n=a("94ca"),o=a("6eeb"),l=a("5135"),c=a("c6b6"),r=a("7156"),d=a("c04e"),u=a("d039"),m=a("7c73"),h=a("241c").f,p=a("06cf").f,g=a("9bf2").f,f=a("58a8").trim,v="Number",b=i[v],D=b.prototype,C=c(m(D))==v,x=function(e){var t,a,s,i,n,o,l,c,r=d(e,!1);if("string"==typeof r&&r.length>2)if(r=f(r),t=r.charCodeAt(0),43===t||45===t){if(a=r.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(r.charCodeAt(1)){case 66:case 98:s=2,i=49;break;case 79:case 111:s=8,i=55;break;default:return+r}for(n=r.slice(2),o=n.length,l=0;l<o;l++)if(c=n.charCodeAt(l),c<48||c>i)return NaN;return parseInt(n,s)}return+r};if(n(v,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var y,w=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof w&&(C?u((function(){D.valueOf.call(a)})):c(a)!=v)?r(new b(x(t)),a,w):x(t)},_=s?h(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;_.length>k;k++)l(b,y=_[k])&&!l(w,y)&&g(w,y,p(b,y));w.prototype=D,D.constructor=w,o(i,v,w)}},b6f2:function(e,t,a){}}]);
//# sourceMappingURL=chunk-55409cbc.880bfb6831ef964c471f.1618470402363.js.map