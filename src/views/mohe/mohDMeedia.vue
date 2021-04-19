<template>
  <div class="appSurvey" v-loading="loading">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <!-- <span class="">分媒体数据</span> -->
          <el-tabs v-model="PageName" @tab-click="PageNameBtn" class="spanBtn">
            <el-tab-pane label="总流量" name="1"></el-tab-pane>
            <el-tab-pane label="落地页" name="2"></el-tab-pane>
            <el-tab-pane label="列表页" name="3"></el-tab-pane>
            <el-tab-pane label="播放页" name="4"></el-tab-pane>
          </el-tabs>
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
          <el-cascader 
             v-model="rightName"
              placeholder="输入或选择"
             expandTrigger="hover"
             filterable
            :options="options" 
            change-on-select
            :show-all-levels="false"
            @change="changeRight()"
            >
          </el-cascader>
          <!-- <div class="MenuLevel">
            <div class="MenuData"></div>
            <div class="menuBox">
              <div class="oneLevel" v-for='(MenuOne,indexOne) in options' :key=indexOne>
                <div><span></span>{{MenuOne.value}}</div>
                <div class="twoLevelBox">
                  <div class="twoLevel" v-for="(MenuTwo,indexTwo) in MenuOne.children" :key=indexTwo>
                    <div><span>{{MenuTwo.value}}</span></div>
                    <div class="threeLevelBox">
                      <div class="threeLevel" v-for="(menuThree,indexThree) in MenuTwo.children" :key=indexThree>
                        <div><span></span>{{menuThree.value}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="surveyContainer">
        <div class="surveyTop">
          <h3>数据总览</h3>
          <div class="" v-if="PageName==2||PageName==3">
            <div class="surveyDataTop">
              <el-row :gutter="20">
                <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple surveySort">浏览量(PV)</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveySort">访客数(UV)</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveySort">IP数(IP)</div></el-col>
              </el-row>
            </div>
            <div class="surveyDataBottom">
              <el-row :gutter="20" v-for="(item,index) in recentData" :key="index">
                <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple surveyDataNum">{{item.pv}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.uv}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.ip}}</div></el-col>
              </el-row>
            </div>
          </div>
          <div v-if="PageName==1||PageName==4">
            <div class="surveyDataTop">
              <el-row :gutter="20">
                <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple surveySort">浏览量(PV)</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveySort">访客数(UV)</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveySort">IP数(IP)</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveySort">观看视频数</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveySort">人均观看视频数</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveySort">人均观看时长</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveySort">≥30分人数</div></el-col>
              </el-row>
            </div>
            <div class="surveyDataBottom">
              <el-row :gutter="20" v-for="(item,index) in recentData" :key="index">
                <el-col :span="1.5"><div class="grid-content bg-purple surveyDatatitle">昨日</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple surveyDataNum">{{item.pv}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.uv}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.ip}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.videoPlays}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.playCountPerPerson}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.useTimePerPerson}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple surveyDataNum">{{item.goodUsers}}</div></el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="surveyEchart">
          <div class="DMtop">
            <h2>流量趋势</h2>
            <!-- <a class="surveyDown" id="surveyDown" :href="downloadExcelUrl">下载数据</a> -->
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
            <el-radio-group v-model="PageName2_3" class="choseType" @change="changeEchartBtn()" v-if="PageName==2||PageName==3">
              <el-radio-button label="1">浏览量</el-radio-button>
              <el-radio-button label="2">访客数</el-radio-button>
              <el-radio-button label="3">IP</el-radio-button>
            </el-radio-group>
            
          </div>
          <el-tabs v-model="PageName1_4" @tab-click="changeEchartBtnLanding()" v-if="PageName==1||PageName==4">
              <el-tab-pane label="浏览量（PV）" name="1" >
                
              </el-tab-pane>
              <el-tab-pane label="访客数（UV）" name="2" >
                
              </el-tab-pane>
              <el-tab-pane label="IP数(IP)" name="3" >
                
              </el-tab-pane>
              <el-tab-pane label="视频播放量" name="4">
                
              </el-tab-pane>
              <el-tab-pane label="人均播放量" name="5">
                
              </el-tab-pane>
              <el-tab-pane label="人均观看时长" name="6">
                
              </el-tab-pane>
              <el-tab-pane label="≥30分钟人数" name="7">
                
              </el-tab-pane>
            </el-tabs>
          <div class="surveyEchartBox">
            <div class="surveyEchartlist">
              
            </div>
            <div class="surveyEchartimg">
              <div :id="IDNAME" style="height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="surveyDetailBox">
          <div class="DetailBoxTop">
            <h3>明细数据</h3>
            <a class="surveyDown" id="surveyDown1" :href="downloadDetailExcelUrl">下载数据</a>
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
                prop="pv"
                label="浏览量(PV)"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="uv"
                label="访客数(UV)"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="ip"
                label="IP数(IP)"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="videoPlays"
                label="观看视频数"
                align="center"
                v-if="PageName==1||PageName==4"
                >
              </el-table-column>
              <el-table-column
                prop="playCountPerPerson"
                label="人均观看视频数"
                align="center"
                v-if="PageName==1||PageName==4"
                >
              </el-table-column>
              <el-table-column
                prop="useTimePerPerson"
                label="人均观看时长"
                align="center"
                v-if="PageName==1||PageName==4"
                >
              </el-table-column>
              <el-table-column
                prop="goodUsers"
                label=">30分人数"
                align="center"
                v-if="PageName==1||PageName==4"
                >
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
  name: 'xcxsurvey',
  data () {
    return {
      title:'分媒体数据',
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
      recentData:[],//昨日今日数据
      CompanyName: '',//右上角选中公司名-1级
      MediaName: '',//右上角选中值媒体 -2级
      ChannelName:'',//右上角选中值渠道 -3级
      partData:'',//趋势图数据
      options: [],
      rightName:'',
      loading: true,
      IDNAME:'echart2',//趋势渲染区域id
      Valuename:'浏览量（PV）',//趋势图指标名字
      btnType:1,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
      downloadExcelUrl:'',//下载数据的地址
      downloadDetailExcelUrl:'',//下载表格数据
      PageType:1,//1-4 总流量 落地页 列表页 播放页参数传值
      rightNameType:1,// 1 - 3  一级【公司】 二级【媒体】 三级【渠道】
      PartType:'1',//pagetype 是 1 4时，有 1 -7选项， pagetype 是 2  3时，有 1 -3选项， 
      PageName:'1',//页面数据展示类型（做布局判断）
      PageName1_4:'1',//总流量、播放页数据类型时趋势图默认点击事件 不参与传参
      PageName2_3:'1',//列表、落地数据类型趋势图默认点击事件 不参与传参
    }
  },
  created(){
    document.title = this.title;
    //接收从魔盒流量跳转过来的参数
    // debugger
    // if(this.$route.params.CompanyName){
    //   this.CompanyName = this.$route.params.CompanyName;
    //   this.rightName = this.$route.params.CompanyName;
    // }else if(this.$route.params.MediaName){
    //   this.MediaName = this.$route.params.MediaName;
    //   this.rightName = this.$route.params.MediaName;
    // }else if(this.$route.params.ChannelName){
    //   this.ChannelName = this.$route.params.ChannelName;
    //   this.rightName = this.$route.params.ChannelName;
    // } 
  },
  activated (){
    document.title = this.title;
    if(this.$route.params.CompanyName){
      this.CompanyName = this.$route.params.CompanyName;
      this.rightName = this.$route.params.CompanyName;
    }else if(this.$route.params.MediaName){
      this.MediaName = this.$route.params.MediaName;
      this.rightName = this.$route.params.MediaName;
    }else if(this.$route.params.ChannelName){
      this.ChannelName = this.$route.params.ChannelName;
      this.rightName = this.$route.params.ChannelName;
    } 
  },
  mounted() {
    this.bindDrawal();//获取默认时间
    //获取右上角筛选下拉菜单
    this.getSelectList();
  },
  methods: {
    //获取当前默认一周的时间并放入趋势图和详情表的日期
    bindDrawal(){
      this.echartDefaultDate.push(this.common.formatDate(-7),this.common.formatDate(-1))
      this.getAppRecentData();//获取魔盒概况数据
      this.getPartData();
      this.getDetails();
    },
    PageNameBtn() {
      console.log("数据展示类型",this.PageName);
      if(this.PageName==1||this.PageName==4){
        this.PageName1_4 = '1'
        this.PartType = 1
        this.Valuename = '浏览量（PV）'
      }else{
        this.PageName2_3 = '1'
        this.PartType = 1
        this.Valuename = '浏览量'
      }
      this.PageType = this.PageName;
      this.getAppRecentData();
      this.getDetails();
      this.getPartData();
      var mediaTypePage;
      if(this.PageName==1){
        mediaTypePage = '总流量';
      }else if(this.PageName==2){
        mediaTypePage = "落地页";
      }else if(this.PageName==3){
        mediaTypePage = '列表页'
      }else if(this.PageName==4){
        mediaTypePage = '播放页';
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] = mediaTypePage;
      detailArr[1] = this.Valuename;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'流量趋势分类切换',detailList);
    },
    //获取右上角筛选下拉菜单
    getSelectList(){
      var that = this;
        http({
          //这里是你自己的请求方式、url和data参数
          method: 'get',
          url:URL.recordUrl.getmoheGetConfig,
          data: {},
          //假设后台需要的是表单数据这里你就可以更改
          headers: {
            "Content-Type":"application/x-www-form-urlencoded",
          }
        }).then(function (res) {
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
              var itemValueChild = itemValue.children;
              for(var j=0;j<itemValueChild.length;j++){
                var itemValue2 = itemValueChild[j];
                if(itemValue2.label==null){
                  itemValue2.label=itemValue2.value;
                }
              }
            }
          })
          console.log(that.options);
        }).catch(function (err) {
          console.log(err);
      });
    },
    changeEchartBtnLanding(){
      if(this.PageName1_4==1){
        this.PartType = this.PageName1_4
        this.Valuename = '浏览量（PV）'
        this.IDNAME = 'echart1'
        this.btnType = 1
      }else if(this.PageName1_4==2){
        this.PartType = this.PageName1_4
        this.Valuename = '访客数（UV）'
        this.IDNAME = 'echart2'
        this.btnType = 1
      }else if(this.PageName1_4==3){
        this.PartType = this.PageName1_4
        this.Valuename = 'IP数(IP)'
        this.IDNAME = 'echart3'
        this.btnType = 1
      }else if(this.PageName1_4==4){
        this.PartType = this.PageName1_4
        this.Valuename = '视频播放量'
        this.IDNAME = 'echart4'
        this.btnType = 1
      }else if(this.PageName1_4==5){
        this.PartType = this.PageName1_4
        this.Valuename = '人均播放量'
        this.IDNAME = 'echart5'
        this.btnType = 1
      }else if(this.PageName1_4==6){
        this.PartType = this.PageName1_4
        this.Valuename = '人均观看时长'
        this.IDNAME = 'echart6'
        this.btnType = 2
      }else if(this.PageName1_4==7){
        this.PartType = this.PageName1_4
        this.Valuename = '≥30分人数'
        this.IDNAME = 'echart7'
        this.btnType = 1
      }
      this.getPartData();
      var mediaTypePage;
      if(this.PageName==1){
        mediaTypePage = '总流量';
      }else if(this.PageName==2){
        mediaTypePage = "落地页";
      }else if(this.PageName==3){
        mediaTypePage = '列表页'
      }else if(this.PageName==4){
        mediaTypePage = '播放页';
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  mediaTypePage;
      detailArr[1] =  this.Valuename;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'流量趋势分类切换',detailList);
    },
    changeRight() {
      console.log("value",this.rightName);
      if(this.rightName.length==1){
        this.CompanyName = this.rightName[0]
        this.rightNameType = 1;
        this.MediaName = '';
        this.ChannelName = ''
      }else if(this.rightName.length==2){
        this.CompanyName = this.rightName[0]
        this.MediaName = this.rightName[1];
        this.rightNameType = 2;
        this.ChannelName = ''
      }else if(this.rightName.length==3){
        this.CompanyName = this.rightName[0]
        this.rightNameType = 3;
        this.MediaName = this.rightName[1];
        this.ChannelName = this.rightName[2]
      }
      console.log(this.CompanyName,this.MediaName,this.ChannelName);
      this.getAppRecentData();
      this.getDetails();
      this.getPartData();
      this.loading = true;
      var detailList = [];
      var detailArr = [];
      detailArr =  this.rightName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'渠道分类切换',detailList);
    },
    //获取昨日今日概况数据
    getAppRecentData (){
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getmoheDMRecentData+'?PageType='+that.PageType+'&CompanyName='+that.CompanyName+'&MediaName='+that.MediaName+'&ChannelName='+that.ChannelName,
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
      if(this.PageName2_3==1){
        this.PartType = 1
        this.Valuename = '浏览量'
        this.IDNAME = 'echart1_1'
        this.btnType = 1
      }else if(this.PageName2_3==2){
        this.PartType = 2
        this.Valuename = '访客数'
        this.IDNAME = 'echart1_2'
        this.btnType = 1
      }else if(this.PageName2_3==3){
        this.PartType = 3
        this.Valuename = 'IP'
        this.IDNAME = 'echart1_3'
        this.btnType = 1
      }
      this.getPartData();
      var mediaTypePage;
      if(this.PageName==1){
        mediaTypePage = '总流量';
      }else if(this.PageName==2){
        mediaTypePage = "落地页";
      }else if(this.PageName==3){
        mediaTypePage = '列表页'
      }else if(this.PageName==4){
        mediaTypePage = '播放页';
      }
      
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  mediaTypePage;
      detailArr[1] =  this.Valuename;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'流量趋势图分类切换',detailList);
    },
    //获取趋势图数据
    getPartData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getmoheDMPartData+"?PageType="+that.PageType+"&startTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1]+'&CompanyName='+that.CompanyName+'&MediaName='+that.MediaName+'&ChannelName='+that.ChannelName+'&PartType='+that.PartType,
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
        url:URL.recordUrl.getmoheDMDetails+"?PageType="+that.PageType+"&startTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1]+'&CompanyName='+that.CompanyName+'&MediaName='+that.MediaName+'&ChannelName='+that.ChannelName,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.tableData = res.data;
        that.downloadDetailE();
        console.log("表格数据",that.tableData);

      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取表格导出
    downloadE(){
      this.downloadExcelUrl = URL.recordUrl.getmoheDMPartDataExport+"?startTime="+this.echartDefaultDate[0]+"&endtime="+this.echartDefaultDate[1]+'&PageType='+this.PageType+'&CompanyName='+this.CompanyName+'&MediaName='+this.MediaName+'&ChannelName='+this.ChannelName;
    },
    downloadDetailE(){
      this.downloadDetailExcelUrl =  URL.recordUrl.getmoheDMPartDataExport+"?startTime="+this.echartDefaultDate[0]+"&endtime="+this.echartDefaultDate[1]+'&PageType='+this.PageType+'&CompanyName='+this.CompanyName+'&MediaName='+this.MediaName+'&ChannelName='+this.ChannelName;
    },
    changeEchartTime() {
      console.log(this.echartDefaultDate);
      this.getPartData()
      var mediaTypePage;
      if(this.PageName==1){
        mediaTypePage = '总流量';
      }else if(this.PageName==2){
        mediaTypePage = "落地页";
      }else if(this.PageName==3){
        mediaTypePage = '列表页'
      }else if(this.PageName==4){
        mediaTypePage = '播放页';
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  mediaTypePage;
      detailArr[1] =  this.echartDefaultDate[0];
      detailArr[2] =  this.echartDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'流量趋势日期选择',detailList);
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
      },true);
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/mohDMeedia.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
 /deep/.el-range-editor.el-input__inner{
  width: 25%;
  height: 35px;
  padding: 0px 10px;
}
/deep/.el-radio-button__inner{
  padding:9px 15px !important;
}
/deep/.spanBtn .el-tabs__nav-wrap::after{
  background-color: #fff;
}
</style>
