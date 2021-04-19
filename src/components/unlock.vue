<template>
  <div class="unlock">
    <div class="modelbox" v-if="modelboxShow==true">
      <div class="modelbox_unlock">
          <div class="unlock_title">
              您的账号被锁定，请解锁！
          </div>
          <div class="form-group">
              <div class="col-sm-12">
                  <input type="text" class="lockmm" v-model="password" placeholder="请输入验证码">
              </div>
          </div>
          <button type="button" class="unlockbtn" @click="unlockbtn()">解锁</button>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
// import store from '@/store/index';
export default {
  name: 'App',
  data () {
    return {
      title: '',
      password:'',//解锁验证码
      modelboxShow:false,
    }
  },
  watch: {
    '$store.state.code'(newval, olval) {
      console.log(newval,olval);
      if(newval==90001){
        this.modelboxShow = true;
      }else if(newval==1001){
        window.location.href = 'https://pxtadmin.com/'
      }
    },
  },
  activated (){
    document.title = this.title;
    console.log("store",this.$store.state.code)
    var store = this.$store.state.code
    if(store==90001){
        this.modelboxShow = true;
    }else if(store==1001){
      window.location.href = 'https://pxtadmin.com/'
    }
  },
  mounted() {
    document.title = this.title;
    var store = this.$store.state.code
    if(store==90001){
        this.modelboxShow = true;
    }else if(store==1001){
      window.location.href = 'https://pxtadmin.com/'
    }
  },
  methods: {
    //解锁
    unlockbtn(){
      var that = this;
      var obj = {
        Pwd:that.password
      }
      obj = JSON.stringify(obj);
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'post',
        url:URL.recordUrl.Unlock,
        data:obj,
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/json",
        }
      }).then(function (res) {
        that.loading = false;
        that.modelboxShow = false;
        location.reload() 
      }).catch(function (err) {
        console.log(err);
      });
    }
  }
}
</script>

<style scoped lang="less">
@import '../assets/css/style.less';
.unlock{
  .modelbox{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:10000;
    background:rgba(0,0,0,.5);
    .modelbox_unlock{
      width:300px;
      height:200px;
      background:#fff;
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      margin:auto;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      box-sizing: border-box;
      .unlock_title{
        padding: 20px 20px 10px;
      }
      .unlockbtn{
        box-sizing: border-box;
        display: block;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        font-size: 14px;
        border-radius: 4px;
        width:75%;
        height:40px;
        line-height:40px;
        margin:20px auto 0;
        background:#396FFF;
        color:#fff;
      }
      .lockmm{
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 75%;
        margin:20px auto;
      }
      
    }
  }
}
</style>
