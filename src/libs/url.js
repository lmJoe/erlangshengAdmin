// 环境的切换
// process.env.NODE_ENV环境
let baseURL;

var hosturl =  window.location.host;
var homeurl = 'https://pxtadmin.com/' ;
if(hosturl == "pxtadmin.com" || hosturl == "www.pxtadmin.com" || hosturl == "admin.baomihua.com"){
  var testUrl = "https://www.pxtadmin.com";
  var lockurl = "https://adminapi.baomihua.com:58081"
}else{
  // var testUrl = "http://192.168.30.18:7020";//冀伟飞
  // var testUrl = "http://192.168.30.11:7020";//曹慧
  // var lockurl = "http://192.168.30.18:5001";
  var testUrl = "https://www.pxtadmin.com";
  var lockurl = "https://adminapi.baomihua.com:58081"
}
export var URL = {
  recordUrl: {
    /**
     * api
     */
    getleftGuid:
      lockurl +
      '/data/GetResources',//左侧列表
    getrightGuid:
      testUrl +
      '/api/auctionLotter/getLotterList',//右上角列表
    getAppRecentData:
      testUrl +
      '/api/tj/app/GetRecentData',//APP昨日今日概况
    getPartData:
      testUrl +
      '/api/tj/app/GetPartData',//APP趋势图数据
    getDetails:
      testUrl +
      '/api/tj/app/GetDetails',//APP详情表格
    getAppexport:
      testUrl +
      '/api/tj/app/export',//APP详情导出
    getAnalyDetails:
      testUrl +
      '/api/tj/AppData/GetAppAccountDetailsData',//留存分析详情表格
    getAnalyGeneral:
      testUrl +
      '/api/tj/AppData/GetAppAccountGeneralData',//留存分析昨日数据
    getAnalyEcharts:
      testUrl +
      '/api/tj/AppData/GetAppAccountEchartsData',//留存分析趋势图数据
    getTimeEcharts:
      testUrl +
      '/api/tj/AppData/GetAppTimeEchartsData',//时长分析趋势图数据
    getTimeGenera:
      testUrl +
      '/api/tj/AppData/GetAppTimeGeneralData',//时长分析昨日数据
    getTimeDetailsData:
      testUrl +
      '/api/tj/AppData/GetAppTimeDetailsData',//时长分析详情
    getWithdrawGeneral:
      testUrl +
      '/api/tj/Withdrawal/GetGeneralData',//提现审核昨日详情
    getWithdrawDetailsData:
      testUrl +
      '/api/tj/Withdrawal/GetDetailsData',//提现审核表格数据
    getWithdrawPartData:
      testUrl +
      '/api/tj/Withdrawal/GetPartData',//提现审核趋势图
    getWithdrawMoneyData:
      testUrl +
      '/api/tj/Withdrawal/GetMoneyData',//提现审核金额饼状图
    getWithdrawStatusData:
      testUrl +
      '/api/tj/Withdrawal/GetStatusData',//提现审核状态饼状图
    getGoldGeneralData:
      testUrl +
      '/api/tj/coin/GetGeneralData',//金币支出昨日概况
    getGoldEChartsData:
      testUrl +
      '/api/tj/coin/GetEChartsData',//金币支出趋势图
    getGoldDetails:
      testUrl +
      '/api/tj/coin/GetDetails',//金币支出详情  
    getGoldPartData:
      testUrl +
      '/api/tj/coin/GetEChartPartData',//金币支出饼状图
    getGoldPartDataExport:
      testUrl +
      '/api/tj/coin/DetailsExport',//金币支出表格数据导出
    getPlayGeneralData:
      testUrl +
      '/api/tj/VideoPlay/GetGeneralData',//APP播放数据昨日概况
    getVideoPlayTrend:
      testUrl +
      '/api/tj/VideoPlay/GetVideoPlayTrend',//APP播放数据视频播放趋势
    getVideoCount:
      testUrl +
      '/api/tj/VideoPlay/GetVideoCount',//APP播放数据总趋势
    getPlayVideoDetails:
      testUrl +
      '/api/tj/VideoPlay/GetDetails',//APP播放数据表格详情
    getVideoTypeData:
      testUrl +
      '/api/tj/VideoPlay/GetVideoTypeData',//APP播放数据视频播放类别分布 
    getAppUserPlayTop:
      testUrl +
      '/api/tj/VideoPlay/GetUserPlayTop',//APP播放数据用户观看top10
    getAppVideoPlayTop:
      testUrl +
      '/api/tj/VideoPlay/GetVideoPlayTop',//APP播放数据用户观看top10

    
    getmoheRecentData:
      testUrl +
      '/api/tj/MagicBoxBrief/GetRecentData',//魔盒流量概览-数据总览
    getmohePartData:
      testUrl +
      '/api/tj/MagicBoxBrief/GetPartData',//魔盒流量概览-流量趋势 
    getmoheDistribution:
      testUrl +
      '/api/tj/MagicBoxBrief/GetDataDistribution',//魔盒流量概览-流量分布
    getmoheGettop:
      testUrl +
      '/api/tj/MagicBoxBrief/gettop',//魔盒流量概览-top10  
    getmoheGeneralData:
      testUrl +
      '/api/tj/MagicBoxPlay/GetGeneralData',//魔盒播放昨日概况 
    getmoheGetConfig:
      testUrl +
      '/api/tj/MagicBox/GetConfig',//魔盒播放右上角下拉菜单
    getmoheVideoCount:
      testUrl +
      '/api/tj/MagicBoxPlay/GetVideoCount',//魔盒播放总趋势 
    getmoheVideoPlayTrend:
      testUrl +
      '/api/tj/MagicBoxPlay/GetVideoPlayTrend',//魔盒播放-视频播放趋势 
    getmoheVideoTypeData:
      testUrl +
      '/api/tj/MagicBoxPlay/GetVideoTypeData',//魔盒播放-视频播放类别分布柱状图  
    getmoheVideoPlayTop:
      testUrl +
      '/api/tj/MagicBoxPlay/GetVideoPlayTop',//魔盒播放-视频播放视频播放top
    getmoheVideoPlayDetails:
      testUrl +
      '/api/tj/MagicBoxPlay/GetDetails',//魔盒播放-表格数据
    getmoheDMRecentData:
      testUrl +
      '/api/tj/MagicBoxMedia/GetRecentData',//魔盒分媒体-获取概况  
    getmoheDMPartData:
      testUrl +
      '/api/tj/MagicBoxMedia/GetPartData',//魔盒分媒体-echart   
    getmoheDMPartDataExport:
      testUrl +
      '/api/tj/MagicBoxMedia/export',//魔盒分媒体-echart导出
    getmoheDMDetails:
      testUrl +
      '/api/tj/MagicBoxMedia/GetDetails',//魔盒分媒体-echart导出  




    getwebGeneralData:
      testUrl +
      '/api/tj/web/GetRecentData',//网站概况昨日数据 
    getwebGetPartData:
      testUrl +
      '/api/tj/web/GetPartData',//网站概况趋势图
    getwebGetPartDataexport:
      testUrl +
      '/api/tj/web/export',//网站概况趋势图导出 
    getwebGetDetails:
      testUrl +
      '/api/tj/web/GetDetails',//网站概况详情数据
    getwebplayGeneralData:
      testUrl +
      '/api/tj/webplay/GetGeneralData',//网站播放数据昨日 
    getwebplayVideoCount:
      testUrl +
      '/api/tj/webplay/GetVideoCount',//网站播放数据昨日 
    getwebplayVideoPlayTrend:
      testUrl +
      '/api/tj/webplay/GetVideoPlayTrend',//网站播放数据-视频播放趋势
    getwebplayVideoTypeData:
      testUrl +
      '/api/tj/webplay/GetVideoTypeData',//网站播放数据-视频播放类别分布 
    getwebplayVideoPlayTop:
      testUrl +
      '/api/tj/webplay/GetVideoPlayTop',//网站播放数据-视频播放top
    getwebplayGetDetails:
      testUrl +
      '/api/tj/webplay/GetDetails',//网站播放数据-详情数据
    getxcxRecentData:
      testUrl +
      '/api/tj/Applet/GetRecentData',//小程序概况-昨日数据概况 
    getxcxGetPartData:
      testUrl +
      '/api/tj/Applet/GetPartData',//小程序概况-趋势图数据
    getxcxGetDetails:
      testUrl +
      '/api/tj/Applet/GetDetails',//小程序概况-表格详情数据
    getxcxPlayGeneralData:
      testUrl +
      '/api/tj/AppletPlay/GetGeneralData',//小程序播放数据-昨日概况
    getxcxGetVideoCount:
      testUrl +
      '/api/tj/AppletPlay/GetVideoCount',//小程序播放数据-总趋势
    getxcxVideoPlayTrend:
      testUrl +
      '/api/tj/AppletPlay/GetVideoPlayTrend',//小程序播放数据-视频播放趋势 
    getxcxVideoPlayTop:
      testUrl +
      '/api/tj/AppletPlay/GetVideoPlayTop',//小程序播放数据-视频播放top   
    getxcxPlayGetDetails:
      testUrl +
      '/api/tj/AppletPlay/GetDetails',//小程序播放数据-详情
    getxcxPlayVideoTypeData:
      testUrl +
      '/api/tj/AppletPlay/GetVideoTypeData',//小程序播放数据-详情
    getxcxHotGetGeneralData:
      testUrl +
      '/api/tj/AppletHot/GetGeneralData',//小程序热榜数据-概况
    getxcxHotGetTopData:
      testUrl +
      '/api/tj/AppletHot/GetTopData',//程序热榜数据-top
    getxcxHotGetPartData:
      testUrl +
      '/api/tj/AppletHot/GetPartData',//小程序热榜数据-echarts   
    getvideoGetlist:
      testUrl +
      '/api/tj/VideoQuery/getlist',//视频数据查询
    getvideoExport:
      testUrl +
      '/api/tj/VideoQuery/export',//视频数据导出  
    getvideoGetGeneralData:
      testUrl +
      '/api/tj/VideoDistribution/GetGeneralData',//视频分发概况  
    getvideoBasePartData:
      testUrl +
      '/api/tj/VideoDistribution/GetPartData',//视频分发概况  -获取部分数据 
    getvideoBaseGetDetails:
      testUrl +
      '/api/tj/VideoDistribution/GetDetails',//视频分发概况  -详情 
    getvideoBaseDetailsExport:
      testUrl +
      '/api/tj/VideoDistribution/DetailsExport',//视频分发概况  -详情导出
    getvideoTypeAccountData:
      testUrl +
      '/api/tj/VideoDistribution/GetAccountData',//视频分发概况  -账号属性和账号分类饼状图
    getvideoAccountDetail:
      testUrl +
      '/api/tj/VideoDistribution/GetAccountDetailsData',//视频分发概况  -账号属性和账号分类详情数据 
    getvideoAccountDetailExport:
      testUrl +
      '/api/tj/VideoDistribution/AccountDetailsExport',//视频分发概况  -账号属性和账号分类详情数据导出 
    getVersionList:
    testUrl +
      '/api/tj/VersionLog/GetList',//获取版本更新说明列表
    getVersionUpdate:
    testUrl +
      '/api/tj/VersionLog/update',//修改版本更新说明  /api/tj/VersionLog/del
    delVersionUpdate:
    testUrl +
      '/api/tj/VersionLog/del',//删除版本更新说明  
    addVersion:
    testUrl +
      '/api/tj/VersionLog/insert',//新增版本更新说明 
    Unlock:
      lockurl +
      '/data/Unlock',//解锁
    getChildEChartsData:
      testUrl +
      '/api/tj/coin/GetChildEChartsData', //app金币子页面总趋势图
    getAppGoldChildDetail:
      testUrl +
      '/api/tj/coin/GetChildDetail', //app金币子页面详情 
    getAppGoldChildEChartData:
      testUrl +
      '/api/tj/coin/GetChildEChartData', //app金币子页面echarts子趋势图
    getAppGoldChildDetailExport:
      testUrl +
      '/api/tj/coin/ChildDetailExport', //app金币子页面echarts子趋势图  

      
    getAdData:
      testUrl +
      '/api/tj/Statistics/GetAdData', //广告部数据 
    pushAdData:
      testUrl +
      '/api/tj/Statistics/PushAdData', //广告部数据录入
    getAdList:
      testUrl +
      '/api/tj/Statistics/GetAdList', //广告部可操作数据集合
    GetAdOld:
      testUrl +
      '/api/tj/Statistics/GetAd', //广告部-获取要操作数据的原先值


    getVdData:
      testUrl +
      '/api/tj/Statistics/GetVdData', //视频分发部数据 
    pushVdData:
      testUrl +
      '/api/tj/Statistics/PushVdData', //视频分发部数据录入
    getVdList:
      testUrl +
      '/api/tj/Statistics/GetVdList', //视频分发部可操作数据集合
    GetVdOld:
      testUrl +
      '/api/tj/Statistics/GetVd', //视频分发部-获取要操作数据的原先值




    getAcData:
      testUrl +
      '/api/tj/Statistics/GetAcData', //财务部数据 
    pushAcData:
      testUrl +
      '/api/tj/Statistics/PushAcData', //财务部数据录入
    getAcList:
      testUrl +
      '/api/tj/Statistics/GetAcList', //财务部可操作数据集合
    GetAcOld:
      testUrl +
      '/api/tj/Statistics/GetAc', //财务部-获取要操作数据的原先值

    pushDcData:
      testUrl +
      '/api/tj/Statistics/PushDcData', //数据中心数据录入
    getDcList:
      testUrl +
      '/api/tj/Statistics/GetDcList', //数据中心可操作数据集合
    GetDcOld:
      testUrl +
      '/api/tj/Statistics/GetDc', //数据中心-获取要操作数据的原先值

    getBBData:
      testUrl +
      '/api/tj/Statistics/GetData', //经营数据报表概况
    getBBEChartData:
      testUrl +
      '/api/tj/Statistics/GetEChartData', //经营数据报表趋势图
    getBBCircleData:
      testUrl +
      '/api/tj/Statistics/GetCircleData', //经营数据报表饼状图
    getBBdetDetails:
      testUrl +
      '/api/tj/Statistics/GetDetails', //经营数据报表表格详情
    getBBCircleEChartData:
      testUrl +
      '/api/tj/Statistics/GetCircleEChartData', //经营数据报表-圆形图_echarts
    getBBgetlog:
      testUrl +
      '/api/tj/Statistics/getlog', //经营数据报表更新日志 
    getBBexport:
      testUrl +
      '/api/tj/Statistics/Export', //经营数据报-导出  
    getConfig:
      testUrl +
      '/api/tj/app/GetConfig', //趣看视频和爆米花视频的分类  
    getAdLog:
      testUrl +
      '/api/tj/Statistics/GetAdLog', //广告部录入日志
    getVdLog:
      testUrl +
      '/api/tj/Statistics/GetVdLog', //视频分发部录入日志
    getAcLog:
      testUrl +
      '/api/tj/Statistics/GetAcLog', //财务部录入日志
    getDcLog:
      testUrl +
      '/api/tj/Statistics/GetDcLog', //数据中心录入日志 
    getsdkRecentData:
      testUrl +
      '/api/tj/sdk/GetRecentData', //sdk概览昨日数据  
    getsdkPartData:
      testUrl +
      '/api/tj/sdk/GetPartData', //sdk概览趋势图数据  
    getsdkDetails:
      testUrl +
      '/api/tj/sdk/GetDetails', //sdk概览详情
    getsdkExport:
      testUrl +
      '/api/tj/sdk/export', //sdk概览详情
    getsdkConfig:
      testUrl +
      '/api/tj/sdk/GetConfig', //sdk配置信息
    getsdkPlayGeneralData:
      testUrl +
      '/api/tj/sdk/GetPlayGeneralData', //sdk播放数据昨日今日数据 
    getsdkPlayDetails:
      testUrl +
      '/api/tj/sdk/GetPlayDetails', //sdk播放数据详情
    getsdkPlayVideoCount:
      testUrl +
      '/api/tj/sdk/GetPlayVideoCount', //sdk播放数据总趋势
    getsdkVideoPlayTrend:
      testUrl +
      '/api/tj/sdk/GetVideoPlayTrend', //sdk播放数据-视频播放趋势
    getsdkVideoTypeData:
      testUrl +
      '/api/tj/sdk/GetVideoTypeData', //sdk播放数据-视频播放类别
    getsdkVideoPlayTop:
      testUrl +
      '/api/tj/sdk/GetVideoPlayTop', //sdk播放数据-top
    getsdkAnaGeneralData:
      testUrl +
      '/api/tj/sdk/GetAnaGeneralData', //sdk留存分析-昨日
    getsdkAnaPartData:
      testUrl +
      '/api/tj/sdk/GetAnaPartData', //sdk留存分析-echarts
    getsdkAnaDetailsData:
      testUrl +
      '/api/tj/sdk/GetAnaDetailsData', //sdk留存分析-详情  
    getsdkTimeGeneralData:
      testUrl +
      '/api/tj/sdk/GetTimeGeneralData', //sdk时长分析-昨日
    getsdkTimePartData:
      testUrl +
      '/api/tj/sdk/GetTimePartData', //sdk时长分析-echarts
    getsdkTimeDetailsData:
      testUrl +
      '/api/tj/sdk/GetTimeDetailsData', //sdk时长分析-详情
    getbdgRecentData:
      testUrl +
      '/api/tj/dalmatians/GetRecentData', //斑点狗概况
    getbdgPartData:
      testUrl +
      '/api/tj/dalmatians/GetPartData', //斑点狗趋势图
    getbdgDetails:
      testUrl +
      '/api/tj/dalmatians/GetDetails', //斑点狗详情表格
    getbdgExport:
      testUrl +
      '/api/tj/dalmatians/export', //斑点狗详情导出
    getbdgplaygeneraldata:
      testUrl +
      '/api/tj/dalmatians/getplaygeneraldata', //斑点狗播放数据
    getbdgplaydetails:
      testUrl +
      '/api/tj/dalmatians/getplaydetails', //斑点狗播放数据详情
    getbdgvideocount:
      testUrl +
      '/api/tj/dalmatians/getvideocount', //斑点狗播放数据总趋势图
    getbdgvideoplaytrend:
      testUrl +
      '/api/tj/dalmatians/getvideoplaytrend', //斑点狗播放数据视频播放趋势
    getbdgvideoplaytop:
      testUrl +
      '/api/tj/dalmatians/getvideoplaytop', //斑点狗播放数据视频播放top 
    getbdguserplaytop:
      testUrl +
      '/api/tj/dalmatians/getuserplaytop', //斑点狗播放数据用户观看top 
    getbdganadetailsdata:
      testUrl +
      '/api/tj/dalmatians/getanadetailsdata', //斑点狗留存分析-详情
    getbdganaechartsdata:
      testUrl +
      '/api/tj/dalmatians/getanaechartsdata', //斑点狗留存分析-趋势图
    getbdganageneraldata:
      testUrl +
      '/api/tj/dalmatians/getanageneraldata', //斑点狗留存分析-昨日概况
    getbdgtimedetails:
      testUrl +
      '/api/tj/dalmatians/gettimedetails', //斑点狗时长分析-详情
    getbdgtimegeneral:
      testUrl +
      '/api/tj/dalmatians/gettimegeneral', //斑点狗时长分析-昨日概况
    getbdgtimeecharts:
      testUrl +
      '/api/tj/dalmatians/gettimeecharts', //斑点狗时长分析-趋势图
    getChildConfig:
      testUrl +
      '/api/tj/coin/GetChildConfig', //app子页面配置
    getChildEChartConfig:
      testUrl +
      '/api/tj/coin/GetChildEChartConfig', //app子页面echart配置
    bdggetConfig:
      testUrl +
      '/api/tj/Dalmatianssdk/GetConfig', //斑点狗sdk趣看视频和爆米花视频的分类 
    getbdgsdkPlayGeneralData:
      testUrl +
      '/api/tj/Dalmatianssdk/GetPlayGeneralData', //斑点狗sdk趣看视频和爆米花视频的分类 
    getbdgsdkvideocount:
      testUrl +
      '/api/tj/Dalmatianssdk/getvideocount', //斑点狗sdk播放数据总趋势图  
    getbdgsdkvideoplaytrend:
      testUrl +
      '/api/tj/Dalmatianssdk/getvideoplaytrend', //斑点狗sdk播放数据视频播放趋势
    getbdgsdkuserplaytop:
      testUrl +
      '/api/tj/Dalmatianssdk/getuserplaytop', //斑点狗sdk播放数据用户观看top 
    getbdgsdkvideoplaytop:
      testUrl +
      '/api/tj/Dalmatianssdk/getvideoplaytop', //斑点狗sdk播放数据视频播放top 
    getbdgsdkplaydetails:
      testUrl +
      '/api/tj/Dalmatianssdk/getplaydetails', //斑点狗sdk播放数据详情
    getbdgProdTop:
      testUrl +
      '/api/tj/dalmatians/GetProdTop', //斑点狗商品点击top10
    getbdgWorldsTop:
      testUrl +
      '/api/tj/dalmatians/WorldsTop', //搜索词top20
    getbdgHotWorldsTop:
      testUrl +
      '/api/tj/dalmatians/HotWorldsTop', //热词搜索词top10
    getbdgsdkProdTop:
      testUrl +
      '/api/tj/Dalmatianssdk/GetProdTop', //斑点狗sdk商品点击top10
    getClassTop:
      testUrl +
      '/api/tj/Dalmatianssdk/GetClassTop', //斑点狗sdk商品分类top10
    getSDKworldsTop:
      testUrl +
      '/api/tj/Dalmatianssdk/WorldsTop', //斑点狗sdk搜索top
    getSDKHotWorldsTop:
      testUrl +
      '/api/tj/Dalmatianssdk/HotWorldsTop', //斑点狗sdk热词点击top
    getUserAction:
      testUrl +
      '/api/tj/Dalmatianssdk/ActionSearch', //用户行为数据
    UserClickActionSDK:
      testUrl +
      '/api/tj/DalmatiansSdk/UserClick', //斑点狗SDK用户点击排行
    UserClickAction:
      testUrl +
      '/api/tj/Dalmatians/UserClick', //斑点狗APP用户行为数据
    bdgAppUserAction:
      testUrl +
      '/api/tj/Dalmatians/UserAction', //斑点狗APP用户行为数据
    bdgAppUserAction:
      testUrl +
      '/api/tj/Dalmatians/UserAction', //斑点狗APP用户行为数据
    dirSirDataPush:
      testUrl +
      '/api/tj/Management/PushData', //斑点狗APP用户行为数据
    dirSirDataList:
      testUrl +
      '/api/tj/Management/GetDataList', //电商数据查询
    dirSirDataExport:
      testUrl +
      '/api/tj/Management/Export', //电商数据导出
    dirSirDataTotal:
      testUrl +
      '/api/tj/Management/GetDataTotal', //电商数据汇总
    dirSirDataDelData:
      testUrl +
      '/api/tj/Management/DelData', //电商录入删除
  }
};
