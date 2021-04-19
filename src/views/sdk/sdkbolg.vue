<template>
  <div class="dataBlog">
    <div class="dataBlogContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">更新日志</span>
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
      <div class="BlogContainer">
        <div class="blogBox">
          <div class="oneTop">
            <div class="box">
              <span>选择日期：</span>
              <el-date-picker
                v-model="DefaultDate"
                value-format="yyyy-MM-dd"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="expireTimeOption"
                class="surveyTime"
                @change="changeTimeFINANCE"
                >
              </el-date-picker>
            </div>
          </div>
          <div class="searchBox">

          </div>
        </div>
       
        <div class="blogBotton">
          <div class="" v-for="(item,index) in tableData" :key=index>
            <div class="blogList">
              <div class="dataTime">{{item.dateId}}</div>
              <div class="dataList" v-for="(item1,index1) in item.data" :key=index1>
                <p>{{item1.time}}</p>
                <p class="accountSpan">{{item1.userName}}</p>
                <p>{{item1.message}}</p>
                <!-- <p class="num">200.00</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
export default {
  name: 'videoData',
  data () {
    return {
      title:'更新日志',
      DefaultDate:[],
      expireTimeOption: {
        // disabledDate(time) {
        //   let curDate = (new Date()).getTime();
        //   let three = 3600 * 1000 * 24 * 4;
        //   let threeMonths = curDate - three;
        //   return time.getTime() > Date.now() || time.getTime() < threeMonths;;
        // }
      },
      tableData:[],
      count:'',
    }
  },
  created(){
    document.title = this.title;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
   this.DefaultDate.push(this.common.formatDate(-7),this.common.formatDate(1))
   this.BolgList();
  },
  methods: {
    // buttonValue(){
    //   var detailList={ //修改
    //     "人员工资":1564.00,
    //     "办公":5000.00,
    //     "报销":1500.00,
    //   };
    //   detailList = JSON.stringify(detailList)
    //   window.LogList.checkLog('二郎神后台管理系统',"数据录入-广告部","增加",detailList);
    // },
    changeTimeFINANCE(){
      this.BolgList();
    },
    // BolgList() {
    //  var that = this;
    //   http({
    //     //这里是你自己的请求方式、url和data参数
    //     method: 'get',
    //     url:URL.recordUrl.getBBgetlog+"?starttime="+that.DefaultDate[0]+"&endTime="+that.DefaultDate[1],
    //     data: {},
    //     //假设后台需要的是表单数据这里你就可以更改
    //     headers: {
    //       "Content-Type":"application/x-www-form-urlencoded",
    //     }
    //   }).then(function (res) {
    //     that.loading = false;
    //     that.tableData = res.data.response;
    //     // that.count = res.data.count;
    //     console.log(that.tableData);

    //   }).catch(function (err) {
    //     console.log(err);
    //   });
    // }
    BolgList() {
      var sTime = this.DefaultDate[0];
      var eTime = this.DefaultDate[1];
      window.LogList.getConf(".searchBox",".blogBotton","二郎神后台管理系统",sTime,eTime);
      var pullTime = setInterval(() => {
        console.log("pullLog2",window.LogList.init.dataList);
        if(window.LogList.init.dataList){
          clearInterval(pullTime);
        }
      }, 200);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 /deep/.el-input__inner{
  width:250px;
}
.dataBlog{
  background:#F2F2F6;
  width:100%;
  .dataBlogContainer{
    .headContainer{
      height: 50px;
      line-height: 50px;
      background: #fff;
      margin-bottom: 20px;
      display: flex;
      padding:0 20px;
      justify-content:space-between;
      border-bottom: 3px solid #fff;
      border-left: 1px solid #EFEFEF;
      .pagetarge{
        display: flex;
        justify-content:space-between;
        .arget{
          display:none;
          margin-left: 5px;
          // display: block;
          width: 20px;
          // background: url(../imgs/norm.png) no-repeat center center;
          background-size: 80%;
          cursor: pointer;
          position:relative;
          .argetTxt{
            display:none;
            position:absolute;
            top:17px;
            left:27px;
            width:700px;
            padding:20px;
            background:#EBEEF5;
            z-index:10;
            text-align:left;
            h3{
              font-size:18px;
              color:#333;
              line-height:30px;
            }
            p{
              font-size:14px;
              color:#666;
              line-height:25px;
            }
          }
          
        }
        .arget:hover .argetTxt{
          display:block;
        }
      }
    }
    .BlogContainer{
      margin: 15px;
      .blogBox{
        background: #fff;
        padding: 20px;
        margin-top: 20px;
        .oneTop{
          .box{
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: start;
          -ms-flex-pack: start;
          justify-content: flex-start;
          margin-bottom: 20px;
          span{
            width: 100px;
            display: block;
            font-size: 15px;
            text-align: right;
            line-height: 35px;
          }
        }
        }
        
      }
      .searchBox{
        display: flex;
        justify-self: start;
        div{
          display: flex;
          justify-self: start;
          span{
            display:block;
          }
        }
      }
      .blogBotton{
        background: #fff;
        padding: 20px;
        margin-top: 20px;
        // height:600px;
        .blogList{
          margin-bottom:30px;
          .dataTime{
            text-align:left;
            font-size:14px;
            color:#333438;
            margin-bottom:15px;
          }
          .dataList{
            display: flex;
            justify-self: start;
            p{
              font-size:12px;
              color:#7C7C84;
              line-height:25px;
              margin:5px 2px;
            }
            .accountSpan{
              font-size:12px;
              color:#2689FF;
              line-height:25px;
            }
            .num{
              color:#333438;
            }
          }
        }
      }
    }
  }
}
</style>
