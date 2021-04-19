<template>
  <div class="versionBox" v-loading="loading">
    <div class="versionContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">历史版本</span>
        </div>
        <div class="rightSelect">
          <span class="addVersions" @click="addVersionList()">
            <img :src=imgSrc alt="" style="vertical-align: -3px;">
            添加版本
          </span>
        </div>
      </div>
      <div class="versionBOTTOM">
         <div class="versionCont1" v-if="showAddVersion==true">
          <div class="versionLeft1">
            <el-form ref="form" label-width="80px" class="versionForm">
              <el-form-item label="版本">
                <el-input v-model="addversion"></el-input>
              </el-form-item>
              <el-form-item label="发布日期">
                <!-- <el-input v-model="date" disabled></el-input> -->
                <div class="block" style="border:1px solid #dcdfe6;border-radius: 4px;width:220px;">
                  <el-date-picker
                    v-model="date.defaultDate"
                    type="datetime"
                    placeholder="选择发布日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="">
                <el-input type="textarea" v-model="addmessage" autosize></el-input>
              </el-form-item>
              <el-form-item style="margin-top:20px;" class="flexRight">
                <el-button type="primary" @click="addVersion()">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="versionCont"  v-for="(item,index) in versionList" :key=index >
          <div class="versionLeft">
            <el-form ref="form" label-width="80px" class="versionForm">
              <el-form-item label="版本">
                <el-input v-model="item.version" :disabled=item.disabled></el-input>
              </el-form-item>
              <el-form-item label="发布日期">
                <el-input v-model="item.createTime" disabled></el-input>
              </el-form-item>
              <el-form-item label="修改时间">
                <el-input v-model="item.updateTime" disabled></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input type="textarea" v-model="item.message" autosize  :disabled=item.disabled></el-input>
              </el-form-item>
              <el-form-item style="margin-top:20px;" class="flexRight">
                <!-- <el-button type="primary" v-if="item.disabled">保存</el-button> -->
                <el-button type="primary" @click="recompose(item.id,index)" :disabled=item.disabled>修改</el-button>
                <el-button type="primary" @click="removeVersion(item.id)" :disabled=item.disabled v-if="oversion==1">删除</el-button>
                <!-- <el-button v-if="item.disabled==false">取消</el-button> -->
              </el-form-item>
            </el-form>
          </div>
          <div class="versionRight">
            <div @click="editBtn(index)"><img :src=editImg alt="" style="vertical-align: -2px;"> 编辑</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="20%"
      >
      <span>{{toast}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
// import store from '@/store/index';
export default {
  name: 'versionUpdating',
  data () {
    return {
      title:'版本更新说明',
      loading:true,
      date:{
        defaultDate:new Date(),
      },
      type: [],
      versionList:[],
      imgSrc:require('../assets/imgs/add.png'),
      editImg:require('../assets/imgs/edit.png'),
      disabled:true,
      centerDialogVisible: false,
      toast:'',
      addversion:'',//新增说明标题
      addmessage:'',//新增说明内容
      showAddVersion:false,
      oversion:'',//权限
    }
  },
  created(){
    document.title = this.title;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    // this.getNowDate();
    this.getVersionCode();
  },
  methods: {
    //获取当前事件
    getNowDate(){
      var aData = new Date();
      this.date = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
    },
    //新增说明框
    addVersionList() {
      this.showAddVersion = true;
    },
    //获取当前版本说明列表
    getVersionList() {
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getVersionList+'?page=1&rows=10',
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        res.data.forEach(element => {
          if(element.disabled == undefined){
            if(that.oversion==1){
              element.disabled = true
            }else{
              element.disabled = false
            }
          }
        });
        that.versionList = res.data;
        console.log(that.versionList);
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取版本说明列表操作权限
    getVersionCode(){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getleftGuid+"?type=2&hash=9D4C2F636F067F89&ParentId=278",
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        var data = res.data;
        for(var i=0;i<data.length;i++){
          if(data[i].rote == "/api/tj/versionlog/update"){
            //有权限的话则为1
            that.oversion = 1;
            that.getVersionList();
          }else{
            that.getVersionList();
          }
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    editBtn(index){
      this.versionList[index].disabled = false;
    },
    //修改
    recompose(id,index) {
      var that = this;
      var obj = {
        version:that.versionList[index].version,
        message:that.versionList[index].message,
        id:id
      }
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.getVersionUpdate+'?page=1&rows=10',
        data: obj,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.loading = false;
        that.centerDialogVisible  = true;
        that.toast = res.message;
      }).catch(function (err) {
        console.log(err);
      });
      detailList = JSON.stringify(obj);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'修改版本',detailList);
    },
    //删除
    removeVersion(id) {
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.delVersionUpdate,
        data: {
          id:id
        },
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.loading = false;
        that.centerDialogVisible  = true;
        that.toast = res.message;
        that.getVersionList();
      }).catch(function (err) {
        console.log(err);
      });
      var detailList;
      var obj = {
        id:id,
      };
      detailList = JSON.stringify(obj);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'删除版本',detailList);
    },
    //新增
    addVersion() {
      var that = this;
      console.log("时间",that.date.defaultDate);
      
      var obj = {
        version:that.addversion,
        message:that.addmessage,
        time:that.date.defaultDate,
      }
      obj = JSON.stringify(obj);
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'POST',
        url:URL.recordUrl.addVersion+'?page=1&rows=10',
        data: obj,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.loading = false;
        //作为提示
        that.centerDialogVisible  = true;
        that.toast = res.message;
        that.showAddVersion = false;
        that.getVersionList();
      }).catch(function (err) {
        console.log(err);
      });
      
      window.LogList.checkLog('二郎神后台管理系统',this.title,'新增版本',obj);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/deep/.el-input__inner:hover,.el-textarea__inner:hover{
 border:none;
}
/deep/.el-textarea__inner:hover{
 border:none;
}
/deep/.el-input__inner{
  border:none;
}
/deep/.el-textarea__inner{
  border:none;  
  resize: none;
}
/deep/.el-input.is-disabled .el-input__inner{
  background-color: #fff;
  color: #323437;
  font-size: 14px;
}
/deep/.el-textarea.is-disabled .el-textarea__inner{
 background-color: #fff;
  color: #323437;
  font-size: 14px;
}
/deep/.el-button{
  padding: 8px 13px;
}
/deep/.el-dialog{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  height:200px;
  margin:auto !important;
}
.el-form-item{
  margin-bottom:5px;
}
.versionBox{
  width:100%;
  height:100%;
  .versionContainer{
    .headContainer{
      height: 50px;
      line-height: 50px;
      background: #fff;
      margin-bottom: 20px;
      display: flex;
      padding:0 20px;
      justify-content:space-between;
      border-bottom: 3px solid #fff;
      border-left: 1px solid #EFEFEF;
      .rightSelect{
        .addVersions{
          width: 110px;
          float: right;
          display: block;
          cursor: pointer;
          color: #2589FF;
        }
      }
    }
    .versionBOTTOM{
      margin:20px;
      .versionCont{
        background:#fff;
        padding:20px;
        margin-bottom:20px;
        display: flex;
        justify-content:space-between;
        .versionLeft{
          width:92%;
          .flexRight{
            display: flex;
            justify-content: flex-end;
          }
        }
        .versionRight{
          width:7%;
          color:#2589FF;
          cursor:pointer;
        }
      }
      .versionCont1{
        background:#fff;
        padding:20px;
        margin-bottom:20px;
        display: flex;
        justify-content:space-between;
        .versionLeft1{
          width:92%;
          .flexRight{
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}

</style>
