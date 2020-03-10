import { request } from "../../request/index"
// import regener from "../../lib/runtime/runtime"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightCountent: [],
    currentIndex:0,
    scrollTop:0
  },
  CateList: [],
  handleitem(e){
    const {index} = e.currentTarget.dataset
    // 右侧 不同索引
    let rightCountent = this.CateList[index].children;
    console.log(index)
    this.setData({
      currentIndex:index,
      rightCountent,
      scrollTop:0
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地存储
    const Cates = wx.getStorageSync("cates");
    //判断
    if(!Cates){
      this.getCates()
    }else{
      //过期时间
      if(Date.now()-Cates.time>1000*10){
        this.getCates()
      }else{
        console.log("旧的数据")
        this.CateList = Cates.data;
        //左侧
        let leftMenuList = this.CateList.map((v) => v.cat_name);
        //右侧
        let rightCountent = this.CateList[0].children;
        this.setData({
          leftMenuList,
          rightCountent
        })
      }
    }
    
  },
  //获取分类数据
  getCates() {
    request({
      //简化
      // url:"/categories"
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then((res) => {
      // console.log(res.data.message);
      this.CateList = res.data.message;
      //把接口数据存入到本地存储
      wx.setStorageSync("cates", {time:Date.now(),data:this.CateList})
      // console.log(this.CateList)
      //左侧
      let leftMenuList = this.CateList.map((v) => v.cat_name);
      //右侧
      let rightCountent = this.CateList[0].children;
      this.setData({
        leftMenuList,
        rightCountent
      })

    })
    
  },
  /*
  1.使用async await来发送请求
  */
  // async getCates(){
  //   const res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"})
  //         this.CateList = res.data.message;
  //     //把接口数据存入到本地存储
  //     wx.setStorageSync("cates", {time:Date.now(),data:this.CateList})
  //     // console.log(this.CateList)
  //     //左侧
  //     let leftMenuList = this.CateList.map((v) => v.cat_name);
  //     //右侧
  //     let rightCountent = this.CateList[0].children;
  //     this.setData({
  //       leftMenuList,
  //       rightCountent
  //     })
  // },
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