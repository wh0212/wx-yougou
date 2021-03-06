import {
  request
} from "../../request/index.js"
// pages/goos_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {}
  },
  //商品对象
  goodsInfo: {},
  //添加购物车
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || [];
    //判断商品是否存在购物车
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
    if (index === -1) {
      //不存在第一次添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
    } else {
      //存在 ++
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: "success",
      //防止用户手抖
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options;
    console.log(goods_id);
    this.getGooddetail(goods_id);
  },
  getGooddetail(goods_id) {
    request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    }).then((res) => {
      console.log(res.data.message)
      this.goodsInfo = res.data.message;
      this.setData({
        goodsData: res.data.message
      })
    })
  },
  //点击轮播图放大
  handleimage(e) {
    //构造要预览的数组
    console.log(e)
    const urls = this.goodsInfo.pics.map((v) => v.pics_mid)
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
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