<template>
  <div class="appSurvey">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <!-- <span class="">自定义事件</span> -->
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="自定义事件" name="left"></el-tab-pane>
            <el-tab-pane label="用户点击排行" name="right"></el-tab-pane>
          </el-tabs>
          <span class="arget">
            <div class="argetTxt" >
              <h3>指标：</h3>
              <p>浏览量（PV）：当天网站的页面浏览量</p>
              <p>访客数（UV）：当天网站的页面浏览用户数</p>
              <p>IP数（IP）：当天网站的页面浏览ip数</p>
              <p>视频播放量：当天网站的视频总播放量</p>
              <p>人均播放量：当天网站的视频播放量与视频总播放人数比</p>
              <p>人均观看时长：当天网站的视频播放时长与视频总播放人数比</p>
            </div>
          </span>
        </div>
        <div class="rightSelect">
          <el-select v-model="rightSelect" placeholder="请选择" @change="changeAllAccount()">
            <el-option
              v-for="item in accountSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="surveyContainer" v-show="activeName=='left'">
        <div class="videoDataTop">
          <el-row :gutter="20">
            <el-col :span="8" class="box">
              <span>时间：</span>
              <el-date-picker
                v-model="echartDefaultDate"
                value-format="yyyy-MM-dd"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始"
                end-placeholder="结束"
                :picker-options="pickerOptions"
                class="commonClass"
                @change="changeEchartTime"
                >
              </el-date-picker>
            </el-col>
            <el-col :span="8" class="box">
              <span style="width:300px;">事件名称：</span>
              <el-select v-model="tagValue" multiple collapse-tags placeholder="请选择" class="commonClass1">
                <el-option
                  v-for="item in tagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <div class="Allbtn">
            <el-row class="btndata">
              <el-button type="primary" @click="searchBtn()" v-loading.fullscreen.lock="fullscreenLoading">查询</el-button>
            </el-row>
             <!-- <a class="exportBtn" :href=downloadExcelUrl :disabled=disabled>导出</a> -->
          </div>
        </div>
        <div class="videoDataBottom">
          <el-table
            :data="recentData"
            style="width: 100%"
            :header-cell-style="{background:'#E2E2EB',color:'#333'}">
            <el-table-column
              prop="dateTime"
              label="日期"
              align="center">
            </el-table-column>
            <el-table-column
              prop="world"
              label="事件名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="pv"
              label="事件数量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="uv"
              label="事件人数"
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="surveyContainer" v-show="activeName=='right'">
        <div class="videoDataTop">
          <el-row :gutter="20">
            <el-col :span="8" class="box">
              <span>时间：</span>
              <el-date-picker
                v-model="userDefaultDate"
                value-format="yyyy-MM-dd"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始"
                end-placeholder="结束"
                :picker-options="pickerOptions"
                class="commonClass"
                @change="changeUserTime"
              >
              </el-date-picker>
            </el-col>
          </el-row>
        </div>
        <div class="videoDataBottom">
          <el-table
            :data="recentData"
            style="width: 100%"
            :header-cell-style="{background:'#E2E2EB',color:'#333'}">
            <el-table-column
              type="index"
              label="序号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="nickname"
              label="用户昵称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="userid"
              label="用户id"
              align="center">
            </el-table-column>
            <el-table-column
              prop="clickpv"
              label="点击商品次数"
              align="center">
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total=totalDate>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
export default {
  name: 'videoData',
  data () {
    return {
      title:'用户行为数据',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '全部',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7499);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      echartDefaultDate: [],//自定义点击
      userDefaultDate:[],//用户点击
      tagValue:[],
      tagOptions:[
        {
          label:'全部',
          value:0,
        },
        {
          label:'搜索框点击',
          value:1,
        },
        {
          label:'搜索结果点击',
          value:2,
        },
        {
          label:'商品各个分类点击',
          value:3,
        }
      ],
      recentData:[],//数据查询结果
      currentPage:1,
      pageIndex:1,
      fullscreenLoading:false,
      downloadExcelUrl:'',//数据导出
      disabled:true,
      rightSelect: '',//右上角选项类型值 0为总用户 1为注册用户
      accountSelect: [],
      activeName:"left",
      currentPage4:1,
      totalDate:0,//数量
    }
  },
  created(){
    document.title = this.title;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.echartDefaultDate.push(this.common.formatDate(-3),this.common.formatDate(0))
    this.userDefaultDate.push(this.common.formatDate(-3),this.common.formatDate(0))
    this.searchBtn();
    this.getConfig();
  },
  methods: {
    //获取右上角选择数据
    getConfig(){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.bdggetConfig,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        if(res.code==0){
          var optionsi = [];
          var obj = {
            label:'总渠道',
            value:'',
          };
          optionsi.push(obj)
          for(var i=0;i<res.data.length;i++){
            if(res.data[i]=='趣看'){
              var obj = {
                label:'趣看',
                value:'趣看',
              };
              optionsi.push(obj)
            }else if(res.data[i]=='爆米花'){
              var obj = {
                label:'爆米花',
                value:'爆米花',
              };
              optionsi.push(obj)
            }else if(res.data[i]=='快看'){
              var obj = {
                label:'快看',
                value:'快看',
              };
              optionsi.push(obj)
            }
          }
          that.accountSelect = optionsi;
        }else if(res.code==30005){
          that.$message(res.message);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    changeEchartTime() {

    },
    changeUserTime(){
      this.fullscreenLoading = false;
      var that = this;
      var data = {
        // MediaName:that.rightSelect,
        starttime:that.echartDefaultDate[0],
        endtime:that.echartDefaultDate[1],
      };
      data = JSON.stringify(data);
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'POST',
        url:URL.recordUrl.UserClickAction,
        data: data,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.fullscreenLoading = false;
        that.recentData = res.data;
        that.totalDate = that.recentData.length;
        // that.downloadExport();
      }).catch(function (err) {
        console.log(err);
      });
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  that.rightSelect;
      detailArr[1] =  that.echartDefaultDate[0]+'至'+that.echartDefaultDate[1];
      detailArr[2] =  that.tagValue;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',that.title,'查询',detailList);
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if(tab.name=="left"){
        this.activeName = "left";
      }else if(tab.name=="right"){
        this.activeName = "right";
        this.changeUserTime();
      }
    },
    changeAllAccount(){
      this.searchBtn();
      this.loading = true;
      var rightSelectName;
      if(this.rightSelect==""){
        rightSelectName = "总渠道";
      }else{
        rightSelectName = this.rightSelect;
      }
      
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  this.rightSelect;
      detailArr[1] =  this.echartDefaultDate[0]+'至'+this.echartDefaultDate[1];
      detailArr[2] =  this.tagValue;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'查询',detailList);
    },
    //自定义行为查询数据
    //用户行为数据查询
    searchBtn() {
      if(this.tagValue.length==0){
        this.tagValue = [1,2,3];
      }else if(this.tagValue.includes(0)){
        this.tagValue = [1,2,3];
      }
      this.fullscreenLoading = false;
      var that = this;
      var data = {
        MediaName:that.rightSelect,
        startTime:that.echartDefaultDate[0],
        endTime:that.echartDefaultDate[1],
        ActionType:that.tagValue,
      };
      data = JSON.stringify(data);
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'POST',
        url:URL.recordUrl.getUserAction,
        data: data,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.fullscreenLoading = false;
        that.recentData = res.data;
        // that.downloadExport();
      }).catch(function (err) {
        console.log(err);
      });
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  that.rightSelect;
      detailArr[1] =  that.echartDefaultDate[0]+'至'+that.echartDefaultDate[1];
      detailArr[2] =  that.tagValue;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',that.title,'查询',detailList);
    },
    // //数据导出
    // downloadExport() {
    //   this.disabled=false;
    //   this.downloadExcelUrl = URL.recordUrl.getvideoExport+"?MediaName="+this.tagValue+"&startTime="+this.echartDefaultDate[0]+"&endTime="+this.echartDefaultDate[1]+"&ActionType="+this.UserIdValue+"&pageIndex="+this.pageIndex+"&pageSize=30"
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // this.changeUserTime();
    },
    videoTypeOr (row) {
      return row.isplubic==100?'小视频':(row.distributable === 200 ? '横屏视频' : '全部')
    },
    distributableOr (row) {
      return row.distributable==0?'否':(row.distributable === 1 ? '是' : '全部')
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/userAction.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
 /deep/.el-range-editor.el-input__inner{
  width: 25%;
  height: 35px;
  padding: 0px 10px;
}
/deep/.el-tabs__nav-wrap::after{
  background-color:#fff;
}
</style>
