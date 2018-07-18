const bannerList = [
  { 'categoryName': '国内', 'type': 'gn', 'cateId': 0 }, //cateId和currentTab变量联系到一起
  { 'categoryName': '国际', 'type': 'gj', 'cateId': 1 },
  { 'categoryName': '财经', 'type': 'cj', 'cateId': 2 },
  { 'categoryName': '娱乐', 'type': 'yl', 'cateId': 3 },
  { 'categoryName': '军事', 'type': 'js', 'cateId': 4 },
  { 'categoryName': '体育', 'type': 'ty', 'cateId': 5 },
  { 'categoryName': '其他', 'type': 'other', 'cateId': 6 }
]

Page({
  data: {
    categories: '', //新闻类别横幅栏
    currentTab: 0, //当前所在新闻类别
    newsInformation: [], //新闻列表，其中每个元素都是一个json数据，记录了每条新闻的id、标题、来源、发布时间、关键图片等信息
  },

  onLoad(options) {  //这里options参数并没有起作用，因为没有传入，可省略
    this.setData({
      categories: bannerList
    });

    this.getNews();
  },

  getNews(callBack) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',

      data: {
        'type': this.data.categories[this.data.currentTab].type
      },

      success: res => {
        console.log(res.data); //查看返回的数据都有些什么东西
        let result = res.data.result;

        //这个`for`循环的功能是将需要的时间部分提取出来
        for (let i = 0; i < result.length; i++){
          result[i].date = result[i].date.slice(11,16);
        }

        console.log(result); //查看修改时间形式后的列表
        this.setData({
          newsInformation: result,
        }) 
      },

      complete: () => {
        callBack && callBack();
      }
    });
  },

  //功能：点击切换上方导航栏新闻类别，同时下方新闻条目也相应发生变化
  swichNavigation: function (e) {
    console.log(e); //查看切换导航栏后对应条目的信息
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });
    console.log(this.data.currentTab); //打印当前所在导航栏的位置
    this.getNews();
  },

  //功能：点击跳转至当前新闻的详情页面
  newsDetail: function (e) {
    console.log(e); //查看当前新闻的`id`该如何索引
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + e.currentTarget.id
    });
  },

  //功能：实现下拉刷新
  onPullDownRefresh() {
    wx.showLoading({ //在屏幕中显示刷新字样
      title: '刷新中...',
    });
    this.getNews( () => {
      wx.stopPullDownRefresh();
    });
    wx.hideLoading(); //刷新获取新的数据后隐藏刷新字样
  }

})