// components/Tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    act:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemact(e){
      const {index} = e.currentTarget.dataset;
      //触发父组件的事件
      this.triggerEvent("tabsItme",{index})
    }
  }
})
