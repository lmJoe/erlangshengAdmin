<template>
  <div class="appSurvey" v-loading="loading">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">热榜数据</span>
          <span class="arget">
            <div class="argetTxt" >
              <h3>指标：</h3>
              <p>启动次数：当天小程序的启动次数</p>
              <p>启动人数：当天小程序的启动用户数</p>
              <p>视频播放数：当天小程序的视频播放个数</p>
              <p>人均观看视频数：当天小程序的视频播放个数与视频总播放人数比</p>
              <p>人均停留时长：当天小程序的总使用时长与使用时长事件用户数比</p>
              <p>≥30分钟人数：当天小程序的每个用户总使用时长中大于等于30min的用户数</p>
            </div>
          </span>
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
      <div class="surveyContainer">
        <div class="surveyTop">
          <div class="surveyDataTop">
            <el-row :gutter="20">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveySort">曝光次数</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveySort">点击次数</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveySort">点击人数</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveySort">CTR</div></el-col>
            </el-row>
          </div>
          <div class="surveyDataBottom">
            <el-row :gutter="20">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{recentData.exposure}}</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{recentData.clickNum}}</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{recentData.clickUv}}</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{recentData.ctr}}</div></el-col>
            </el-row>
          </div>
        </div>
        <div class="surveyEchart">
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
            <a class="surveyDown" id="surveyDown" :href="downloadExcelUrl">下载数据</a>
          </div>
          <div class="surveyEchartBox">
            <div class="surveyEchartlist">
              <el-tabs v-model="activeName" @tab-click="changeEchartBtn()">
                <el-tab-pane label="曝光次数" name="1" >
                  <div id="echart1" style="height:400px;"></div>
                </el-tab-pane>
                <el-tab-pane label="点击次数" name="2" >
                  <div id="echart2" style="height:400px;"></div>
                </el-tab-pane>
                <el-tab-pane label="点击人数" name="3" >
                  <div id="echart3" style="height:400px;"></div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="surveyEchartimg">

            </div>
          </div>
        </div>
        <div class="surveyDetailBox">
          <div class="DetailBoxTop">
            <h3>点击率top10</h3>
            <!-- <span class="skipBtn"  @click="videoSkipBtn()">></span> -->
          </div>
          <div class="DetailBoxBottom">
            <el-table
              :data="tableData"
              :header-cell-style="{background:'#E2E2EB',color:'#333'}"
              :row-style="{height:'30px'}"
              :cell-style="{padding:'10px'}"
              style="font-size: 10px;width: 100%">
              <el-table-column
                prop="videoTitle"
                label="标题"
                width="580"
                align="center">
              </el-table-column>
              <el-table-column
                prop="videoId"
                label="视频ID"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="type"
                label="类别"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="clickNum"
                label="点击次数"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="clickUv"
                label="点击人数"
                align="center">
              </el-table-column>
              <el-table-column
                prop="ctr"
                label="点击率"
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
  name: 'xcxHotData',
  data () {
    return {
      title:'小程序热榜数据',
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
      tableData: [],//表格详情数据
      recentData:'',//昨日今日数据
      partData:'',//趋势图数据
      options: [{
        value: 103,
        label: '头条爆米花视频'
      }, {
        value: 102,
        label: '头条美好视频'
      }],
      rightName: 103,//右上角选项类型值 43-头条恰饭视频  103-头条爆米花视频  102-头条美好视频
      loading: true,
      activeName: '1',//趋势图切换按钮值 1-启动次数 2-启动人数 3-视频播放量 4-人均播放量 5-人均停留时长  6-≥30分钟人数 
      IDNAME:'echart1',//趋势渲染区域id
      Valuename:'启动次数',//趋势图指标名字
      btnType:1,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
      downloadExcelUrl:'',//下载数据的地址
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
      this.echartDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.getPartData();
      this.getDetails();
    },
    //获取昨日今日概况数据
    getAppRecentData (){
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getxcxHotGetGeneralData+"?appid="+this.rightName,
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
        this.Valuename = '曝光次数'
        this.IDNAME = 'echart1'
        this.btnType = 1
      }else if(this.activeName==2){
        this.Valuename = '点击次数'
        this.IDNAME = 'echart2'
        this.btnType = 1
      }else if(this.activeName==3){
        this.Valuename = '点击人数'
        this.IDNAME = 'echart3'
        this.btnType = 1
      }
      this.getPartData();

      var detailList = [];
      var detailArr = [];
      detailArr[0] =  this.Valuename;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'趋势图分类选择',detailList);
    },
    //获取趋势图数据
    getPartData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getxcxHotGetPartData+"?appid="+that.rightName+"&type="+that.activeName+"&startTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1],
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
          that.downloadE();
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
        url:URL.recordUrl.getxcxHotGetTopData+"?appid="+that.rightName,
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
    //获取表格导出
    downloadE(){
      this.downloadExcelUrl = URL.recordUrl.getwebGetPartDataexport+"?type="+this.rightName+"&startTime="+this.echartDefaultDate[0]+"&endtime="+this.echartDefaultDate[1];
    },
    changeEchartTime() {
      console.log(this.echartDefaultDate);
      this.getPartData()
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  this.echartDefaultDate[0];
      detailArr[1] =  this.echartDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'趋势图日期选择',detailList);
    },
    changeRight() {
      console.log("value",this.rightName);
      this.getDetails();
      this.getAppRecentData();
      this.getPartData();
      this.loading = true;
      var rightSlectName;
      if(this.rightName==103){
        rightSlectName="头条爆米花视频";
      }else if(this.rightName==43){
        rightSlectName="头条恰饭视频";
      }else if(this.rightName==102){
        rightSlectName="头条美好视频";
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  rightSlectName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'渠道分类切换',detailList);
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/xcxHotData.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
 /deep/.el-range-editor.el-input__inner{
  width: 25%;
  height: 35px;
  padding: 0px 10px;
}

</style>
