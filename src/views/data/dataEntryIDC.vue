<template>
  <div class="appSurvey">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">数据录入-数据中心</span>
          <span class="arget">
            <div class="argetTxt" >
              <h3>指标：</h3>
              <p>浏览量（PV）：当天网站的页面浏览量</p>
              <p>访客数（UV）：当天网站的页面浏览用户数</p>
              <p>IP数（IP）：当天网站的页面浏览ip数</p>
              <p>视频播放量：当天网站的视频总播放量</p>
              <p>人均播放量：当天网站的视频播放量与视频总播放人数比</p>
              <p>人均观看时长：当天网站的视频播放时长与视频总播放人数比</p>
            </div>
          </span>
        </div>
        <div class="rightSelect">
          
        </div>
      </div>
      <div class="surveyContainer">
        <div class="videoDataTop">
          <el-row :gutter="20">
            <el-col :span="7" class="box">
              <span>选择日期：</span>
              <el-date-picker
                v-model="echartDefaultDate.dateValue"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                class="commonClass"
                :picker-options="expireTimeOption"
                @change="changeMedia"
                >
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mediaContent">
            <el-col :span="7" class="box">
              <span>录入类型：</span>
              <el-select v-model="mediaValue" filterable placeholder="请选择" @change="changeMedia">
                <el-option
                  v-for="item in mediaList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="7" class="box">
              <span>录入金额：</span>
              <el-input v-model="mediaValueNum" class="commonClass" placeholder="请输入金额"></el-input>
            </el-col>
          </el-row>
          <div class="Allbtn">
            <el-row class="btndata">
              <el-button type="primary" @click="open()" v-loading.fullscreen.lock="fullscreenLoading">确认录入</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <unlock></unlock>
    </keep-alive >
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import unlock from "@/components/unlock";
export default {
  name: 'videoData',
  components: {
    unlock
  },
  data () {
    return {
      title:'数据录入-数据中心',
      echartDefaultDate: { dateValue: "" },//趋势图查询时间，可指定默认显示时间
      detailBoxDate:[],
      expireTimeOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
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
      recentData:[],//数据查询结果
      count:'',//查询条数
      currentPage:1,
      pageIndex:1,
      fullscreenLoading:false,
      mediaList:[],//选项分类
      mediaValue:'',//选项分类值
      mediaValueNum:'',//录入值
      mediaValueName:'',//选项分类名称
      mediaValueMiddle:0,//判断中间值
      recentDataHeader:[],
      tableData:[],//日志列表
    }
  },
  created(){
    document.title = this.title;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.echartDefaultDate.dateValue = this.timeDefault();
    // this.echartDefaultDate.push(this.common.formatDate(-6),this.common.formatDate(0))
    this.detailBoxDate.push(this.common.formatDate(-7),this.common.formatDate(-1));
    // this.detailData()
    this.getDcList();
  },
  methods: {
    timeDefault() {
      var date = new Date();
      var s1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()-1);
      return s1;
    },
    changeEchartTime() {
      console.log("时间",this.echartDefaultDate.dateValue)
    },
    changeBoxTime(){
      // this.detailData()
      console.log("时间",this.detailBoxDate)
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.detailBoxDate[0];
      detailArr[1] = this.detailBoxDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'明细日期选择',detailList);
    },
    changeMedia(value){
      var that = this;
      that.mediaList.forEach(function(item){
        if(item.key ==value){
          that.mediaValueName = item.value;
        }
      })
      console.log("that.mediaValue",that.mediaValue);
      if(that.echartDefaultDate.dateValue==''){
          that.$message({
            type: 'success',
            message: '请选日期'
          });
          return false;
      }
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.GetDcOld+'?DateId='+that.echartDefaultDate.dateValue+'&CId='+that.mediaValue,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        if(res.code==0){
          that.fullscreenLoading = false;
          that.mediaValueNum = res.data;
          that.mediaValueMiddle = res.data;
        }else if(res.code==1){
          that.fullscreenLoading = false;
          that.$message({
            type: 'success',
            message: res.message
          });
        }
        
      }).catch(function (err) {
        that.$message({
          type: 'success',
          message: err.data
        });
      });
    },
    //提示
    open() {
      if(this.mediaValueNum !== ''){
        var html = `<div>您要录入的数据为:</div><div class="entryList" style="display:flex;flex-wrap:wrap;">`;
            html+=`<div style="">录入金额：<span style="color:#333;font-weight:600;margin-right:20px;">${this.mediaValueNum}；</span></div>`;
            html+= `</div>`;
        this.$confirm(html, '录入提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
        }).then(() => {
          this.searchBtn();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消录入'
          });          
        });
      }else{
        this.$message.error('请输入录入数据');
      }
    },
    //录入数据
    searchBtn() {
      var obj = {
        DateId:this.echartDefaultDate.dateValue,
        CId:this.mediaValue,
        value:this.mediaValueNum,
      };
      obj = JSON.stringify(obj);
      console.log(obj);
      this.fullscreenLoading = true;
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.pushDcData,
        data: obj,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        if(res.code==0){
          that.fullscreenLoading = false;
          that.$message({
            type: 'success',
            message: res.data
          });
          // that.detailData()
          var detailList = [];
          var detailArr = [];
          detailArr[0] = that.mediaValueName;
          detailArr[1] = that.mediaValueNum;
          detailList.push(detailArr);
          detailList = JSON.stringify(detailList);
          var operType;
          if((Number(that.mediaValueNum)!==0)&&(that.mediaValueMiddle==0)){
            operType = '录入';
          }else if(Number(that.mediaValueNum) !== that.mediaValueMiddle){
            operType = '修改';
          }
          window.LogList.checkLog('二郎神后台管理系统',that.title,operType,detailList);
        }else if(res.code==1){
          that.fullscreenLoading = false;
          that.$message({
            type: 'success',
            message: res.message
          });
        }
        
      }).catch(function (err) {
        that.$message({
          type: 'success',
          message: res.data
        });
      });
    },
    getDcList(){
      this.fullscreenLoading = true;
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getDcList,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        if(res.code==0){
          that.fullscreenLoading = false;
          that.mediaList = res.data;
          that.mediaValue = res.data[0].key;
          that.mediaValueName = res.data[0].value;
          console.log("that.mediaList",that.mediaList);
          that.changeMedia();
        }else if(res.code==1){
          that.fullscreenLoading = false;
          that.$message({
            type: 'success',
            message: res.message
          });
        }
        
      }).catch(function (err) {
        that.$message({
          type: 'success',
          message: err.data
        });
      }); 
    },
    detailData(){
      this.fullscreenLoading = true;
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getDcData+"?startTime="+that.detailBoxDate[0]+"&endtime="+that.detailBoxDate[1]+"&Page="+that.pageIndex+"&Rows=30",
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.fullscreenLoading = false;
        var headerList = [];
        var recentList = [];
        that.recentDataHeader = headerList;
        that.recentData = recentList;
        for(var i=0;i<res.data[0].length;i++){
          var obj={};
          obj.label = res.data[0][i];
          switch(obj.label) {
            case '日期':
              obj.prop = "data";
              break;
            case '个性说说':
              obj.prop = "gxss";
              break;
            case '趣看视频APP':
              obj.prop = "qkspApp";
              break;
            case '世界之最':
              obj.prop = "sjzz";
              break;
            case '爆米花H5':
              obj.prop = "bmhH5";
              break;
            case '互动广告':
              obj.prop = "hdgg";
              break;
            case '魔盒广告':
              obj.prop = "mhgg";
              break;
            case '腾讯TBS':
              obj.prop = "txTBS";
              break;
            case '百度熊掌号':
              obj.prop = "bdxzh";
              break;
            case '头条小程序':
              obj.prop = "ttxcx";
              break;
            case '360快传号':
              obj.prop = "kch";
              break;
            case '其它媒体号':
              obj.prop = "qtmth";
              break;
            case '内容成本':
              obj.prop = "nrcb";
              break;
            case '魔盒联盟分账':
              obj.prop = "mhlmfz";
              break;
            case '云/cdn':
              obj.prop = "cdn";
              break;
            case '流量渠道':
              obj.prop = "llqd";
              break;
            case '人员工资':
              obj.prop = "rygz";
              break;
            case '办公':
              obj.prop = "bg";
              break;
            case '报销':
              obj.prop = "bx";
              break;
          } 
          headerList.push(obj);
          console.log("that.recentDataHeader",that.recentDataHeader);
        }
        for(var i=0;i<res.data.length;i++){
          if(i>0){
            var obj = {};
            obj.data = res.data[i][0];
            obj.gxss = res.data[i][1];
            obj.qkspApp = res.data[i][2];
            obj.sjzz = res.data[i][3];
            obj.bmhH5 = res.data[i][4];
            obj.hdgg = res.data[i][5];
            obj.mhgg = res.data[i][6];
            obj.txTBS = res.data[i][7];
            obj.bdlm = res.data[i][8];
            recentList.push(obj);
          }
        }
        consoole.log("that.recentData",that.recentData);
        
      }).catch(function (err) {
        // this.$message.error(err.message);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.searchBtn();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/dataEntryAdv.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
 /deep/.el-range-editor.el-input__inner{
  width: 25%;
  height: 35px;
  padding: 0px 10px;
}
/deep/.el-message-box__message .entryList{
  display: flex;
  justify-content: flex-start;
  div{
    span{
      color:#333;
    }
  }
}
</style>
