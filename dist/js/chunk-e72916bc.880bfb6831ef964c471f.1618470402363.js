(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e72916bc"],{"2a5f":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dataBlog"},[e("div",{staticClass:"dataBlogContainer"},[t._m(0),e("div",{staticClass:"BlogContainer"},[e("div",{staticClass:"blogBox"},[e("div",{staticClass:"oneTop"},[e("div",{staticClass:"box"},[e("span",[t._v("选择日期：")]),e("el-date-picker",{staticClass:"surveyTime",attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.expireTimeOption},on:{change:t.changeTimeFINANCE},model:{value:t.DefaultDate,callback:function(a){t.DefaultDate=a},expression:"DefaultDate"}})],1)]),e("div",{staticClass:"searchBox"})]),e("div",{staticClass:"blogBotton"},t._l(t.tableData,(function(a,i){return e("div",{key:i},[e("div",{staticClass:"blogList"},[e("div",{staticClass:"dataTime"},[t._v(t._s(a.dateId))]),t._l(a.data,(function(a,i){return e("div",{key:i,staticClass:"dataList"},[e("p",[t._v(t._s(a.time))]),e("p",{staticClass:"accountSpan"},[t._v(t._s(a.userName))]),e("p",[t._v(t._s(a.message))])])}))],2)])})),0)])])])},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"headContainer"},[e("div",{staticClass:"pagetarge"},[e("span",{},[t._v("更新日志")]),e("span",{staticClass:"arget"},[e("div",{staticClass:"argetTxt"},[e("h3",[t._v("指标：")]),e("p",[t._v("浏览量（PV）：当天网站的页面浏览量")]),e("p",[t._v("访客数（UV）：当天网站的页面浏览用户数")]),e("p",[t._v("IP数（IP）：当天网站的页面浏览ip数")]),e("p",[t._v("视频播放量：当天网站的视频总播放量")]),e("p",[t._v("人均播放量：当天网站的视频播放量与视频总播放人数比")]),e("p",[t._v("人均观看时长：当天网站的视频播放时长与视频总播放人数比")])])])]),e("div",{staticClass:"rightSelect"})])}],n=(e("b1d0"),e("1271"),{name:"videoData",data:function(){return{title:"更新日志",DefaultDate:[],expireTimeOption:{},tableData:[],count:""}},created:function(){document.title=this.title},activated:function(){document.title=this.title},mounted:function(){this.DefaultDate.push(this.common.formatDate(-7),this.common.formatDate(1)),this.BolgList()},methods:{changeTimeFINANCE:function(){this.BolgList()},BolgList:function(){var t=this.DefaultDate[0],a=this.DefaultDate[1];window.LogList.getConf(".searchBox",".blogBotton","","二郎神后台管理系统",t,a);var e=setInterval((function(){console.log("pullLog2",window.LogList.init.dataList),window.LogList.init.dataList&&clearInterval(e)}),200)}}}),o=n,l=(e("63a4"),e("2877")),c=Object(l["a"])(o,i,s,!1,null,"2e7258c9",null);a["default"]=c.exports},"40f3":function(t,a,e){},"63a4":function(t,a,e){"use strict";var i=e("40f3"),s=e.n(i);s.a}}]);
//# sourceMappingURL=chunk-e72916bc.880bfb6831ef964c471f.1618470402363.js.map