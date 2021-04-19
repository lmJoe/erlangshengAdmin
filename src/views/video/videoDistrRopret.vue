<template>
  <div class="appSurvey" v-loading="loading">
    <div class="appSurveyContainer">
      <div class="headContainer">
        <div class="pagetarge">
          <span class="">视频发布报表</span>
          <span class="arget">
            <div class="argetTxt" >
              <h3>指标：</h3>
              <p>当日上传过审率：当日上传审核通过量比当日成功上传量</p>
              <p>审核过审率：总审核通过量比当日总审核量</p>
            </div>
          </span>
        </div>
        <div class="rightSelect">
        </div>
      </div>
      <div class="surveyContainer">
        <div class="surveyTop">
          <h3>数据总览</h3>
          <div class="surveyDataTop">
              <div class="grid-content bg-purple surveyDatatitle">昨日</div>
              <div class="grid-content bg-purple surveySort">新增账户</div>
              <div class="grid-content bg-purple surveySort">活跃账号</div>
              <div class="grid-content bg-purple surveySort">当日上传量</div>
              <div class="grid-content bg-purple surveySort">当日成功上传量</div>
              <div class="grid-content bg-purple surveySort">当日成功上传审核量</div>
              <div class="grid-content bg-purple surveySort">当日上传审核通过量</div>
              <div class="grid-content bg-purple surveySort">总审核通过量</div>
              <div class="grid-content bg-purple surveySort">当日总审核量</div>
              <div class="grid-content bg-purple surveySort">发布量</div>
              <div class="grid-content bg-purple surveySort">当日上传过审率</div>
              <div class="grid-content bg-purple surveySort">审核过审率</div>
              <div class="grid-content bg-purple surveySort">优质账号发布量</div>
              <div class="grid-content bg-purple surveySort">发布视频总时长</div>
          </div>
          <div class="surveyDataBottom" v-for="(item,index) in recentData" :key="index">
              <div class="grid-content bg-purple surveyDatatitle">{{item.dateStr}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.newUserNum}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.activeUserNum}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.uploadNum}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.upload_ok_num}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.upload_audit_num}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.upload_auditpass_num}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.audit_pass_num}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.shenHeNum}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.faBuNum}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.gsratio}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.auditRate}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.yzfbNum}}</div>
              <div class="grid-content bg-purple surveyDataNum">{{item.videoPlayCost}}</div>
          </div>
        </div>
        <div class="videoBox">
          <div class="videoBoxType">
            <el-radio-group v-model="videoBoxType" @change="changeDataBoxBtn()">
              <el-radio-button label="0">基础数据</el-radio-button>
              <el-radio-button label="1">账号属性发布数据</el-radio-button>
              <el-radio-button label="2">账号类目发布数据</el-radio-button>
            </el-radio-group>
          </div>
          <el-date-picker el-date-picker
            v-model="echartDefaultDate"
            value-format="yyyy-MM-dd"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            class="surveyTime"
            @change="changeEchartTime"
            >
          </el-date-picker>
          <div class="basicData">
            <el-select v-model="accountTypeModel" placeholder="请选择" class="accountTypeList" v-if="videoBoxType==0" @change="changeAccountType()">
              <el-option
                v-for="item in accountTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="surveyEchart" ref="surveyEchart">
              <div class="surveyEchartBox">
                <div class="surveyEchartlist">
                  <el-tabs v-model="activeName" @tab-click="changeEchartBtn()" v-if="videoBoxType==0">
                    <el-tab-pane label="新增账户" name="1" >
                    </el-tab-pane>
                    <el-tab-pane label="活跃账号" name="2" >
                    </el-tab-pane>
                    <el-tab-pane label="当日上传量" name="3" >
                    </el-tab-pane>
                    <el-tab-pane label="当日成功上传量" name="4">
                    </el-tab-pane>
                    <el-tab-pane label="当日成功上传审核量" name="5">
                    </el-tab-pane>
                    <el-tab-pane label="当日上传审核通过量" name="6">
                    </el-tab-pane>
                    <el-tab-pane label="总审核通过量" name="7">
                    </el-tab-pane>
                    <el-tab-pane label="当日总审核量" name="8">
                    </el-tab-pane>
                    <el-tab-pane label="发布量" name="9">
                    </el-tab-pane>
                    <el-tab-pane label="当日上传过审率" name="10">
                    </el-tab-pane>
                    <el-tab-pane label="审核过审率" name="11">
                    </el-tab-pane>
                    <el-tab-pane label="优质账号发布量" name="12">
                    </el-tab-pane>
                    <el-tab-pane label="发布视频总时长" name="13">
                      
                    </el-tab-pane>
                  </el-tabs>
                </div>
                <div class="surveyEchartimg">
                    <div :id="IDNAME" style="height:400px;"></div>
                </div>
              </div>
            </div>
            <div class="surveyDetailBox">
              <div class="DetailBoxTop">
                <a class="surveyDown" id="surveyDown" :href="downloadExcelUrl" v-if="videoBoxType==0">下载数据</a>
                <a class="accountNatDown" id="accountNatDown" :href="downloadNatExcelUrl" v-if="videoBoxType==1">下载数据</a>
                <a class="accountTypeDown" id="accountTypeDown" :href="downloadTypeExcelUrl" v-if="videoBoxType==2">下载数据</a>
              </div>
              <div class="DetailBoxBottom" v-if="videoBoxType==0">
                <el-table
                  :data="tableData"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%">
                  <el-table-column
                    prop="dateId"
                    label="日期"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="newUserNum"
                    label="新增账户"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="activeUserNum"
                    label="活跃账号"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="uploadNum"
                    label="当日上传量"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="upload_ok_num"
                    label="当日成功上传量"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="upload_audit_num"
                    label="当日成功上传审核量"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="upload_auditpass_num"
                    label="当日上传审核通过量"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="audit_pass_num"
                    label="总审核通过量"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="shenHeNum"
                    label="当日总审核量"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="faBuNum"
                    label="发布量"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="gsratio"
                    label="当日上传过审率"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="auditRate"
                    label="审核过审率"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="yzfbNum"
                    label="优质账号发布量"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="videoPlayCost"
                    label="发布视频总时长"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <div class="natureDetailBoxBottom" v-if="videoBoxType==1">
                <el-table
                  :data="accountTableData"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%">
                  <el-table-column
                    fixed
                    prop="0.1"
                    label="日期"
                    align="center"
                    width="110">
                  </el-table-column>
                  <el-table-column
                    prop="1.1"
                    label="普通用户"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="2.1"
                    label="个人合作"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="3.1"
                    label="重点用户"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="4.1"
                    label="品牌用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="5.1"
                    label="seo用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="6.1"
                    label="自制用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="7.1"
                    label="包装用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="8.1"
                    label="机构合作"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="9.1"
                    label="百度上传用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="10.1"
                    label="采集用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="11.1"
                    label="匠星普通"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="12.1"
                    label="匠星精品"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="13.1"
                    label="外部SEO"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="14.1"
                    label="匠星原创"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="15.1"
                    label="MCN"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="16.1"
                    label="视频合作"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="17.1"
                    label="小视频"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="18.1"
                    label="官方号"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <div class="typeDetailBoxBottom" v-if="videoBoxType==2">
                <el-table
                  :data="accountTableData"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%">
                  <el-table-column
                    fixed
                    prop="0.1"
                    label="日期"
                    align="center"
                    width="110">
                  </el-table-column>
                  <el-table-column
                    prop="1.1"
                    label="健康"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="2.1"
                    label="娱乐"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="3.1"
                    label="奇闻"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="4.1"
                    label="情感"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="5.1"
                    label="社会"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="6.1"
                    label="搞笑"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="7.1"
                    label="军事"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="8.1"
                    label="历史"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="9.1"
                    label="生活"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="10.1"
                    label="美女"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="11.1"
                    label="帅哥"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="12.1"
                    label="影视"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="13.1"
                    label="舞蹈"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="14.1"
                    label="音乐"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="15.1"
                    label="时尚"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="16.1"
                    label="动漫"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="17.1"
                    label="游戏"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="18.1"
                    label="曲艺"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="19.1"
                    label="体育"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="20.1"
                    label="星座运势"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="21.1"
                    label="美食"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="22.1"
                    label="旅游"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="23.1"
                    label="财经"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="24.1"
                    label="房产"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="25.1"
                    label="萌宠"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="26.1"
                    label="汽车"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="27.1"
                    label="母婴"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="28.1"
                    label="少儿"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="29.1"
                    label="科技"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="30.1"
                    label="数码"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="31.1"
                    label="健身"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="32.1"
                    label="教育"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <!-- <div class="accountData" v-else-if="videoBoxType==1">
            <div class="" :id="videoPie" style="height:350px;"></div>
            <div class="accountNatureDetail">
              <div class="natureDetailBoxTop">
                <a class="accountNatDown" id="accountNatDown" :href="downloadNatExcelUrl">下载数据</a>
              </div>
              <div class="natureDetailBoxBottom">
                <el-table
                  :data="accountTableData"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%">
                  <el-table-column
                    fixed
                    prop="0.1"
                    label="日期"
                    align="center"
                    width="110">
                  </el-table-column>
                  <el-table-column
                    prop="1.1"
                    label="普通用户"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="2.1"
                    label="个人合作"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="3.1"
                    label="重点用户"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="4.1"
                    label="品牌用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="5.1"
                    label="seo用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="6.1"
                    label="自制用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="7.1"
                    label="包装用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="8.1"
                    label="机构合作"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="9.1"
                    label="百度上传用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="10.1"
                    label="采集用户"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="11.1"
                    label="匠星普通"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="12.1"
                    label="匠星精品"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="13.1"
                    label="外部SEO"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="14.1"
                    label="匠星原创"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="15.1"
                    label="MCN"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="16.1"
                    label="视频合作"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="17.1"
                    label="小视频"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="18.1"
                    label="官方号"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="accountTypeData" v-else-if="videoBoxType==2">
            <div class="" :id="videoPie" style="height:350px;"></div>
            <div class="accountNatureDetail">
              <div class="typeDetailBoxTop">
                <a class="accountTypeDown" id="accountTypeDown" :href="downloadTypeExcelUrl">下载数据</a>
              </div>
              <div class="typeDetailBoxBottom">
                <el-table
                  :data="accountTableData"
                  :header-cell-style="{background:'#E2E2EB',color:'#333'}"
                  :row-style="{height:'30px'}"
                  :cell-style="{padding:'10px'}"
                  style="font-size: 10px;width: 100%">
                  <el-table-column
                    fixed
                    prop="0.1"
                    label="日期"
                    align="center"
                    width="110">
                  </el-table-column>
                  <el-table-column
                    prop="1.1"
                    label="健康"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="2.1"
                    label="娱乐"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="3.1"
                    label="奇闻"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="4.1"
                    label="情感"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="5.1"
                    label="社会"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="6.1"
                    label="搞笑"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="7.1"
                    label="军事"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="8.1"
                    label="历史"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="9.1"
                    label="生活"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="10.1"
                    label="美女"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="11.1"
                    label="帅哥"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="12.1"
                    label="影视"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="13.1"
                    label="舞蹈"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="14.1"
                    label="音乐"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="15.1"
                    label="时尚"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="16.1"
                    label="动漫"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="17.1"
                    label="游戏"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="18.1"
                    label="曲艺"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="19.1"
                    label="体育"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="20.1"
                    label="星座运势"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="21.1"
                    label="美食"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="22.1"
                    label="旅游"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="23.1"
                    label="财经"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="24.1"
                    label="房产"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="25.1"
                    label="萌宠"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="26.1"
                    label="汽车"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="27.1"
                    label="母婴"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="28.1"
                    label="少儿"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="29.1"
                    label="科技"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="30.1"
                    label="数码"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="31.1"
                    label="健身"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="32.1"
                    label="教育"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/libs/http'
import {URL} from '@/libs/url'
import echarts from 'echarts'
import EchartsCoponent from '../../components/echart'
export default {
  name: 'videoDistrRopret',
  data () {
    return {
      title:'视频发布报表',
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
        }]
      },
      echartDefaultDate: [],//趋势图,饼状图查询时间，可指定默认显示时间
      tableData: [],//表格详情数据
      accountTableData:[],//账号属性和类别的详情
      recentData:'',//昨日今日数据
      partData:'',//趋势图数据
      rightName: 1,//右上角选项类型值 1-M站  2-世界之最  3-个性说说  4-爆米花PC
      loading: true,
      activeName: '1',//趋势图切换按钮值 1-活跃用户 2-活跃账户 1-新增用户 2-新增账户 3-启动次数  4-人均播放量 5-人均使用时长 6-≥30分钟人数
      IDNAME:'echart1',//趋势渲染区域id
      Valuename:'新增账户',//趋势图指标名字
      btnType:1,//趋势图切换类型 1-数值类型 2-时分秒类型 3- 百分比类型
      downloadExcelUrl:'',//下载数据的地址
      downloadTypeExcelUrl:'',//下载数据的地址
      downloadNatExcelUrl:'',//下载数据的地址
      videoBoxType:0,//数据类型选择 可用于账号属性和类别的传参
      accountTypeModel:'',
      accountTypeList:[{
        value: '',
        label: '账号类目'
        },{
        value: '健康',
        label: '健康'
        },{
        value: '娱乐',
        label: '娱乐'
        },{
        value: '奇闻',
        label: '奇闻'
        },{
        value: '情感',
        label: '情感'
        },{
        value: '社会',
        label: '社会'
        },{
        value: '搞笑',
        label: '搞笑'
        },{
        value: '军事',
        label: '军事'
        },{
        value: '历史',
        label: '历史'
        },{
        value: '生活',
        label: '生活'
        },{
        value: '美女',
        label: '美女'
        },{
        value: '帅哥',
        label: '帅哥'
        },{
        value: '影视',
        label: '影视'
        },{
        value: '舞蹈',
        label: '舞蹈'
        },{
        value: '音乐',
        label: '音乐'
        },{
        value: '时尚',
        label: '时尚'
        },{
        value: '动漫',
        label: '动漫'
        },{
        value: '游戏',
        label: '游戏'
        },{
        value: '曲艺',
        label: '曲艺'
        },{
        value: '体育',
        label: '体育'
        },{
        value: '星座运势',
        label: '星座运势'
        },{
        value: '美食',
        label: '美食'
        },{
        value: '旅游',
        label: '旅游'
        },{
        value: '财经',
        label: '财经'
        },{
        value: '房产',
        label: '房产'
        },{
        value: '萌宠',
        label: '萌宠'
        },{
        value: '汽车',
        label: '汽车'
        },{
        value: '母婴',
        label: '母婴'
        },{
        value: '少儿',
        label: '少儿'
        },{
        value: '科技',
        label: '科技'
        },{
        value: '数码',
        label: '数码'
        },{
        value: '健身',
        label: '健身'
        },{
        value: '教育',
        label: '教育'
        },{
        value: '风月',
        label: '风月'
        },{
        value: '其他',
        label: '其他'
        },
      ],
      videoPie:'',//账号属性发布数据饼状图id-echart2  账号类别饼状图id-echart3
      pieValueName:'',//账号属性及账号分类发布饼状图名称
    }
  },
  created(){
    document.title = this.title;
  },
  activated (){
    document.title = this.title;
  },
  mounted() {
    this.bindDrawal();//获取默认时间
    this.getAppRecentData();//获取APP概况数据
  },
  methods: {
    //获取当前默认一周的时间并放入趋势图和详情表的日期
    bindDrawal(){
      this.echartDefaultDate.push(this.common.formatDate(-6),this.common.formatDate(0))
      this.getPartData();
      this.getDetails();
    },
    //获取昨日今日概况数据
    getAppRecentData (){
      var that = this;
      http({  
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getvideoGetGeneralData,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.recentData = res.data;
        console.log("that.recentData",that.recentData);
      }).catch(function (err) {
        console.log(err);
      });
    },
    changeEchartBtn() {
      console.log("activeName",this.activeName);
      if(this.activeName==1){
        this.Valuename = '新增账户'
        this.IDNAME = 'echart1'
        this.btnType = 1
      }else if(this.activeName==2){
        this.Valuename = '活跃账号'
        this.IDNAME = 'echart2'
        this.btnType = 1
      }else if(this.activeName==3){
        this.Valuename = '当日上传量'
        this.IDNAME = 'echart3'
        this.btnType = 1
      }else if(this.activeName==4){
        this.Valuename = '当日成功上传量'
        this.IDNAME = 'echart4'
        this.btnType = 1
      }else if(this.activeName==5){
        this.Valuename = '当日成功上传审核量'
        this.IDNAME = 'echart5'
        this.btnType = 1
      }else if(this.activeName==6){
        this.Valuename = '当日上传审核通过量'
        this.IDNAME = 'echart6'
        this.btnType = 1
      }else if(this.activeName==7){
        this.Valuename = '总审核通过量'
        this.IDNAME = 'echart7'
        this.btnType = 1
      }else if(this.activeName==8){
        this.Valuename = '当日总审核量'
        this.IDNAME = 'echart8'
        this.btnType = 1
      }else if(this.activeName==9){
        this.Valuename = '发布量'
        this.IDNAME = 'echart9'
        this.btnType = 1
      }else if(this.activeName==10){
        this.Valuename = '当日上传过审率'
        this.IDNAME = 'echart10'
        this.btnType = 3
      }else if(this.activeName==11){
        this.Valuename = '审核过审率'
        this.IDNAME = 'echart11'
        this.btnType = 3
      }else if(this.activeName==12){
        this.Valuename = '优质账号发布量'
        this.IDNAME = 'echart12'
        this.btnType = 1
      }else if(this.activeName==13){
        this.Valuename = '发布视频总时长'
        this.IDNAME = 'echart13'
        this.btnType = 2
      }
      this.getPartData();
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.Valuename;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'趋势图分类选择',detailList);
    },
    //获取趋势图数据
    getPartData (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getvideoBasePartData+"?type="+that.activeName+"&startTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1]+'&AccountClass='+that.accountTypeModel,
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        if(res.code==0){
          that.partData = res.data;
          console.log("趋势图数据",that.partData);
          var datelist = [];
          var dataValueList = [];
          that.partData.forEach((item,index)=>{
            var datestr = item.dateStr;
            var datestr1 = datestr.split("");
            datestr1.splice(4,0,"-");
            datestr1.splice(7,0,"-");
            datestr1 = datestr1.join("");
            dataValueList.push(item.value*1);
            datelist.push(datestr1);
          });
          that.downloadE();
          that.showechart(dataValueList,datelist,that.Valuename,that.IDNAME,that.btnType);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取表格详情数据
    getDetails (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getvideoBaseGetDetails+"?accountclass="+that.accountTypeModel+"&StartTime="+that.echartDefaultDate[0]+"&EndTime="+that.echartDefaultDate[1],
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        that.tableData = res.data;
        console.log("表格数据",that.tableData);

      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取账号分类和属性详情
    getAccountDetails (){
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getvideoAccountDetail+"?type="+that.videoBoxType+"&StartTime="+that.echartDefaultDate[0]+"&EndTime="+that.echartDefaultDate[1],
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        var dataName = res.data.title;
        var dataValue = res.data.data;
        dataValue.forEach((item,index)=>{
          that.trans([dataName,item])
        })

      }).catch(function (err) {
        console.log(err);
      });
    },
    trans (arr) {
      let result = [] 
      arr.forEach(item => {
        item.forEach((d, i)=> {
          let a = result[i] = result[i] || []
          a.push(d)
        })
      })
      this.accountTableData.push(result);
      
      return result
      this.accountTypeDown();
      console.log("accountTableData",this.result)
    },
    //对饼状图中的某一个属性做排序
    compare(property){
      return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    },
    //获取账号发布饼状图
    pieMoneyChart() {
      var that = this;
      http({
        //这里是你自己的请求方式、url和data参数
        method: 'get',
        url:URL.recordUrl.getvideoTypeAccountData+"?Type="+that.videoBoxType+"&startTime="+that.echartDefaultDate[0]+"&endtime="+that.echartDefaultDate[1],
        data: {},
        //假设后台需要的是表单数据这里你就可以更改
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        }
      }).then(function (res) {
        that.loading = false;
        if(res.code==0){
          var data = res.data;
          var datelist = [];
          data.forEach((item,index)=>{
            var datestr = item.label;
            var newtime = item.value*1;
            let json={};
            json.name = datestr;
            json.value = newtime;
            datelist.push(json);
          }) 
          datelist.sort(that.compare('value'))
          console.log("饼状图数据",datelist);
          that.showpieCharet(datelist,that.pieValueName,that.IDNAME)
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    //获取表格导出
    downloadE(){
      this.downloadExcelUrl = URL.recordUrl.getvideoBaseDetailsExport+"?accountclass="+this.accountTypeModel+"&startTime="+this.echartDefaultDate[0]+"&endtime="+this.echartDefaultDate[1];
    },
    accountTypeDown(){
      this.downloadTypeExcelUrl = URL.recordUrl.getvideoAccountDetailExport+"?Type="+this.videoBoxType+"&startTime="+this.echartDefaultDate[0]+"&endtime="+this.echartDefaultDate[1];
    },
    changeEchartTime() {
      console.log(this.echartDefaultDate);
      if(this.videoBoxType==1){
        this.$nextTick(() => {
          this.pieMoneyChart();
          this.getAccountDetails();
        })
      }else if(this.videoBoxType==2){
        this.$nextTick(() => {
          this.pieMoneyChart();
          this.getAccountDetails();
        })
      }else if(this.videoBoxType==0){
        this.$nextTick(() => {
          this.getPartData();
          this.getDetails();
        })
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] = echartDefaultDate[0];
      detailArr[1] = echartDefaultDate[1];
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'数据日期选择',detailList);
    },
    changeAccountType(val) {
      console.log("accountTypeModel",this.accountTypeModel);
      this.getPartData();
      this.getDetails();
      var detailList = [];
      var detailArr = [];
      detailArr[0] = this.accountTypeModel;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'账户类目选择',detailList);
    },
    changeDataBoxBtn() {
      console.log("videoBoxType",this.videoBoxType);
      if(this.videoBoxType==1){
        this.IDNAME='echart2_1';
        this.pieValueName = '账号属性';
        this.$nextTick(() => {
          this.pieMoneyChart();
          this.getAccountDetails();
        })
        
      }else if(this.videoBoxType==2){
        this.IDNAME='echart3_1';
        this.pieValueName = '账号类目';
        this.$nextTick(() => {
          this.pieMoneyChart();
          this.getAccountDetails();
        })
        
      }else if(this.videoBoxType==0){
        this.IDNAME='echart1';
        this.pieValueName = '新增账户';
        this.$nextTick(() => {
          this.getPartData();
          this.getDetails();
        })
        
      }
      var detailList = [];
      var detailArr = [];
      detailArr[0] =  this.pieValueName;
      detailList.push(detailArr);
      detailList = JSON.stringify(detailList);
      window.LogList.checkLog('二郎神后台管理系统',this.title,'数据分类选择',detailList);
    },
    //实现趋势图
    showechart(dataValueList,datelist,Valuename,idName,btnType){
      var myChart = echarts.init(document.getElementById(idName));
      //根据趋势图显示类型切换对数据中的值做处理以便于在坐标轴上显示(同时将最大值*2)
      //btnType1-数值类型 2-时分秒类型 3- 百分比类型
      var ValueArr = [];//数值类型
      var max;//存储最大值
      var min;//存储最小值
      var tooltip;
      var yaxisLabel;
      var that = this;
      myChart.clear();
      if(btnType==2){
        dataValueList.forEach(function(data){
           ValueArr.push(data);
        })
        max = Math.round(Math.max.apply(null,ValueArr)*1.2);
        tooltip = {
          trigger: 'axis',
          //次数方法用来设置坐标上的值的格式
          formatter: function (params) {
            var $result = '00:00';
            if (params[0].value>0){
                var $hour = Math.floor(params[0].value/3600);
                var $minute = Math.floor(params[0].value%3600/60);
                var $second = Math.floor((params[0].value-60 * $minute) % 60);
                if ($hour < 10) {
                    $hour = '0'+$hour;
                }
                if($minute<10){
                    $minute = "0"+$minute;
                }
                if($second<10){
                    $second = "0"+$second;
                }
                $result = $hour+':'+$minute+':'+$second;
            }else{
              $result = "00"+':'+"00"+':'+"00";
            }
            var htmlStr = '';
            htmlStr += '<div><span style="color:#fff;">' + params[0].name + '</span><br/> ';
            for(var i=0;i<params.length;i++){
            //前面的原点和他的颜色
              htmlStr += '<span style="width: 8px;height: 8px;margin-right:5px;display:inline-block;border-radius: 50%;background-color:'+params[i].color+'"></span><span style="color:#fff;">' + params[i].seriesName + ':</span>'+
                '<span style="color:#fff;">' + $result + '</span><br/>';
            }
            htmlStr += '</div>';
            return  htmlStr
          },
        }
        yaxisLabel = {
          textStyle: {
            color: '#666',
          },
          formatter:function ($times) {
            var $result = '00:00';
              if ($times>0){
                  var $hour = Math.floor($times/3600);
                  var $minute = Math.floor($times%3600/60);
                  var $second = Math.floor(($times-60 * $minute) % 60);
                  if ($hour < 10) {
                      $hour = '0'+$hour;
                  }
                  if($minute<10){
                      $minute = "0"+$minute;
                  }
                  if($second<10){
                      $second = "0"+$second;
                  }
                  return $result = $hour+':'+$minute+':'+$second;
              }else{
                return $result = "00"+':'+"00"+':'+"00";
              }
            }
          }
      }else if(btnType==3){
        dataValueList.forEach(function(data){
          ValueArr.push(data);
        })
        max = Math.round(Math.max.apply(null,ValueArr)*1.2);
        tooltip = {
          trigger: 'axis',
          //次数方法用来设置坐标上的值的格式
          formatter: function (params) {
                var htmlStr = '';
                htmlStr += '<div><span style="color:#fff;">' + params[0].name + '</span><br/> ';
                for(var i=0;i<params.length;i++){
                //前面的原点和他的颜色
                  htmlStr += '<span style="width: 8px;height: 8px;margin-right:5px;display:inline-block;border-radius: 50%;background-color:'+params[i].color+'"></span><span style="color:#fff;">' + params[i].seriesName + ':</span>'+
                    '<span style="color:#fff;">' + params[i].value + '&nbsp;%</span><br/>';
                }
                htmlStr += '</div>';
                return  htmlStr
              },
            
        }
        yaxisLabel = {
          textStyle: {
            color: '#666',
          },
          formatter: val=>{
            return val+"%"
          }
        }
      }else{
        //给dataValueList中最大值*1.2作为Y轴上的最大值
        dataValueList.forEach(function(data){
           ValueArr.push(data);
        })
        max = Math.round(Math.max.apply(null,ValueArr)*1.2);
        tooltip = {
          trigger: 'axis',
        }
        yaxisLabel = {
          textStyle: {
            color: '#666'
          }
        }
      }
      
      myChart.setOption({
        // title: {
        //     text: Valuename+'趋势图'
        // },
        tooltip: tooltip,
        legend: {
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: datelist,
            splitLine:{show: false},//去除网格线
            axisLine: {
              lineStyle: {
                type:'solid',
                color:'#E6E6E6',//左边线的颜色
                width:'2'//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color:'#666',//坐标值得具体的颜色

              }
            }
        },
        yAxis: {
            type: 'value',
            min: min,
            max: max,
            splitLine:{
              lineStyle: {
                type:'dashed',
              }
            },
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color:'#E6E6E6',
                  width:'2'
              }
            },
            axisLabel: yaxisLabel
        },
        series: [
            {
                name: Valuename,
                type: 'line',
                stack: '总量',
                itemStyle : {  
                  normal : {  
                    color:'#396FFF',  
                    lineStyle:{  
                      color:'#396FFF'  
                    }  
                  }  
                },  
                data: ValueArr
            },
        ]
      });
    },
    //账号属性发布饼状图
    showpieCharet (datelist,pieValueName,IDNAME){
      var myChart = echarts.init(document.getElementById(IDNAME));
      myChart.clear();
      var option;
      option = {
          // title: {
          //   text: pieValueName+'分布',
          //    left:'center'
          // },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              left: 10,
              data: []
          },
          series: [
              {
                  name: pieValueName,
                  type: 'pie',
                  selectedMode: 'single',
                  radius: [0, '30%'],

                  label: {
                      position: 'inner'
                  },
                  labelLine: {
                      show: false
                  },
              },
              {
                  name: pieValueName,
                  type: 'pie',
                  radius: ['40%', '55%'],
                  label: {
                      // formatter: '{a} <br/>{b} : {c} ({d}%) ',
                      formatter: '{b}({d}%) ',
                      // formatter: '{a} <br/>{b} : {c} ({d}%) ',
                      // backgroundColor: '#eee',
                      // borderColor: '#aaa',
                      // borderWidth: 1,
                      // borderRadius: 4,
                      rich: {
                          a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                          },
                          hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                          },
                          b: {
                              fontSize: 15,
                              lineHeight: 20
                          },
                          per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                          }
                      }
                  },
                  data:datelist,
              }
          ]
      };
      myChart.setOption(option);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 @import '../../assets/css/videoDistrRopret.less';
 /deep/.el-dropdown-link{
   cursor:pointer;
 }
 /deep/.el-range-editor.el-input__inner{
  width: 25%;
  height: 35px;
  padding: 0px 10px;
  display: flex;
  justify-content: start;
}

</style>
