(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2fa4cfd8"],{"1d5f":function(t,e,a){},5655:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"appSurvey"},[a("div",{staticClass:"appSurveyContainer"},[a("div",{staticClass:"headContainer"},[t._m(0),a("div",{staticClass:"rightSelect"},[a("el-cascader",{attrs:{options:t.options,"change-on-select":"","show-all-levels":!1},on:{change:function(e){return t.changeRight()}},model:{value:t.rightName,callback:function(e){t.rightName=e},expression:"rightName"}})],1)]),a("div",{staticClass:"surveyContainer"},[a("div",{staticClass:"surveyTop"},[a("div",{staticClass:"surveyDataTop"},[a("el-row",{attrs:{gutter:25}},[a("el-col",{attrs:{span:1.5}},[a("div",{staticClass:"grid-content bg-purple surveyDatatitle"},[t._v("昨日")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("活跃用户")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("新增用户")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("启动次数")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("人均播放量")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("人均使用时长")])])],1)],1),a("div",{staticClass:"surveyDataBottom"},t._l(t.recentData,(function(e,i){return a("el-row",{key:i,attrs:{gutter:25}},[a("el-col",{attrs:{span:1.5}},[a("div",{staticClass:"grid-content bg-purple surveyDatatitle"},[t._v("昨日")])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(e.activeUser))])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(e.newUser))])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(e.startCount))])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(e.perPlayCount))])]),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(e.preTime))])])],1)})),1)]),a("div",{staticClass:"surveyEchart"},[a("div",{staticClass:"surveyDate"},[a("el-date-picker",{staticClass:"surveyTime",attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},on:{change:t.changeEchartTime},model:{value:t.echartDefaultDate,callback:function(e){t.echartDefaultDate=e},expression:"echartDefaultDate"}})],1),a("div",{staticClass:"surveyEchartBox"},[a("div",{staticClass:"surveyEchartlist"},[a("el-tabs",{on:{"tab-click":t.changeEchartBtn},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"活跃用户",name:"1"}},[a("div",{staticStyle:{height:"400px"},attrs:{id:"echart1"}})]),a("el-tab-pane",{attrs:{label:"新增用户",name:"2"}},[a("div",{staticStyle:{height:"400px"},attrs:{id:"echart2"}})]),a("el-tab-pane",{attrs:{label:"启动次数",name:"3"}},[a("div",{staticStyle:{height:"400px"},attrs:{id:"echart3"}})]),a("el-tab-pane",{attrs:{label:"人均播放量",name:"4"}},[a("div",{staticStyle:{height:"400px"},attrs:{id:"echart4"}})]),a("el-tab-pane",{attrs:{label:"人均使用时长",name:"5"}},[a("div",{staticStyle:{height:"400px"},attrs:{id:"echart5"}})])],1)],1),a("div",{staticClass:"surveyEchartimg"})])]),a("div",{staticClass:"surveyDetailBox"},[a("div",{staticClass:"DetailBoxTop"},[a("el-date-picker",{staticClass:"detailBoxTime",attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},on:{change:t.changeBoxTime},model:{value:t.detailBoxDate,callback:function(e){t.detailBoxDate=e},expression:"detailBoxDate"}}),a("a",{staticClass:"surveyDown",attrs:{id:"surveyDown",href:t.downloadExcelUrl}},[t._v("下载数据")])],1),a("div",{staticClass:"DetailBoxBottom"},[a("el-table",{staticStyle:{"font-size":"10px",width:"100%"},attrs:{data:t.tableData,"header-cell-style":{background:"#E2E2EB",color:"#333"},"row-style":{height:"30px"},"cell-style":{padding:"10px"}}},[a("el-table-column",{attrs:{prop:"dateStr",label:"日期",align:"center"}}),a("el-table-column",{attrs:{prop:"activeUser",label:"活跃用户",align:"center"}}),a("el-table-column",{attrs:{prop:"newUser",label:"新增用户",align:"center"}}),a("el-table-column",{attrs:{prop:"startCount",label:"启动次数",align:"center"}}),a("el-table-column",{attrs:{prop:"perPlayCount",label:"人均播放量",align:"center"}}),a("el-table-column",{attrs:{prop:"preTime",label:"人均使用时长",align:"center"}})],1)],1)])])])])},l=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagetarge"},[a("span",{},[t._v("概况")]),a("span",{staticClass:"arget"},[a("div",{staticClass:"argetTxt"},[a("h3",[t._v("指标：")]),a("p",[t._v("活跃用户数：当天app的启动用户数（包含所有用户）")]),a("p",[t._v("新增用户：当天app的新增用户数（30天内去重）")]),a("p",[t._v("启动次数：当天app的启动次数（包含所有用户,同一用户退出app或进入后台超过30s为一次新的启动）")]),a("p",[t._v("人均播放量：当天app的视频播放量与视频总播放人数比（包含所有用户）")]),a("p",[t._v("人均使用时长：当天app的使用时长与使用时长事件用户数比（包含所有用户）")])])])])}],s=(a("4160"),a("a15b"),a("a434"),a("b0c0"),a("ac1f"),a("1276"),a("159b"),a("b1d0")),n=a("1271"),r=a("313e"),o=a.n(r),c=(a("1531"),{name:"appSurvey",data:function(){return{title:"魔盒SDK概况",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},echartDefaultDate:[],detailBoxDate:[],tableData:[],recentData:"",partData:"",options:[],rightName:"",CompanyName:"",MediaName:"",loading:!0,activeName:"1",IDNAME:"echart1",Valuename:"活跃用户",btnType:1,downloadExcelUrl:""}},created:function(){document.title=this.title},activated:function(){document.title=this.title},mounted:function(){this.bindDrawal(),this.getsdkConfig(),this.getAppRecentData(),this.getsdkConfig()},methods:{bindDrawal:function(){this.detailBoxDate.push(this.common.formatDate(-7),this.common.formatDate(-1)),this.echartDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1)),this.getPartData(),this.getDetails()},getAppRecentData:function(){var t=this;Object(s["a"])({method:"get",url:n["a"].recordUrl.getsdkRecentData+"?MediaName="+t.MediaName+"&CompanyName="+t.CompanyName,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){t.loading=!1,t.recentData=e.data})).catch((function(t){console.log(t)}))},changeEchartBtn:function(){console.log("activeName",this.activeName),1==this.activeName?(this.Valuename="活跃用户",this.IDNAME="echart1",this.btnType=1):1==this.activeName?(this.Valuename="活跃账户",this.IDNAME="echart1",this.btnType=1):2==this.activeName?(this.Valuename="新增用户",this.IDNAME="echart2",this.btnType=1):2==this.activeName?(this.Valuename="新增账户",this.IDNAME="echart2",this.btnType=1):3==this.activeName?(this.Valuename="启动次数",this.IDNAME="echart3",this.btnType=1):4==this.activeName?(this.Valuename="人均播放量",this.IDNAME="echart4",this.btnType=1):5==this.activeName&&(this.Valuename="人均使用时长",this.IDNAME="echart5",this.btnType=2),this.getPartData();var t=[],e=[];e[0]=this.Valuename,t.push(e),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"趋势图分类切换",t)},getPartData:function(){var t=this;Object(s["a"])({method:"get",url:n["a"].recordUrl.getsdkPartData+"?MediaName="+t.MediaName+"&partnum="+t.activeName+"&startTime="+t.echartDefaultDate[0]+"&endtime="+t.echartDefaultDate[1]+"&CompanyName="+t.CompanyName,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){if(t.loading=!1,0==e.code){t.partData=e.data,console.log("趋势图数据",t.partData);var a=[],i=[];t.partData.forEach((function(t,e){var l=t.dateStr,s=l.split("");s.splice(4,0,"-"),s.splice(7,0,"-"),s=s.join(""),i.push(1*t.value),a.push(s)})),console.log("datelist",a),console.log("dataValueList",i),t.showechart(i,a,t.Valuename,t.IDNAME,t.btnType)}})).catch((function(t){console.log(t)}))},getDetails:function(){var t=this;Object(s["a"])({method:"get",url:n["a"].recordUrl.getsdkDetails+"?MediaName="+t.MediaName+"&startTime="+t.detailBoxDate[0]+"&endtime="+t.detailBoxDate[1]+"&CompanyName="+t.CompanyName,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){t.loading=!1,t.tableData=e.data,console.log("表格数据",t.tableData),t.downloadE()})).catch((function(t){console.log(t)}))},getsdkConfig:function(){var t=this;Object(s["a"])({method:"get",url:n["a"].recordUrl.getsdkConfig,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log("配置信息",e),t.loading=!1,t.options=e.data,t.options.forEach((function(t,e){null==t.label&&(t.label=t.value);for(var a=t.children,i=0;i<a.length;i++){var l=a[i];if(null==l.label&&(l.label=l.value),l.children)for(var s=l.children,n=0;n<s.length;n++){var r=s[n];null==r.label&&(r.label=r.value)}}})),console.log(t.options)})).catch((function(t){console.log(t)}))},downloadE:function(){this.downloadExcelUrl=n["a"].recordUrl.getsdkExport+"?MediaName="+this.MediaName+"&CompanyName="+this.CompanyName+"&startTime="+this.detailBoxDate[0]+"&endtime="+this.detailBoxDate[1]},changeBoxTime:function(){console.log(this.detailBoxDate),this.getDetails();var t=[],e=[];e[0]=this.detailBoxDate[0],e[1]=this.detailBoxDate[1],t.push(e),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"表格数据日期选择",t)},changeEchartTime:function(){console.log(this.echartDefaultDate),this.getPartData();var t=[],e=[];e[0]=this.echartDefaultDateAll[0],e[1]=this.echartDefaultDateAll[1],t.push(e),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"趋势图时间选择",t)},changeRight:function(){console.log("value",this.MediaName),1==this.rightName.length?(this.CompanyName=this.rightName[0],this.MediaName=""):(2==this.rightName.length||3==this.rightName.length)&&(this.CompanyName=this.rightName[0],this.MediaName=this.rightName[1]),this.getDetails(),this.getAppRecentData(),this.getPartData(),this.loading=!0;var t=[],e=[];e[0]=this.rightName,t.push(e),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"渠道分类选择",t)},showechart:function(t,e,a,i,l){var s,n,r,c,h=o.a.init(document.getElementById(i)),d=[];2==l?(t.forEach((function(t){d.push(t)})),s=Math.round(1.2*Math.max.apply(null,d)),r={trigger:"axis",formatter:function(t){var e="00:00";if(t[0].value>0){var a=Math.floor(t[0].value/3600),i=Math.floor(t[0].value%3600/60),l=Math.floor((t[0].value-60*i)%60);a<10&&(a="0"+a),i<10&&(i="0"+i),l<10&&(l="0"+l),e=a+":"+i+":"+l}else e="00:00:00";var s="";s+='<div><span style="color:#fff;">'+t[0].name+"</span><br/> ";for(var n=0;n<t.length;n++)s+='<span style="width: 8px;height: 8px;margin-right:5px;display:inline-block;border-radius: 50%;background-color:'+t[n].color+'"></span><span style="color:#fff;">'+t[n].seriesName+':</span><span style="color:#fff;">'+e+"</span><br/>";return s+="</div>",s}},c={textStyle:{color:"#666"},formatter:function(t){if(t>0){var e=Math.floor(t/3600),a=Math.floor(t%3600/60),i=Math.floor((t-60*a)%60);return e<10&&(e="0"+e),a<10&&(a="0"+a),i<10&&(i="0"+i),e+":"+a+":"+i}return"00:00:00"}}):3==l?(t.forEach((function(t){d.push(t)})),s=Math.round(1.2*Math.max.apply(null,d))):(t.forEach((function(t){d.push(t)})),s=Math.round(1.2*Math.max.apply(null,d)),r={trigger:"axis"},c={textStyle:{color:"#666"}}),h.setOption({tooltip:r,legend:{data:[]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:e,splitLine:{show:!1,lineStyle:{type:"dashed"}},axisLine:{lineStyle:{type:"solid",color:"#E6E6E6",width:"2"}},axisLabel:{textStyle:{color:"#666"}}},yAxis:{type:"value",min:n,max:s,splitLine:{lineStyle:{type:"dashed"}},axisLine:{lineStyle:{type:"solid",color:"#E6E6E6",width:"2"}},axisLabel:c},series:[{name:a,type:"line",stack:"总量",smooth:!0,itemStyle:{normal:{color:"#396FFF",lineStyle:{color:"#396FFF"}}},data:d}]})}}}),h=c,d=(a("8fcd"),a("2877")),p=Object(d["a"])(h,i,l,!1,null,"2b679e67",null);e["default"]=p.exports},"8fcd":function(t,e,a){"use strict";var i=a("1d5f"),l=a.n(i);l.a},a434:function(t,e,a){"use strict";var i=a("23e7"),l=a("23cb"),s=a("a691"),n=a("50c4"),r=a("7b0b"),o=a("65f0"),c=a("8418"),h=a("1dde"),d=a("ae40"),p=h("splice"),u=d("splice",{ACCESSORS:!0,0:0,1:2}),g=Math.max,m=Math.min,v=9007199254740991,f="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!p||!u},{splice:function(t,e){var a,i,h,d,p,u,y=r(this),D=n(y.length),b=l(t,D),x=arguments.length;if(0===x?a=i=0:1===x?(a=0,i=D-b):(a=x-2,i=m(g(s(e),0),D-b)),D+a-i>v)throw TypeError(f);for(h=o(y,i),d=0;d<i;d++)p=b+d,p in y&&c(h,d,y[p]);if(h.length=i,a<i){for(d=b;d<D-i;d++)p=d+i,u=d+a,p in y?y[u]=y[p]:delete y[u];for(d=D;d>D-i+a;d--)delete y[d-1]}else if(a>i)for(d=D-i;d>b;d--)p=d+i-1,u=d+a-1,p in y?y[u]=y[p]:delete y[u];for(d=0;d<a;d++)y[d+b]=arguments[d+2];return y.length=D-i+a,h}})}}]);
//# sourceMappingURL=chunk-2fa4cfd8.880bfb6831ef964c471f.1618470402363.js.map