
const state = {
  drawerState: false,
  asideColor: '#ffffff',
  aTextColor: '#303133',
  aActiveColor: '#409EFF',
  headerBColor: '#1d2438',
  headerColor: '#FFFFFF',
  doubleOpen: true
}

const getters = {
  openDrawer: state => {
    return state.drawerState
  },
  AsideColor: state => {
    return state.asideColor
  },
  ATextColor: state => {
    return state.aTextColor
  },
  ActiveColor: state => {
    return state.aActiveColor
  },
  HeaderBColor: state => {
    return state.headerBColor
  },
  HeaderColor: state => {
    return state.headerColor
  },
  DoubleOpen: state => {
    return state.doubleOpen
  }
}

const mutations = {
  asideChange(state, changeColor) {
    state.asideColor = changeColor
  },
  textChange(state, changeColor) {
    state.aTextColor = changeColor
  },
  activeChange(state, changeColor) {
    state.aActiveColor = changeColor
  },
  headerBChange(state, changeColor) {
    state.headerBColor = changeColor
  },
  headerChange(state, changeColor) {
    state.headerColor = changeColor
  },
  valueChange(state, changeValue) {
    state.doubleOpen = changeValue
  },
  setDrawerState(state, value) {
    state.drawerState = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}