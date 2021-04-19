<template>
  <div style="height: 100%;">
    <!--logo栏位-->
    <!-- <div v-if="nav.LOGO && this.nav.LOGO.id === '1'" -->
    <div class="avatar avatar-flex"
         :style="{width: (getCollapseState == false)?'200px':'64px'}">
      <div>
        <a href="javascript:;">
          <!-- <img :src="require('@/assets'+nav.LOGO.img)" alt="" :style="{width: '50px', height: '50px'}"> -->
          <span style="color:#fff;">二郎神数据平台</span>
        </a>
      </div>
    </div>
    <el-menu :default-active="String(activeNav)"
             class="el-menu-vertical"
             :collapse="getCollapseState"
             :background-color="getAsideColor"
             :text-color="getATextColor"
             :active-text-color="getActiveColor"
             :unique-opened=getDoubleOpen
             :default-openeds="defaultOpen"
             ref="menu"
             router>
      <!--动态生成sideItem-->
      <template v-for="(item, parentIndex) in nav">
        <SideNav :item="item" :index="parentIndex" :state="getCollapseState"></SideNav>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import SideNav from "./SideNav";
  import {mapGetters} from "vuex";
  import Axios from "axios";
  import style from "@/assets/css/public.css"

  import http from '@/libs/http'
  import {URL} from '@/libs/url'

  export default {
    name: "Aside",
    data() {
      return {
        nav: [], //左侧导航数据数组
        defaultOpen: ['0']
      }
    },
    computed: {
      activeNav() {
        //当前激活的导航
        return this.$route.path
      },
      /*
      * 在VUEX中获得asideColor颜色值
      * */
      ...mapGetters({
        getAsideColor: 'globalSetting/AsideColor',
        getATextColor: 'globalSetting/ATextColor',
        getActiveColor: 'globalSetting/ActiveColor',
        getDoubleOpen: 'globalSetting/DoubleOpen',
        getCollapseState: 'header/CollapseState'
      })
    },
    created() {
      // //获得导航的json数据
      // Axios({
      //   url: location.protocol + "/nav.json",
      //   method: "get"
      // }).then(res => {
      //   //把导航数据存入vuex中
      //   this.$store.dispatch('header/setNavs', {
      //     nav: res.data.nav
      //   })
      //   this.nav = res.data
      // })

      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getleftGuid+"?type=1&hash=9D4C2F636F067F89&ParentId=0",
        // url:"http://192.168.30.18:5001/data/GetResources?type=1&hash=9D4C2F636F067F89&ParentId=0",
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.tabList = res.data;
        var tabList = [];
        tabList = res.data;
        
         //把导航数据存入vuex中
        that.$store.dispatch('header/setNavs', {
          nav: res.data
        })
        that.nav = res.data
        for(var i=0;i<tabList.length;i++){
          var tabChildren = tabList[i].children;
          if(tabChildren!==null){
            var childBtnList = tabChildren;
            // console.log("childBtnList",childBtnList);
            if(childBtnList.children!==null){
              for(var j=0;j<childBtnList.length;j++){
                // console.log("childBtnList",childBtnList[j].id);
                if(childBtnList[j].id==42){ //APP概况
                  childBtnList[j].ulr = '/appSurvey'
                  // childBtnList[j].name = 'APP概况'
                }else if(childBtnList[j].id==43){//APP留存分析
                  childBtnList[j].ulr = '/appRetain'
                  // childBtnList[j].name = 'APP留存分析'
                }else if(childBtnList[j].id==44){//APP时长分析
                  childBtnList[j].ulr = '/appDuration'
                  // childBtnList[j].name = 'APP时长分析'
                }else if(childBtnList[j].id==45){//APP提现审核
                  childBtnList[j].ulr = '/appWithdraw'
                  // childBtnList[j].name = 'APP提现审核'
                }else if(childBtnList[j].id==46){//APP金币支出
                  childBtnList[j].ulr = '/appGold'
                  // childBtnList[j].name = 'APP金币支出'
                }else if(childBtnList[j].id==47){//APP"播放数据"
                  childBtnList[j].ulr = '/appPlayData'
                  // childBtnList[j].name = 'APP播放数据'
                }else if(childBtnList[j].id==49){//网站概况
                  childBtnList[j].ulr = '/webSurvey'
                  // childBtnList[j].name = '网站概况'
                }else if(childBtnList[j].id==50){//网站播放数据
                  childBtnList[j].ulr = '/webPlayData'
                  // childBtnList[j].name = '网站播放数据'
                }else if(childBtnList[j].id==296){//魔盒流量
                  childBtnList[j].ulr = '/moheboxFlow'
                }else if(childBtnList[j].id==51){//魔盒概况
                  childBtnList[j].ulr = '/mohesurvey'
                  // childBtnList[j].name = '魔盒概况'
                }else if(childBtnList[j].id==301){//魔盒分媒体数据
                  childBtnList[j].ulr = '/mohDMeedia'
                }else if(childBtnList[j].id==52){//魔盒播放数据
                  childBtnList[j].ulr = '/mohePlayData'
                  // childBtnList[j].name = '魔盒播放数据'
                }else if(childBtnList[j].id==53){//小程序概况
                  childBtnList[j].ulr = '/xcxsurvey'
                  // childBtnList[j].name = '小程序概况'
                }else if(childBtnList[j].id==256){//小程序播放数据
                  childBtnList[j].ulr = '/xcxPlayData'
                  // childBtnList[j].name = '小程序播放数据'
                }else if(childBtnList[j].id==283){//小程序热榜数据
                  childBtnList[j].ulr = '/xcxHotData'
                }else if(childBtnList[j].id==134){//视频分发数据
                  childBtnList[j].ulr = '/videoData'
                }else if(childBtnList[j].id==41){//视频分发报表
                  childBtnList[j].ulr = '/videoDistrRopret'
                }else if(childBtnList[j].id==337){//经营数据报表
                  childBtnList[j].ulr = '/operStatement'
                }else if(childBtnList[j].id==338){//数据录入-广告部
                  childBtnList[j].ulr = '/dataEntryAdv'
                }else if(childBtnList[j].id==339){//数据录入-视频分发
                  childBtnList[j].ulr = '/dataEntryVideo'
                }else if(childBtnList[j].id==340){//数据录入-财务
                  childBtnList[j].ulr = '/dataEntryFinance'
                }else if(childBtnList[j].id==341){//数据录入-数据中心
                  childBtnList[j].ulr = '/dataEntryIDC'
                }else if(childBtnList[j].id==342){//更新日志
                  childBtnList[j].ulr = '/dataEntryBlog'
                }else if(childBtnList[j].id==311){//数据库查询
                  childBtnList[j].ulr = '/SelectModel'
                }else if(childBtnList[j].id==396){//魔盒sdk概况
                  childBtnList[j].ulr = '/sdksurvey'
                  // childBtnList[j].name = 'SDK概况'
                }else if(childBtnList[j].id==397){//魔盒sdk留存分析
                  childBtnList[j].ulr = '/sdkRetain'
                  // childBtnList[j].name = 'SDK留存分析'
                }else if(childBtnList[j].id==398){//魔盒sdk时长分析
                  childBtnList[j].ulr = '/sdkDuration'
                  // childBtnList[j].name = 'SDK时长分析'
                }else if(childBtnList[j].id==399){//魔盒sdk播放数据
                  childBtnList[j].ulr = '/sdkPlayData'
                  // childBtnList[j].name = 'SDK播放数据'
                }else if(childBtnList[j].id==428){//斑点狗概况
                  childBtnList[j].ulr = '/bdgSurvey'
                  // childBtnList[j].name = '斑点狗概况'
                }else if(childBtnList[j].id==430){//斑点狗时长分析
                  childBtnList[j].ulr = '/bdgDuration'
                  // childBtnList[j].name = '斑点狗时长分析'
                }else if(childBtnList[j].id==429){//斑点狗留存分析
                  childBtnList[j].ulr = '/bdgRetain'
                  // childBtnList[j].name = '斑点狗留存分析'
                }else if(childBtnList[j].id==431){//斑点狗播放数据
                  childBtnList[j].ulr = '/bdgPlayData'
                  // childBtnList[j].name = '斑点狗播放数据'
                }else if(childBtnList[j].id==461){//斑点狗播放数据
                  childBtnList[j].ulr = '/bdgsdkPlayData'
                  // childBtnList[j].name = '斑点狗播放数据'
                }
              }
            }
          }else{
            console.log("all",tabList[i]);
            if(tabList[i].id==278){
              tabList[i].ulr = '/versionUpdating' 
            }else if(tabList[i].id==278){
              tabList[i].ulr = '/versionUpdating' 
            }
          }
        }
      }).catch(function (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          if (err.response.status == 401) {
            window.open("https://pxtadmin.com?loginstate=login_out"); //弹出一个新页面
          }
        }
      });
    },
    components: {
      SideNav
    }
  }
</script>

<style scoped>
  @import "~font-awesome/css/font-awesome.min.css";

  .el-menu-vertical:not(.el-menu--collapse) {
    padding-top: 60px;
    width: 200px;
    min-height: 400px;
    /* background:#1d2438 !important; */
    /* height: calc(100% - 60px); */
  }

  .aside-show {
    width: 200px;
    max-width: 200px;
    min-height: 400px;
    height: 100%;
  }

  .aside-hide {
    width: 64px;
    max-width: 64px;
    min-height: 400px;
    height: 100%;
  }

  .el-menu--collapse {
    height: 100%;
    margin-top: 60px
  }

  .el-submenu [class^=fa] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 16px;
  }
</style>