<template>
  <div class="appSurvey" v-loading="loading">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">经营数据报表</span>
          <span class="arget">
            <div class="argetTxt" >
              <h3>指标(总用户)：</h3>
              <p>活跃用户数：当天app的启动用户数（包含所有用户）</p>
              <p>新增用户：当天app的新增用户数（30天内去重）</p>
              <p>启动次数：当天app的启动次数（包含所有用户,同一用户退出app或进入后台超过30s为一次新的启动）</p>
              <p>人均播放量：当天app的视频播放量与视频总播放人数比（包含所有用户）</p>
              <p>人均使用时长：当天app的使用时长与使用时长事件用户数比（包含所有用户）</p>
              <p>≥30分钟人数：当天app的每个用户总使用时长中大于等于30min的用户数（包含所有用户）</p>
            </div>
            <div class="argetTxt" >
              <h3>指标（注册用户）：</h3>
              <p>活跃账户：当天app的启动用户数（仅包含注册用户）</p>
              <p>新增账户：当天app的新注册用户数</p>
              <p>启动次数：当天app的启动次数（仅包含注册用户,同一用户退出app或进入后台超过30s为一次新的启动）</p>
              <p>人均播放量：当天app的视频播放量与视频总播放人数比（仅包含注册用户）</p>
              <p>人均使用时长：当天app的使用时长与使用时长事件用户数比（仅包含注册用户）</p>
              <p>≥30分钟人数：当天app的每个用户总使用时长中大于等于30min的用户数（仅包含注册用户）</p>
            </div>
          </span>
        </div>
        <div class="rightSelect">

        </div>
      </div>
      <div class="surveyContainer">
        <div class="surveyTop">
          <h2>数据总览</h2>
          <div class="surveyDataTop">
            <el-row :gutter="20">
              <el-col :span="3"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveySort" >收入</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveySort" >成本</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveySort" >费用</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveySort" >利润</div></el-col>
            </el-row>
          </div>
          <div class="surveyDataBottom">
            <el-row :gutter="20">
              <el-col :span="3"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum" >{{recentData.yi}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum" >{{recentData.yc}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum" >{{recentData.yf}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum" >{{recentData.yp}}</div></el-col>
            </el-row>
            <el-row :gutter="25" style="margin-top:20px;">
              <el-col :span="3"><div class="grid-content bg-purple surveyDatatitle" style="color:#7B7B83; !important">本月数据汇总</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum" style="color:#323337 !important;font-size:15px;">{{recentData.mi}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum" style="color:#323337 !important;font-size:15px;">{{recentData.mc}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum" style="color:#323337 !important;font-size:15px;">{{recentData.mf}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple surveyDataNum" style="color:#323337 !important;font-size:15px;">{{recentData.mp}}</div></el-col>
            </el-row>
          </div>
        </div>
        <div class="surveyEchart">
          <h2>总趋势</h2>
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
          </div>
          <div class="surveyEchartBox">
            <div class="surveyEchartlist">
              
            </div>
            <div class="surveyEchartimg">
              <div :id="IDNAME" style="height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="flowDistribution">
          <h2>数据分布</h2>
          <div class="flowDistrBoxTop">
            <el-date-picker
              v-model="PieDefaultDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              class="surveyTime"
              @change="changePieTime"
              >
            </el-date-picker>
          </div>
          <div class="flowDistrBoxBottom">
            <div class="pvClass">
              <div :id="mediaPage" style="height:400px;"></div>
              <div :id="custPage" style="height:400px;"></div>
              <div :id="ziyuanPage" style="height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="surveyDetailBox">
          <h3>明细数据</h3>
          <div class="DetailBoxTop">
            <el-date-picker
              v-model="boxDefaultDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              class="surveyTime"
              @change="changeBoxTime"
              >
            </el-date-picker>
            <a class="surveyDown" @click="exportExcel()">下载数据</a>
          </div>
          <div class="tableBox">
            <div class="DetailBoxBottom">
              <table id="tab" border="0" cellpadding="0" cellspacing="0" class="detailTable" style="border:1px solid #dedede;">
                <tr class="biaotou">
                  <th rowspan="2">日期</th>
                <template v-for="item in headResult">
                  <th :colspan=item.num style="150px;">{{item.key}}</th>
                </template>
                </tr>
                <tr class="biaotou">
                  <template v-for="item in headResult">
                    <template v-for="item1 in item.value">
                      <th style="150px;">{{item1}}</th>
                    </template>
                  </template>
                </tr>
                <template  v-for="item in bodyResult">
                  <tr class="biaoCont">
                  <template v-for="item1 in item">
                    <td style="150px;">{{item1}}</td>
                  </template>
                  </tr>
                </template>
                
              </table>
              
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
      title:'魔盒流量',
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
      echartDefaultDate: [],//趋势图查询时间，可指定默认显示时间
      PieDefaultDate:[],//饼状图时间
      boxDefaultDate:[],//数据表格详情
      tableData: [],//客户表格详情数据
      recentData:[],//昨日数据
      partData:'',//趋势图数据
      loading: true,
      IDNAME:'echart1',//流量趋势渲染区域id
      custPage:'echart1_1',//流量分布浏览量渲染区域id
      mediaPage:'echart2_1',//流量分布访客数渲染区域id
      ziyuanPage:'echart3_1',//流量分布IP渲染区域id
      btnType:1,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
      pieValueName:'',
      count:'',
      currentPage:1,
      pageIndex:1,
      fullscreenLoading:false,
      pieEchartID:'pieEchart1',
      PieeChartname:'',
      downloadExcelUrl:'',//下载数据
      headResult:[],
      bodyResult:[],
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
    this.getmoheRecentData();//获取魔盒概况数据
    this.pieCircularChart();//获取流量分布数据
  },
  methods: {
    //获取当前默认一周的时间并放入趋势图和详情表的日期
    bindDrawal(){
      this.echartDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.PieDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.boxDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.getPartData();
      this.getDetails();
    },
    //流量分布选择
    flowNumClick(){
      this.pieCircularChart();
    },
    //流量分布饼状图数据
    pieCircularChart() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getBBCircleData+"?starttime="+that.PieDefaultDate[0]+"&endTime="+that.PieDefaultDate[1],
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.loading = false;
        var date = res.data;
        console.log("流量分布",date);
        var cost = res.data.cost;
        var income = res.data.income;
        var profit = res.data.profit;
        let costArr = [];
        let incomeArr = [];
        let profitArr = [];
        Object.keys(income).forEach(function(key){
          console.log("1-----",income,key);
          var keyName = key.slice(1,key.indexOf(','))
          var incomeObj = {};
          var reg = new RegExp("]");
          incomeObj.name = (key.slice(key.indexOf(',')+1)).replace(reg,"");
          incomeObj.value = income[key]
          incomeObj.cid = key.slice(1,key.indexOf(','));
          incomeArr.push(incomeObj)
        });
        Object.keys(cost).forEach(function(key){
          var keyName = key.slice(1,key.indexOf(','))
          var costObj = {};
          var reg = new RegExp("]");
          costObj.name = (key.slice(key.indexOf(',')+1)).replace(reg,"");
          costObj.value = cost[key]
          costObj.cid = key.slice(1,key.indexOf(','));
          costArr.push(costObj)
        });
        Object.keys(profit).forEach(function(key){
          var keyName = key.slice(1,key.indexOf(','))
          var profitObj = {};
          var reg = new RegExp("]");
          profitObj.name = (key.slice(key.indexOf(',')+1)).replace(reg,"");
          profitObj.value = profit[key]
          profitObj.cid = key.slice(1,key.indexOf(','));
          profitArr.push(profitObj)
        });
        console.log("profitArr",profitArr);
        that.showpieCharet(incomeArr.sort(that.compare('value')),that.pieValueName,'收入',that.mediaPage)
        that.showpieCharet(costArr.sort(that.compare('value')),that.pieValueName,'成本',that.custPage)
        that.showpieCharet(profitArr.sort(that.compare('value')),that.pieValueName,'费用',that.ziyuanPage)
      }).catch(function (err) {
        console.log(err);
      });
    },
    //对饼状图中的某一个属性做排序
    compare(property){
      return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    },
    exportExcel() {
      var url = URL.recordUrl.getBBexport;
      var thedata = 'bearer'+' '+ localStorage.getItem("accessToken");
//       var thedata = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ii1PZUVVR0NfZlFqa0U3b0dZZHhrX0EiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MDAyNTY1ODcsImV4cCI6MTYwMDg2MTM4NywiaXNzIjoiaHR0cDovLzEwLjAuMC4yNDk6NTAwMCIsImF1ZCI6ImdhdGV3YXkiLCJjbGllbnRfaWQiOiJnYXRld2F5X2NsaWVudCIsInN1YiI6IjEzMjg1NzE1NTE3IiwiYXV0aF90aW1lIjoxNjAwMjU2NTg3LCJpZHAiOiJsb2NhbCIsIlVuaXF1ZUtleSI6IjU3MzlmYTg2LWJlY2YtNGQ5NC1iMmZiLWRhMjQ2MWJiNjdmMiIsIlVzZXJOYW1lIjoiMTMyODU3MTU1MTciLCJVc2VySWQiOiI1NiIsInNjb3BlIjpbImdhdGV3YXkiXSwiYW1yIjpbImN1c3RvbSJdfQ.EDdXLU6fIuptgbApL8H5heTBwLiKMsCDBeclPuX5Z5ujWz1AlnNf_FHy3AM-iUl9PRKI9sAv7PkpFseCLn62B8WV1qM0hD49oNt70ucwg33wbruPTLtIUN-Ph2UbHKd47CVC4C9cvkRsWoYWQpUbULGB1bNRRotcD1PsG6VE0KXxsl49CSl--SDF1AbkPn7AVcoWY-O7F5_IBE318wzlNt6vMna3C_enC_fSorrvvEDbhKjdQy7HiCyJPIZWQFmPFYmH_3j3aXgt3EnGG287-v8cFZZk9_OasehwaKDCKm0Q09EkSVUos-w_rwRx_IeO1XmkJlEuyynqnn42ZNRdKg";
      let myObj = {
        method: 'get',
        url:url,
        fileName: '',
        params: `StartTime=${this.boxDefaultDate[0]}&EndTime=${this.boxDefaultDate[1]}`,
        thedata:thedata,
      }
      this.common.exportMethod(myObj)
    },
    //流量分布饼状图
    showpieCharet (datelist,pieValueName,Name,pieIDNAME){
      
      var that = this;
      var myChart = echarts.init(document.getElementById(pieIDNAME));
      myChart.clear();
      var option;
      option = {
          title: {
            text: Name+'分布',
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
                  name: pieValueName+Name,
                  type: 'pie',
                  selectedMode: 'single',
                  radius: [0, '30%'],

                  label: {
                      show: true 
                  },
           
              },
              {
                  name: pieValueName+Name+'分布',
                  type: 'pie',
                  radius: ['40%', '55%'],
                  label: {
                      // formatter: '{a} <br/>{b} : {c} ({d}%) ',
                      // formatter: '{b}({d}%) ',
                      formatter(v) {
        let text = v.name;
        let value_format = v.value;
        let percent_format = Math.round(v.percent) + '%';
        if (text.length <= 9) {
          return `${text}\n${percent_format}`;
        } else if (text.length > 9 && text.length <= 12) {
          return text = `${text.slice(0, 9)}\n${text.slice(9)}\n${percent_format}`
        } else if (text.length > 12 && text.length <= 18) {
          return text = `${text.slice(0, 9)}\n${text.slice(9, 12)}\n${text.slice(12)}\n${percent_format}`
        } else if (text.length > 18 && text.length <= 24) {
          return text = `${text.slice(0, 9)}\n${text.slice(9, 12)}\n${text.slice(12, 18)}\n${text.slice(18)}\n${percent_format}`
        } else if (text.length > 24 && text.length <= 30) {
          return text = `${text.slice(0, 9)}\n${text.slice(9, 12)}\n${text.slice(12, 18)}\n${text.slice(18, 24)}\n${text.slice(24)}\n${percent_format}`
        } else if (text.length > 30) {
          return text = `${text.slice(0, 9)}\n${text.slice(9, 12)}\n${text.slice(12, 18)}\n${text.slice(18, 24)}\n${text.slice(24, 30)}\n${text.slice(30)}\n${percent_format}`
        }
      },
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
        var cid = params.data.cid;
        var name = params.data.name;
        console.log("params",params);
        console.log("name",name);
        that.PieeChartname = name;
        that.PirEchartData(cid,name)

        var detailList = [];
        var detailArr = [];
        detailArr[0] = name;
        detailList.push(detailArr);
        detailList = JSON.stringify(detailList);
        window.LogList.checkLog('',this.title,'数据分布饼状图弹窗',detailList);
      })
    },
    //获取昨日今日概况数据
    getmoheRecentData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getBBData,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.loading = false;
        that.recentData = res.data;
        console.log("recentData",that.recentData);
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取流量趋势图数据
    getPartData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getBBEChartData+"?starttime="+that.echartDefaultDate[0]+"&endTime="+that.echartDefaultDate[1],
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
          var xData = res.data.xData;
          var yiData = res.data.yiData;
          var ycData = res.data.ycData;
          var yfData = res.data.yfData;
          var ypData = res.data.ypData;
          console.log("yfData",yfData);
          var ypData = res.data.ypData;
          that.showechart(xData,yiData,ycData,yfData,ypData,that.IDNAME,that.btnType);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取饼状图趋势图
    getBBCircleEChartData (cid,name){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getBBCircleEChartData+"?starttime="+that.PieDefaultDate[0]+"&endTime="+that.PieDefaultDate[1]+"&cid="+cid,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        if(res.code==0){
          that.PiepartData = res.data;
          console.log("饼状趋势图数据",that.PiepartData);
          var xData = res.data.xData;
          var yData = res.data.yData;
          that.showPieechart(xData,yData,that.pieEchartID);
          
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    PirEchartData(cid,name) {
      this.$alert(`<div id="${this.pieEchartID}" style="height:400px;"></div>`, name+'趋势图', {
        dangerouslyUseHTMLString: true,
        customClass: 'message-logout'
      });
      this.getBBCircleEChartData(cid,name);
    },
    //获取表格详情数据
    getDetails (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getBBdetDetails+"?starttime="+that.boxDefaultDate[0]+"&endTime="+that.boxDefaultDate[1],
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.count = res.data.dataColCount;
        that.headResult = res.data.headResult;
        // var obj = {
        //   key:'日期',
        //   value:[],
        // };
        // that.headResult.unshift(obj);
        that.bodyResult = res.data.bodyResult;
        var headResult = res.data.headResult;
        for(var i=0;i<headResult.length;i++){
          var headResultii = headResult[i].value.length;
          headResult[i].num = headResultii;
        }
        // that.downloadDetailExcelUrl();
      }).catch(function (err) {
        console.log(err);
      });
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
      window.LogList.checkLog('二郎神后台管理系统',this.title,'总趋势图日期选择',detailList);
    },
    changePieTime() {
      console.log(this.PieDefaultDate);
      this.pieCircularChart()
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.PieDefaultDate[0];
      detailArr[1] = this.PieDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'数据分布日期选择',detailList);
    },
    changeBoxTime() {
      console.log(this.boxDefaultDate);
      this.getDetails()
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.boxDefaultDate[0];
      detailArr[1] = this.boxDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'明细数据日期选择',detailList);
    },
    //实现趋势图
    showechart(xData,yiData,ycData,yfData,ypData,idName,btnType){
      var myChart = echarts.init(document.getElementById(idName));
      //根据趋势图显示类型切换对数据中的值做处理以便于在坐标轴上显示(同时将最大值*2)
      //btnType1-数值类型 2-时分秒类型 3- 百分比类型
      myChart.clear();
      var option = {
        // title: {
        //     text: ''
        // },
        tooltip: {
            trigger: 'axis'
        },
        color:['#4DD973','#F19149','#F65B57','#2589FF'],
        legend: {
            data: ['收入', '成本', '费用','利润']
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
            data: xData
        },
        yAxis: {
            type: 'value',
            splitLine:{
              lineStyle: {
                type:'dashed',
              }
            },
        },
        series: [
            {
                name: '收入',
                type: 'line',
                data: yiData,
                lineStyle:{
                  color:'#4DD973' //改变折线颜色
                }
            },
            {
                name: '成本',
                type: 'line',
                data: ycData,
                lineStyle:{
                  color:'#F19149' //改变折线颜色
                }
            },
            {
                name: '费用',
                type: 'line',
                data: yfData,
                lineStyle:{
                  color:'#F65B57' //改变折线颜色
                }
            },
            {
                name: '利润',
                type: 'line',
                data: ypData,
                lineStyle:{
                  color:'#2589FF' //改变折线颜色
                }
            }
        ]
      };
      myChart.setOption(option);
    },
    //实现饼状趋势图
    showPieechart(xData,yData,pieEchartID){
      var myChart = echarts.init(document.getElementById(pieEchartID));
      //根据趋势图显示类型切换对数据中的值做处理以便于在坐标轴上显示(同时将最大值*2)
      //btnType1-数值类型 2-时分秒类型 3- 百分比类型
      myChart.clear();
      var option = {
        // title: {
        //     text: ''
        // },
        tooltip: {
            trigger: 'axis'
        },
        // color:['#4DD973','#F19149','#F65B57','#2589FF'],
        // legend: {
        //     data: ['收入', '成本', '费用','利润']
        // },
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
            data: xData
        },
        yAxis: {
            type: 'value',
            splitLine:{
              lineStyle: {
                type:'dashed',
              }
            },
        },
        series: [
            {
                name: this.PieeChartname,
                type: 'line',
                stack: '总量',
                data: yData,
                lineStyle:{
                  color:'#2589FF' //改变折线颜色
                }
            }
        ]
      };
      myChart.setOption(option);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getDetails();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/operStatement.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
 /deep/.el-range-editor.el-input__inner{
  width: 25%;
  height: 35px;
  padding: 0px 10px;
}
/deep/.el-radio-button__inner{
  padding:5px 10px !important;
}
</style>
<style>
  .message-logout {
    width:800px;
  }
</style>
