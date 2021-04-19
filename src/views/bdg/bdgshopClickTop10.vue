<template>
  <div class="userSkipTop10" v-loading="loading">
    <div class="userData">
      <h1>斑点狗商品点击TOP100</h1>
      <el-table
      :data="shopClickTop10"
      stripe
      style="width: 100%"
      :header-cell-style="{background:'#E2E2EB',color:'#333'}">
      <el-table-column
        fixed
        prop="title"
        label="商品标题"
        width="280">
      </el-table-column>
      <el-table-column
        prop="videoId"
        label="视频id"
        align="center">
      </el-table-column>
      <el-table-column
        prop="playCount"
        label="点击次数"
        width="100"
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
  name: 'bdgshopClickTop10',
  data () {
    return {
      title:'商品点击top',
      shopClickTop10:[],
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
        url:URL.recordUrl.getbdgProdTop+"?SourceType="+that.rightSelect+'&TopCount=100',
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.shopClickTop10 = res.data;
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
