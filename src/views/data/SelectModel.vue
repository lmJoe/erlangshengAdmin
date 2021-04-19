<template>
  <div class="selectBox">
    <h1>{{msg}}</h1>
    <div class="select_content">
      <div class="select_side">
        <el-tree 
        :data="treedate" 
         
        :props="defaultProps" 
        @node-expand="handleiconclick" 
        @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="selece_primary">
        <div class="primary_top">
          <el-button
            size="small"
            @click="getselectexecut()"
            class="addbtn_run"
          >
            执行
          </el-button>
          <el-button
            size="small"
            @click="addTab(editableTabsValue)"
            class="addbtn"
          >
            +
          </el-button>
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-click="tabclick" @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item,index) in editableTabs"
              :key="index"
              :label="item.title"
              :name="item.name"
            >
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                :value="item.content" 
                @change="teatareaS"
                v-model="textarea">
              </el-input>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="primary_bottom">
          <div class="page">
             <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="20"
              layout="prev, pager, next, sizes, total"
              :total="totalnum">
            </el-pagination>
            <div class="export_out">
               <el-button plain @click="exportget()">导出文件</el-button>
            </div>
          </div>
          <div class="table_content" v-show="showtable">
            <table style="width:100%">
              <thead>
                <td v-for="(item,index) in headarr"
              :key="index">{{item}}</td>
              </thead>
              <tbody>
                <tr v-for="(item,index) in bodyarr"
              :key="index">
                  <td v-for="(item2,index2) in item" :key="index2">{{item2}}</td>
                </tr>
              </tbody>

            </table>
          </div>
         
          
        </div>
      </div>
    </div>
    <keep-alive>
      <unlock></unlock>
    </keep-alive >
  </div>
</template>

<script>
import http from '@/libs/http'
import unlock from "@/components/unlock";
import axios from 'axios'

export default {
  name: 'SelectModel',
  components: {
    unlock
  },
  data () {
    return {
      msg: '元数据查询系统',
      treedate: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      editableTabsValue: "1",
      editableTabs: [],
      tabIndex: 1,
      textarea: '',//显示默认内容
      currentPage4: 1,//分页
      sqlid:'',//数据库id
      sqlname: '',//数据库对象名
      sqltext: '',//查询的sql语句
      tablename: '',//table
      pageIndex: '1',
      pageSize: '20',
      clickname:'1',//点击窗口的name
      totalnum: 100,//总条数
      headarr:[],
      bodyarr:[],
      sqllistname: '',//数据库列表名
      showtable: false,
      listinde: '',//
    }
  },
  mounted() {
    this.getdbsearch();
    this.getconsolesave(this.sqlid);
   
  },
  methods: {
    handleiconclick(data){
    this.sqllistname = data.label;
      if(data.id && data.id != '1-2' && data.id != '1-3' && data.id != '1-7' && data.id != '1-8'){
        this.getschemaseach(data.id,data.index);
        this.getconsolesave(data.id);
        this.sqlid = data.id;
      }else if(data.id && data.id == '1-2'){
        
        this.sqlname = data.label;
        this.listinde = data.index;
        this.$nextTick (() => {
          this.gettablesearch(this.sqlid,data.label,data.index);
        })
      }
      else if(data.id && data.id == '1-3'){
        this.tablename = data.label;
        this.tableindex = data.index;
        this.$nextTick (() => {
           this.getcolumbsearch(this.sqlid,this.sqlname,data.label,data.index);
        })
      }
    },
    handleNodeClick(data) {
      // console.log('111111+++',data);
      this.sqllistname = data.label;
      if(data.id && data.id != '1-2' && data.id != '1-3' && data.id != '1-7' && data.id != '1-8'){
        this.getschemaseach(data.id,data.index);
        this.getconsolesave(data.id);
        this.sqlid = data.id;
      }else if(data.id && data.id == '1-2'){
        
        this.sqlname = data.label;
        this.listinde = data.index;
        this.$nextTick (() => {
          this.gettablesearch(this.sqlid,data.label,data.index);
        })
      }
      else if(data.id && data.id == '1-3'){
        this.tablename = data.label;
        this.tableindex = data.index;
        this.$nextTick (() => {
           this.getcolumbsearch(this.sqlid,this.sqlname,data.label,data.index);
        })
      }
      
    },
    getschemaseach(id,num){
      //获得数据库对象列表
      var url = "https://pxtadmin.com/api/dms/schema/search";
      var param = {
        dbid: id
      };
      // var param1 = this.qs.stringify(param);
      // var thedata = "Bearer " + this.thatToken;
      
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:url,
        data: param,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      })
      .then(res => {
        // console.log("数据库对象---",res)
        if (res.code == 1) {
          var date = res.body.items;
          let showarr = [];
        if(date.length>0){
          date.map((item,index)=>{
            let json = {};
            json.id = '1-2';
            json.label = item.name;
            json.index = index;
            json.children = [
              
              {id: '0',label: "暂无数据",children:[]}
              
            ],
            showarr.push(json);
          });
          // console.log("date3333---",showarr);
          this.treedate.map((item,index)=>{
            if(index == num){
              item.children = showarr;
            }
              
            
          });
          // console.log('一次点击++',this.treedate)
        }
          
        }
      })
      .catch(res => {
        console.log('错误++',res);
      });
    },
    getdbsearch(){
      //获得数据库列表
      var url = "https://pxtadmin.com/api/dms/db/search";
      var param = {
        
      };
      // var param1 = this.qs.stringify(param);
      // var thedata = "Bearer " + this.thatToken;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:url,
        data: param,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      })
      .then(res => {
        // console.log("数据库---",res)
        if (res.code == 1) {
          let date = res.body.items;
          let showarr = [];
          if(date.length>0){
          date.map((item,index)=>{
            if(index == 0){
              this.sqlid = item.id;
            }
            let json = {};
            json.label = item.name;
            json.index = index;
            json.children = [{
            id: '0', label: "暂无数据",children: []
          }],
            json.id = item.id;
            json.type = item.type;
            showarr.push(json);
          })
          
          this.treedate = showarr;
          // console.log('数据库++',this.treedate);
          }
        }
      })
      .catch(res => {
        console.log('错误++',res);
      });
    },
    gettablesearch(id,schema,num){
      //获得数据库下的表数据列表
      var url = "https://pxtadmin.com/api/dms/table/search";
      var param = {
        id : id,
        schema: schema
      };
      // var param1 = this.qs.stringify(param);
      // var thedata = "Bearer " + this.thatToken;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:url,
        data: param,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      })
      .then(res => {
        // console.log("数据库表---",res);
        // console.log("date1---",this.treedate);
        // let testdate = [
        //   {
        //     dbid: 1, label: "ceshi1",children: []
        //   },
        //   {
        //     dbid: 1, label: "ceshi2",children: []
        //   }
        // ];
        if (res.code == 1) {
          var date = res.body.items;
          let showarr = [];
          if(date.length>0){
          date.map((item,index)=>{
            let json = {};
            json.id = "1-3";
            json.index = index;
            json.label = item.name;
            
            json.children = [
              
                {id: '0', label: "暂无数据",children:[]}
              
            ],
            showarr.push(json);
          });
          console.log("date3333---",this.treedate);
          this.treedate.map((item,index)=>{
            if(item.id == id){
              // console.log("id",id);
              // item.children = showarr;
              item.children.map((item2,index2)=>{
                
                if(index2 == num){
                      item2.children = showarr;
                    }
                
              })
            }
          });
          //  console.log("date3---",this.treedate);
          }
        }
      })
      .catch(res => {
        console.log('错误++',res);
      });
    },
    getcolumbsearch(id,schema,name,num){
      //获得表下数据的列表
      var url = "https://pxtadmin.com/api/dms/column/search";
      var param = {
        dbid: id,
        schema:schema,
        table: name
      };
      // var param1 = this.qs.stringify(param);
      // var thedata = "Bearer " + this.thatToken;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:url,
        data: param,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      })
      .then(res => {
        // console.log("列表---",res)
        if (res.code == 1) {
          let date = res.body.items;
          let showarr = [];
          date.map((item,index)=>{
            let json = {};
            json.label = item.name+ ' ('+item.type+')';
            json.type = item.type;
            showarr.push(json);
          })
          // console.log('列表++++',showarr);
          this.treedate.map((item,index)=>{
            if(item.id == id){
              // console.log('2222====',item.children);
              item.children.map((childitem,childindex)=>{
                // console.log("2222-----",childitem,schema);

                if(childitem.label == schema){
                  // console.log(1111);
                  // childitem.children = showarr
                  childitem.children.map((childitem2,childindex2)=>{
                    
                    if(childindex2 == num){
                          childitem2.children = showarr
                        } 
                   
                  })
                }
              })
            }
          });
        }
      })
      .catch(res => {
        console.log('错误++',res);
      });
    },
    consolesave(id,state,name,text){
      //添加和保存窗口
      var url = "https://pxtadmin.com/api/dms/console/save";
      var param = {
        dbid: id,
        id: state,
        name: name,
        sqls: text
      };
      // var param1 = this.qs.stringify(param);
      // var thedata = "Bearer " + this.thatToken;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:url,
        data: param,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      })
      .then(res => {
        // console.log("保存窗口---",res)
        if (res.code == 1) {
          console.log('保存成功');
        }
      })
      .catch(res => {
        console.log('错误++',res);
      });
    },
    getconsolesave(id){
      //获得控制台窗口信息
      var url = "https://pxtadmin.com/api/dms/console/search";
      var param = {
        dbid: id
      };
      // var param1 = this.qs.stringify(param);
      // var thedata = "Bearer " + this.thatToken;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:url,
        data: param,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      })
      .then(res => {
        // console.log("数据库窗口信息---",res)
        if (res.code == 1) {
          let date = res.body.items;
          if(date.length < 1){
           
            this.tabIndex = "1";
            this.editableTabs = [{
              title: '窗口 1',
              name: "1",
              content: ''
            }]
          }else{
            // console.log('555==',date);
            var listlength = date.length;
            
            this.tabIndex = listlength;
            
            let newarr = []; 
            date.map((item,index)=>{
              let json = {};
              let i = index+1;
              if(this.clickname == i){
                this.textarea = item.sqls;
                this.sqltext = item.sqls;
              }
              json.title = item.name + i;
              json.name = "" + i;
              json.content = item.sqls;
              newarr.push(json);
            })
            this.editableTabs = newarr;
            // console.log('444---',this.editableTabs);
          }
          
        }
      })
      .catch(res => {
        console.log('错误++',res);
      });
    },
    getselectexecut(dbid,sqls,pageIndex,pageSize){
      //执行当前窗口中的sql语句，查询
      //获得控制台窗口信息
      var url = "https://pxtadmin.com/api/dms/select/execute";
      if(dbid||sqls||pageIndex||pageSize){
         var param = {
          dbid: dbid,
          sqls: sqls,
          pageIndex: pageIndex,
          pageSize: pageSize
        };
      }else{
         var param = {
          dbid: this.sqlid,
          sqls: this.sqltext,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
      }
     
      // var param1 = this.qs.stringify(param);
      // var thedata = "Bearer " + this.thatToken;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:url,
        data: param,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      })
      .then(res => {
        console.log("sql执行结果---",res)
        if (res.code == 1) {
          let date = res.body.items;
          this.showtable = true;
          this.totalnum = res.body.totalRecords;
          this.headarr = res.body.columns;
          this.bodyarr = res.body.items;
        }
      })
      .catch(res => {
        console.log('错误++',res);
      });
      detailList.push(param);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'执行',detailList);
    },
    exportget(){
      var url = 'https://pxtadmin.com/api/dms/select/export';
      // window.open('https://pxtadmin.com/api/dms/select/export');
      
    // var thedata = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ii1PZUVVR0NfZlFqa0U3b0dZZHhrX0EiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MDAzMTE3ODEsImV4cCI6MTYwMDkxNjU4MSwiaXNzIjoiaHR0cDovLzEwLjAuMC4yNDk6NTAwMCIsImF1ZCI6ImdhdGV3YXkiLCJjbGllbnRfaWQiOiJnYXRld2F5X2NsaWVudCIsInN1YiI6IjEzNTg4MzIwNDY1IiwiYXV0aF90aW1lIjoxNjAwMzExNzgxLCJpZHAiOiJsb2NhbCIsIlVuaXF1ZUtleSI6ImZiYTBkNzM5LWQ1OWUtNDc4My1hZjc1LTlhY2M5NGRiODJlMSIsIlVzZXJOYW1lIjoiMTM1ODgzMjA0NjUiLCJVc2VySWQiOiI0OCIsInNjb3BlIjpbImdhdGV3YXkiXSwiYW1yIjpbImN1c3RvbSJdfQ.NYnjNvc7mrqFjuOONeDidOx2GZMwdHNAJ0IAOi7Jn5Ap-EFc5wNbl-g1a6vvuz2Gk5rQMSJF1kn_yAj0HDKsup7dPwppBENN65EbNzVtLhh5i3AG6x3l5Efbzk_Eq3pxaAokDXT5xcjKuXEjRSP-2uEwWptM9sPZF4n2w03h-xewP2xT4sh5vwELy6Gdy6KkTPUF-6vJta8pEPUrLyAc6wC2YWmzxtENe-xHU8DcYVG6KXRThdbdyJAxMuVjgW2112ILb_TEbWY4UOQbJ9lDwD4sQwo3qliumPOWrdR27l2RwwsrEJPHyUxl0G2wKe72kKGLooB-fe2rcRuNkOleMg';
    var param = {
        dbid: this.sqlid,
        sqls: this.sqltext
      };
      axios({
      method: 'post',
      url: url,  
      responseType: 'blob',
      data: param,
      fileName:''
    }).then((res) => {
        console.log(res);
      
        
        if (res.status == 200) {
 
          const link = document.createElement("a");
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
         });
         link.style.display = "none";
         link.href = URL.createObjectURL(blob);
         link.setAttribute("download",'数据');
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
       } else {
         this.$message({
           message: "导出失败",
           type: "warning"
         });
       }
      }).catch(err => {
          // this.$Notice.error({ title: "错误", desc: "网络连接错误" });
          console.log("请求错误");
          // alert("请求错误"); // 请求错误弹出警告
        });
    },
    elsectexport(){
      //导出列表数据
      var url = "https://pxtadmin.com/api/dms/select/export";
      var param = {
        dbid: this.sqlid,
        sqls: this.sqltext
      };
      // var param1 = this.qs.stringify(param);
      var param1 = JSON.stringify(param);
      // var thedata = "Bearer " + this.thatToken;
      // http({  
      //   //这里是你自己的请求方式、url和data参数
      //   method: 'post',
      //   url:url,
      //   data:  param,
      //   //假设后台需要的是表单数据这里你就可以更改
      //   // 'Content-Type': 'multipart/form-data'
      //   // headers: {
      //   //    'Content-type': 'application/json;charset=UTF-8'
      //   //   //  'Content-Type': 'multipart/form-data'
      //   // },
      //   responseType: 'blob'
      // })
      axios.post(url,param1,{responseType: 'blob'}).then(res => {
        console.log("导出---",res)
           var blob = new Blob([res], {type: 'application/vnd.ms-excel'}); //type这里表示xlsx类型
           var downloadElement = document.createElement('a');
           var href = window.URL.createObjectURL(blob); //创建下载的链接
           downloadElement.href = href;
            　　document.body.appendChild(downloadElement);
            　　downloadElement.click(); //点击下载
            　　document.body.removeChild(downloadElement); //下载完成移除元素
            　　window.URL.revokeObjectURL(href); //释放掉blob对象   
      })
      .catch(res => {
        console.log('错误++',res);
      });
    },
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: '窗口 '+newTabName,
        name: newTabName,
        content: ''
      });
      this.editableTabsValue = newTabName;
      detailList = [];
      window.LogList.checkLog('二郎神后台管理系统',this.title,'添加',detailList);
    },
    tabclick(targetName){
      // console.log('点击+++',targetName.name);
      this.clickname = targetName.name;
      this.editableTabs.map((item,index)=>{
        if(targetName.name == item.name){
          // console.log('11-----',item.name)
          this.textarea = item.content;
          this.sqltext = item.content;
        }
      })
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getselectexecut(this.sqlid,this.sqltext,this.pageIndex,this.pageSize)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getselectexecut(this.sqlid,this.sqltext,this.pageIndex,this.pageSize)
    },
    teatareaS(val){
      console.log('textarea+++',val);
      this.textarea = val;
      this.sqltext = val;
      var name = '窗口'
      this.consolesave(this.sqlid,0,name,val);
    },
    exportout(headarr,bodyarr){
      console.log(headarr,bodyarr);
      var data = this.tableData;
      var str = "";
            if(headarr.length == 0 || bodyarr.length == 0){
                this.$message({
                    message: '暂无数据可导出！',
                    type: 'warning'
                });
                return
            };
    str=`<tr>`
    for(var i=0;i<headarr.length;i++){
                str+=`
                    <td>${headarr[i]}</td>
               `;
            };
      str+=`</tr><tr>`
            for(var i=0;i<bodyarr.length;i++){
        var newarr = bodyarr[i];
                for(var j=0;j<newarr.length;j++){
          str+=`
                    <td>${newarr[j]}</td>
                 `;
        }
        str +=`</tr>`
            };
console.log(str);
            function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            var worksheet = 'Sheet1';
            var uri = 'data:application/vnd.ms-excel;base64,';
            var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
            <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                <x:Name>${worksheet}</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
                </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                </head><body><table>${str}</table></body></html>`;
            //下载模板
            window.location.href = uri + base64(template);
    }

  }
}
</script>

<style>

.selectBox{
  height: calc(100vh - 0px);
  font-size: 14px;
}
.selectBox h1{
    margin-top: 0;
    height: 42px;
    line-height: 42px;
    background: #fff;
    font-size: 14px;
    text-align: left;
    font-weight: 100;
    padding-left: 15px;
}

.select_content{
  display: flex;
  flex-direction: row;
  height: calc(100vh - 42px);;
}
.select_side{
  width: 12.6%;
  background: #fff;
  border-left:15px solid #e8ecf0;

}
.selece_primary{
  background: #fff;
  border-left:15px solid #e8ecf0;
  width: 86%;
}
.el-textarea__inner{
  border: none !important;
}
.primary_top{
  position: relative;
  border-bottom: 1px solid #333;
}
.addbtn{
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  background: rgb(59, 103, 199);
  color: #fff;
  z-index: 10;
}
.addbtn_run{
  position: absolute;
  top: 0;
  right: 60px;
  font-size: 20px;
  background: rgb(59, 103, 199);
  color: #fff;
  z-index: 10;
}
.el-pagination{
  text-align: left;
}
.page{
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.table_content{
  max-height: 600px;
  overflow: scroll;
}
.table_content table thead{
  background: #f3f3f7;
}
.table_content table td{
  white-space: nowrap;
  height: 16px;
  text-align: left;
}
.table_content table tr{
  border-bottom: 1px solid #333;
}

</style>