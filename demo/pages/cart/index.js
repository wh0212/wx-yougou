import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal
} from "../../utils/asyncWx"
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
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
    try {
      getSetting().then((result) => {
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress === false) {
          //调用获取收获地址api
          openSetting().then((res) => {
            wx.chooseAddress({
              success: (res2) => {
                console.log(res2);
              },
            })
          })
        }
        wx.chooseAddress({
          success: (res) => {
            console.log(res);
            //存入缓存中
            wx.setStorageSync('address', res)
          },
        })
      })
    } catch (error) {
      console.log(error);
    }

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
  //商品选中-反选
  handeItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked;
    //把购物车数据重新设置到data和缓存中
    this.setCart(cart)

  },
  //设置购物车状态 、重新计算、数据、全选 总价格
  setCart(cart) {
    let allChecked = true
    //总价格 、总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } else {
        allChecked = false
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart', cart)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      address
    })
    this.setCart(cart)
  },
  //全选
  handleItemAllCheck() {
    let {
      cart,
      allChecked
    } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart)
  },
  handleItemNumEdit(e) {
    const {
      oper,
      id
    } = e.currentTarget.dataset;
    let {
      cart
    } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1 && oper === -1) {
      showModal({
        content:"您是否要删除？"
      }).then((res)=>{
        if (res.confirm) {
          cart.splice(index,1)
          this.setCart(cart)
        }else if(res.cancel){
          console.log("用户取消");
          
        }
      })
    } else {
      cart[index].num += oper;
      this.setCart(cart)
    }

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