(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-77d0aff8"],{"8fec":function(e,t,a){},bbc0:function(e,t,a){"use strict";var o=a("8fec"),i=a.n(o);i.a},c3ee:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"videoSkipTop10"},[a("div",{staticClass:"videoData"},[a("h1",[e._v("魔盒SDK视频播放TOP100")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.videoTop10,stripe:"","header-cell-style":{background:"#E2E2EB",color:"#333"}}},[a("el-table-column",{attrs:{fixed:"",prop:"title",label:"标题",width:"520"}}),a("el-table-column",{attrs:{prop:"videoId",label:"视频ID"}}),a("el-table-column",{attrs:{prop:"type",label:"类别"}}),a("el-table-column",{attrs:{prop:"playCount",label:"播放量"}})],1)],1)])},i=[],n=a("b1d0"),l=a("1271"),d={name:"userSkipTop10",data:function(){return{title:"视频播放top",videoTop10:[],rightName:"",rightSelect:"",loading:!0}},created:function(){document.title=this.title,this.MediaName=this.$route.params.MediaName,this.CompanyName=this.$route.params.CompanyName},activated:function(){document.title=this.title},mounted:function(){this.videoTop100()},methods:{videoTop100:function(){var e=this;Object(n["a"])({method:"get",url:l["a"].recordUrl.getsdkVideoPlayTop+"?MediaName="+e.MediaName+"&CompanyName="+e.CompanyName+"&TopCount=100",data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){e.loading=!1,e.videoTop10=t.data})).catch((function(e){console.log(e)}))}}},c=d,r=(a("bbc0"),a("2877")),s=Object(r["a"])(c,o,i,!1,null,"af698b42",null);t["default"]=s.exports}}]);
//# sourceMappingURL=chunk-77d0aff8.880bfb6831ef964c471f.1618470402363.js.map