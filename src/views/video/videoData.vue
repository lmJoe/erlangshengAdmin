<template>
  <div class="appSurvey">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">视频数据查询</span>
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
            <el-col :span="6" class="box">
              <span>发布时间：</span>
              <el-date-picker
                v-model="echartDefaultDate"
                value-format="yyyy-MM-dd"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始"
                end-placeholder="结束"
                :picker-options="pickerOptions"
                class="commonClass"
                @change="changeEchartTime"
                >
              </el-date-picker>
            </el-col>
            <el-col :span="6" class="box">
              <span>视频标题/标签：</span>
              <el-select v-model="tagValue" placeholder="请选择" class="commonClass">
                <el-option
                  v-for="item in tagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="box">
              <span>关键字：</span>
              <el-input v-model="keywordValue" class="commonClass" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="6" class="box">
              <span>视频ID：</span>
              <el-input v-model="videoIdValue" class="commonClass"  placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="6" class="box">
              <span>用户ID：</span>
              <el-input v-model="UserIdValue" class="commonClass"  placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="6" class="box">
              <span>是否可分发：</span>
              <el-select v-model="dispenseValue" placeholder="请选择" class="commonClass">
                <el-option
                  v-for="item in dispenseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="box">
              <span>视频类型：</span>
              <el-select v-model="videoType" placeholder="请选择" class="commonClass">
                <el-option
                  v-for="item in videoTypeValue"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="box">
              <span>账号等级：</span>
              <el-select v-model="levelValue" multiple placeholder="请选择" class="commonClass">
                <el-option
                  v-for="item in levelCont"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="box">
              <span>类目：</span>
              <el-select v-model="TypeValueAll" placeholder="请选择" class="commonClass">
                <el-option
                  v-for="item in TypeValueAllList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <div class="Allbtn">
            <el-row class="btndata">
              <el-button type="primary" @click="searchBtn()" v-loading.fullscreen.lock="fullscreenLoading">查询</el-button>
            </el-row>
             <a class="exportBtn" :href=downloadExcelUrl :disabled=disabled>导出</a>
            <div class="searchResult" v-if="count==''">查询结果：<span>0</span>条</div>
            <div class="searchResult" v-if="count!==''">查询结果：<span>{{count}}</span>条</div>
          </div>
        </div>
        <div class="videoDataBottom">
          <el-table
            :data="recentData"
            style="width: 100%"
            :header-cell-style="{background:'#E2E2EB',color:'#333'}">
            <el-table-column
              fixed
              type="index"
              label="序号"
              width="50"
              :index="indexMethod"
               align="center">
            </el-table-column>
            <el-table-column
              prop="imdbid"
              label="视频ID"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="filmname"
              label="视频标题"
              width="470"
              align="center">
            </el-table-column>
            <el-table-column
              prop="placard1url"
              label="封面URL"
              width="440"
              align="center">
            </el-table-column>
            <el-table-column
              prop="url"
              label="视频URL"
              width="300"
              align="center">
            </el-table-column>
            <el-table-column
              prop="createuser"
              label="用户ID"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="channelname"
              label="用户名称"
              width="150"
              align="center">
            </el-table-column>
            <el-table-column
              prop="createtime"
              label="上传时间"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="classname"
              label="类目"
              align="center">
            </el-table-column>
            <el-table-column
              prop="distributable"
              label="是否可分发"
              width="120"
              :formatter="distributableOr"
              align="center">
            </el-table-column>
            <el-table-column
              prop="isplubic"
              label="视频类型"
              :formatter="videoTypeOr"
              align="center">
            </el-table-column>
            <el-table-column
              prop="accountlevel"
              label="账号等级"
              align="center">
            </el-table-column>
          </el-table>
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
const cityOptions = ['A', 'B', 'C', 'S', '未评审'];
export default {
  name: 'videoData',
  data () {
    return {
      title:'视频数据查询',
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
        }, {
          text: '全部',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7499);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      echartDefaultDate: [],//趋势图查询时间，可指定默认显示时间
      tagOptions:[{
          value: 1,
          label: '视频标题'
        }, {
          value: 2,
          label: '视频标签'
      }],
      tagValue:1,//视频标题默认值
      keywordValue:'',//关键字
      videoIdValue:'',//视频id
      UserIdValue:'',//用户id
      levelCont: [{
          value: 'A',
          label: 'A'
        }, {
          value: 'B',
          label: 'B'
        }, {
          value: 'C',
          label: 'C'
        }, {
          value: 'S',
          label: 'S'
        }, {
          value: '未评审',
          label: '未评审'
      }],
      levelValue:[],//账号等级
      dispenseValue:-1,//是否分发
      dispenseOptions:[{
          value: -1,
          label: '全部'
        },
        {
          value: 1,
          label: '是'
        }, {
          value: 0,
          label: '否'
      }],//是否可分发
      videoType:-1,//视频类型
      videoTypeValue:[{
          value: -1,
          label: '全部'
        },{
          value: 100,
          label: '小视频'
        },{
          value: 200,
          label: '横屏'
      }],
      TypeValueAll:'',
      TypeValueAllList:[{
        value: '',
        label: '全部'
        },{
        value: 1,
        label: '健康'
        },{
        value: 2,
        label: '娱乐'
        },{
        value: 3,
        label: '奇闻'
        },{
        value: 4,
        label: '情感'
        },{
        value: 5,
        label: '社会'
        },{
        value: 6,
        label: '搞笑'
        },{
        value: 7,
        label: '军事'
        },{
        value: 8,
        label: '历史'
        },{
        value: 9,
        label: '生活'
        },{
        value: 10,
        label: '美女'
        },{
        value: 11,
        label: '帅哥'
        },{
        value: 12,
        label: '影视'
        },{
        value: 13,
        label: '舞蹈'
        },{
        value: 14,
        label: '音乐'
        },{
        value: 15,
        label: '时尚'
        },{
        value: 16,
        label: '动漫'
        },{
        value: 17,
        label: '游戏'
        },{
        value: 18,
        label: '曲艺'
        },{
        value: 19,
        label: '体育'
        },{
        value: 20,
        label: '星座运势'
        },{
        value: 21,
        label: '美食'
        },{
        value: 22,
        label: '旅游'
        },{
        value: 23,
        label: '财经'
        },{
        value: 24,
        label: '房产'
        },{
        value: 25,
        label: '萌宠'
        },{
        value: 26,
        label: '汽车'
        },{
        value: 27,
        label: '母婴'
        },{
        value: 28,
        label: '少儿'
        },{
        value: 29,
        label: '科技'
        },{
        value: 30,
        label: '数码'
        },{
        value: 31,
        label: '健身'
        },{
        value: 32,
        label: '教育'
        },{
        value: 33,
        label: '风月'
        },{
        value: 34,
        label: '其他'
        },
      ],
      recentData:[],//数据查询结果
      count:'',//查询条数
      currentPage:1,
      pageIndex:1,
      fullscreenLoading:false,
      downloadExcelUrl:'',//数据导出
      disabled:true,
    }
  },
  created(){
    document.title = this.title;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.echartDefaultDate.push(this.common.formatDate(-6),this.common.formatDate(0))
    // this.searchBtn()
  },
  methods: {
    changeEchartTime() {

    },
    indexMethod(index) {
       return index
    },
    //查询数据
    searchBtn() {
      this.fullscreenLoading = true;
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getvideoGetlist+"?type="+that.tagValue+"&Keyword="+that.keywordValue+"&VideoId="+that.videoIdValue+"&UserId="+that.UserIdValue+"&IsDistribute="+that.dispenseValue+"&VideoType="+that.videoType+"&AccountLevel="+that.levelValue+"&ClassId="+that.TypeValueAll+"&startTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1]+"&pageIndex="+that.pageIndex+"&pageSize=30",
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.fullscreenLoading = false;
        that.recentData = res.data.data;
        that.indexMethod();
        that.count = res.data.count;
        that.downloadExport();
        

      }).catch(function (err) {
        console.log(err);
      });
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  that.tagValue;
      detailArr[1] =  that.keywordValue;
      detailArr[2] =  that.videoIdValue;
      detailArr[3] =  that.UserIdValue;
      detailArr[4] =  that.dispenseValue;
      detailArr[5] =  that.videoType;
      detailArr[6] =  that.levelValue;
      detailArr[7] =  that.TypeValueAll;
      detailArr[8] =  that.echartDefaultDate[0];
      detailArr[9] =  that.echartDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'查询',detailList);
    },
    //数据导出
    downloadExport() {
      this.disabled=false;
      this.downloadExcelUrl = URL.recordUrl.getvideoExport+"?type="+this.tagValue+"&Keyword="+this.keywordValue+"&VideoId="+this.videoIdValue+"&UserId="+this.UserIdValue+"&IsDistribute="+this.dispenseValue+"&VideoType="+this.videoType+"&AccountLevel="+this.levelValue+"&ClassId="+this.TypeValueAll+"&startTime="+this.echartDefaultDate[0]+"&endtime="+this.echartDefaultDate[1]+"&pageIndex="+this.pageIndex+"&pageSize=30"
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.searchBtn();
    },
    videoTypeOr (row) {
      return row.isplubic==100?'小视频':(row.distributable === 200 ? '横屏视频' : '全部')
    },
    distributableOr (row) {
      return row.distributable==0?'否':(row.distributable === 1 ? '是' : '全部')
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/videoData.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
 /deep/.el-range-editor.el-input__inner{
  width: 25%;
  height: 35px;
  padding: 0px 10px;
}

</style>
