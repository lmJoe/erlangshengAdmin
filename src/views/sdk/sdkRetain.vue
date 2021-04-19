<template>
  <div class="appSurvey" v-loading="loading">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">留存分析</span>
          <span class="arget">
            <div class="argetTxt">
              <h3>指标：</h3>
              <p>新增用户：当天app的新增用户数（30天内去重）</p>
              <p>活跃留存：前日启动APP的用户，昨日再次启动APP的用户数，为活跃留存用户数；再次启动APP的用户数占前日用户数的比例，为活跃留存（仅包含注册用户）</p>
              <p>新增留存：前日注册APP的新用户，昨日再次启动APP的用户数，为新增账号留存用户数；再次启动APP的用户数占前日新增用户数的比例，为新增账号留存（仅包含注册用户）</p>
            </div>
          </span>
        </div>
        <div class="rightSelect">
          <el-cascader 
            v-model="rightName"
            :options="options" 
            change-on-select
            :show-all-levels="false"
            @change="changeRight()"
            >
          </el-cascader>
        </div>
      </div>
      <div class="surveyContainer">
        <div class="surveyTop">
          <div class="surveyDataTop">
            <el-row :gutter="20">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveySort">新增用户</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveySort">活跃留存</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveySort">新增留存</div></el-col>
            </el-row>
          </div>
          <div class="surveyDataBottom">
            <el-row :gutter="20" v-for="(item,index) in recentData" :key="index">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.newUsers}}</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.activeRate}}%</div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.newUserRate}}%</div></el-col>
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
          </div>
          <div class="surveyEchartBox">
            <div class="surveyEchartlist">
              <el-tabs v-model="activeName" @tab-click="changeEchartBtn">
                <!-- <el-tab-pane label="新增用户" name="1">
                  <div id="echart1" style="height:400px;"></div>
                </el-tab-pane> -->
                <el-tab-pane label="活跃留存" name="2">
                  <div id="echart2" style="height:400px;"></div>
                </el-tab-pane>
                <el-tab-pane label="新增留存" name="3">
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
            <!-- <a class="surveyDown" id="surveyDown" :href="downloadExcelUrl">下载数据</a> -->
          </div>
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
                prop="newUsers"
                label="新增用户"
                align="center"
               >
              </el-table-column>
              <el-table-column
                prop="activeRate"
                label="活跃留存"
                align="center"
               >
              </el-table-column>
              <el-table-column
                prop="newUserRate"
                label="新增留存"
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
      title:'魔盒SDK留存分析',
      tableData: [],//表格详情数据
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
      recentData:'',//昨日今日数据
      echartDefaultDate: [],//趋势图查询时间，可指定默认显示时间
      detailBoxDate: [],//表格查询时间，可指定默认显示时间
      partData:'',//趋势图数据
      options: [],
      rightName:'',//右上角选项类型值
      CompanyName: '',//右上角选中公司名-1级
      MediaName: '',//右上角选中值媒体 -2级
      loading: true,
      activeName: '2',//趋势图切换按钮值 1-注册率 2-活跃用户留存率 3-新账号留存率
      IDNAME:'echart2',//趋势渲染区域id
      Valuename:'注册率',//趋势图指标名字
      btnType:3,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
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
        url:URL.recordUrl.getsdkConfig,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        console.log("配置信息",res);
        that.loading = false;
        that.options = res.data;
        that.options.forEach((item,index)=>{
          if(item.label==null){
            item.label=item.value;
          }
          var itemChild = item.children;
          for(var i=0;i<itemChild.length;i++){
            var itemValue = itemChild[i];
            if(itemValue.label==null){
              itemValue.label=itemValue.value;
            }
            if(itemValue.children){
              var itemValueChild = itemValue.children;
              for(var j=0;j<itemValueChild.length;j++){
                var itemValue2 = itemValueChild[j];
                if(itemValue2.label==null){
                  itemValue2.label=itemValue2.value;
                }
              }
            }
          }
        })
        console.log(that.options);
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取当前默认一周的时间并放入趋势图和详情表的日期
    bindDrawal(){
      this.detailBoxDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.echartDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.getPartData();
      this.getDetails();
    },
    changeBoxTime (){
      console.log(this.detailBoxDate);
      this.getDetails()
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  this.detailBoxDate[0];
      detailArr[1] =  this.detailBoxDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'表格数据日期选择',detailList);
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
    //获取昨日今日概况数据
    getAppRecentData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getsdkAnaGeneralData+"?CompanyName="+that.CompanyName+"&MediaName="+that.MediaName,
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
      // if(this.activeName==1){
      //   this.Valuename = '注册率'
      //   this.IDNAME = 'echart1'
      //   this.btnType = 3
      // }else 
      if(this.activeName==2){
        this.Valuename = '活跃留存'
        this.IDNAME = 'echart2'
        this.btnType = 3
      }else if(this.activeName==3){
        this.Valuename = '新增留存'
        this.IDNAME = 'echart3'
        this.btnType = 3
      }
      this.getPartData();
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  this.Valuename ;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'趋势图分类切换',detailList);
    },
    //获取趋势图数据
    getPartData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getsdkAnaPartData+"?CompanyName="+that.CompanyName+"&MediaName="+that.MediaName+"&PartNum="+that.activeName+"&startTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1],
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
        url:URL.recordUrl.getsdkAnaDetailsData+"?CompanyName="+that.CompanyName+"&MediaName="+that.MediaName+"&startTime="+that.detailBoxDate[0]+"&endtime="+that.detailBoxDate[1],
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
    changeRight() {
      console.log("value",this.rightName);
      if(this.rightName.length==1){
        this.CompanyName = this.rightName[0]
        this.MediaName = '';
      }else if(this.rightName.length==2){
        this.CompanyName = this.rightName[0]
        this.MediaName = this.rightName[1];
      }
      this.getDetails();
      this.getAppRecentData();
      this.getPartData();
      this.loading = true;

      var detailList = [];
      var detailArr = [];
      detailArr[0] =  this.rightName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'渠道分类选择',detailList);
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
 @import '../../assets/css/sdkRetain.less';
 .el-dropdown-link{
   cursor:pointer;
 }
.el-range-editor.el-input__inner{
   width: 25%;
   height: 35px;
   padding: 0px 10px;
 }
</style>
