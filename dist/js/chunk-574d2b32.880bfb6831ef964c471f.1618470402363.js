(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-574d2b32"],{"216a1":function(t,e,a){"use strict";var i=a("740d"),n=a.n(i);n.a},"740d":function(t,e,a){},a434:function(t,e,a){"use strict";var i=a("23e7"),n=a("23cb"),l=a("a691"),s=a("50c4"),o=a("7b0b"),r=a("65f0"),c=a("8418"),h=a("1dde"),d=a("ae40"),p=h("splice"),u=d("splice",{ACCESSORS:!0,0:0,1:2}),g=Math.max,m=Math.min,v=9007199254740991,f="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!p||!u},{splice:function(t,e){var a,i,h,d,p,u,D=o(this),y=s(D.length),b=n(t,y),x=arguments.length;if(0===x?a=i=0:1===x?(a=0,i=y-b):(a=x-2,i=m(g(l(e),0),y-b)),y+a-i>v)throw TypeError(f);for(h=r(D,i),d=0;d<i;d++)p=b+d,p in D&&c(h,d,D[p]);if(h.length=i,a<i){for(d=b;d<y-i;d++)p=d+i,u=d+a,p in D?D[u]=D[p]:delete D[u];for(d=y;d>y-i+a;d--)delete D[d-1]}else if(a>i)for(d=y-i;d>b;d--)p=d+i-1,u=d+a-1,p in D?D[u]=D[p]:delete D[u];for(d=0;d<a;d++)D[d+b]=arguments[d+2];return D.length=y-i+a,h}})},fb78:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"appSurvey"},[a("div",{staticClass:"appSurveyContainer"},[a("div",{staticClass:"headContainer"},[t._m(0),a("div",{staticClass:"rightSelect"},[a("el-cascader",{attrs:{options:t.options,"change-on-select":"","show-all-levels":!1},on:{change:function(e){return t.changeRight()}},model:{value:t.rightName,callback:function(e){t.rightName=e},expression:"rightName"}})],1)]),a("div",{staticClass:"surveyContainer"},[a("div",{staticClass:"surveyTop"},[a("div",{staticClass:"surveyDataTop"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:1.5}},[a("div",{staticClass:"grid-content bg-purple surveyDatatitle"},[t._v("昨日")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("新增用户")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("活跃留存")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("新增留存")])])],1)],1),a("div",{staticClass:"surveyDataBottom"},t._l(t.recentData,(function(e,i){return a("el-row",{key:i,attrs:{gutter:20}},[a("el-col",{attrs:{span:1.5}},[a("div",{staticClass:"grid-content bg-purple surveyDatatitle"},[t._v("昨日")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(e.newUsers))])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(e.activeRate)+"%")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(e.newUserRate)+"%")])])],1)})),1)]),a("div",{staticClass:"surveyEchart"},[a("div",{staticClass:"surveyDate"},[a("el-date-picker",{staticClass:"surveyTime",attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},on:{change:t.changeEchartTime},model:{value:t.echartDefaultDate,callback:function(e){t.echartDefaultDate=e},expression:"echartDefaultDate"}})],1),a("div",{staticClass:"surveyEchartBox"},[a("div",{staticClass:"surveyEchartlist"},[a("el-tabs",{on:{"tab-click":t.changeEchartBtn},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"活跃留存",name:"2"}},[a("div",{staticStyle:{height:"400px"},attrs:{id:"echart2"}})]),a("el-tab-pane",{attrs:{label:"新增留存",name:"3"}},[a("div",{staticStyle:{height:"400px"},attrs:{id:"echart3"}})])],1)],1),a("div",{staticClass:"surveyEchartimg"})])]),a("div",{staticClass:"surveyDetailBox"},[a("div",{staticClass:"DetailBoxTop"},[a("el-date-picker",{staticClass:"detailBoxTime",attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},on:{change:t.changeBoxTime},model:{value:t.detailBoxDate,callback:function(e){t.detailBoxDate=e},expression:"detailBoxDate"}})],1),a("div",{staticClass:"DetailBoxBottom"},[a("el-table",{staticStyle:{"font-size":"10px",width:"100%"},attrs:{data:t.tableData,"header-cell-style":{background:"#E2E2EB",color:"#333"},"row-style":{height:"30px"},"cell-style":{padding:"10px"}}},[a("el-table-column",{attrs:{prop:"dateId",label:"日期",align:"center"}}),a("el-table-column",{attrs:{prop:"newUsers",label:"新增用户",align:"center"}}),a("el-table-column",{attrs:{prop:"activeRate",label:"活跃留存",align:"center"}}),a("el-table-column",{attrs:{prop:"newUserRate",label:"新增留存",align:"center"}})],1)],1)])])])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagetarge"},[a("span",{},[t._v("留存分析")]),a("span",{staticClass:"arget"},[a("div",{staticClass:"argetTxt"},[a("h3",[t._v("指标：")]),a("p",[t._v("新增用户：当天app的新增用户数（30天内去重）")]),a("p",[t._v("活跃留存：前日启动APP的用户，昨日再次启动APP的用户数，为活跃留存用户数；再次启动APP的用户数占前日用户数的比例，为活跃留存（仅包含注册用户）")]),a("p",[t._v("新增留存：前日注册APP的新用户，昨日再次启动APP的用户数，为新增账号留存用户数；再次启动APP的用户数占前日新增用户数的比例，为新增账号留存（仅包含注册用户）")])])])])}],l=(a("4160"),a("a15b"),a("a434"),a("b0c0"),a("ac1f"),a("1276"),a("159b"),a("b1d0")),s=a("1271"),o=a("313e"),r=a.n(o),c=(a("1531"),{name:"appRetain",data:function(){return{title:"魔盒SDK留存分析",tableData:[],pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},recentData:"",echartDefaultDate:[],detailBoxDate:[],partData:"",options:[],rightName:"",CompanyName:"",MediaName:"",loading:!0,activeName:"2",IDNAME:"echart2",Valuename:"注册率",btnType:3}},created:function(){document.title=this.title},activated:function(){document.title=this.title},mounted:function(){this.bindDrawal(),this.getAppRecentData(),this.getConfig()},methods:{getConfig:function(){var t=this;Object(l["a"])({method:"get",url:s["a"].recordUrl.getsdkConfig,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log("配置信息",e),t.loading=!1,t.options=e.data,t.options.forEach((function(t,e){null==t.label&&(t.label=t.value);for(var a=t.children,i=0;i<a.length;i++){var n=a[i];if(null==n.label&&(n.label=n.value),n.children)for(var l=n.children,s=0;s<l.length;s++){var o=l[s];null==o.label&&(o.label=o.value)}}})),console.log(t.options)})).catch((function(t){console.log(t)}))},bindDrawal:function(){this.detailBoxDate.push(this.common.formatDate(-7),this.common.formatDate(-1)),this.echartDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1)),this.getPartData(),this.getDetails()},changeBoxTime:function(){console.log(this.detailBoxDate),this.getDetails();var t=[],e=[];e[0]=this.detailBoxDate[0],e[1]=this.detailBoxDate[1],t.push(e),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"表格数据日期选择",t)},changeEchartTime:function(){console.log(this.echartDefaultDate),this.getPartData();var t=[],e=[];e[0]=this.echartDefaultDate[0],e[1]=this.echartDefaultDate[1],t.push(e),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"趋势图日期选择",t)},getAppRecentData:function(){var t=this;Object(l["a"])({method:"get",url:s["a"].recordUrl.getsdkAnaGeneralData+"?CompanyName="+t.CompanyName+"&MediaName="+t.MediaName,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){t.loading=!1,t.recentData=e.data,console.log("that.recentData",t.recentData)})).catch((function(t){console.log(t)}))},changeEchartBtn:function(){console.log("activeName",this.activeName),2==this.activeName?(this.Valuename="活跃留存",this.IDNAME="echart2",this.btnType=3):3==this.activeName&&(this.Valuename="新增留存",this.IDNAME="echart3",this.btnType=3),this.getPartData();var t=[],e=[];e[0]=this.Valuename,t.push(e),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"趋势图分类切换",t)},getPartData:function(){var t=this;Object(l["a"])({method:"get",url:s["a"].recordUrl.getsdkAnaPartData+"?CompanyName="+t.CompanyName+"&MediaName="+t.MediaName+"&PartNum="+t.activeName+"&startTime="+t.echartDefaultDate[0]+"&endtime="+t.echartDefaultDate[1],data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){if(t.loading=!1,0==e.code){t.partData=e.data,console.log("趋势图数据",t.partData);var a=[],i=[];t.partData.forEach((function(t,e){var n=t.dateStr,l=n.split("");l.splice(4,0,"-"),l.splice(7,0,"-"),l=l.join(""),i.push(1*t.value),a.push(l)})),console.log("datelist",a),console.log("dataValueList",i),t.showechart(i,a,t.Valuename,t.IDNAME,t.btnType)}})).catch((function(t){console.log(t)}))},getDetails:function(){var t=this;Object(l["a"])({method:"get",url:s["a"].recordUrl.getsdkAnaDetailsData+"?CompanyName="+t.CompanyName+"&MediaName="+t.MediaName+"&startTime="+t.detailBoxDate[0]+"&endtime="+t.detailBoxDate[1],data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){t.loading=!1,t.tableData=e.data,t.tableData.forEach((function(e,a){var i=e.dateId;i=i.split(" ")[0],t.tableData[a].dateId=i})),console.log("表格数据",t.tableData)})).catch((function(t){console.log(t)}))},changeRight:function(){console.log("value",this.rightName),1==this.rightName.length?(this.CompanyName=this.rightName[0],this.MediaName=""):2==this.rightName.length&&(this.CompanyName=this.rightName[0],this.MediaName=this.rightName[1]),this.getDetails(),this.getAppRecentData(),this.getPartData(),this.loading=!0;var t=[],e=[];e[0]=this.rightName,t.push(e),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"渠道分类选择",t)},showechart:function(t,e,a,i,n){var l,s,o,c,h=r.a.init(document.getElementById(i)),d=[];2==n?(t.forEach((function(t){d.push(t)})),l=Math.round(1.2*Math.max.apply(null,d)),o={trigger:"axis"},c={textStyle:{color:"#666"},formatter:function(t){if(t>0){var e=Math.floor(t/3600),a=Math.floor(t%3600/60),i=Math.floor((t-60*a)%60);return e<10&&(e="0"+e),a<10&&(a="0"+a),i<10&&(i="0"+i),e+":"+a+":"+i}return"00:00:00"}}):3==n?(t.forEach((function(t){d.push(t)})),l=Math.round(1.2*Math.max.apply(null,d)),o={trigger:"axis",formatter:function(t){var e="";e+='<div><span style="color:#fff;">'+t[0].name+"</span><br/> ";for(var a=0;a<t.length;a++)e+='<span style="width: 8px;height: 8px;margin-right:5px;display:inline-block;border-radius: 50%;background-color:'+t[a].color+'"></span><span style="color:#fff;">'+t[a].seriesName+':</span><span style="color:#fff;">'+t[a].value+"&nbsp;%</span><br/>";return e+="</div>",e}},c={textStyle:{color:"#666"},formatter:function(t){return t+"%"}}):(t.forEach((function(t){d.push(t)})),l=Math.round(1.2*Math.max.apply(null,d)),o={trigger:"axis"},c={textStyle:{color:"#666"}}),h.setOption({tooltip:o,legend:{data:[]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:e,splitLine:{show:!1},axisLine:{lineStyle:{type:"solid",color:"#E6E6E6",width:"2"}},axisLabel:{textStyle:{color:"#666"}}},yAxis:{type:"value",min:s,max:l,splitLine:{lineStyle:{type:"dashed"}},axisLine:{lineStyle:{type:"solid",color:"#E6E6E6",width:"2"}},axisLabel:c},series:[{name:a,type:"line",stack:"总量",smooth:!0,itemStyle:{normal:{color:"#396FFF",lineStyle:{color:"#396FFF"}}},data:d}]})}}}),h=c,d=(a("216a1"),a("2877")),p=Object(d["a"])(h,i,n,!1,null,"a17abba0",null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-574d2b32.880bfb6831ef964c471f.1618470402363.js.map