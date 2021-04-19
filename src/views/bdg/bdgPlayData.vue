<template>
  <div class="appSurvey" v-loading="loading">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">播放数据</span>
          <span class="arget">
            <div class="argetTxt">
              <h3>指标：</h3>
              <p>播放时长：当天app的播放视频总时长</p>
              <p>播放量：当天app的视频总播放量</p>
              <p>播放视频数：当天app的视频播放个数</p>
              <p>观看视频人数：当天app的播放视频的总用户数</p>
              <p>播放完成度：当天app的视频播放时长与视频总时长比的平均值</p>
              <p>平均用户播放时长：当天app的播放视频总时长与播放视频的总用户数比</p>
              <p>平均用户播放量：当天app的视频总播放量与播放视频的总用户数比</p>
              <p>平均用户视频播放数：当天app的视频播放个数与播放视频的总用户数比</p>
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
      <div class="surveyContainer">
        <div class="surveyTop">
          <div class="surveyDataTop">
            <el-row :gutter="25">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple surveySort">播放时长</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveySort">播放量</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveySort">播放视频数</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveySort">观看视频人数</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveySort">播放完成度</div></el-col>
            </el-row>
          </div>
          <div class="surveyDataBottom">
            <el-row :gutter="25">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple surveyDataNum">{{playTime}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum">{{playNum}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum">{{playVideoCount}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum">{{watchNum}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum">{{complete}}</div></el-col>
            </el-row>
            <el-row :gutter="25" style="margin-top:20px;">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">平均</div></el-col>
              <el-col :span="5"><div class="grid-content bg-purple surveyDataNum" style="color:#808492 !important;font-size:15px;">{{playTimePre}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum" style="color:#808492 !important;font-size:15px;">{{playNumPre}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum" style="color:#808492 !important;font-size:15px;">{{playVideoCountPre}}</div></el-col>
            </el-row>
          </div>
        </div>
        <div class="surveyEchart">
          <div class="surveyEchartBox">
            <h2>总趋势</h2>
            <div class="surveyEchartlist">
              <el-date-picker
              v-model="echartDefaultDateAll"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              class="surveyTime"
              @change="changeEchartTimeAll()"
              >
            </el-date-picker>
              <el-radio-group v-model="tabPositionAll" style="margin-left:20px;" @change="changeEchartBtnAll()">
                <el-radio-button label="1">播放量</el-radio-button>
                <el-radio-button label="2">播放视频数</el-radio-button>
              </el-radio-group>
            </div>
            <div class="surveyEchartimg">
              <div :id=IDNAME style="height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="surveyEchart">
          <div class="surveyEchartBox">
            <h2>视频播放趋势</h2>
            <div class="surveyEchartlist">
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
              @change="changeEchartTime()"
              >
            </el-date-picker>
              <el-radio-group v-model="tabPosition1" style="margin-left:20px;" @change="changeEchartBtn1()">
                <!-- <el-radio-button label="1">15s</el-radio-button> -->
                <el-radio-button label="2">一半</el-radio-button>
                <el-radio-button label="3">全部</el-radio-button>
              </el-radio-group>
              <el-radio-group v-model="tabPosition2" style="margin-left:20px;" @change="changeEchartBtn2()">
                <el-radio-button label="1">数量</el-radio-button>
                <el-radio-button label="2">占比</el-radio-button>
              </el-radio-group>
            </div>
            <div class="surveyEchartimg">
              <div :id=idName  style="height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="appPlayData">
          <div class="appPlayDataLeft">
            <h3>热搜词点击量</h3>
            <el-table
              :data="hotsearchTop10"
              :header-cell-style="{background:'#E2E2EB',color:'#333'}"
              style="font-size: 10px;width: 100%">
              <el-table-column
                fixed
                prop="world"
                label="热搜标题"
                width="250">
              </el-table-column>
              <el-table-column
                prop="pv"
                label="点击次数"
                align="center">
              </el-table-column>
              <el-table-column
                prop="uv"
                label="点击人数"
                width=""
                align="center">
              </el-table-column>
            </el-table>
          </div>
          <div class="appPlayDataRight">
            <h3>用户观看top10</h3>
            <span class="skipBtn" @click="userSkipBtn()">></span>
            <el-table
              :data="userTop10"
              :header-cell-style="{background:'#E2E2EB',color:'#333'}"
              style="font-size: 10px;width: 100%">
              <el-table-column
                fixed
                prop="nickName"
                label="用户昵称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="userId"
                label="ID"
                align="center">
              </el-table-column>
              <el-table-column
                prop="watchCount"
                label="观看视频量"
                width="100"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="appPlayData">
          <div class="appPlayDataLeft">
            <h3>商品点击top10</h3>
            <span class="skipBtn" @click="shopClickBtn()">></span>
            <el-table
              :data="shopClickTop10"
              :header-cell-style="{background:'#E2E2EB',color:'#333'}"
              style="font-size: 10px;width: 100%">
              <el-table-column
                fixed
                prop="title"
                label="商品标题"
                width="280">
              </el-table-column>
              <el-table-column
                prop="videoId"
                label="视频id"
                align="center">
              </el-table-column>
              <el-table-column
                prop="playCount"
                label="点击次数"
                width="100"
                align="center">
              </el-table-column>
            </el-table>
          </div>
          <div class="appPlayDataRight">
            <h3>搜索词top20</h3>
            <span class="skipBtn" @click="searchHotBtn()">></span>
            <el-table
              :data="searchTop10"
              :header-cell-style="{background:'#E2E2EB',color:'#333'}"
              style="font-size: 10px;width: 100%">
              <el-table-column
                fixed
                prop="world"
                label="搜索词"
                width="280">
              </el-table-column>
              <el-table-column
                prop="pv"
                label="搜索次数"
                align="center">
              </el-table-column>
              <el-table-column
                prop="uv"
                label="搜索人数"
                width="100"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="surveyDetailBox">
          <h3>每日数据</h3>
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
            class="withdrawTime"
            @change="changedetailTime"
            >
          </el-date-picker>
          </div>
          <div class="DetailBoxBottom">
            <el-table
              :data="tableData"
              :header-cell-style="{background:'#E2E2EB',color:'#333'}"
              :row-style="{height:'10px'}"
              :cell-style="{padding:'10px'}"
              style="font-size: 10px;width: 100%">
              <el-table-column
                prop="dateStr"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="playTime"
                label="播放时长"
               >
              </el-table-column>
              <el-table-column
                prop="playNum"
                label="播放量"
               >
              </el-table-column>
              <el-table-column
                prop="playVideoCount"
                label="播放视频数"
               >
              </el-table-column>
              <el-table-column
                prop="watchNum"
                label="观看视频人数"
               >
              </el-table-column>
              <el-table-column
                prop="playTimePre"
                label="平均用户播放时长">
              </el-table-column>
              <el-table-column
                prop="playNumPre"
                label="平均用户播放量">
              </el-table-column>
              <el-table-column
                prop="playVideoCountPre"
                label="平均用户视频播放数">
              </el-table-column>
              <el-table-column
                prop="complete"
                label="视频播放完成度">
              </el-table-column>
            </el-table>
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
export default {
  name: 'appRetain',
  data () {
    return {
      title:'斑点狗播放数据',
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
      tableData: [],//表格详情数据
      playTime:'',//播放时长
      playNum:'',//播放量
      playVideoCount:'',//播放视频数
      watchNum:'',//观看视频人数
      complete:'',//播放完成度
      playVideoCountPre:'',//平均播放视频数
      playNumPre:'',//平均播放量
      playTimePre:'',//平均播放时长
      partData:'',//趋势图数据
      accountSelect: [{
        value: 0,
        label: '总用户'
      }, {
        value: 1,
        label: '注册用户'
      }],
      rightSelect: 0,//右上角选项类型值 0为总用户 1为注册用户
      loading: true,
      IDNAME:'echart1',//总趋势渲染区域id
      Valuename:'播放量',//总趋势图指标名字
      videoValuename:'一半',//视频播放趋势图指标名字（一半，全部）
      videoValuename1:'数量',//视频播放趋势图指标名字（数量，百分比）
      btnType:1,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
      echartDefaultDateAll:[],//总趋势时间筛选
      echartDefaultDate:[],//视频播放趋势时间筛选
      detailDefaultDate:[],//播放表格数据时间筛选
      tabPositionAll:1,//总趋势条件筛选
      tabPosition1:2,//视频播放趋势条件筛选
      tabPosition2:1,//视频播放趋势条件筛选
      idName:'echart1_1',//总趋势id
      userTop10:[],//用户top10
      videoTop10:[],//视频播放top10
      shopClickTop10:[],//商品点击top10
      searchTop10:[],//搜索词top10
      hotsearchTop10:[],//热词搜索top
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
    this.getAppRecentData();//获取APP概况数据
    this.getConfig();
  },
  methods: {
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
            label:'总览',
            value:0,
          };
          optionsi.unshift(obj)
          that.options = optionsi;
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取当前默认一周的时间并放入趋势图和详情表的日期
    bindDrawal(){
      this.echartDefaultDateAll.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.echartDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.detailDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.getPartData();
      this.getDetails();
      this.getPartDataBF();
      this.getAppUserPlayTop();
      // this.getAppVideoPlayTop();
      this.getbdgProdTop();
      this.getbdgWorldsTop();
      this.getbdgHotWorldsTop();
    },
    changeAllAccount(){
      console.log("zongyonghu",this.rightSelect);
      this.getPartData();
      this.getDetails();
      this.getPartDataBF();
      this.getAppUserPlayTop();
      // this.getAppVideoPlayTop();
      this.getbdgProdTop();
      this.getbdgWorldsTop();
      this.getbdgHotWorldsTop();
      this.getAppRecentData();//获取APP概况数据
      this.loading = true;
      var rightSelectName;
      if(this.rightSelect==0){
        rightSelectName = '总用户';
      }else if(this.rightSelect==1){
        rightSelectName = '注册用户';
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] = rightSelectName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'用户分类切换',detailList);
    },
    //总趋势图时间选择
    changeEchartTimeAll() {
      this.getPartData();
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.echartDefaultDateAll[0];
      detailArr[1] = this.echartDefaultDateAll[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'总趋势图时间选择',detailList);
    },
    //视频播放趋势图时间选择
    changeEchartTime() {
      this.getPartDataBF();
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.echartDefaultDate[0];
      detailArr[1] = this.echartDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'视频播放趋势图时间选择',detailList);

    },
    //每日数据表格详情时间筛选
    changedetailTime() {
      console.log("账号分类",this.rightSelect);
      console.log("时间",this.detailDefaultDate[0],this.detailDefaultDate[1])
      this.getDetails();

      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.detailDefaultDate[0];
      detailArr[1] = this.detailDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'表格数据时间选择',detailList);
    },
    //用户top10跳转
    userSkipBtn() {
      this.$router.push({ name: 'bdguserSkipTop10', params: {rightSelect:this.rightSelect} });
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.rightSelect;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'用户观看top10跳转',detailList);
    },
    //视频top10跳转
    videoSkipBtn() {
      this.$router.push({ name: 'bdgvideoSkipTop10', params: {rightSelect:this.rightSelect} });
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.rightSelect;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'视频播放top10跳转',detailList);
    },
     //商品点击top10跳转
    shopClickBtn() {
      this.$router.push({ name: 'bdgshopClickTop10', params: {rightSelect:this.rightSelect} });
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.rightSelect;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'商品点击top10跳转',detailList);
    },
     //搜索词top10跳转
    searchHotBtn() {
      this.$router.push({ name: 'bdgsearchHotTop10', params: {rightSelect:this.rightSelect} });
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.rightSelect;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'搜索词top20跳转',detailList);
    },
    //获取昨日今日概况数据
    getAppRecentData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdgplaygeneraldata+"?SourceType="+that.rightSelect,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.playTime = res.data.playTime;
        that.playNum = res.data.playNum;
        that.playVideoCount = res.data.playVideoCount;
        that.watchNum = res.data.watchNum;
        that.complete = res.data.complete;
        that.playVideoCountPre = res.data.playVideoCountPre;//平均播放视频数
        that.playNumPre = res.data.playNumPre;//平均播放量
        that.playTimePre = res.data.playTimePre;//平均播放时长
      }).catch(function (err) {
        console.log(err);
      });
    },
    changeEchartBtnAll() {
      console.log("tabPositionAll",this.tabPositionAll);
      if(this.tabPositionAll==1){
        this.Valuename = '播放量'
        this.IDNAME = 'echart1'
        this.btnType = 1
      }else if(this.tabPositionAll==2){
        this.Valuename = '播放视频数'
        this.IDNAME = 'echart2'
        this.btnType = 1
      }
      this.getPartData();
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.Valuename;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'总趋势图状态选择',detailList);
    },
    changeEchartBtn1() {
      console.log("tabPosition1",this.tabPosition1);
      // if(this.tabPosition1==1){
      //   this.Valuename = '15s'
      //   this.idName = 'echart1_1'
      //   if(this.tabPosition2==2){
      //     this.btnType = 3
      //   }else{
      //     this.btnType = 1
      //   }
      // }else 
      if(this.tabPosition1==2){
        this.videoValuename = '一半'
        this.idName = 'echart1_2'
        if(this.tabPosition2==2){
          this.btnType = 3
        }else{
          this.btnType = 1
        }
      }else if(this.tabPosition1==3){
        this.videoValuename = '全部'
        this.idName = 'echart1_3'
        if(this.tabPosition2==2){
          this.btnType = 3
        }else{
          this.btnType = 1
        }
        
      }
      this.getPartDataBF();
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.videoValuename;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'视频播放趋势图一半和全部选择',detailList);
    },
    changeEchartBtn2() {
      console.log("tabPosition2",this.tabPosition2);
      if(this.tabPosition2==1){
        this.videoValuename1 = '数量'
        this.idName = 'echart2_1'
        this.btnType = 1
      }else if(this.tabPosition2==2){
        this.videoValuename1 = '占比'
        this.idName = 'echart2_2'
        this.btnType = 3
      }
      this.getPartDataBF();
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.videoValuename1;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'视频播放趋势图数量和占比选择',detailList);
    },
    //获取总趋势图数据
    getPartData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdgvideocount+"?VideoPlayType="+that.tabPositionAll+'&starttime='+that.echartDefaultDateAll[0]+'&endtime='+that.echartDefaultDateAll[1]+'&SourceType='+that.rightSelect,
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
          that.showechart(dataValueList,datelist,that.Valuename,'',that.IDNAME,that.btnType);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取播放视频趋势图
    getPartDataBF (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdgvideoplaytrend+"?VideoPlayBehavior="+that.tabPosition1+'&starttime='+that.echartDefaultDate[0]+'&endtime='+that.echartDefaultDate[1]+'&SourceType='+that.rightSelect+'&VideoPlayBehaviorType='+that.tabPosition2,
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
          that.showechart(dataValueList,datelist,that.videoValuename,that.videoValuename1,that.idName,that.btnType);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //用户观看top10
    getAppUserPlayTop() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdguserplaytop+"?SourceType="+this.rightSelect+'&TopCount=10',
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.userTop10 = res.data;
      }).catch(function (err) {
        console.log(err);
      });
    },
    //视频播放top10
    getAppVideoPlayTop() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdgvideoplaytop+"?SourceType="+this.rightSelect+'&TopCount=10',
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.videoTop10 = res.data;
      }).catch(function (err) {
        console.log(err);
      });
    },
    //商品点击top10
    getbdgProdTop() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdgProdTop+"?SourceType="+this.rightSelect+'&TopCount=10',
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.shopClickTop10 = res.data;
      }).catch(function (err) {
        console.log(err);
      });
    },
    //搜索词top20
    getbdgWorldsTop() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdgWorldsTop+"?SourceType="+this.rightSelect+'&TopCount=10',
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.searchTop10 = res.data;
      }).catch(function (err) {
        console.log(err);
      });
    },
    //运营设置的热搜词点击量
    getbdgHotWorldsTop() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdgHotWorldsTop+"?SourceType="+this.rightSelect+'&TopCount=10',
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.hotsearchTop10 = res.data;
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
        url:URL.recordUrl.getbdgplaydetails+"?SourceType="+that.rightSelect+"&starttime="+that.detailDefaultDate[0]+"&endtime="+that.detailDefaultDate[1],
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.tableData = res.data;
        console.log("表格数据",that.tableData);

      }).catch(function (err) {
        console.log(err);
      });
    },
    //实现趋势图
    showechart(dataValueList,datelist,Valuename,videoValuename,idName,btnType){
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
        tooltip = {
          trigger: 'axis',
          //次数方法用来设置坐标上的值的格式
          formatter: function (params) {
                var htmlStr = '';
                htmlStr += '<div><span style="color:#fff;">' + params[0].name + '</span><br/> ';
                for(var i=0;i<params.length;i++){
                //前面的原点和他的颜色
                  htmlStr += '<span style="width: 8px;height: 8px;margin-right:5px;display:inline-block;border-radius: 50%;background-color:'+params[i].color+'"></span><span style="color:#fff;">' + params[i].seriesName + ':</span>'+
                    '<span style="color:#fff;">' + params[i].value + '&nbsp;%</span><br/>';
                }
                htmlStr += '</div>';
                return  htmlStr
              },
            
        }
        yaxisLabel = {
          textStyle: {
            color: '#666',
          },
          formatter: val=>{
            return val+"%"
          }
        }
      }else{
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
          },
          formatter: val=>{
            return val
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
                name: Valuename+videoValuename,
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
      },true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/appPlayData.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
  /deep/.el-radio-button__inner{
   padding:9px 15px !important;
 }
  /deep/.el-range-editor.el-input__inner{
  width: 25%;
  height: 35px;
  padding: 0px 10px;
}
</style>
