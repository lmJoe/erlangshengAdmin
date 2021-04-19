<template>
  <div class="appWithdraw" v-loading="loading">
    <div class="appWithdrawContainer">
      <div class="widthdrawheadContainer">
        <div class="pagetarge">
          <span class="">提现审核</span>
        </div>
        <div class="rightSelect">
          <el-select v-model="rightName" placeholder="请选择" @change="changeRight">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="withdrawContainer">
        <div class="withdrawTop">
          <div class="withdrawDataTop">
            <el-row :gutter="20">
              <el-col :span="1.5"><div class="grid-content bg-purple withdrawDatatitle">昨日</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple withdrawSort">提现总金额</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple withdrawSort">提现总笔数</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple withdrawSort">通过总金额</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple withdrawSort">通过总订单数</div></el-col>
            </el-row>
          </div>
          <div class="withdrawDataBottom">
            <el-row :gutter="20">
              <el-col :span="1.5"><div class="grid-content bg-purple withdrawDatatitle">昨日</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple withdrawDataNum">{{totalMoney}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple withdrawDataNum">{{totalOrders}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple withdrawDataNum">{{passTotalMoney}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple withdrawDataNum">{{passTotalOrders}}</div></el-col>
            </el-row>
          </div>
        </div>
        <div class="withdrawEchart">
          <div class="withdrawDate">
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
              class="withdrawTime"
              @change="changeEchartTime"
              >
            </el-date-picker>
            <el-radio-group v-model="activeName" @change="changeEchartBtn" class="targetType">
              <el-radio-button label="1">金额</el-radio-button>
              <el-radio-button label="2">订单数</el-radio-button>
            </el-radio-group>
          </div>
          <div class="withdrawEchartBox">
            <div class="withdrawEchartlist">
              状态：
              <el-radio-group v-model="ScreenStaus" @change="changeScreenStaus" class="withdrawScreenStaus">
                <el-radio-button label="-99">全部</el-radio-button>
                <el-radio-button label="1,3">通过</el-radio-button>
                <el-radio-button label="2,-2">拒绝</el-radio-button>
                <el-radio-button label="0">审核中</el-radio-button>
                <el-radio-button label="4,-1">打款失败</el-radio-button>
              </el-radio-group>
              金额：
              <el-radio-group v-model="ScreenGold" @change="changeScreenGold" class="withdrawScreenGold">
                <el-radio-button label="-99">全部</el-radio-button>
                <el-radio-button label="0.36">0.36元</el-radio-button>
                <el-radio-button label="1">1元</el-radio-button>
                <el-radio-button label="5">5元</el-radio-button>
                <el-radio-button label="10">10元</el-radio-button>
                <el-radio-button label="50">50元</el-radio-button>
                <el-radio-button label="100">100元</el-radio-button>
              </el-radio-group>
            </div>
            <div class="withdrawEchartimg">
              <div :id=IDNAME style="height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="withdrawpieChart">
          <div class="withdrawpieTop">
           <el-date-picker
              v-model="pieDefaultDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              class="withdrawTime"
              @change="changePieTime"
              >
            </el-date-picker>
            <el-radio-group v-model="pieActiveName" @change="changePiechartBtn" class="pietargetType">
              <el-radio-button label="1">金额</el-radio-button>
              <el-radio-button label="2">订单数</el-radio-button>
            </el-radio-group>
          </div>
          <div class="withdrawpieBottom">
            <div :id=pieIDNAME style="width:50%;height:500px;"></div>
            <div :id=pieIDNAMEstatus style="width:50%;height:500px;"></div>
          </div>
        </div>
        <div class="withdrawDetailBox">
          <div class="withdrawBoxTop">
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
            <div class="detailBoxStatus">订单状态：
              <el-select v-model="orderDetail" placeholder="全部" @change="changedetailBoxStatus()">
                <el-option
                  v-for="item in orderDetailShowSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </div>
            <div class="detailBoxShowStatus">显示类型：
              <el-select v-model="orderDetailShow" placeholder="订单金额" @change="changedetailBoxShow()">
                <el-option
                  v-for="item in orderDetailStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="DetailBoxBottom">
            <el-table
              :data="tableData"
              :header-cell-style="{background:'#E2E2EB',color:'#333'}"
              :row-style="{height:'30px'}"
              :cell-style="{padding:'10px'}"
              style="font-size: 10px;width: 100%">
              <el-table-column
                prop="dateStr"
                label="日期"
                align="center">
              </el-table-column>
              <el-table-column
                prop="sumCount"
                label="汇总"
                align="center"
               >
              </el-table-column>
              <el-table-column
                prop="littleMoney"
                label="0.36元"
                align="center"
               >
              </el-table-column>
              <el-table-column
                prop="oneMoney"
                label="1元"
                align="center"
               >
              </el-table-column>
              <el-table-column
                prop="fiveMoney"
                label="5元"
                align="center"
               >
              </el-table-column>
              <el-table-column
                prop="tenMoney"
                label="10元"
                align="center">
              </el-table-column>
              <el-table-column
                prop="fiftyMoney"
                label="50元"
                align="center">
              </el-table-column>
              <el-table-column
                prop="oneHundredMoney"
                label="100元"
                align="center">
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
  name: 'appSurvey',
  data () {
    return {
      title:'APP提现审核',
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
      pieDefaultDate:[],//饼状图时间筛选
      echartDefaultDate: [],//趋势图查询时间，可指定默认显示时间
      detailBoxDate: [],//表格查询时间，可指定默认显示时间
      tableData: [],//表格详情数据
      totalMoney:'',//提现总金额
      totalOrders:'',//提现总笔数
      passTotalOrders:'',//通过总订单数
      passTotalMoney:'',//通过总金额
      partData:'',//趋势图数据
      options: [],
      rightName: 0,//右上角选项类型值 0-全部 1-爆米花andriod 2-趣看
      loading: true,
      activeName: 1,//趋势图金额 订单切换按钮值  1-金额 2-订单
      ScreenGold:-99,//提现审核趋势图金额条件切换 -99全部 0.36-0.36元 1-1元 5-5元 10-10元 50-50元 100-100元
      ScreenStaus:-99,//提现审核趋势图状态条件切换 -99全部 1,3-通过 2,-2-拒绝 0-审核中  4,-1-打款失败
      IDNAME:'echart1',//趋势渲染区域id
      Valuename:'全部',//趋势图指标名字
      btnType:1,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
      TargetType:1,//表格筛选订单类型 1-金额  2-订单
      status:-99,//表格筛选订单状态 2-封禁不可恢复 -1 - 异常 0-申请中 1-运营审核通过 2-运营审核未通过 3-到账 4-回退 -99 -全部
      pieActiveName:1,//饼状图选项筛选 1-金额  2-订单
      pieValueName:'提现额度金额',//饼状图金额指标名字
      pieValueNamestatus:'提现状态金额',//饼状图金额指标名字
      pieIDNAME:'echart1_1',//饼状图金额渲染区域id
      pieIDNAMEstatus:'echart1_2',//饼状图状态渲染区域id
      orderDetail:-99,//表格详情订单状态查询条件
      orderDetailShow:1,//表格详情显示类型查询条件
      orderDetailShowSelect:[{
        value: -99,
        label: '全部'
      },{
        value: "1,3",
        label: '通过'
      }, {
        value: "2,-2",
        label: '拒绝'
      }, {
        value: 0,
        label: '审核中'
      }, {
        value: "4,-1",
        label: '打款失败'
      }],//表格详情显示类型选项内容
      orderDetailStatus:[{
        value: 1,
        label: '订单金额'
      },{
        value: 2,
        label: '订单笔数'
      }],//表格详情订单状态选项内容
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
          var optionsi2;
          for(var i=0;i<optionsi.length;i++){
            if(optionsi[i].label=="摸鱼"){
              optionsi[i].value=4;
            }else if(optionsi[i].label=="快看"){
              optionsi[i].value=5;
            }else if(optionsi[i].label=="抖影"){
              optionsi[i].value=3;
            }
          }
          // optionsi2 = optionsi;
          // for(var i=0;i<optionsi2.length;i++){
          //   if(optionsi2[i].label=="抖影"){
          //     optionsi[i].value=3;
          //   }
          // }
          var obj = {
            label:'全部',
            value:0,
          };
          // optionsi2= optionsi2.filter((x) => x.label !== '快看');
          optionsi.unshift(obj)
          that.options = optionsi;
          console.log("11",that.options);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取当前默认一周的时间并放入趋势图和详情表的日期
    bindDrawal(){
      this.detailBoxDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.echartDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.pieDefaultDate.push(this.common.formatDate(-1),this.common.formatDate(-1))
      this.getPartData();
      this.getDetails();
      this.pieMoneyChart();
      this.pieStatusChart();
      
    },
    //获取昨日今日概况数据
    getAppRecentData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getWithdrawGeneral+"?type="+this.rightName,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.totalMoney = res.data.totalMoney;
        that.totalOrders = res.data.totalOrders;
        that.passTotalOrders = res.data.passTotalOrders;
        that.passTotalMoney = res.data.passTotalMoney;
      }).catch(function (err) {
        console.log(err);
      });
    },
    changeEchartBtn() {
      console.log("activeName",this.activeName);
      if(this.activeName==1){
        this.Valuename = '金额'
        this.IDNAME = 'echart1'
        this.btnType = 1
      }else if(this.activeName==2){
        this.Valuename = '订单数'
        this.IDNAME = 'echart2'
        this.btnType = 1
      }
      this.getPartData();

      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.Valuename;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'趋势图金额订单数切换',detailList);
    },
    changeScreenStaus() {
      console.log("activeName",this.ScreenStaus);
      if(this.ScreenStaus == -99){
        this.IDNAME = 'echart3'
        this.btnType = 1
      }else if(this.activeName==1||this.activeName==3){
        this.IDNAME = 'echart4'
        this.btnType = 1
      }else if(this.activeName==2||this.activeName==-2){
        this.IDNAME = 'echart5'
        this.btnType = 1
      }else if(this.activeName==0){
        this.IDNAME = 'echart6'
        this.btnType = 1
      }else if(this.activeName==4||this.activeName==-1){
        this.IDNAME = 'echart7'
        this.btnType = 1
      }
      this.getPartData();
      var valueBtnName;
      if(this.ScreenStaus=='-99'){
        valueBtnName = '全部';
      }else if(this.ScreenStaus=="1,3"){
        valueBtnName = '通过';
      }else if(this.ScreenStaus=="2,-2"){
        valueBtnName = '拒绝';
      }else if(this.ScreenStaus=="0"){
        valueBtnName = '审核中';
      }else if(this.ScreenStaus=="4,-1"){
        valueBtnName = '打款失败';
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] = valueBtnName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'趋势图状态切换',detailList);
    },
    changeScreenGold() {
      console.log("activeName",this.ScreenGold);
      if(this.ScreenGold== 0.36){
        this.IDNAME = 'echart9'
        this.btnType = 1
      }else if(this.activeName==1){
        this.IDNAME = 'echart10'
        this.btnType = 1
      }else if(this.activeName==5){
        this.IDNAME = 'echart11'
        this.btnType = 1
      }else if(this.activeName==10){
        this.IDNAME = 'echart12'
        this.btnType = 1
      }else if(this.activeName==50){
        this.IDNAME = 'echart13'
        this.btnType = 1
      }else if(this.activeName==100){
        this.IDNAME = 'echart14'
        this.btnType = 1
      }
      this.getPartData();

      var valueBtnName;
      if(this.ScreenGold=='-99'){
        valueBtnName = '全部';
      }else if(this.ScreenGold=="0.36"){
        valueBtnName = '0.36元';
      }else if(this.ScreenGold=="1"){
        valueBtnName = '1元';
      }else if(this.ScreenGold=="5"){
        valueBtnName = '5元';
      }else if(this.ScreenGold=="10"){
        valueBtnName = '10元';
      }else if(this.ScreenGold=="50"){
        valueBtnName = '50元';
      }else if(this.ScreenGold=="100"){
        valueBtnName = '100元';
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] = valueBtnName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'趋势图金额切换',detailList);
    },
    //获取趋势图数据
    getPartData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getWithdrawPartData+"?type="+that.rightName+"&TargetType="+that.activeName+"&startTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1]+"&Status="+that.ScreenStaus+"&MoneyType="+that.ScreenGold,
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
    //获取表格详情数据
    getDetails (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getWithdrawDetailsData+"?Type="+that.rightName+"&startTime="+that.detailBoxDate[0]+"&endtime="+that.detailBoxDate[1]+"&page=1&rows=20&status="+that.orderDetail+"&TargetType="+that.orderDetailShow,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.tableData = res.data.data;
        console.log("表格数据",that.tableData);

      }).catch(function (err) {
        console.log(err);
      });
    },
    changeBoxTime (){
      console.log(this.detailBoxDate);
      this.getDetails()
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.detailBoxDate[0];
      detailArr[1] = this.detailBoxDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'表格数据时间选择',detailList);
    },
    changeEchartTime() {
      console.log(this.echartDefaultDate);
      this.getPartData()

      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.echartDefaultDate[0];
      detailArr[1] = this.echartDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'趋势图时间选择',detailList);
    },
    changePiechartBtn (){
      console.log("饼状图条件",this.pieActiveName)
      if(this.pieActiveName==1){
        this.pieValueName='提现额度金额';//饼状图金额指标名字
        this.pieValueNamestatus='提现状态金额';//饼状图金额指标名字
      }else if(this.pieActiveName==2){
        this.pieValueName='提现额度订单';//饼状图金额指标名字
        this.pieValueNamestatus='提现状态订单';//饼状图金额指标名字
      }
      this.pieMoneyChart();
      this.pieStatusChart();
      var pieStateName;
      if(this.pieActiveName==1){
        pieStateName='金额';
      }else if(this.pieActiveName==2){
        pieStateName='订单数';
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] = pieStateName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'圆柱图状态切换',detailList);
    },
    pieStatusChart() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getWithdrawStatusData+"?type="+that.rightName+"&TargetType="+that.pieActiveName+"&startTime="+that.pieDefaultDate[0]+"&endtime="+that.pieDefaultDate[1],
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        var date = res.data;
        var datelist = [];
        date.forEach((item,index)=>{
          var datestr = item.name;
          var newtime = item.value*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist.push(json);
        }) 
        that.showpieCharet(datelist,that.pieValueNamestatus,that.pieIDNAMEstatus)
      }).catch(function (err) {
        console.log(err);
      });
    },
    pieMoneyChart() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getWithdrawMoneyData+"?type="+that.rightName+"&TargetType="+that.pieActiveName+"&startTime="+that.pieDefaultDate[0]+"&endtime="+that.pieDefaultDate[1],
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        if(res.code==0){
          var data = res.data;
          var datelist = [];
          var dataValueList = [];
          data.forEach((item,index)=>{
            var datestr = item.name;
            var newtime = item.value*1;
            let json={};
            json.name = datestr;
            json.value = newtime;
            datelist.push(json);
          }) 
          that.showpieCharet(datelist,that.pieValueName,that.pieIDNAME)
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    changePieTime() {
      console.log(this.pieDefaultDate);
      this.pieMoneyChart();
      this.pieStatusChart();
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.pieDefaultDate[0];
      detailArr[1] = this.pieDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'圆柱体时间选择',detailList);
    },
    changeRight() {
      console.log("value",this.rightName);
      this.getDetails();
      this.getAppRecentData();
      this.getPartData();
      this.pieMoneyChart();
      this.pieStatusChart();
      this.loading = true;
      var rightChoseName;
      if(this.rightName==1){
        rightChoseName = '爆米花';
      }else if(this.rightName==2){
        rightChoseName = '趣看';
      }else if(this.rightName==0){
        rightChoseName = '全部';
      }else if(this.rightName==4){
        rightChoseName = '摸鱼';
      }else if(this.rightName==5){
        rightChoseName = '快看';
      }else if(this.rightName==3){
        rightChoseName = '抖影';
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] = rightChoseName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'渠道分类切换',detailList);
    },
    changedetailBoxShow(){
      console.log("显示类型",this.orderDetailShow);
      this.getDetails();
      var stateName;
      if(this.orderDetailShow=="1"){
        stateName="订单金额";
      }else if(this.orderDetailShow=="2"){
        stateName="订单笔数";
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] = stateName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'表格数据订单状态切换',detailList);
    },
    changedetailBoxStatus(){
      console.log("订单状态",this.orderDetail);
      this.getDetails();
      var stateName;
      if(this.orderDetail=="-99"){
        stateName="全部";
      }else if(this.orderDetail=="1,3"){
        stateName="通过";
      }else if(this.orderDetail=="2,-2"){
        stateName="拒绝";
      }else if(this.orderDetail=="0"){
        stateName="审核中";
      }else if(this.orderDetail=="4,-1"){
        stateName="打款失败";
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] = stateName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'表格数据订单状态切换',detailList);
    },
    showpieCharet (datelist,pieValueName,pieIDNAME){
      var myChart = echarts.init(document.getElementById(pieIDNAME));
      var option;
      option = {
          title: {
            text: pieValueName+'分布',
             left:'center'
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)',
              transitionDuration:0,//防止tooltip的抖动
          },
          legend: {
              orient: 'vertical',
              left: 10,
              data: []
          },
          series: [
              {
                  name: pieValueName,
                  type: 'pie',
                  selectedMode: 'single',
                  radius: [0, '30%'],

                  label: {
                      position: 'inner'
                  },
                  labelLine: {
                      show: false
                  },
              },
              {
                  name: pieValueName,
                  type: 'pie',
                  radius: ['40%', '55%'],
                  label: {
                      // formatter: '{a} <br/>{b} : {c} ({d}%) ',
                      formatter: '{b}({d}%) ',
                      // formatter: '{a} <br/>{b} : {c} ({d}%) ',
                      // backgroundColor: '#eee',
                      // borderColor: '#aaa',
                      // borderWidth: 1,
                      // borderRadius: 4,
                      rich: {
                          a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                          },
                          hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                          },
                          b: {
                              fontSize: 15,
                              lineHeight: 20
                          },
                          per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                          }
                      }
                  },
                  data:datelist,
              }
          ]
      };
      myChart.setOption(option);
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
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/appWithdraw.less';
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
