import Vue from 'vue'
import Router from 'vue-router'
// import appSurvey from '@/view/app/appSurvey'
// import appDuration from '@/view/app/appDuration'
// import appGold from '@/view/app/appGold'
// import appPlayData from '@/view/app/appPlayData'
// import appWithdraw from '@/view/app/appWithdraw'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes : [
    {
      path: '/',
      redirect: '/appSurvey',
      component:resolve=>( require(['@/components/Home'], resolve)),
      children: [
        { //首页
          path: '/home',
          meta: {
            name: 'APP概况'
          },
          component: resolve=>( require(['@/components/Home'], resolve))
        },
        { //首页
          path: '/appSurvey',
          meta: {
            name: 'APP概况'
          },
          component: resolve=>( require(['../views/app/appSurvey'], resolve))
        },
        { //APP时长分析
          path: '/appDuration',
          meta: {
            name: 'APP时长分析'
          },
          component: resolve=>( require(['../views/app/appDuration'], resolve))
        },
        { //APP金币支出
          path: '/appGold',
          meta: {
            name: 'APP金币支出'
          },
          component: resolve=>( require(['../views/app/appGold'], resolve))
        },
        { //APP播放数据
          path: '/appPlayData',
          meta: {
            name: 'APP播放数据'
          },
          component: resolve=>( require(['../views/app/appPlayData'], resolve))
        },
        { //APP提现审核
          path: '/appWithdraw',
          meta: {
            name: 'APP提现审核'
          },
          component: resolve=>( require(['../views/app/appWithdraw'], resolve))
        },
        {//APP留存分析
          path: "/appRetain",
          meta: {
            name: 'APP留存分析'
          },
          component: resolve=>( require(['../views/app/appRetain'], resolve))
        },
        {//魔盒概况
          path: "/mohesurvey",
          meta: {
            name: '魔盒概况'
          },
          component: resolve=>( require(['../views/mohe/mohesurvey'], resolve))
        },
        {//魔盒播放数据
          path: "/mohePlayData",
          meta: {
            name: '魔盒播放数据'
          },
          component: resolve=>( require(['../views/mohe/mohePlayData'], resolve))
        },
        {//魔盒分媒体数据
          path: "/mohDMeedia",
          name: "mohDMeedia",
          meta: {
            name: '魔盒分媒体数据'
          },
          component: resolve=>( require(['../views/mohe/mohDMeedia'], resolve))
        },
        {//魔盒总体流量分析
          path: "/moheboxFlow",
          meta: {
            name: '魔盒总体流量分析'
          },
          component: resolve=>( require(['../views/mohe/moheboxFlow'], resolve))
        },
        {//网站概况
          path: "/webSurvey",
          meta: {
            name: '网站概况'
          },
          component: resolve=>( require(['../views/web/webSurvey'], resolve))
        },
        {//网站播放数据
          path: "/webPlayData",
          meta: {
            name: '网站播放数据'
          },
          component: resolve=>( require(['../views/web/webPlayData'], resolve))
        },
        {//小程序概况
          path: "/xcxsurvey",
          meta: {
            name: '小程序概况'
          },
          component: resolve=>( require(['../views/xcx/xcxsurvey'], resolve))
        },
        {//小程序播放数据
          path: "/xcxPlayData",
          meta: {
            name: '小程序播放数据'
          },
          component: resolve=>( require(['../views/xcx/xcxPlayData'], resolve))
        },
        {//小程序热榜数据
          path: "/xcxHotData",
          meta: {
            name: '小程序热榜数据'
          },
          component: resolve=>( require(['../views/xcx/xcxHotData'], resolve))
        },
        {//视频数据查询
          path: "/videoData",
          meta: {
            name: '视频数据查询'
          },
          component: resolve=>( require(['../views/video/videoData'], resolve))
        },
        {//视频发布报表
          path: "/videoDistrRopret",
          meta: {
            name: '视频发布报表'
          },
          component: resolve=>( require(['../views/video/videoDistrRopret'], resolve))
        },
        {//版本更新说明
          path: "/versionUpdating",
          meta: {
            name: '版本更新说明'
          },
          component: resolve=>( require(['../views/versionUpdating'], resolve))
        },
        {//数据录入-广告部
          path: "/dataEntryAdv",
          meta: {
            name: '数据录入-广告部'
          },
          component: resolve=>( require(['../views/data/dataEntryAdv'], resolve))
        },
        {//更新日志
          path: "/dataEntryBlog",
          meta: {
            name: '更新日志'
          },
          component: resolve=>( require(['../views/data/dataEntryBlog'], resolve))
        },
        {//数据录入-财务
          path: "/dataEntryFinance",
          meta: {
            name: '数据录入-财务'
          },
          component: resolve=>( require(['../views/data/dataEntryFinance'], resolve))
        },
        {//数据录入-数据中心
          path: "/dataEntryIDC",
          meta: {
            name: '数据录入-数据中心'
          },
          component: resolve=>( require(['../views/data/dataEntryIDC'], resolve))
        },
        {//数据录入-视频分发
          path: "/dataEntryVideo",
          meta: {
            name: '数据录入-视频分发'
          },
          component: resolve=>( require(['../views/data/dataEntryVideo'], resolve))
        },
        {//经营数据报表
          path: "/operStatement",
          meta: {
            name: '经营数据报表'
          },
          component: resolve=>( require(['../views/data/operStatement'], resolve))
        },
        {//控制台
          path: "/SelectModel",
          meta: {
            name: '控制台'
          },
          component: resolve=>( require(['../views/data/SelectModel'], resolve))
        },
        {//魔盒SDK概况
          path: "/sdksurvey",
          meta: {
            name: '魔盒SDK概况'
          },
          component: resolve=>( require(['../views/sdk/sdksurvey'], resolve))
        },
        {//魔盒SDK留存分析
          path: "/sdkRetain",
          meta: {
            name: '魔盒SDK留存分析'
          },
          component: resolve=>( require(['../views/sdk/sdkRetain'], resolve))
        },
        {//魔盒SDK时长分析
          path: "/sdkDuration",
          meta: {
            name: '魔盒SDK时长分析'
          },
          component: resolve=>( require(['../views/sdk/sdkDuration'], resolve))
        },
        {//魔盒SDK概况
          path: "/sdkPlayData",
          meta: {
            name: '魔盒SDK播放数据'
          },
          component: resolve=>( require(['../views/sdk/sdkPlayData'], resolve))
        },
        {//魔盒SDK概况
          path: "/bdgPlayData",
          meta: {
            name: '斑点狗播放数据'
          },
          component: resolve=>( require(['../views/bdg/bdgPlayData'], resolve))
        },
        {//魔盒SDK概况
          path: "/bdgDuration",
          meta: {
            name: '斑点狗时长分析'
          },
          component: resolve=>( require(['../views/bdg/bdgDuration'], resolve))
        },
        {//魔盒SDK概况
          path: "/bdgRetain",
          meta: {
            name: '斑点狗留存分析'
          },
          component: resolve=>( require(['../views/bdg/bdgRetain'], resolve))
        },
        {//魔盒SDK概况
          path: "/bdgSurvey",
          meta: {
            name: '斑点狗概况'
          },
          component: resolve=>( require(['../views/bdg/bdgSurvey'], resolve))
        },
        {//魔盒SDK概况
          path: "/bdgsdkPlayData",
          meta: {
            name: '斑点狗SDK播放数据'
          },
          component: resolve=>( require(['../views/bdgsdk/bdgsdkPlayData'], resolve))
        },{
          path: '/userAction',
          name: 'userAction',
          component: resolve=>( require(['../views/bdgsdk/userAction'], resolve))
        },
        {
          path: "/bdgUseraction",
          meta: {
            name: '斑点狗用户行为数据'
          },
          component: resolve=>( require(['../views/bdg/bdgUseraction'], resolve))
        },{
          path: "/operStatementEC",
          meta: {
            name: '电商经营报表'
          },
          component: resolve=>( require(['../views/data/operStatementEC'], resolve))
        },{
          path: "/dataEntryEC",
          meta: {
            name: '数据录入-电商'
          },
          component: resolve=>( require(['../views/data/dataEntryEC'], resolve))
        },
      ],
    },
    {
      path: '/404',
      meta: {
        title: '错误页面-404'
      },
      component: resolve=>( require(['../views/error/NotPath_404'], resolve))
    },{
      path: '/userSkipTop10',
      name: 'userSkipTop10',
      component: resolve=>( require(['../views/app/userSkipTop10'], resolve))
    },{
      path: '/videoSkipTop10',
      name: 'videoSkipTop10',
      component: resolve=>( require(['../views/app/videoSkipTop10'], resolve))
    },{
      path: '/webplayTop10',
      name: 'webplayTop10',
      component: resolve=>( require(['../views/web/webplayTop10'], resolve))
    },{
      path: '/appSiredData',
      name: 'appSiredData',
      component: resolve=>( require(['../views/app/appSiredData'], resolve))
    },{
      path: '/sdkVideoSkipTop10',
      name: 'sdkVideoSkipTop10',
      component: resolve=>( require(['../views/sdk/sdkVideoSkipTop10'], resolve))
    },{
      path: '/bdguserSkipTop10',
      name: 'bdguserSkipTop10',
      component: resolve=>( require(['../views/bdg/bdguserSkipTop10'], resolve))
    },{
      path: '/bdgvideoSkipTop10',
      name: 'bdgvideoSkipTop10',
      component: resolve=>( require(['../views/bdg/bdgvideoSkipTop10'], resolve))
    },{
      path: '/operRecord',
      name: 'operRecord',
      component: resolve=>( require(['../views/operRecord'], resolve))
    },{
      path: '/bdgsdkvideoSkipTop10',
      name: 'bdgsdkvideoSkipTop10',
      component: resolve=>( require(['../views/bdgsdk/bdgsdkvideoSkipTop10'], resolve))
    },{
      path: '/bdgsearchHotTop10',
      name: 'bdgsearchHotTop10',
      component: resolve=>( require(['../views/bdg/bdgsearchHotTop10'], resolve))
    },{
      path: '/bdgshopClickTop10',
      name: 'bdgshopClickTop10',
      component: resolve=>( require(['../views/bdg/bdgshopClickTop10'], resolve))
    },{
      path: '/bdgsdkshopClickTop10',
      name: 'bdgsdkshopClickTop10',
      component: resolve=>( require(['../views/bdgsdk/bdgsdkshopClickTop10'], resolve))
    },{
      path: '/hotsearchClickTop10',
      name: 'hotsearchClickTop10',
      component: resolve=>( require(['../views/bdgsdk/hotsearchClickTop10'], resolve))
    },{
      path: '/hotsearchTop10',
      name: 'hotsearchTop10',
      component: resolve=>( require(['../views/bdgsdk/hotsearchTop10'], resolve))
    },{
      path: '/shopTypeTop10',
      name: 'shopTypeTop10',
      component: resolve=>( require(['../views/bdgsdk/shopTypeTop10'], resolve))
    }
    
  ]
})
