import {request} from "../../request/index"
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsLis:[]
  },
  //接口要的参数
  Queryparams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.Queryparams.cid = options.cid
    this.goodsList()
  },
  tabsItemchange(e) {
    const { index } = e.detail;
    let {tabs} = this.data;
    tabs.map(v => v.id === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  goodsList(){
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
      data:this.Queryparams
    }).then((res)=>{
      
      const {goods} = res.data.message;
      console.log(goods);
      this.setData({
        goodsLis: goods
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})