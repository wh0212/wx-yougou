import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx"
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //收获地址按钮
  handleChooseAddress() {
    //获取权限
    // wx - wx.getSetting({
    //   success: (result) => {
    //     //获取权限状态--属性名怪异的时候都需要使用["属性名"]
    //     const scopeAddress = result.authSetting["scope.address"];
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       wx.chooseAddress({
    //         success: (res) => {
    //           console.log(res);
    //         },
    //       })
    //     } else {
    //       //用户取消过授权
    //       wx - wx.openSetting({
    //         success: (result) => {
    //           wx.chooseAddress({
    //             success: (res3) => {
    //               console.log(res3);
    //             },
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    getSetting().then((result) => {
      const scopeAddress = result.authSetting["scope.address"];
      if (scopeAddress === true || scopeAddress === undefined) {
        //调用获取收获地址api
        chooseAddress().then((res) => {
          console.log(res);

        })
      } else {
        openSetting().then(res4=>{
          chooseAddress().then((res5) => {
          console.log(res5);
        })
        })
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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