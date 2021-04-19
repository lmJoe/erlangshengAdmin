<template>
  <div class="userSkipTop10" v-loading="loading">
    <div class="userData">
      <h1>App用户观看TOP100</h1>
      <el-table
      :data="userTop10"
      stripe
      style="width: 100%"
      :header-cell-style="{background:'#E2E2EB',color:'#333'}">
      <el-table-column
        fixed
        prop="nickName"
        label="用户昵称"
        width="500">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="watchCount"
        label="观看视频量"
        width="100">
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
      title:'用户播放top',
      userTop10:[],
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
    this.userTop100()
  },
  methods: {
    //用户观看top10
    userTop100() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getAppUserPlayTop+"?Type="+that.rightName+'&SourceType='+that.rightSelect+'&TopCount=100',
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.userTop10 = res.data;
      }).catch(function (err) {
        console.log(err);
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/userSkipTop10.less';
</style>
