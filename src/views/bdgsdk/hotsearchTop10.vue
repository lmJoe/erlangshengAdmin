<template>
  <div class="userSkipTop10" v-loading="loading">
    <div class="userData">
      <h1>搜索词</h1>
      <el-table
        :data="hotsearchTop10"
        :header-cell-style="{background:'#E2E2EB',color:'#333'}"
        style="font-size: 10px;width: 100%">
        <el-table-column
          fixed
          prop="world"
          label="搜索词"
          width="280">
        </el-table-column>
        <el-table-column
          prop="pv"
          label="点击次数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="uv"
          label="点击人数"
          width=""
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
  name: 'hotsearchTop10',
  data () {
    return {
      title:'搜索词top',
      hotsearchTop10:[],
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
    this.getbdgProdTop()
  },
  methods: {
    //商品点击top10
    getbdgProdTop() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getSDKworldsTop+"?MediaName="+this.rightSelect+'&TopCount=100',
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.hotsearchTop10 = res.data;
        that.loading = false;
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
