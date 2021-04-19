<template>
  <div class="videoSkipTop10" v-loading="loading">
    <div class="videoData">
      <h1>斑点狗SDK视频播放TOP100</h1>
        <el-table
          :data="videoTop10"
          stripe
          style="width: 100%"
          :header-cell-style="{background:'#E2E2EB',color:'#333'}">
          <el-table-column
            fixed
            prop="title"
            label="标题"
            width="520"
            align="center">
          </el-table-column>
          <el-table-column
            prop="videoId"
            label="视频ID"
            align="center">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类别"
            align="center">
          </el-table-column>
          <el-table-column
            prop="playCount"
            label="播放量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="pv"
            label="（电商）链接点击次数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="uv"
            label="（电商）链接点击人数"
            align="center">
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
export default {
  name: 'userSkipTop10',
  data () {
    return {
      title:'视频播放top',
      videoTop10:[],
      rightName:'',
      rightSelect:'',
      loading: true,
    }
  },
  created(){
    document.title = this.title;
    this.rightName = this.$route.params.rightName
    this.rightSelect = this.$route.params.rightSelect
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.videoTop100();//获取默认时间
  },
  methods: {
    videoTop100() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getbdgsdkvideoplaytop+"?SourceType="+that.rightSelect+'&TopCount=100',
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.videoTop10 = res.data;
      }).catch(function (err) {
        console.log(err);
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/videoSkipTop10.less';
</style>
