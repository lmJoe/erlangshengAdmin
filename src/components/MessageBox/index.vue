<template>
  <div class="message-box" v-show="isShowMessageBox">
    <div class="mask">
      <h3 class="title">{{ title }}</h3>
      <div>
        <input type="text" v-model="inputValue" v-if="isShowInput" ref="input" @keyup.enter="unlockbtn">
      </div>
      <div class="btn-group">
        <button class="btn-primary btn-confirm" @click="unlockbtn" v-show="isShowConfimrBtn">{{ confirmBtnText }}</button>
      </div>
    </div>
  </div>
</template>
 
<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    isShowInput: false,
    inputValue: '',
    isShowConfimrBtn: {
      type: Boolean,
      default: true
    },
    confirmBtnText: {
      type: String,
      default: '解锁'
    }
  },
  data () {
    return {
      isShowMessageBox: false,
      resolve: '',
      reject: '',
      promise: '' // 保存promise对象
    };
  },
  methods: {
    //解锁
    unlockbtn(){
      var that = this;
      if(that.inputValue){
        var obj = {
          Pwd:that.inputValue
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
          that.isShowMessageBox = false;
          that.resolve(that.inputValue);
          that.remove();
          location.reload() 
        }).catch(function (err) {
          console.log(err);
        });
      }else{
        that.$message.error('请输入密码');
      }
    },
    // 弹出messageBox,并创建promise对象
    showMsgBox: function () {
      this.isShowMessageBox = true;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      // 返回promise对象
      return this.promise;
    },
    remove: function () {
      setTimeout(() => {
        this.destroy();
      }, 300);
    },
    destroy: function () {
      this.$destroy();
      document.body.removeChild(this.$el);
    }
  }
};
</script>
 
<style lang="less" scoped>
  .message-box {
    position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 250;
      background: rgba(0, 0, 0, 0.5);
    .mask {
      width: 300px;
      height: 200px;
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      z-index:101;
      .title {
        font-size:16px;
        font-weight:500;
        padding: 20px 20px 10px;
        text-align:center;
        margin:0;
      }
      .content {
        font-size: 1em;
        line-height: 2em;
        color: #555;
      }
      input {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 75%;
        margin: 20px auto;
        &:focus {
          border-color: #2d8cf0;
        }
      }
      .btn-group {
        .btn-primary {
          display: block;
          white-space: nowrap;
          cursor: pointer;
          background: #fff;
          border: 1px solid #dcdfe6;
          color: #606266;
          -webkit-appearance: none;
          text-align: center;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          outline: none;
          margin: 0;
          -webkit-transition: 0.1s;
          transition: 0.1s;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          font-size: 14px;
          border-radius: 4px;
          width: 75%;
          height: 40px;
          line-height: 40px;
          margin: 20px auto 0;
          background: #396FFF;
          color: #fff;
          &:hover {
            opacity: .8;
          }
        }
      }
    }
  }
</style>