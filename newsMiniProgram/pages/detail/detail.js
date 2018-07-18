Page({
  data: {
    id: 1523074607650,
    newsDetail: {}
  },

  //`options`参数是从之前的页面传递过来的，是导向此页面的url的参数部分
  onLoad(options) {
    this.setData({
      id: options.id
    });
    this.getDetail();
  },

  getDetail() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result;
        result.date = result.date.slice(11,16); //提取出需要的时间部分：`h:m`
        console.log(result);
        this.setData({
          newsDetail: result
        });
      },
    });
  }
})