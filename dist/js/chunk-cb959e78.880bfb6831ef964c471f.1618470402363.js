(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cb959e78"],{"5ec2":function(t,a,e){"use strict";e.r(a);var l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"viewFrame",staticClass:"appSurvey"},[e("div",{staticClass:"appSurveyContainer"},[t._m(0),e("div",{staticClass:"surveyContainer"},[e("div",{staticClass:"surveyTop"},[e("div",{staticClass:"surveyDataTop"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:1.5}},[e("div",{staticClass:"grid-content bg-purple surveyDatatitle"},[t._v("昨日")])]),e("el-col",{attrs:{span:3}},[e("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("日均使用时长")])]),e("el-col",{attrs:{span:3}},[e("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("单次使用时长")])]),e("el-col",{attrs:{span:3}},[e("div",{staticClass:"grid-content bg-purple surveySort"},[t._v("≥3分钟人数")])])],1)],1),e("div",{staticClass:"surveyDataBottom"},t._l(t.recentData,(function(a,l){return e("el-row",{key:l,attrs:{gutter:20}},[e("el-col",{attrs:{span:1.5}},[e("div",{staticClass:"grid-content bg-purple surveyDatatitle"},[t._v("昨日")])]),e("el-col",{attrs:{span:3}},[e("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(a.dayAvgTime))])]),e("el-col",{attrs:{span:3}},[e("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(a.onceTime))])]),e("el-col",{attrs:{span:3}},[e("div",{staticClass:"grid-content bg-purple surveyDataNum"},[t._v(t._s(a.moreThirtyCount))])])],1)})),1)]),e("div",{staticClass:"surveyEchart"},[e("div",{staticClass:"surveyEchartBox"},[e("div",{staticClass:"surveyEchartlist"},[e("el-tabs",{on:{"tab-click":t.changeEchartBtn},model:{value:t.activeName,callback:function(a){t.activeName=a},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"日均使用时长",name:"1"}},[e("div",{staticStyle:{height:"400px"},attrs:{id:"echart1"}})]),e("el-tab-pane",{attrs:{label:"单次使用时长",name:"2"}},[e("div",{staticStyle:{height:"400px"},attrs:{id:"echart2"}})]),e("el-tab-pane",{attrs:{label:"≥3分钟人数",name:"3"}},[e("div",{staticStyle:{height:"400px"},attrs:{id:"echart3"}})])],1)],1),e("div",{staticClass:"surveyEchartimg"})])]),e("div",{staticClass:"surveyDetailBox"},[e("div",{staticClass:"DetailBoxBottom"},[e("el-table",{staticStyle:{"font-size":"10px",width:"100%"},attrs:{data:t.tableData,"header-cell-style":{background:"#E2E2EB",color:"#333"},"row-style":{height:"30px"},"cell-style":{padding:"10px"}}},[e("el-table-column",{attrs:{prop:"dateId",label:"日期",align:"center"}}),e("el-table-column",{attrs:{prop:"dayAvgTime",label:"日均时长",align:"center"}}),e("el-table-column",{attrs:{prop:"countAvg",label:"人均启动次数",align:"center"}}),e("el-table-column",{attrs:{prop:"onceTime",label:"单次时长",align:"center"}}),e("el-table-column",{attrs:{prop:"moreThirtyCount",label:"≥30分钟人数",align:"center"}}),e("el-table-column",{attrs:{prop:"thirtySecondCount",label:"30秒内人数",align:"center"}}),e("el-table-column",{attrs:{prop:"oneMinuteCount",label:"30秒~1分钟",align:"center"}}),e("el-table-column",{attrs:{prop:"threeMinuteCount",label:"1分钟~3分钟",align:"center"}}),e("el-table-column",{attrs:{prop:"tenMinuteCount",label:"3分钟~10分钟",align:"center"}}),e("el-table-column",{attrs:{prop:"thirtyMinuteCount",label:"10分钟~30分钟",align:"center"}})],1)],1)])])])])},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"headContainer"},[e("div",{staticClass:"pagetarge"},[e("span",{},[t._v("时长分析")]),e("span",{staticClass:"arget"},[e("div",{staticClass:"argetTxt"},[e("h3",[t._v("指标：")]),e("p",[t._v("日均使用时长：当天app的总使用时长与使用时长事件用户数比（仅包含注册用户）")]),e("p",[t._v("单次使用时长：当天app的总使用时长与使用时长事件启动次比（仅包含注册用户）")]),e("p",[t._v("≥3分钟人数：当天app的每个用户总使用时长中大于等于3min的用户数（仅包含注册用户）")])])]),e("span",[t._v("(本页面数据仅含注册用户)")])]),e("div",{staticClass:"rightSelect"})])}],i=(e("4160"),e("a15b"),e("a434"),e("b0c0"),e("ac1f"),e("1276"),e("159b"),e("b1d0")),r=e("1271"),s=e("313e"),o=e.n(s),c=(e("1531"),{name:"appRetain",data:function(){return{title:"APP时长分析",tableData:[],recentData:"",partData:"",rightName:1,loading:!0,activeName:"1",IDNAME:"echart1",Valuename:"日均使用时长",btnType:2}},created:function(){document.title=this.title},activated:function(){document.title=this.title},mounted:function(){this.bindDrawal(),this.getAppRecentData()},methods:{bindDrawal:function(){this.getPartData(),this.getDetails()},getAppRecentData:function(){var t=this;Object(i["a"])({method:"get",url:r["a"].recordUrl.getbdgtimegeneral,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(a){t.loading=!1,t.recentData=a.data,console.log("that.recentData",t.recentData)})).catch((function(t){console.log(t)}))},changeEchartBtn:function(){console.log("activeName",this.activeName),1==this.activeName?(this.Valuename="日均使用时长",this.IDNAME="echart1",this.btnType=2):2==this.activeName?(this.Valuename="单次使用时长",this.IDNAME="echart2",this.btnType=2):3==this.activeName&&(this.Valuename="≥3分钟人数",this.IDNAME="echart3",this.btnType=1),this.getPartData();var t=[],a=[];a[0]=this.Valuename,t.push(a),t=JSON.stringify(t),window.LogList.checkLog("二郎神后台管理系统",this.title,"趋势图状态切换",t)},getPartData:function(){var t=this;Object(i["a"])({method:"get",url:r["a"].recordUrl.getbdgtimeecharts+"?partnum="+t.activeName,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(a){if(t.loading=!1,0==a.code){t.partData=a.data,console.log("趋势图数据",t.partData);var e=[],l=[];t.partData.forEach((function(t,a){var n=t.dateStr,i=n.split("");i.splice(4,0,"-"),i.splice(7,0,"-"),i=i.join(""),l.push(1*t.value),e.push(i)})),console.log("datelist",e),console.log("dataValueList",l),t.showechart(l,e,t.Valuename,t.IDNAME,t.btnType)}})).catch((function(t){console.log(t)}))},getDetails:function(){var t=this;Object(i["a"])({method:"get",url:r["a"].recordUrl.getbdgtimedetails,data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(a){t.loading=!1,t.tableData=a.data,t.tableData.forEach((function(a,e){var l=a.dateId;l=l.split(" ")[0],t.tableData[e].dateId=l})),console.log("表格数据",t.tableData)})).catch((function(t){console.log(t)}))},showechart:function(t,a,e,l,n){var i,r,s,c,p=o.a.init(document.getElementById(l)),u=[];2==n?(t.forEach((function(t){u.push(t)})),i=Math.round(1.2*Math.max.apply(null,u)),s={trigger:"axis",formatter:function(t){var a="00:00";if(t[0].value>0){var e=Math.floor(t[0].value/3600),l=Math.floor(t[0].value%3600/60),n=Math.floor((t[0].value-60*l)%60);e<10&&(e="0"+e),l<10&&(l="0"+l),n<10&&(n="0"+n),a=e+":"+l+":"+n}else a="00:00:00";var i="";i+='<div><span style="color:#fff;">'+t[0].name+"</span><br/> ";for(var r=0;r<t.length;r++)i+='<span style="width: 8px;height: 8px;margin-right:5px;display:inline-block;border-radius: 50%;background-color:'+t[r].color+'"></span><span style="color:#fff;">'+t[r].seriesName+':</span><span style="color:#fff;">'+a+"</span><br/>";return i+="</div>",i}},c={textStyle:{color:"#666"},formatter:function(t){if(t>0){var a=Math.floor(t/3600),e=Math.floor(t%3600/60),l=Math.floor((t-60*e)%60);return a<10&&(a="0"+a),e<10&&(e="0"+e),l<10&&(l="0"+l),a+":"+e+":"+l}return"00:00:00"}}):3==n?(t.forEach((function(t){u.push(t)})),i=Math.round(1.2*Math.max.apply(null,u)),s={trigger:"axis",formatter:function(t){var a="";a+='<div><span style="color:#fff;">'+t[0].name+"</span><br/> ";for(var e=0;e<t.length;e++)a+='<span style="width: 8px;height: 8px;margin-right:5px;display:inline-block;border-radius: 50%;background-color:'+t[e].color+'"></span><span style="color:#fff;">'+t[e].seriesName+':</span><span style="color:#fff;">'+t[e].value+"&nbsp;%</span><br/>";return a+="</div>",a}},c={textStyle:{color:"#666"},formatter:function(t){return t+"%"}}):(t.forEach((function(t){u.push(t)})),i=Math.round(1.2*Math.max.apply(null,u)),s={trigger:"axis"},c={textStyle:{color:"#666"}}),p.setOption({tooltip:s,legend:{data:[]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:a,splitLine:{show:!1},axisLine:{lineStyle:{type:"solid",color:"#E6E6E6",width:"2"}},axisLabel:{textStyle:{color:"#666"}}},yAxis:{type:"value",min:r,max:i,splitLine:{lineStyle:{type:"dashed"}},axisLine:{lineStyle:{type:"solid",color:"#E6E6E6",width:"2"}},axisLabel:c},series:[{name:e,type:"line",stack:"总量",smooth:!0,itemStyle:{normal:{color:"#396FFF",lineStyle:{color:"#396FFF"}}},data:u}]})}}}),p=c,u=(e("dd8a"),e("2877")),d=Object(u["a"])(p,l,n,!1,null,"6ab6ae07",null);a["default"]=d.exports},a434:function(t,a,e){"use strict";var l=e("23e7"),n=e("23cb"),i=e("a691"),r=e("50c4"),s=e("7b0b"),o=e("65f0"),c=e("8418"),p=e("1dde"),u=e("ae40"),d=p("splice"),h=u("splice",{ACCESSORS:!0,0:0,1:2}),v=Math.max,g=Math.min,f=9007199254740991,m="Maximum allowed length exceeded";l({target:"Array",proto:!0,forced:!d||!h},{splice:function(t,a){var e,l,p,u,d,h,b=s(this),y=r(b.length),x=n(t,y),C=arguments.length;if(0===C?e=l=0:1===C?(e=0,l=y-x):(e=C-2,l=g(v(i(a),0),y-x)),y+e-l>f)throw TypeError(m);for(p=o(b,l),u=0;u<l;u++)d=x+u,d in b&&c(p,u,b[d]);if(p.length=l,e<l){for(u=x;u<y-l;u++)d=u+l,h=u+e,d in b?b[h]=b[d]:delete b[h];for(u=y;u>y-l+e;u--)delete b[u-1]}else if(e>l)for(u=y-l;u>x;u--)d=u+l-1,h=u+e-1,d in b?b[h]=b[d]:delete b[h];for(u=0;u<e;u++)b[u+x]=arguments[u+2];return b.length=y-l+e,p}})},c0fe:function(t,a,e){},dd8a:function(t,a,e){"use strict";var l=e("c0fe"),n=e.n(l);n.a}}]);
//# sourceMappingURL=chunk-cb959e78.880bfb6831ef964c471f.1618470402363.js.map