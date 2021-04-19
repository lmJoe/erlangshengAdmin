<template>
  <el-container>
    <el-aside style="width: auto;" class="aside aside-flex"
              :class="{'aside-show': getCollapseState == false?true:false,
                      'aside-hide':getCollapseState == true?true:false}">
      <Aside></Aside>
    </el-aside>
    <el-container class="container-aside" :style="{paddingLeft: (getCollapseState == false?'200px':'64px')}">
      <Header></Header>
      <el-main :style="{paddingTop: '60px', paddingLeft: '0', paddingRight: '0'}">
        <AsideTitle></AsideTitle>
        <!--页面的展示-->
        <transition name="compAnimate" appear>
          <keep-alive>
            <router-view :style="{padding: '0', marginTop: '45px'}"></router-view>
          </keep-alive>
        </transition>
      </el-main>
      <Footer></Footer>
    </el-container>
  </el-container>
</template>

<script>
  import Aside from "../views/layout/leftAside/Aside"
  import Header from "../views/layout/rightMain/Header"
  import GlbSetting from "./GlbSetting"
  import AsideTitle from "../views/layout/rightMain/AsideTitle";
  import Crumbs from "../views/layout/rightMain/Crumbs"
  import Footer from "../views/layout/rightMain/Footer";
  import {mapGetters} from 'vuex'
  import style from "../assets/css/public.css"

  export default {
    name: "Home",
    computed: {
      /*
      * 在VUEX中获得asideColor颜色值
      * */
      ...mapGetters({
        getCollapseState: 'header/CollapseState',
        getNavs: 'header/Navs',
        getAsideTitle: 'header/AsideTitle',
        getCount: 'header/Count'
      })
    },
    watch: {
      '$route': function (to,from) {
        this.createTabs(to.path);
        var detailList = [];
        var detailArr = [];
        detailArr[0] = from.meta.name;
        detailArr[1] = "跳转至";
        detailArr[2] = to.meta.name;
        detailList.push(detailArr);
        detailList = JSON.stringify(detailList);
        window.LogList.checkLog('二郎神后台管理系统','左侧导航','点击跳转',detailList);
      }
    },
    methods: {
      /**
       * 动态添加标题标签函数
       * path：当前点击左侧导航的path
       * 1.首先会处理welcome（首页）页，welcome页已在vuex中初始化了，所以，当用户再次点击时，直接定位到首页即可
       * 2.如果不是首页，则会通过当前导航的path去和左侧导航数据比对，如果path相等存入vuex asideTitle
       * 3.如果vuex的asideTitle已有数据，再次点击时，只定位，不新增
       * 注意：vuex中的count（标题标签的增值变量，可以保证每次添加的标题标签不重复，作用于后面的标题标签定位），count每次进来都需要自增，保证唯一，默认为0
       * vuex中的asideTitle格式：
       * {
            title: '主控制台', // title name
            path: '/welcome',  //title the path
            activeIndex: 0 //default value
          }
       *
       * */
      createTabs(path) {
        if (path !== '/appSurvey') {
          let asideItem = new Object()
          //得到当前点击的左侧导航的名字，存入vuex的header/asideTitle中
          let nav = this.getNavs.nav
          for (let i = 0; i < nav.length; i++) {
            const parentTitle = nav[i].name
            //判断是否存在子导航，如果存在则取子导航的名字，如果没有，则取当前的导航名字
            if (nav[i].children) {
              var navC = nav[i].children;
              for (let j = 0; j < nav[i].children.length; j++) {
                if (nav[i].children[j].ulr === path) {
                  const childTitle = nav[i].children[j].name
                  //判断vuex中是否已经存在当前标题，如果存在则不处理，否则添加入vuex中
                  let result = this.getAsideTitle.filter(item => {
                    return item.path === nav[i].children[j].ulr
                  })
                  if (result.length == 0) {
                    //添加标题标签
                    let count = this.getCount
                    count++
                    this.$store.commit('header/setCount', count)
                    switch(nav[i].children[j].ulr) {
                      case '/appRetain':
                        asideItem.title = 'APP留存分析'
                        break;
                      case '/appDuration':
                        asideItem.title = 'APP时长分析'
                        break;
                      case '/appPlayData':
                        asideItem.title = 'APP播放数据'
                        break;
                      case '/mohesurvey':
                        asideItem.title = '魔盒概况'
                        break;
                      case '/mohePlayData':
                        asideItem.title = '魔盒播放数据'
                        break;
                      case '/webSurvey':
                        asideItem.title = '网站概况'
                        break;
                      case '/webPlayData':
                        asideItem.title = '网站播放数据'
                        break;
                      case '/xcxsurvey':
                        asideItem.title = '小程序概况'
                        break;
                      case '/xcxPlayData':
                        asideItem.title = '小程序播放数据'
                        break;
                      case '/sdksurvey':
                        asideItem.title = '魔盒SDK概况'
                        break;
                      case '/sdkRetain':
                        asideItem.title = '魔盒SDK留存分析'
                        break;
                      case '/sdkDuration':
                        asideItem.title = '魔盒SDK时长分析'
                        break;
                      case '/bdgPlayData':
                        asideItem.title = '斑点狗播放数据'
                        break;
                      case '/bdgDuration':
                        asideItem.title = '斑点狗时长分析'
                        break;
                      case '/bdgRetain':
                        asideItem.title = '斑点狗留存分析'
                        break;
                      case '/bdgSurvey':
                        asideItem.title = '斑点狗概况'
                        break;
                      case '/bdgsdkPlayData':
                        asideItem.title = '斑点狗SDK播放数据'
                        break;
                      case '/bdgUseraction':
                        asideItem.title = '斑点狗用户行为数据'
                        break;
                      case '/operStatementEC':
                        asideItem.title = '电商经营报表'
                        break;
                      case '/dataEntryEC':
                        asideItem.title = '数据录入-电商'
                        break;
                      default:
                        asideItem.title = nav[i].children[j].name
                    }
                    // asideItem.title = nav[i].children[j].name
                    asideItem.path = nav[i].children[j].ulr
                    asideItem.activeIndex = count
                    this.$store.commit('header/setAside', asideItem)
                    this.$store.commit('header/setActiveIndex', count)
                    this.setCrumbs(parentTitle, childTitle)
                    return
                  } else {
                    //定位到当前标题标签
                    
                    if (nav[i].children[j].ulr === path) {
                      let result = this.getAsideTitle.filter( item => {
                        return item.path === nav[i].children[j].ulr
                      })
                      this.$store.commit('header/setActiveIndex', result[0].activeIndex)
                      this.setCrumbs(parentTitle, childTitle)
                    }
                  }
                }
              }
            } else {
              if (nav[i].ulr === path) {
                //判断vuex中是否已经存在当前标题，如果存在则不处理，否则添加入vuex中
                let result = this.getAsideTitle.filter(item => {
                  return item.path === nav[i].ulr
                })
                const childTitle = nav[i].name
                //添加标题标签
                if (result.length == 0) {
                  let count = this.getCount
                  count++
                  this.$store.commit('header/setCount', count)
                  asideItem.title = nav[i].name
                  asideItem.path = nav[i].ulr
                  asideItem.activeIndex = count
                  this.$store.commit('header/setAside', asideItem)
                  this.$store.commit('header/setActiveIndex', count)
                  this.setCrumbs(childTitle, '')
                  return
                } else {
                  //定位到当前标题标签
                  if (nav[i].ulr === path) {
                    let result = this.getAsideTitle.filter( item => {
                      return item.path === nav[i].ulr
                    })
                    this.$store.commit('header/setActiveIndex', result[0].activeIndex)
                    this.setCrumbs(childTitle, '')
                  }
                }
              }
            }
          }
        } else {
          this.$store.commit('header/setActiveIndex', 0)
          this.setCrumbs('APP','APP概况')
        }
      },
      setCrumbs(pt,ct) {
        let crumbs = new Array()
        crumbs.push(pt,ct)
        this.$store.commit('header/setCrumbs', crumbs);
      }
    },
    components: {
      Aside,
      Header,
      GlbSetting,
      AsideTitle,
      Crumbs,
      Footer
    }
  }
</script>

<style scoped>
  .el-aside {
    color: #333;
  }

  .el-tabs--card > .el-tabs__header {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 1000;
    opacity: 1;
    background-color: #FFFFFF;
    margin: 0;
    padding-right: 20px;
  }

  .el-row {
    margin-bottom: 15px;
  }

  /*组件过渡动画*/
  .compAnimate-enter {
    opacity: 0;
    transform: translateY(-60px);
  }

  .compAnimate-leave-to {
    opacity: 0;
  }

  .compAnimate-enter-active {
    transition: all .8s ease-in-out;
  }
  .compAnimate-leave-active {
    transition: all .2s ease;
  }

</style>