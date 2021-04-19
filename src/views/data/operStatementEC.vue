<template>
  <div class="appSurvey" v-loading="loading">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <!-- <span class="">自定义事件</span> -->
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收入" name="left"></el-tab-pane>
            <el-tab-pane label="支出" name="right"></el-tab-pane>
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
      </div>
      <div class="surveyContainer">
        <div class="videoDataTop">
          <div class="collect">
            当前汇总：<p>{{totalRecentData}}元</p>
            <div>明细数据</div>
          </div>
          <div class="searchBox">
            <el-row :gutter="20">
              <el-col :span="6" class="box">
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
                  >
                </el-date-picker>
              </el-col>
              <el-col :span="6" class="box">
                <span style="width:300px;">客户：</span>
                <el-input v-model="tagValue" class="commonClass1" placeholder="请输入客户"></el-input>
              </el-col>
            </el-row>
          <div class="searchButton" @click="searchButton()">查询</div>
          </div>
        </div>
        <div class="videoDataBottom">
          <div class="downloadBtn" @click="downloadBtn()"><a href="javascript:;">下载数据</a></div>
          <el-table
            v-show="activeName=='left'"
            :data="recentData"
            style="width: 100%"
            :header-cell-style="{background:'#E2E2EB',color:'#333'}">
            <el-table-column
              prop="dateid"
              label="日期"
              align="center">
            </el-table-column>
            <el-table-column
              prop="customers"
              label="客户名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="showpv"
              label="展现量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="clickpv"
              label="点击量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="ctr"
              label="点击率"
              align="center">
            </el-table-column>
            <el-table-column
              prop="price"
              label="点击单价"
              align="center">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="金额"
              align="center">
            </el-table-column>
          </el-table>
          <el-table
            v-show="activeName=='right'"
            :data="recentData"
            style="width: 100%"
            :header-cell-style="{background:'#E2E2EB',color:'#333'}">
            <el-table-column prop="dateid" label="日期" align="center"></el-table-column>
            <el-table-column prop="customers" label="客户名称" align="center"></el-table-column>
            <el-table-column prop="amount" label="金额" align="center"></el-table-column>
          </el-table>
          <el-pagination
            style="margin-top:20px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[50, 100, 150, 200]"
            :page-size="50"
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
      title:'电商经营报表',
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
      tagValue:'',//客户名称
      tagOptions:[],
      recentData:[],//数据查询结果
      currentPage:1,
      pageIndex:1,
      Pagesize:10,
      loading:false,
      downloadExcelUrl:'',//数据导出
      disabled:true,
      activeName:"left",
      currentPage4:1,
      totalDate:0,//数量
      num:1,//收入和支出的区别
      totalRecentData:'',
      
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
    this.income(this.num);
    this.dirSirDataTotal(this.num);
  },
  methods: {
    //查询
    searchButton(){
      this.income(this.num);
      this.dirSirDataTotal(this.num);
    },
    //数据导出
    downloadBtn() {
      var url = URL.recordUrl.dirSirDataExport;
      var thedata = 'bearer'+' '+ localStorage.getItem("accessToken");
      var thedata = 'bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ii1PZUVVR0NfZlFqa0U3b0dZZHhrX0EiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MTUxNjY5NDcsImV4cCI6MTYxNTc3MTc0NywiaXNzIjoiaHR0cDovLzEwLjAuMC4yNDk6NTAwMCIsImF1ZCI6ImdhdGV3YXkiLCJjbGllbnRfaWQiOiJnYXRld2F5X2NsaWVudCIsInN1YiI6IjEzMjg1NzE1NTE3IiwiYXV0aF90aW1lIjoxNjE1MTY2OTQ3LCJpZHAiOiJsb2NhbCIsIlVuaXF1ZUtleSI6IjZmNzYyNDU4LTY2OTQtNDUwZC05ZmZiLTA2MDNhYmM5ZDA1ZiIsIlVzZXJOYW1lIjoiMTMyODU3MTU1MTciLCJVc2VySWQiOiI1NiIsInNjb3BlIjpbImdhdGV3YXkiXSwiYW1yIjpbImN1c3RvbSJdfQ.N_cmKaSort3qqOrb0UiOxQU8zveKeCuVgDQQuqbCVqL9shlKJRfBR5AknKZzsVzfLHZRMNg4QA8kkk7BdaeoSpsLCtY3m7hZS52w3Zf40rmio-Nm5crzUI9sY__SUqLC9xHTJOp4oJoB6f6n3USlL9kZ_DVtniwuz43CZ9p96SbkU-UFop5geVs4LeJtIAEYnM278jQ3IEI9ijAoyQRw8gg0_u29TqOIHVICJQiebPdN3tSPGYLLdMeuABhRzoQDSbVczzAIx6mDnxHJWfHzlJF7EQx_gGSMWk001SzWglHX3DHvC53PuWtie3yASOALsaZXDQaCW5_OWSsCv0S1FQ'
      let myObj = {
        method: 'get',
        url:url,
        fileName: '',
        params: `StartTime=${this.echartDefaultDate[0]}&EndTime=${this.echartDefaultDate[1]}&type=${this.num}&customers=${this.tagValue}`,
        thedata:thedata,
      }
      var that = this;
      var detailList = [];
      var detailArr = [];
      var mediaName;
      if(that.num==1){
        mediaName = "收入";
      }else if(that.num==2){
        mediaName = "支出";
      }
      detailArr[0] =  that.echartDefaultDate[0]+'至'+that.echartDefaultDate[1];
      detailArr[1] =  mediaName;
      detailArr[2] =  that.tagValue;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',that.title,'下载数据',detailList);
      that.common.exportMethod(myObj)
    },
    //汇总
    dirSirDataTotal(num){
      this.num = num;
      this.loading = true;
      var that = this;
      var data = {
        starttime:that.echartDefaultDate[0],
        endtime:that.echartDefaultDate[1],
        type:num,
        customers:that.tagValue,
      };
      data = JSON.stringify(data);
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'POST',
        url:URL.recordUrl.dirSirDataTotal,
        data: data,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.loading = false;
        that.totalRecentData = res.data;
        // that.downloadExport();
      }).catch(function (err) {
        console.log(err);
      });
    },
    //数据查询
    income(num){
      this.loading = true;
      var that = this;
      var data = {
        starttime:that.echartDefaultDate[0],
        endtime:that.echartDefaultDate[1],
        PageIndex:that.pageIndex,
        Pagesize:10,
        type:num,
        customers:that.tagValue,
      };
      data = JSON.stringify(data);
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'POST',
        url:URL.recordUrl.dirSirDataList,
        data: data,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.loading = false;
        that.recentData = res.data.data;
        that.totalDate = res.data.count;
        // that.downloadExport();
      }).catch(function (err) {
        console.log(err);
      });
      var typeName;
      if(that.num=="1"){
        typeName="收入";
      }else if(that.num=="2"){
        typeName="支出";
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  that.echartDefaultDate[0]+'至'+that.echartDefaultDate[1];
      detailArr[1] =  that.tagValue;
      detailArr[2] =  "第"+that.pageIndex+"页";
      detailArr[3] =  typeName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',that.title,'查询',detailList);
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if(tab.name=="left"){
        this.activeName = "left";
        this.num = 1;
        this.income(this.num);
        this.dirSirDataTotal(this.num);
      }else if(tab.name=="right"){
        this.activeName = "right";
        this.num = 2;
        this.income(this.num);
        this.dirSirDataTotal(this.num);
      }
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
      this.pageIndex = val;
      this.income();
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/operStatementEC.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
 /deep/.el-range-editor.el-input__inner{
  width: 25%;
  height: 40px;
  padding: 0px 10px;
}
/deep/.el-tabs__nav-wrap::after{
  background-color:#fff;
}
/deep/.el-row{
  width:85%;
  // margin:0   auto !important;
}
</style>
