<template>
  <!-- <div class="appSurvey" v-loading="loading"> -->
  <div class="appSurvey">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <el-tabs v-model="PageName" @tab-click="PageNameBtn()" class="spanBtn">
            <template v-for="item in options">
              <el-tab-pane :label="item.label" :name="item.value+''"></el-tab-pane>
            </template>
            <!-- <el-tab-pane label="总览" name="0"></el-tab-pane>
            <el-tab-pane label="趣看视频  " name="2"></el-tab-pane>
            <el-tab-pane label="爆米花Android" name="1"></el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
      <div class="surveyContainer">
        <div class="surveyTop">
          <div class="">
            <div class="surveyDataTop">
             <el-radio-group v-model="MiddleType" @change="changetabPosition()">
              <el-radio-button :label="item.value" v-for="(item,index) in childconfig" :key="index">{{item.label}}</el-radio-button>
            </el-radio-group>
            </div>
          </div>
        </div>
        <div class="surveyEchart">
          <div class="DMtop">
            <h2>总趋势</h2>
          </div>
          <div class="surveyDate">
           <el-date-picker
              v-model="echartDefaultDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              class="surveyTime"
              @change="changeEchartTime"
            >
            </el-date-picker>
            <el-radio-group v-model="ChildShowTypeAll" class="choseType" @change="ChildShowTypeAllBtn()">
              <el-radio-button label="1">金币</el-radio-button>
              <el-radio-button label="2">人数</el-radio-button>
              <el-radio-button label="3">次数</el-radio-button>
            </el-radio-group>
            
          </div>
          <div class="surveyEchartBox">
            <div class="surveyEchartlist">
              
            </div>
            <div class="surveyEchartimg">
              <div :id="IDNAME" style="height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="surveyEchart">
          <div class="DMtop">
            <h2>子项趋势图</h2>
          </div>
          <div class="surveyDate">
           <el-date-picker
              v-model="ZechartDefaultDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              class="surveyTime"
              @change="ZchangeEchartTime"
              >
            </el-date-picker>
            <div class="goldContent">
              <el-tooltip placement="top">
                <div slot="content">可左右滑动</div>
                <el-button class="tooltip">
                  <div class="goldWidth">
                    <div class="swiper-container">
                      <el-radio-group v-model="ChildTypeZ" class="choseType swiper-wrapper" @change="ChildTypeZBtn()">
                        <el-radio-button :label="item.value" v-for="(item,index) in MiddleList" :key="index" class="swiper-slide">{{item.label}}</el-radio-button>
                      </el-radio-group>
                    </div>
                  </div>
                </el-button>
              </el-tooltip>
              <el-radio-group v-model="ChildShowTypeZ" @change="ChildShowTypeZBtn()" style="margin-left:30px;">
                <el-radio-button label="1">金币</el-radio-button>
                <el-radio-button label="2">人数</el-radio-button>
                <el-radio-button label="3">次数</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="surveyEchartBox">
            <div class="surveyEchartlist">
              
            </div>
            <div class="surveyEchartimg">
              <div :id="IDNAMEZ" style="height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="surveyDetailBox">
          <div class="DetailBoxTop">
            <el-date-picker
              v-model="detailDefaultDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              class="surveyTime"
              @change="changeEchartTimedetail"
              >
            </el-date-picker>
            <el-radio-group v-model="ChildShowTypeBox" class="choseType" @change="ChildShowTypeBoxBtn()" style="margin-left:20px;">
              <el-radio-button label="1">金币</el-radio-button>
              <el-radio-button label="2">人数</el-radio-button>
              <el-radio-button label="3">次数</el-radio-button>
            </el-radio-group>
            <a class="surveyDown" id="surveyDown1" :href="downloadExcelUrl">下载数据</a>
          </div>
          <div class="DetailBoxBottom">
            <!-- <el-table
              v-if="MiddleType==1"
              :data="tableData"
              
              :header-cell-style="{background:'#E2E2EB',color:'#7B7C84'}"
              style="width: 100%">
              <el-table-column
                prop="0"
                label="日期"
                align="center">
              </el-table-column>
              <el-table-column
                prop="1"
                label="汇总"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="2"
                label="观看视频奖励"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="3"
                label="看视频砸金蛋奖励"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="4"
                label="砸金蛋广告奖励"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="5"
                label="观看小视频收益"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="6"
                label="观看小视频金蛋奖励"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="7"
                label="砸小视频金蛋观看广告奖励"
                align="center"
                width="200"
                >
              </el-table-column>
            </el-table>
            <el-table
              v-if="MiddleType==2"
              :data="tableData"
              border
              
              :header-cell-style="{background:'#E2E2EB',color:'#7B7C84'}"
              style="width: 100%">
              <el-table-column
                fixed
                prop="0"
                label="日期"
                align="center">
              </el-table-column>
              <el-table-column
                prop="1"
                label="汇总"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="2"
                label="每日签到"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="3"
                label="签到视频奖励"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="4"
                label="开宝箱"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="5"
                label="看广告"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="6"
                label="整点宝箱"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="7"
                label="激励视频"
                align="center"
                width="200"
                >
              </el-table-column>
              <el-table-column
                prop="8"
                label="领取气泡奖励"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="9"
                label="退出登录金币支出"
                align="center"
                >
              </el-table-column>
               <el-table-column
                prop="10"
                label="试玩小游戏金币支出"
                align="center"
                >
              </el-table-column>
            </el-table>
            <el-table
              v-if="MiddleType==3"
              :data="tableData"
              :header-cell-style="{background:'#E2E2EB',color:'#7B7C84'}"
              style="width: 100%">
              <el-table-column
                prop="0"
                label="日期"
                align="center">
              </el-table-column>
              <el-table-column
                prop="1"
                label="汇总"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="2"
                label="高额赚"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="3"
                label="休闲赚"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="4"
                label="南枫小游戏"
                align="center"
                >
              </el-table-column>
            </el-table>
            <el-table
              v-if="MiddleType==4"
              :data="tableData"
              
              :header-cell-style="{background:'#E2E2EB',color:'#7B7C84'}"
              style="width: 100%">
              <el-table-column
                prop="0"
                label="日期"
                align="center">
              </el-table-column>
              <el-table-column
                prop="1"
                label="汇总"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="2"
                label="看视频"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="3"
                label="登录3天"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="4"
                label="领取气泡"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="5"
                label="砸金蛋"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="6"
                label="领气泡"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="7"
                label="整点奖励"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="8"
                label="观看小视频"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="9"
                label="玩小游戏"
                align="center"
                >
              </el-table-column>
            </el-table> -->
            <table id="tab" border="0" cellpadding="0" cellspacing="0" class="detailTable" style="border:1px solid #dedede;">
              <tr class="biaotou">
                <template v-for="item in tableDataHeader">
                  <th style="150px;">{{item}}</th>
                </template>
              </tr>
              <template v-for="item in tableData">
                <tr class="biaoCont">
                <template v-for="item2 in item">
                  <td style="150px;">{{item2}}</td>
                </template>
                </tr>
              </template>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import echarts from 'echarts'
import EchartsCoponent from '../../components/echart'
import Swiper from 'swiper';
export default {
  name: 'appSiredData',
  data () {
    return {
      title:'APP金币支出',
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
      echartDefaultDate: [],//总趋势图查询时间，可指定默认显示时间
      ZechartDefaultDate:[],//子趋势图查询时间，可指定默认显示时间
      detailDefaultDate:[],//表格查询时间，可指定默认显示时间
      tableData: [],//表格详情数据
      partData:'',//趋势图数据
      loading: true,
      IDNAME:'echart1',//总趋势渲染区域id
      IDNAMEZ:'echart1_1',//趋势渲染区域id
      Valuename:'金币',//总趋势图指标名字
      ValuenameZ:'观看视频奖励',//子趋势图指标名字
      btnType:1,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
      downloadExcelUrl:'',//下载数据的地址
      PageName:'0',//页面数据展示类型  0-总览 2-趣看视频 1-爆米花Android  (接口公用)
      PageNameType:'1',//
      MiddleType:'',// 1-观看视频详情 2-日常任务 3-第三方任务 4-新手任务 （页面切换总）
      //总趋势图所需参数
      ChildShowTypeAll:'1',//1-3 金币 人数 次数
      //子趋势图所需参数
      ChildShowTypeZ:'1',//1-3 金币 人数 次数
      ChildTypeZ:'1',//middletype =1 时 ，1-3 观看视频奖励 看视频砸金蛋奖励 砸金蛋广告奖励，
                  //middletype =2 时 ，1-7 每日签到获得金币 签到视频奖励 开宝箱获得金币 看广告获得金币 整点宝箱奖励 激励视频-整点宝箱奖励 领取气泡奖励
                  //middletype =3时 ，1 高额赚
                  //middletype =4时 ，1-3 看视频 登录3天 领取气泡
      //数据表格所需数据
      ChildShowTypeBox:'1',//1-3 金币 人数 次数
      childconfig:[],
      options: [],
      id:'',//子页面配置id
      childId:'',//子趋势图配置id
      MiddleList:[],
      tableDataHeader:[],
    }
  },
  created(){
    document.title = this.title;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.bindDrawal();//获取默认时间
  },
  methods: {
    //获取当前默认一周的时间并放入趋势图和详情表的日期
    bindDrawal(){
      this.getChildConfig();
      this.getConfig();
      this.echartDefaultDate.push(this.common.formatDate(-6),this.common.formatDate(0))
      this.ZechartDefaultDate.push(this.common.formatDate(-6),this.common.formatDate(0))
      this.detailDefaultDate.push(this.common.formatDate(-6),this.common.formatDate(0))
    },
    swiper(){
      new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: "auto",
        paginationClickable: true,
        freeMode : false,
        freeModeMomentum : true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
    });
    },
    //获取右上角选择数据
    getConfig(){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getConfig,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        if(res.code==0){
         var optionsi = res.data;
          var obj = {
            label:'全部',
            value:0,
          };
          optionsi.unshift(obj)
          that.options = optionsi;
          
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取相关配置
    getChildConfig(){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getChildConfig+"?Type="+that.PageName,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        if(res.code==0){
          that.childconfig = res.data;
          that.MiddleType = res.data[0].value;
          that.getPartDataAll();
          that.getChildEChartConfig();
          that.getDetails();
        }else if(res.code==30005){
          that.$message(res.message);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    getChildEChartConfig(){
      console.log(this.MiddleType);
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getChildEChartConfig+"?Type="+that.PageName+"&id="+that.MiddleType,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.MiddleList = res.data;
        that.ChildTypeZ = res.data[0].value;
        that.getPartData();
        that.swiper();
      }).catch(function (err) {
        console.log(err);
      });
    },
    PageNameBtn() {
      console.log("数据展示类型",this.PageName);
      this.tableData = [];
      this.getDetails();//表格数据
      this.getPartDataAll();//总趋势图
      this.getPartData();//子趋势图
    },
    changetabPosition (){
      console.log(this.MiddleType);
      this.tableData = [];
      this.getDetails();//表格数据
      this.getPartDataAll();//总趋势图
      this.getPartData();//子趋势图
      this.getChildEChartConfig();
    },
    //总趋势图条件筛选
    ChildShowTypeAllBtn() {
      if(this.ChildShowTypeAll==1){
        this.Valuename = '金币'
        this.IDNAME = 'echart1'
        this.btnType = 1
      }else if(this.ChildShowTypeAll==2){
        this.Valuename = '人数'
        this.IDNAME = 'echart2'
        this.btnType = 1
      }else if(this.ChildShowTypeAll==3){
        this.Valuename = '次数'
        this.IDNAME = 'echart3'
        this.btnType = 1
      }
      this.getPartDataAll();
    },
    //子趋势图条件筛选1
    ChildTypeZBtn() {
      console.log("MiddleType",this.MiddleType);
      console.log("ChildTypeZ",this.ChildTypeZ);
      this.getPartData();
    },
    //子趋势图条件是筛选
    ChildShowTypeZBtn() {
      this.getPartData();
    },
    //表格筛选时间筛选
    changeEchartTimedetail(){
      this.tableData = [];
      this.getDetails();
    },
    //获取总趋势图数据
    getPartDataAll (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getChildEChartsData+"?Type="+that.PageName+"&StartTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1]+'&ChildShowType='+that.ChildShowTypeAll+'&id='+that.MiddleType,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        if(res.code==0){
          that.partData = res.data;
          console.log("趋势图数据",that.partData);
          var datelist = [];
          var dataValueList = [];
          that.partData.forEach((item,index)=>{
            var datestr = item.dateStr;
            var datestr1 = datestr.split("");
            datestr1.splice(4,0,"-");
            datestr1.splice(7,0,"-");
            datestr1 = datestr1.join("");
            dataValueList.push(item.value*1);
            datelist.push(datestr1);
          });
          console.log("datelist",datelist);
          console.log("dataValueList",dataValueList);
          that.showechart(dataValueList,datelist,that.Valuename,that.IDNAME,that.btnType);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取子趋势图数据
    getPartData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getAppGoldChildEChartData+"?Type="+that.PageName+"&startTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1]+'&ChildShowType='+that.ChildShowTypeZ+'&Childid='+that.ChildTypeZ,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        if(res.code==0){
          that.partData = res.data;
          console.log("趋势图数据",that.partData);
          var datelist = [];
          var dataValueList = [];
          that.partData.forEach((item,index)=>{
            var datestr = item.dateStr;
            var datestr1 = datestr.split("");
            datestr1.splice(4,0,"-");
            datestr1.splice(6,0,"");
            datestr1 = datestr1.join("");
            dataValueList.push(item.value*1);
            datelist.push(datestr1);
          });
          console.log("datelist",datelist);
          console.log("dataValueList",dataValueList);
          that.showechart(dataValueList,datelist,that.ValuenameZ,that.IDNAMEZ,that.btnType);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取表格详情数据
    getDetails (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getAppGoldChildDetail+"?Type="+that.PageName+"&startTime="+that.detailDefaultDate[0]+"&endtime="+that.detailDefaultDate[1]+'&ChildShowType='+that.ChildShowTypeBox+'&id='+that.MiddleType,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.tableDataHeader = res.data[0];
        for(var i=0;i<res.data.length;i++){
          var tablist;
          if(i !== 0){
            tablist = res.data[i];
          }
          that.tableData.push(tablist);
        }
         // if(that.tableData.length==0){
          //   that.tableData.push(tablist);
          // }else{
          //   that.tableData.splice(1,that.tableData.length-1,tablist);
          // }
        that.downloadDetailExcelUrl();
        console.log("表格数据",that.tableData);

      }).catch(function (err) {
        console.log(err);
      });
    },
    //表格筛选
    ChildShowTypeBoxBtn() {
      this.tableData = [];
      this.getDetails();
    },
    //获取表格导出
    downloadDetailExcelUrl(){
      this.downloadExcelUrl =  URL.recordUrl.getAppGoldChildDetailExport+"?startTime="+this.detailDefaultDate[0]+"&endtime="+this.detailDefaultDate[1]+'&Type='+this.PageName+'&ChildShowType='+this.ChildShowTypeBox+'&MiddleType='+this.MiddleType;
    },
    changeEchartTime() {
      console.log(this.echartDefaultDate);
      this.getPartDataAll()
    },
    //子趋势图时间筛选
    ZchangeEchartTime() {
      console.log(this.ZechartDefaultDate);
      this.getPartData();
    },
    //实现趋势图
    showechart(dataValueList,datelist,Valuename,idName,btnType){
      var myChart = echarts.init(document.getElementById(idName));
      //根据趋势图显示类型切换对数据中的值做处理以便于在坐标轴上显示(同时将最大值*2)
      //btnType1-数值类型 2-时分秒类型 3- 百分比类型
      var ValueArr = [];//数值类型
      var max;//存储最大值
      var min;//存储最小值
      var tooltip;
      var yaxisLabel;
      var that = this;
      if(btnType==2){
        dataValueList.forEach(function(data){
           ValueArr.push(data);
        })
        max = Math.round(Math.max.apply(null,ValueArr)*1.2);
        tooltip = {
          trigger: 'axis',
          //次数方法用来设置坐标上的值的格式
          formatter: function (params) {
            var $result = '00:00';
            if (params[0].value>0){
                var $hour = Math.floor(params[0].value/3600);
                var $minute = Math.floor(params[0].value%3600/60);
                var $second = Math.floor((params[0].value-60 * $minute) % 60);
                if ($hour < 10) {
                    $hour = '0'+$hour;
                }
                if($minute<10){
                    $minute = "0"+$minute;
                }
                if($second<10){
                    $second = "0"+$second;
                }
                $result = $hour+':'+$minute+':'+$second;
            }else{
              $result = "00"+':'+"00"+':'+"00";
            }
            var htmlStr = '';
            htmlStr += '<div><span style="color:#fff;">' + params[0].name + '</span><br/> ';
            for(var i=0;i<params.length;i++){
            //前面的原点和他的颜色
              htmlStr += '<span style="width: 8px;height: 8px;margin-right:5px;display:inline-block;border-radius: 50%;background-color:'+params[i].color+'"></span><span style="color:#fff;">' + params[i].seriesName + ':</span>'+
                '<span style="color:#fff;">' + $result + '</span><br/>';
            }
            htmlStr += '</div>';
            return  htmlStr
          },
        }
        yaxisLabel = {
          textStyle: {
            color: '#666',
          },
          formatter:function ($times) {
            var $result = '00:00';
              if ($times>0){
                  var $hour = Math.floor($times/3600);
                  var $minute = Math.floor($times%3600/60);
                  var $second = Math.floor(($times-60 * $minute) % 60);
                  if ($hour < 10) {
                      $hour = '0'+$hour;
                  }
                  if($minute<10){
                      $minute = "0"+$minute;
                  }
                  if($second<10){
                      $second = "0"+$second;
                  }
                  return $result = $hour+':'+$minute+':'+$second;
              }else{
                return $result = "00"+':'+"00"+':'+"00";
              }
            }
          }
      }else if(btnType==3){
        dataValueList.forEach(function(data){
          ValueArr.push(data);
        })
        max = Math.round(Math.max.apply(null,ValueArr)*1.2);
      }else if(btnType==1){
        //给dataValueList中最大值*1.2作为Y轴上的最大值
        dataValueList.forEach(function(data){
           ValueArr.push(data);
        })
        max = Math.round(Math.max.apply(null,ValueArr)*1.2);
        tooltip = {
          trigger: 'axis',
        }
        yaxisLabel = {
          textStyle: {
            color: '#666'
          }
        }
      }
      
      myChart.setOption({
        // title: {
        //     text: Valuename+'趋势图'
        // },
        tooltip: tooltip,
        legend: {
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: datelist,
            splitLine:{show: false},//去除网格线
            axisLine: {
              lineStyle: {
                type:'solid',
                color:'#E6E6E6',//左边线的颜色
                width:'2'//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color:'#666',//坐标值得具体的颜色

              }
            }
        },
        yAxis: {
            type: 'value',
            min: min,
            max: max,
            splitLine:{
              lineStyle: {
                type:'dashed',
              }
            },
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color:'#E6E6E6',
                  width:'2'
              }
            },
            axisLabel: yaxisLabel
        },
        series: [
            {
                name: Valuename,
                type: 'line',
                stack: '总量',
                smooth: true,
                itemStyle : {  
                  normal : {  
                    color:'#396FFF',  
                    lineStyle:{  
                      color:'#396FFF'  
                    }  
                  }  
                },  
                data: ValueArr
            },
        ]
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/appSiredData.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
 /deep/.el-range-editor.el-input__inner{
  width: 19%;
  height: 35px;
  padding: 0px 10px;
}
/deep/.el-radio-button__inner{
  padding: 10px 11px !important;
  font-size: 12px;
}
/deep/.spanBtn .el-tabs__nav-wrap::after{
  background-color: #fff;
}
.goldContent{
  display: flex;
  justify-content:space-between;
}
.goldWidth{
  width:900px;
}
.swiper-slide{
  width: auto!important;
}
/deep/.tooltip{
  border:none;
  padding:0;
}
.el-button:hover{
  background-color:#fff;
}
</style>
