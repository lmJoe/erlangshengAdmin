(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70249770"],{"433a":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"userSkipTop10"},[a("div",{staticClass:"userData"},[a("h1",[t._v("斑点狗搜索词top20")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.searchTop10,stripe:"","header-cell-style":{background:"#E2E2EB",color:"#333"}}},[a("el-table-column",{attrs:{fixed:"",prop:"world",label:"搜索词",width:"280"}}),a("el-table-column",{attrs:{prop:"pv",label:"搜索次数",align:"center"}}),a("el-table-column",{attrs:{prop:"uv",label:"搜索人数",width:"100",align:"center"}})],1)],1)])},i=[],n=a("b1d0"),r=a("1271"),l={name:"bdgsearchHotTop10",data:function(){return{title:"搜索词top",searchTop10:[],rightName:"",rightSelect:"",loading:!0}},created:function(){document.title=this.title,this.rightName=this.$route.params.rightName,this.rightSelect=this.$route.params.rightSelect},activated:function(){document.title=this.title},mounted:function(){this.userTop100()},methods:{userTop100:function(){var t=this;Object(n["a"])({method:"get",url:r["a"].recordUrl.getbdgWorldsTop+"?SourceType="+t.rightSelect+"&TopCount=100",data:{},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){t.loading=!1,t.searchTop10=e.data})).catch((function(t){console.log(t)}))}}},c=l,s=(a("b32e"),a("2877")),u=Object(s["a"])(c,o,i,!1,null,"6ea48465",null);e["default"]=u.exports},b32e:function(t,e,a){"use strict";var o=a("f534"),i=a.n(o);i.a},f534:function(t,e,a){}}]);
//# sourceMappingURL=chunk-70249770.880bfb6831ef964c471f.1618470402363.js.map