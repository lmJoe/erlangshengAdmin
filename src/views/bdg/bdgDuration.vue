<template>
  <div class="appSurvey" v-loading="loading" ref="viewFrame">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">时长分析</span>
          <span class="arget">
            <div class="argetTxt">
              <h3>指标：</h3>
              <p>日均使用时长：当天app的总使用时长与使用时长事件用户数比（仅包含注册用户）</p>
              <p>单次使用时长：当天app的总使用时长与使用时长事件启动次比（仅包含注册用户）</p>
              <p>≥3分钟人数：当天app的每个用户总使用时长中大于等于3min的用户数（仅包含注册用户）</p>
            </div>
          </span>
          <span>(本页面数据仅含注册用户)</span>
        </div>
        <div class="rightSelect">

        </div>
      </div>
      <div class="surveyContainer">
        <div class="surveyTop">
          <div class="surveyDataTop">
            <el-row :gutter="20">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveySort">日均使用时长</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveySort">单次使用时长</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveySort">≥3分钟人数</div></el-col>
            </el-row>
          </div>
          <div class="surveyDataBottom">
            <el-row :gutter="20" v-for="(item,index) in recentData" :key="index">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.dayAvgTime}}</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.onceTime}}</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.moreThirtyCount}}</div></el-col>
            </el-row>
          </div>
        </div>
        <div class="surveyEchart">
          <div class="surveyEchartBox">
            <div class="surveyEchartlist">
              <el-tabs v-model="activeName" @tab-click="changeEchartBtn">
                <el-tab-pane label="日均使用时长" name="1">
                  <div id="echart1" style="height:400px;"></div>
                </el-tab-pane>
                <el-tab-pane label="单次使用时长" name="2">
                  <div id="echart2" style="height:400px;"></div>
                </el-tab-pane>
                <el-tab-pane label="≥3分钟人数" name="3">
                  <div id="echart3" style="height:400px;"></div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="surveyEchartimg">

            </div>
          </div>
        </div>
        <div class="surveyDetailBox">
          <div class="DetailBoxBottom">
            <el-table
              :data="tableData"
              :header-cell-style="{background:'#E2E2EB',color:'#333'}"
              :row-style="{height:'30px'}"
              :cell-style="{padding:'10px'}"
              style="font-size: 10px;width: 100%">
              <el-table-column
                prop="dateId"
                label="日期"
                align="center">
              </el-table-column>
              <el-table-column
                prop="dayAvgTime"
                label="日均时长"
                align="center"
               >
              </el-table-column>
              <el-table-column
                prop="countAvg"
                label="人均启动次数"
                align="center"
               >
              </el-table-column>
              <el-table-column
                prop="onceTime"
                label="单次时长"
                align="center"
               >
              </el-table-column>
              <el-table-column
                prop="moreThirtyCount"
                label="≥30分钟人数"
               align="center"
               >
              </el-table-column>
              <el-table-column
                prop="thirtySecondCount"
                label="30秒内人数"
                align="center">
              </el-table-column>
              <el-table-column
                prop="oneMinuteCount"
                label="30秒~1分钟"
                align="center">
              </el-table-column>
              <el-table-column
                prop="threeMinuteCount"
                label="1分钟~3分钟"
                align="center">
              </el-table-column>
              <el-table-column
                prop="tenMinuteCount"
                label="3分钟~10分钟"
                align="center">
              </el-table-column>
              <el-table-column
                prop="thirtyMinuteCount"
                label="10分钟~30分钟"
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
  name: 'appRetain',
  data () {
    return {
      title:'APP时长分析',
      tableData: [],//表格详情数据
      recentData:'',//昨日今日数据
      partData:'',//趋势图数据
      rightName: 1,//右上角选项类型值 0-全部 1为趣看 2为爆米花andriod
      loading: true,
      activeName: '1',//趋势图切换按钮值 1-注册率 2-活跃用户留存率 3-新账号留存率
      IDNAME:'echart1',//趋势渲染区域id
      Valuename:'日均使用时长',//趋势图指标名字
      btnType:2,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
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
  },
  methods: {
    //获取当前默认一周的时间并放入趋势图和详情表的日期
    bindDrawal(){
      this.getPartData();
      this.getDetails();
    },
    //获取昨日今日概况数据
    getAppRecentData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdgtimegeneral,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.recentData = res.data;
        console.log("that.recentData",that.recentData);
      }).catch(function (err) {
        console.log(err);
      });
    },
    changeEchartBtn() {
      console.log("activeName",this.activeName);
      if(this.activeName==1){
        this.Valuename = '日均使用时长'
        this.IDNAME = 'echart1'
        this.btnType = 2
      }else if(this.activeName==2){
        this.Valuename = '单次使用时长'
        this.IDNAME = 'echart2'
        this.btnType = 2
      }else if(this.activeName==3){
        this.Valuename = '≥3分钟人数'
        this.IDNAME = 'echart3'
        this.btnType = 1
      }
      this.getPartData();
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.Valuename;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'趋势图状态切换',detailList);
    },
    //获取趋势图数据
    getPartData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdgtimeecharts+"?partnum="+that.activeName,
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
        url:URL.recordUrl.getbdgtimedetails,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.tableData = res.data;
        that.tableData.forEach((item,index)=>{
          var str = "";
          var time = item.dateId;
          time = time.split(" ")[0];
          that.tableData[index].dateId = time
        })
        console.log("表格数据",that.tableData);

      }).catch(function (err) {
        console.log(err);
      });
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
 @import '../../assets/css/appSurvey.less';
 .el-dropdown-link{
   cursor:pointer;
 }
</style>
