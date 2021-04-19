<template>
  <div class="appSurvey">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">数据录入-电商</span>
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
          
        </div>
      </div>
      <div class="surveyContainer">
        <div class="videoDataTop">
          <el-row :gutter="20" class="mediaContent">
            <el-col :span="6" class="box">
              <span>选择日期：</span>
              <el-date-picker
                v-model="echartDefaultDate.dateValue"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                class="commonClass"
                :picker-options="expireTimeOption"
                >
              </el-date-picker>
            </el-col>
            <el-col :span="6" class="box">
              <span>录入类型：</span>
              <el-select v-model="mediaValue" filterable placeholder="请选择" @change="changeMedia()">
                <el-option
                  v-for="item in mediaList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="box">
              <span>录入客户：</span>
              <el-input v-model="pushCustomer" class="commonClass" placeholder="请输入客户"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mediaContent">
            <el-col :span="6" class="box" v-show="mediaValue==1">
              <span>展现量：</span>
              <el-input v-model="pushShowNum" class="commonClass" placeholder="请输入展现量"></el-input>
            </el-col>
            <el-col :span="6" class="box" v-show="mediaValue==1">
              <span>点击单价：</span>
              <el-input v-model="pushAmount" class="commonClass" placeholder="请输入单价"></el-input>
            </el-col>
            <el-col :span="6" class="box">
              <span>录入金额：</span>
              <el-input v-model="mediaValueNum" class="commonClass" placeholder="请输入金额"></el-input>
            </el-col>
          </el-row>
          <div class="Allbtn">
            <el-row class="btndata">
              <el-button type="primary" @click="searchBtn()" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
            </el-row>
          </div>
        </div>
        <div class="videoDataBottom">
          <div class="entryECdataTitle">
            <h3>明细数据</h3>
            <span><a class="surveyDown" @click="exportExcel()">下载数据</a></span>
          </div>
          <div class="videoData">
            <el-date-picker
              v-model="detailBoxDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              class="detailBoxTime"
              @change="changeBoxTime"
              >
            </el-date-picker>
          </div>
          <div class="tableBox">
            <div class="DetailBoxBottom" v-show="mediaValue==1">
              <el-table
                :data="recentData"
                border
                style="width: 100%">
                <el-table-column
                  prop="dateid"
                  label="日期"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="customers"
                  label="客户名称"
                  width="180"
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
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      align="center"
                      @click="handleDeleteLeft(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="DetailBoxBottom" v-show="mediaValue==2">
              <el-table
                :data="recentData"
                border
                style="width: 100%">
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
                  prop="amount"
                  label="金额"
                  align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      align="center"
                      @click="handleDeleteRight(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <el-pagination
            v-if="count!==''"
            class="count"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="30"
            layout="total, sizes, prev, pager, next, jumper"
            :total=count>
          </el-pagination>
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
import {URL} from '@/libs/url'
import unlock from "@/components/unlock";
export default {
  name: 'videoData',
  components: {
    unlock
  },
  data () {
    return {
      title:'数据录入-电商',
      echartDefaultDate: { dateValue: "" },//趋势图查询时间，可指定默认显示时间
      detailBoxDate:[],
      expireTimeOption: {
        // disabledDate(time) {
        //   let curDate = (new Date()).getTime();
        //   let three = 3600 * 1000 * 24 * 4;
        //   let threeMonths = curDate - three;
        //   return time.getTime() > Date.now() || time.getTime() < threeMonths;
        // }
      },
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
        }]
      },
      recentData:[],//数据查询结果
      count:'',//查询条数
      currentPage:1,
      pageIndex:1,
      fullscreenLoading:false,
      mediaList:[
        {
          key:1,
          value:'收入',
        },
        {
          key:2,
          value:'支出',
        }
      ],//选项分类
      mediaValue:1,//选项分类值
      mediaValueName:'',//选项分类名称
      mediaValueNum:'',//录入值
      mediaValueMiddle:0,//判断中间值
      pushCustomer:'',
      pushShowNum:'',
      pushAmount:'',
      detailType:'',
    }
  },
  created(){
    document.title = this.title;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.echartDefaultDate.dateValue = this.timeDefault();
    // this.echartDefaultDate.push(this.common.formatDate(-6),this.common.formatDate(0))
    this.detailBoxDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
    this.detailData()
  },
  methods: {
    timeDefault() {
      var date = new Date();
      var s1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()-1);
      return s1;
    },
    changeEchartTime() {
      console.log("时间",this.echartDefaultDate.dateValue)
    },
    changeBoxTime(){
      this.detailType = 1;
      this.detailData()
    },
    changeMedia(value){
      console.log("value",value);
      this.pushCustomer = '';
      this.detailData();
    },
    //录入数据
    searchBtn() {
      var obj = {
        dateid:this.echartDefaultDate.dateValue,
        type:this.mediaValue,
        customers:this.pushCustomer,
        showpv:this.pushShowNum,
        price:this.pushAmount,
        Amount:this.mediaValueNum,
      };
      obj = JSON.stringify(obj);
      console.log(obj);
      this.fullscreenLoading = true;
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.dirSirDataPush,
        data: obj,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        if(res.code==0){
          that.fullscreenLoading = false;
          that.$message({
            type: 'success',
            message: res.data
          });
          var typeName;
          var detailList = [];
          var detailArr = [];
          if(that.mediaValue==1){
            typeName = "收入";
          }else if(that.mediaValue==2){
            typeName = "支出";
          }
          detailArr[0] = that.echartDefaultDate.dateValue;
          detailArr[1] = typeName;
          detailArr[2] = that.pushCustomer;
          detailArr[3] = that.pushAmount;
          detailArr[4] = that.mediaValueNum;
          detailList.push(detailArr);
          detailList = JSON.stringify(detailList);
          window.LogList.checkLog('二郎神后台管理系统',that.title,"录入",detailList);
          that.detailData()
        }else if(res.code==1){
          that.fullscreenLoading = false;
          that.$message({
            type: 'success',
            message: res.message
          });
        }
        
      }).catch(function (err) {
        
      });
    },
    detailData(){
      this.fullscreenLoading = true;
      var that = this;
      var obj;
      if(that.detailType==1){
        obj = {
          starttime:that.detailBoxDate[0],
          endtime:that.detailBoxDate[1],
          PageIndex:this.pageIndex,
          Pagesize:10,
          type:that.mediaValue,
          customers:'',
        };
      }else{
        obj = {
          starttime:that.detailBoxDate[0],
          endtime:that.detailBoxDate[1],
          PageIndex:this.pageIndex,
          Pagesize:10,
          type:that.mediaValue,
          customers:that.pushCustomer,
        };
      }
      obj = JSON.stringify(obj);
      console.log(obj);
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.dirSirDataList,
        data: obj,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.fullscreenLoading = false;
        that.recentData = [] ;
        for(var i=0;i<res.data.data.length;i++){
          if(res.data.data[i].ctr){
            res.data.data[i].ctr+'%';
            res.data.data[i].ctr = res.data.data[i].ctr+'%';
          }
        }
        that.recentData = res.data.data;
        that.count = res.data.count;
      }).catch(function (err) {
        // this.$message.error(err.message);
      });
      var detailList = [];
      var detailArr = [];
      var mediaName;
      if(that.mediaValue==1){
        mediaName = "收入";
      }else if(that.mediaValue==2){
        mediaName = "支出";
      }
      detailArr[0] =  that.detailBoxDate[0]+'至'+that.detailBoxDate[1];
      detailArr[1] =  "第"+that.pageIndex+"页";
      detailArr[2] =  mediaName;
      detailArr[3] =  that.pushCustomer;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',that.title,'查询',detailList);
    },
    //数据导出
    exportExcel() {
      var url = URL.recordUrl.dirSirDataExport;
      var thedata = 'bearer'+' '+ localStorage.getItem("accessToken");
      var thedata = 'bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ii1PZUVVR0NfZlFqa0U3b0dZZHhrX0EiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MTUxNjY5NDcsImV4cCI6MTYxNTc3MTc0NywiaXNzIjoiaHR0cDovLzEwLjAuMC4yNDk6NTAwMCIsImF1ZCI6ImdhdGV3YXkiLCJjbGllbnRfaWQiOiJnYXRld2F5X2NsaWVudCIsInN1YiI6IjEzMjg1NzE1NTE3IiwiYXV0aF90aW1lIjoxNjE1MTY2OTQ3LCJpZHAiOiJsb2NhbCIsIlVuaXF1ZUtleSI6IjZmNzYyNDU4LTY2OTQtNDUwZC05ZmZiLTA2MDNhYmM5ZDA1ZiIsIlVzZXJOYW1lIjoiMTMyODU3MTU1MTciLCJVc2VySWQiOiI1NiIsInNjb3BlIjpbImdhdGV3YXkiXSwiYW1yIjpbImN1c3RvbSJdfQ.N_cmKaSort3qqOrb0UiOxQU8zveKeCuVgDQQuqbCVqL9shlKJRfBR5AknKZzsVzfLHZRMNg4QA8kkk7BdaeoSpsLCtY3m7hZS52w3Zf40rmio-Nm5crzUI9sY__SUqLC9xHTJOp4oJoB6f6n3USlL9kZ_DVtniwuz43CZ9p96SbkU-UFop5geVs4LeJtIAEYnM278jQ3IEI9ijAoyQRw8gg0_u29TqOIHVICJQiebPdN3tSPGYLLdMeuABhRzoQDSbVczzAIx6mDnxHJWfHzlJF7EQx_gGSMWk001SzWglHX3DHvC53PuWtie3yASOALsaZXDQaCW5_OWSsCv0S1FQ'
      let myObj = {
        method: 'get',
        url:url,
        fileName: '',
        params: `StartTime=${this.detailBoxDate[0]}&EndTime=${this.detailBoxDate[1]}&type=${this.mediaValue}&customers=${this.pushCustomer}`,
        thedata:thedata,
      }
      var that = this;
      var detailList = [];
      var detailArr = [];
      var mediaName;
      if(that.mediaValue==1){
        mediaName = "收入";
      }else if(that.mediaValue==2){
        mediaName = "支出";
      }
      detailArr[0] =  that.detailBoxDate[0]+'至'+that.detailBoxDate[1];
      detailArr[1] =  mediaName;
      detailArr[2] =  that.pushCustomer;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',that.title,'下载数据',detailList);
      that.common.exportMethod(myObj)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.searchBtn();
    },
    handleDeleteLeft(index, row){
      console.log(index,row);
      var obj = {
        Id:row.id,
      };
      obj = JSON.stringify(obj);
      console.log(obj);
      this.fullscreenLoading = true;
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.dirSirDataDelData,
        data: obj,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        if(res.code==0){
          that.fullscreenLoading = false;
          that.$message({
            type: 'success',
            message: res.data
          });
          that.detailData()
          var typeName;
          var detailList = [];
          var detailArr = [];
          if(that.mediaValue==1){
            typeName = "收入";
          }else if(that.mediaValue==2){
            typeName = "支出";
          }
          detailArr[0] = "id"+row.id;
          detailArr[1] = typeName;
          detailList.push(detailArr);
          detailList = JSON.stringify(detailList);
          window.LogList.checkLog('二郎神后台管理系统',that.title,"删除",detailList);
          that.detailData()
        }else if(res.code==1){
          that.fullscreenLoading = false;
          that.$message({
            type: 'success',
            message: res.message
          });
        }
        
      }).catch(function (err) {
        
      });

    },
    handleDeleteRight(index, row){
      console.log(index,row);
      var obj = {
        Id:row.id,
      };
      obj = JSON.stringify(obj);
      console.log(obj);
      this.fullscreenLoading = true;
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.dirSirDataDelData,
        data: obj,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        if(res.code==0){
          that.fullscreenLoading = false;
          that.$message({
            type: 'success',
            message: res.data
          });
          that.detailData()
          var typeName;
          var detailList = [];
          var detailArr = [];
          if(that.mediaValue==1){
            typeName = "收入";
          }else if(that.mediaValue==2){
            typeName = "支出";
          }
          detailArr[0] = "id"+row.id;
          detailArr[1] = typeName;
          detailList.push(detailArr);
          detailList = JSON.stringify(detailList);
          window.LogList.checkLog('二郎神后台管理系统',that.title,"删除",detailList);
          that.detailData()
        }else if(res.code==1){
          that.fullscreenLoading = false;
          that.$message({
            type: 'success',
            message: res.message
          });
        }
        
      }).catch(function (err) {
        
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/dataEntryEC.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
 /deep/.el-range-editor.el-input__inner{
  width: 25%;
  height: 35px;
  padding: 0px 10px;
}
/deep/.el-message-box__message .entryList{
  display: flex;
  justify-content: flex-start;
  div{
    span{
      color:#333;
    }
  }
}
</style>
