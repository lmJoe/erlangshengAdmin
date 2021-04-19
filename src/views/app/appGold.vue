<template>
  <div class="appGold" v-loading="loading">
    <div class="appGoldContainer">
      <div class="appgoldheadContainer">
        <div class="appgoldpagetarge">
          <span class="">金币支出</span>
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
      <div class="appgoldContainer">
        <div class="appgoldTop">
          <div class="appgoldDataTop">
            <el-row :gutter="20">
              <el-col :span="1.5"><div class="grid-content bg-purple appgoldDatatitle">昨日</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple appgoldSort">金币总支出</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple appgoldSort">裂变成本</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple appgoldSort">保活成本</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple appgoldSort">人均裂变成本</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple appgoldSort">人均保活成本</div></el-col>
            </el-row>
          </div>
          <div class="appgoldDataBottom">
            <el-row :gutter="20">
              <el-col :span="1.5"><div class="grid-content bg-purple appgoldDatatitle">昨日</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple appgoldDataNum">{{total}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple appgoldDataNum">{{split}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple appgoldDataNum">{{live}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple appgoldDataNum">{{splitPre}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple appgoldDataNum">{{livePre}}</div></el-col>
            </el-row>
          </div>
        </div>
        <div class="appgoldEchart">
          <div class="appgoldDate">
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
            <el-radio-group v-model="activeName" @change="changeEchartBtn()" class="appgoldtargetType">
              <el-radio-button label="1">金币总支出</el-radio-button>
              <el-radio-button label="2">裂变成本</el-radio-button>
              <el-radio-button label="3">保活成本</el-radio-button>
              <el-radio-button label="4">人均裂变成本</el-radio-button>
              <el-radio-button label="5">人均保活成本</el-radio-button>
            </el-radio-group>
          </div>
          <div class="appgoldEchartBox">
            <div class="appgoldEchartimg">
              <div :id=IDNAME style="height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="appgoldpieChart">
          <div class="appgoldpieTop">
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
          </div>
          <div class="appgoldpieBottom">
            <div :id=pieIDNAME style="width:40%;height:400px;"></div>
            <div :id=pieIDNAMEfission style="width:40%;height:400px;"></div>
            <div :id=pieIDNAMEkeeping style="width:40%;height:400px;"></div>
          </div>
        </div>
        <div class="appgoldDetailBox">
          <div class="appgoldBoxTop">
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
            <el-radio-group v-model="goldDetails" @change="changeGoldDetails()" class="goldDetails">
              <el-radio-button label="1">金币</el-radio-button>
              <el-radio-button label="2">人数</el-radio-button>
              <el-radio-button label="3">次数</el-radio-button>
            </el-radio-group>
            <el-row class="download">
              <el-button type="primary"><a :href=downloadHref>下载</a></el-button>
            </el-row>
          </div>
          <div class="appgoldDetailBoxBottom">
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
export default {
  name: 'appSurvey',
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
      pieDefaultDate:[],//饼状图时间筛选
      echartDefaultDate: [],//趋势图查询时间，可指定默认显示时间
      detailBoxDate: [],//表格查询时间，可指定默认显示时间
      tableData: [],//表格详情数据
      tableDataHeader: [],//表格详情头部数据
      total:'',//金币总支出
      split:'',//裂变成本
      live:'',//保活成本
      splitPre:'',//人均裂变成本
      livePre:'',//人均保活成本
      options: [],
      rightName: 0,//右上角选项类型值 0-全部 1-爆米花andriod 2-趣看
      loading: true,
      activeName: 1,//趋势图金额 订单切换按钮值  1-金币总支出 2-裂变成本 3-保活成本 4-人均裂变成本 5-人均保活成本
      IDNAME:'echart1',//趋势渲染区域id
      Valuename:'全部',//趋势图指标名字
      btnType:1,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
      TargetType:1,//表格筛选订单类型 1-金额  2-订单
      status:-99,//表格筛选订单状态 2-封禁不可恢复 -1 - 异常 0-申请中 1-运营审核通过 2-运营审核未通过 3-到账 4-回退 -99 -全部
      pieValueName:'',//饼状图金额指标名字
      pieIDNAME:'echart1_1',//饼状图金额总支出渲染区域id
      pieIDNAMEfission:'echart1_2',//饼状图裂变渲染区域id
      pieIDNAMEkeeping:'echart1_3',//饼状图保活渲染区域id
      goldDetails:1,//表格数据筛选条件
      downloadHref:'',//表格数据导出
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
          //     optionsi2.splice(i,1)
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
      this.pieDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.getPartData();
      this.pieCircularChart("金币总支出分布",this.pieIDNAME,1);//饼状图金币总支出
      this.pieCircularChart("裂变成本构成图",this.pieIDNAMEfission,2);//饼状图裂变成本构成
      this.pieCircularChart("保活成本构成图",this.pieIDNAMEkeeping,3);//饼状图保活成本构成
      this.getDetails();
    },
    //获取昨日今日概况数据
    getAppRecentData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getGoldGeneralData+"?type="+this.rightName,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.total = res.data.total;
        that.split = res.data.split;
        that.live = res.data.live;
        that.splitPre = res.data.splitPre;
        that.livePre = res.data.livePre;
      }).catch(function (err) {
        console.log(err);
      });
    },
    changeEchartBtn() {
      console.log("activeName",this.activeName);
      if(this.activeName==1){
        this.Valuename = '金币总支出'
        this.IDNAME = 'echart1'
        this.btnType = 1
      }else if(this.activeName==2){
        this.Valuename = '裂变成本'
        this.IDNAME = 'echart2'
        this.btnType = 1
      }else if(this.activeName==3){
        this.Valuename = '保活成本'
        this.IDNAME = 'echart3'
        this.btnType = 1
      }else if(this.activeName==4){
        this.Valuename = '人均裂变成本'
        this.IDNAME = 'echart4'
        this.btnType = 1
      }else if(this.activeName==5){
        this.Valuename = '人均保活成本'
        this.IDNAME = 'echart5'
        this.btnType = 1
      }
      this.getPartData();

      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.Valuename;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'趋势图数据状态选择',detailList);
    },
    changeGoldDetails() {
      this.tableData = [];
      console.log("goldDetails",this.goldDetails);
      this.getDetails();
      var goldName;
      if(this.goldDetails==1){
        goldName="金币";
      }else if(this.goldDetails==2){
        goldName="人数";
      }else if(this.goldDetails==3){
        goldName="次数";
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] = goldName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'表格数据状态选择',detailList);
    },
    //获取趋势图数据
    getPartData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getGoldEChartsData+"?type="+that.rightName+"&ItemType="+that.activeName+"&startTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1],
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
            dataValueList.push(item.value*1);
            datelist.push(datestr);
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
        url:URL.recordUrl.getGoldDetails+"?Type="+that.rightName+"&startTime="+that.detailBoxDate[0]+"&endtime="+that.detailBoxDate[1]+"&ShowType="+that.goldDetails,
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
        console.log("表格数据",that.tableData);
        //表格数据导出链接
        that.downloadHref = URL.recordUrl.getGoldPartDataExport+"?Type="+that.rightName+"&startTime="+that.detailBoxDate[0]+"&endtime="+that.detailBoxDate[1]+"&ShowType="+that.goldDetails;

      }).catch(function (err) {
        console.log(err);
      });
    },
    changeBoxTime (){
      console.log(this.detailBoxDate);
      this.tableData = [];
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
    //金币饼状图 CircularType 1-金币总支出图 2-裂变成本构成图 3-保活成本构成图
    pieCircularChart(pieValueName,pieIDNAMEstatus,typeNum) {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getGoldPartData+"?type="+that.rightName+"&CircularType="+typeNum+"&startTime="+that.pieDefaultDate[0]+"&endtime="+that.pieDefaultDate[1],
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
          var datestr = item.label;
          var newtime = item.value*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist.push(json);
        }) 
        that.showpieCharet(datelist,pieValueName,pieIDNAMEstatus)
      }).catch(function (err) {
        console.log(err);
      });
    },
    changePieTime() {
      console.log(this.pieDefaultDate);
      this.pieCircularChart("金币总支出分布",this.pieIDNAME,1);//饼状图金币总支出
      this.pieCircularChart("裂变成本构成图",this.pieIDNAMEfission,2);//饼状图裂变成本构成
      this.pieCircularChart("保活成本构成图",this.pieIDNAMEkeeping,3);//饼状图保活成本构成
      detailArr[0] = this.pieDefaultDate[0];
      detailArr[1] = this.pieDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'饼状图时间选择',detailList);
    },
    changeRight() {
      console.log("value",this.rightName);
      this.tableData = [];
      this.getDetails();
      this.getAppRecentData();
      this.getPartData();
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
    showpieCharet (datelist,pieValueName,pieIDNAME){
      var that = this;
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
                      show: true 
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
                          // hr: {
                          //     borderColor: '#aaa',
                          //     width: '50%',
                          //     borderWidth: 0.5,
                          //     height: 0
                          // },
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
      myChart.on('click', function(params) {
        var data = params;
        console.log("params",params);//
        //其他种类不可跳转
        // paramsn.name 和Name为跳转传参
        var name = params.name;
        if(name=='日常任务'||name=="观看视频"||name=="第三方任务"||name=="新手任务"){
          // that.$router.push({ name: 'appSiredData', params: {} });

          const {href} = that.$router.resolve({
            name: 'appSiredData',
            query: {
              // pdf: JSON.stringify(this.pdf)
            }
          })

          var detailList = [];
          var detailArr = [];
          detailArr[0] = name;
          detailList.push(detailArr);
          detailList = JSON.stringify(detailList);
          window.LogList.checkLog('二郎神后台管理系统',that.title,'保活成本饼状图跳转',detailList);
          window.open(href, '_blank')
        }
        
      })
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
 @import '../../assets/css/appgold.less';
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
/deep/.el-button{
  padding:9px 15px;
}
</style>
