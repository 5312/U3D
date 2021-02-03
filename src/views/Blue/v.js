let downUrl = this.url; let _this = this;
console.log(downUrl)
var dtask = plus.downloader.createDownload(downUrl, {}, function (d, status) {//后台下载                    // 下载完成 
  _this.show = false; if (status == 200) {
    plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function (error) {//发起安装 
      uni.showToast({ title: '安装失败', duration: 1500 });
    })
  } else {
    uni.showToast({
      title: '更新失败',
      duration: 1500
    });
  }
});
dtask.start();      