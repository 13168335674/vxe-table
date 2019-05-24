import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style/layout.scss'
import './plugins/highlight.js'
import './plugins/element.js'
import './plugins/iview.js'
import './plugins/xtable.js'
import './mock'
import XEUtils from 'xe-utils'

Vue.config.productionTip = false

// 后台异步生成20万数据，为了避免大量运算卡主页面
var columns = window.MOCK_COLUMN_LIST = []
var list = window.MOCK_DATA_LIST = []
var currTime = Date.now()
var fullIndex = 0
var size = 200000
function mockData () {
  let len = fullIndex === 0 ? 10000 : 1500
  for (var index = 0; index < len; index++) {
    currTime += 5000
    fullIndex++
    if (columns.length < 10000) {
      let colItem = {
        prop: 'name',
        label: 'cloumn_' + fullIndex,
        width: 160
      }
      if (fullIndex === 1) {
        colItem.type = 'selection'
        colItem.width = 60
      }
      if (fullIndex < 3) {
        colItem.fixed = 'left'
      }
      if (fullIndex < 3) {
        colItem.sortable = true
      } else if (fullIndex === 4) {
        colItem.filters = [
          { label: 'id < 100', value: 100 },
          { label: 'id < 2000', value: 2000 }
        ]
        colItem.filterMethod = ({ value, row, column }) => row.id < value
      }
      columns.push(colItem)
    }
    list.push({
      id: fullIndex,
      name: 'name_' + fullIndex,
      role: 'role_' + fullIndex,
      key: 'home.label.key' + (index % 2 === 0 ? index - 1 : index),
      language: index % 2 === 0 ? 'zh_CN' : 'en_US',
      checked: false,
      flag: index % 2 === 0,
      date: new Date(currTime),
      date1: new Date(currTime),
      date2: '09:00:00',
      date3: XEUtils.toDateString(currTime, 'yyyy-MM-dd'),
      date4: new Date(currTime),
      date5: '09:00',
      time: currTime + XEUtils.random(100, 10000),
      sex: index % 3 ? '0' : '1',
      sex1: [index % 3 ? '0' : '1'],
      sex2: index % 3 ? '0' : '1',
      age: XEUtils.random(18, 35),
      region: index % 4 === 0 ? [19, 199, 1773] : index % 3 === 0 ? [9, 73, 719] : [1, 1, 5],
      rate: XEUtils.random(0, 5),
      address: `地址 地址地址 地址地址 址地址址地址 址地址 址地址  址地址 址地址  址地址 址地址址地址址地址 地址${index}`,
      updateTime: currTime,
      createTime: currTime,
      info: {
        name2: 'name2_' + fullIndex,
        more: {
          sex2: index % 3 ? '0' : '1',
          age2: XEUtils.random(18, 35)
        }
      }
    })
  }
  if (fullIndex < size) {
    setTimeout(mockData, 10)
  }
}

mockData()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
