<template>
  <div class="appSurvey" v-loading="loading">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">总体流量分析</span>
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
          <div class="surveyDataTop">
            <!-- <el-row :gutter="20">
              <el-col :span="2"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple surveySort" >浏览量(PV)</div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple surveySort" >较前日</div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple surveySort" >7日均值</div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple surveySort" >访客数(UV)</div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple surveySort">较前日</div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple surveySort">7日均值</div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple surveySort">IP数(IP)</div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple surveySort">较前日</div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple surveySort">7日均值</div></el-col>
            </el-row> -->
            <el-row :gutter="20">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="6" style="margin-right:80px;">
                <el-row :gutter="21">
                  <el-col :span="7"><div class="grid-content bg-purple surveySort" >浏览量(PV)</div></el-col>
                  <el-col :span="7"><div class="grid-content bg-purple surveySort" >较前日</div></el-col>
                  <el-col :span="7"><div class="grid-content bg-purple surveySort" >7日均值</div></el-col>
                </el-row>
              </el-col>
              <el-col :span="6" style="margin-right:80px;">
                <el-row :gutter="21">
                  <el-col :span="7"><div class="grid-content bg-purple surveySort" >访客数(UV)</div></el-col>
                  <el-col :span="7"><div class="grid-content bg-purple surveySort">较前日</div></el-col>
                  <el-col :span="7"><div class="grid-content bg-purple surveySort">7日均值</div></el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row :gutter="21">
                  <el-col :span="7"><div class="grid-content bg-purple surveySort">IP数(IP)</div></el-col>
                  <el-col :span="7"><div class="grid-content bg-purple surveySort">较前日</div></el-col>
                  <el-col :span="7"><div class="grid-content bg-purple surveySort">7日均值</div></el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div class="surveyDataBottom">
            <el-row :gutter="20">
              <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
              <el-col :span="6" style="margin-right:80px;">
                 <el-row :gutter="21">
                  <el-col :span="7"><div class="grid-content bg-purple surveyDataNum" >{{recentData1.value}}</div></el-col>
                  <el-col :span="7" class="imgRelat">
                    <div class="grid-content bg-purple surveyDataNum" >{{recentData1.thanBeforeYesterdayValue}}</div>
                    <img :src=topImg alt="" class="imgPost" v-if="recentData1.thanBeforeYesterday =='up'">
                    <img :src=bottomImg alt="" class="imgPost" v-if="recentData1.thanBeforeYesterday=='down'">
                  </el-col>
                  <el-col :span="7" class="imgRelat">
                    <div class="grid-content bg-purple surveyDataNum" >{{recentData1.thanSevenDaysValue}}</div>
                    <img :src=topImg alt="" class="imgPost" v-if="recentData1.thanSevenDays =='up'">
                    <img :src=bottomImg alt="" class="imgPost" v-if="recentData1.thanSevenDays=='down'">
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6" style="margin-right:80px;">
                <el-row :gutter="21">
                  <el-col :span="7"><div class="grid-content bg-purple surveyDataNum" >{{recentData2.value}}</div></el-col>
                  <el-col :span="7" class="imgRelat">
                    <div class="grid-content bg-purple surveyDataNum" >{{recentData2.thanBeforeYesterdayValue}}</div>
                    <img :src=topImg alt="" class="imgPost" v-if="recentData2.thanBeforeYesterday =='up'">
                    <img :src=bottomImg alt="" class="imgPost" v-if="recentData2.thanBeforeYesterday=='down'">
                  </el-col>
                  <el-col :span="7" class="imgRelat">
                    <div class="grid-content bg-purple surveyDataNum" >{{recentData2.thanSevenDaysValue}}</div>
                    <img :src=topImg alt="" class="imgPost" v-if="recentData2.thanSevenDays =='up'">
                    <img :src=bottomImg alt="" class="imgPost" v-if="recentData2.thanSevenDays=='down'">
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row :gutter="21">
                  <el-col :span="7"><div class="grid-content bg-purple surveyDataNum" >{{recentData3.value}}</div></el-col>
                  <el-col :span="7" class="imgRelat">
                    <div class="grid-content bg-purple surveyDataNum" >{{recentData3.thanBeforeYesterdayValue}}</div>
                    <img :src=topImg alt="" class="imgPost" v-if="recentData3.thanBeforeYesterday =='up'">
                    <img :src=bottomImg alt="" class="imgPost" v-if="recentData3.thanBeforeYesterday=='down'">
                  </el-col>
                  <el-col :span="7" class="imgRelat">
                    <div class="grid-content bg-purple surveyDataNum" >{{recentData3.thanSevenDaysValue}}</div>
                    <img :src=topImg alt="" class="imgPost" v-if="recentData3.thanBeforeYesterday =='up'">
                    <img :src=bottomImg alt="" class="imgPost" v-if="recentData3.thanBeforeYesterday=='down'">
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="surveyEchart">
          <h2>流量趋势</h2>
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
          <h2>流量趋势</h2>
          <div class="flowDistrBoxTop">
            <el-tabs v-model="flowDistrNum" @tab-click="flowNumClick()">
              <el-tab-pane label="浏览量" name="1"></el-tab-pane>
              <el-tab-pane label="访客数" name="2"></el-tab-pane>
              <el-tab-pane label="IP" name="3"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="flowDistrBoxBottom">
            <div v-if="flowDistrNum==1" class="pvClass">
              <div :id="custPage" style="height:400px;"></div>
              <div :id="mediaPage" style="height:400px;"></div>
              <div :id="ziyuanPage" style="height:400px;"></div>
            </div>
            <div v-if="flowDistrNum==2" class="uvClass">
              <div :id="custPage" style="height:400px;"></div>
              <div :id="mediaPage" style="height:400px;"></div>
              <div :id="ziyuanPage" style="height:400px;"></div>
            </div>
            <div v-if="flowDistrNum==3" class="ipClass">
              <div :id="custPage" style="height:400px;"></div>
              <div :id="mediaPage" style="height:400px;"></div>
              <div :id="ziyuanPage" style="height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="surveyDetailBox">
          <div class="DetailBoxTop">
            
          </div>
          <div class="DetailBoxBottom">
            <el-row :gutter="21">
              <el-col :span="8">
                <div class="detailTitle">
                  <div>
                    <h2>客户Top10</h2>
                    <el-radio-group v-model="custTopValue" class="choseType">
                      <el-radio-button label="0">浏览量</el-radio-button>
                      <el-radio-button label="1">访客数</el-radio-button>
                      <el-radio-button label="2">IP</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
                <el-table
                  :data="custTableDataPV"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%"
                  v-if="custTopValue==0">
                  <el-table-column
                    prop="item1"
                    label="媒体名称"
                    width="300px">
                  </el-table-column>
                  <el-table-column
                    prop="item2"
                    label="浏览量"
                    align="center"
                    >
                  </el-table-column>
                </el-table>
                <el-table
                  :data="custTableDataUV"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%"
                  v-if="custTopValue==1">
                  <el-table-column
                    prop="item1"
                    label="媒体名称"
                    width="300px">
                  </el-table-column>
                  <el-table-column
                    prop="item2"
                    label="浏览量"
                    align="center"
                    >
                  </el-table-column>
                </el-table>
                <el-table
                  :data="custTableDataIP"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%"
                  v-if="custTopValue==2">
                  <el-table-column
                    prop="item1"
                    label="媒体名称"
                    width="300px">
                  </el-table-column>
                  <el-table-column
                    prop="item2"
                    label="浏览量"
                    align="center"
                    >
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="8">
                <div class="detailTitle">
                  <div>
                    <h2>媒体Top10</h2>
                    <el-radio-group v-model="mediaTopValue" class="choseType">
                      <el-radio-button label="0">浏览量</el-radio-button>
                      <el-radio-button label="1">访客数</el-radio-button>
                      <el-radio-button label="2">IP</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
                <el-table
                  :data="mediaTableDataPV"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%"
                  v-if="mediaTopValue==0">
                  <el-table-column
                    prop="item1"
                    label="媒体名称"
                    width="300px">
                  </el-table-column>
                  <el-table-column
                    prop="item2"
                    label="浏览量"
                    align="center"
                    >
                  </el-table-column>
                </el-table>
                <el-table
                  :data="mediaTableDataUV"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%"
                  v-if="mediaTopValue==1">
                  <el-table-column
                    prop="item1"
                    label="媒体名称"
                    width="300px">
                  </el-table-column>
                  <el-table-column
                    prop="item2"
                    label="浏览量"
                    align="center"
                    >
                  </el-table-column>
                </el-table>
                <el-table
                  :data="mediaTableDataIP"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%"
                  v-if="mediaTopValue==2">
                  <el-table-column
                    prop="item1"
                    label="媒体名称"
                    width="300px">
                  </el-table-column>
                  <el-table-column
                    prop="item2"
                    label="浏览量"
                    align="center"
                    >
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="8">
                <div class="detailTitle">
                  <div>
                  <h2>资源位Top10</h2>
                  <el-radio-group v-model="zywTopValue" class="choseType">
                    <el-radio-button label="0">浏览量</el-radio-button>
                    <el-radio-button label="1">访客数</el-radio-button>
                    <el-radio-button label="2">IP</el-radio-button>
                  </el-radio-group>
                  </div>
                  <!-- <span @click="navGoZyw()">></span> -->
                </div>
                <el-table
                  :data="zywTableDataPV"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%"
                  v-if="zywTopValue==0">
                  <el-table-column
                    prop="item1"
                    label="媒体名称"
                    width="300px">
                  </el-table-column>
                  <el-table-column
                    prop="item2"
                    label="浏览量"
                    align="center"
                    >
                  </el-table-column>
                </el-table>
                <el-table
                  :data="zywTableDataUV"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%"
                  v-if="zywTopValue==1">
                  <el-table-column
                    prop="item1"
                    label="媒体名称"
                    width="300px">
                  </el-table-column>
                  <el-table-column
                    prop="item2"
                    label="浏览量"
                    align="center"
                    >
                  </el-table-column>
                </el-table>
                <el-table
                  :data="zywTableDataIP"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%"
                  v-if="zywTopValue==2">
                  <el-table-column
                    prop="item1"
                    label="媒体名称"
                    width="300px">
                  </el-table-column>
                  <el-table-column
                    prop="item2"
                    label="浏览量"
                    align="center"
                    >
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
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
      title:'总体流量分析',
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
      custTableDataPV: [],//客户表格详情数据Top
      custTableDataUV: [],//客户表格详情数据Top
      custTableDataIP: [],//客户表格详情数据Top
      mediaTableDataPV: [],//媒体表格详情数据Top
      mediaTableDataUV: [],//媒体表格详情数据Top
      mediaTableDataIP: [],//媒体表格详情数据Top
      zywTableDataPV: [],//资源位表格详情数据Top
      zywTableDataUV: [],//资源位表格详情数据Top
      zywTableDataIP: [],//资源位表格详情数据Top
      recentData1:[],//昨日今日数据PV
      recentData2:[],//昨日今日数据UV
      recentData3:[],//昨日今日数据IP
      partData:'',//趋势图数据
      loading: true,
      IDNAME:'echart1',//流量趋势渲染区域id
      custPage:'echart1_1',//流量分布浏览量渲染区域id
      mediaPage:'echart2_1',//流量分布访客数渲染区域id
      ziyuanPage:'echart3_1',//流量分布IP渲染区域id
      btnType:1,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
      flowDistrNum:'1',//流量分布默认选项
      pieValueName:'浏览量',
      custTopValue:'0',//判断客户top数据
      mediaTopValue:'0',//判断媒体top数据
      zywTopValue:'0',//判断资源位top数据
      topImg:require("../../assets/imgs/top.png"),
      bottomImg:require("../../assets/imgs/bottom.png"),
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
      this.getPartData();
      this.getDetails();
    },
    //流量分布选择
    flowNumClick(){
      if(this.flowDistrNum==1){
        this.pieValueName = '浏览量'
      }else if(this.flowDistrNum==2){
        this.pieValueName = '访客数'
      }else if(this.flowDistrNum==3){
        this.pieValueName = 'IP'
      }
      this.pieCircularChart();
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  this.pieValueName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'流量饼状图分类选择',detailList);
    },
    //流量分布饼状图数据
    pieCircularChart() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getmoheDistribution,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        var date = res.data;
        console.log("流量分布",date);
        var channelIp = res.data.channelIp;
        var channelPv = res.data.channelPv;
        var channelUv = res.data.channelUv;
        var compIp = res.data.compIp;
        var compPv = res.data.compPv;
        var compUv = res.data.compUv;
        var mediaIp = res.data.mediaIp;
        var mediaPv = res.data.mediaPv;
        var mediaUv = res.data.mediaUv;

        var datelist1 = [];
        var datelist2 = [];
        var datelist3 = [];

        var datelist1_1 = [];
        var datelist1_2 = [];
        var datelist1_3 = [];

        var datelist2_1 = [];
        var datelist2_2 = [];
        var datelist2_3 = [];
        channelIp.forEach((item,index)=>{
          var datestr = item.item1;
          var newtime = item.item2*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist1.push(json);
          console.log("datelist1",datelist1);
        })
        channelPv.forEach((item,index)=>{
          var datestr = item.item1;
          var newtime = item.item2*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist2.push(json);
        })
        channelUv.forEach((item,index)=>{
          var datestr = item.item1;
          var newtime = item.item2*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist3.push(json);
        }) 
        compIp.forEach((item,index)=>{
          var datestr = item.item1;
          var newtime = item.item2*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist1_1.push(json);
        })
        compPv.forEach((item,index)=>{
          var datestr = item.item1;
          var newtime = item.item2*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist1_2.push(json);
        })
        compUv.forEach((item,index)=>{
          var datestr = item.item1;
          var newtime = item.item2*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist1_3.push(json);
        })
        mediaIp.forEach((item,index)=>{
          var datestr = item.item1;
          var newtime = item.item2*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist2_1.push(json);
        })
        mediaPv.forEach((item,index)=>{
          var datestr = item.item1;
          var newtime = item.item2*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist2_2.push(json);
        })
        mediaUv.forEach((item,index)=>{
          var datestr = item.item1;
          var newtime = item.item2*1;
          let json={};
          json.name = datestr;
          json.value = newtime;
          datelist2_3.push(json);
        })
        //pv
        if(that.flowDistrNum==1){
          that.showpieCharet(datelist1_2,that.pieValueName,'客户',that.custPage)
          that.showpieCharet(datelist2_2,that.pieValueName,'媒体',that.mediaPage)
          that.showpieCharet(datelist2,that.pieValueName,'资源位',that.ziyuanPage)
        }else if(that.flowDistrNum==2){ //uv
          that.showpieCharet(datelist1_3,that.pieValueName,'客户',that.custPage)
          that.showpieCharet(datelist2_3,that.pieValueName,'媒体',that.mediaPage)
          that.showpieCharet(datelist3,that.pieValueName,'资源位',that.ziyuanPage)
        }else if(that.flowDistrNum==3){ //ip
          that.showpieCharet(datelist1_1,that.pieValueName,'客户',that.custPage)
          that.showpieCharet(datelist2_1,that.pieValueName,'媒体',that.mediaPage)
          that.showpieCharet(datelist1,that.pieValueName,'资源位',that.ziyuanPage)
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //流量分布饼状图
    showpieCharet (datelist,pieValueName,Name,pieIDNAME){
      var that = this;
      var myChart = echarts.init(document.getElementById(pieIDNAME));
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
        var name = params.data.name;
        console.log("params",params);
        console.log("Name",Name);
        //其他种类不可跳转
        // paramsn.name 和Name为跳转传参
        if(Name=='客户'&& name !== '其他'){//即公司-1级
          // this.$store.commit('header/setActiveIndex', index)
          that.$router.push({
            name: 'mohDMeedia',
            params: {CompanyName:name} 
          })
          // that.$router.push({ name: 'mohDMeedia', params: {CompanyName:name} });
        }else if(Name=='媒体'&& name !== '其他'){//即媒体-2级
          that.$router.push({
            name: 'mohDMeedia',
            params: {MediaName:name} 
          })
          // that.$router.push({ name: 'mohDMeedia', params: {MediaName:name} });
        }else if(Name=='资源位'&& name !== '其他'){//即资源位-3级
          that.$router.push({
            name: 'mohDMeedia',
            params: {ChannelName:name} 
          })
          // that.$router.push({ name: 'mohDMeedia', params: {ChannelName:name} });
        }
        var detailList = [];
        var detailArr = [];
        detailArr[0] =  name;
        detailList.push(detailArr);
        detailList = JSON.stringify(detailList);
        window.LogList.checkLog('二郎神后台管理系统',that.title,'流量饼状图跳转选择',detailList);
      })
    },
    //获取昨日今日概况数据
    getmoheRecentData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getmoheRecentData,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.recentData1 = res.data[0];
        that.recentData2 = res.data[1];
        that.recentData3 = res.data[2];
        console.log("recentData1",that.recentData1);
        console.log("recentData2",that.recentData2);
        console.log("recentData3",that.recentData3);
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
        url:URL.recordUrl.getmohePartData+"?starttime="+that.echartDefaultDate[0]+"&endTime="+that.echartDefaultDate[1],
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
          var ipData = res.data.ipData;
          var pvData = res.data.pvData;
          var uvData = res.data.uvData;
          var xData = res.data.xData;
          that.showechart(ipData,pvData,uvData,xData,that.IDNAME,that.btnType);
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
        url:URL.recordUrl.getmoheGettop,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.custTableDataIP = res.data.compIp;
        that.mediaTableDataIP = res.data.mediaIp;
        that.zywTableDataIP = res.data.channelIp;

        that.custTableDataPV = res.data.compPv;
        that.mediaTableDataPV = res.data.mediaPv;
        that.zywTableDataPV = res.data.channelPv;

        that.custTableDataUV = res.data.compUv;
        that.mediaTableDataUV = res.data.mediaUv;
        that.zywTableDataUV = res.data.channelUv;
        
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
      window.LogList.checkLog('二郎神后台管理系统',this.title,'流量趋势日期选择',detailList);
    },
    //实现趋势图
    showechart(ipData,pvData,uvData,xData,idName,btnType){
      var myChart = echarts.init(document.getElementById(idName));
      //根据趋势图显示类型切换对数据中的值做处理以便于在坐标轴上显示(同时将最大值*2)
      //btnType1-数值类型 2-时分秒类型 3- 百分比类型
      var option = {
        // title: {
        //     text: ''
        // },
        tooltip: {
            trigger: 'axis'
        },
        color:['#4DD973','#F19149','#F65B57'],
        legend: {
            data: ['浏览量', '访客数', 'IP']
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
                name: '浏览量',
                type: 'line',
                stack: '总量',
                data: pvData,
                lineStyle:{
                  color:'#4DD973' //改变折线颜色
                }
            },
            {
                name: '访客数',
                type: 'line',
                stack: '总量',
                data: uvData,
                lineStyle:{
                  color:'#F19149' //改变折线颜色
                }
            },
            {
                name: 'IP',
                type: 'line',
                stack: '总量',
                data: ipData,
                lineStyle:{
                  color:'#F65B57' //改变折线颜色
                }
            }
        ]
      };
      myChart.setOption(option);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/moheboxFlow.less';
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
