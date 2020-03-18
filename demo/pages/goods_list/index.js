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
  //总页数
  tatalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.Queryparams.cid = options.cid
    this.goodsList();

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
      url:"/goods/search",
      data:this.Queryparams
    }).then((res)=>{
      
      const {goods,total} = res.data.message;
      console.log(res.data);
      //总页数= Math.ceil(总条数 / 页容量)
      this.tatalPages = Math.ceil(total / this.Queryparams.pagesize)

      this.setData({
        //拼接数据
        goodsLis: [...this.data.goodsLis,...goods]
      })
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
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
    //重置数组为空
    this.setData({
      goodsLis:[]
    })
    //重置页码
    this.Queryparams.pagenum=1;
    //发送请求
    this.goodsList()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //当前页码是否大于等于总页数
    if (this.Queryparams.pagenum >= this.tatalPages){
      console.log("no")
      wx.showToast({
        title: '没有下一页数据了',
      })
    }else{
      console.log("yes")
      this.Queryparams.pagenum++;
      this.goodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})