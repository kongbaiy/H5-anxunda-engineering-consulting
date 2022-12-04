(function (win, doc) {
    //数字自增到某一值动画参数（目标元素,自定义配置）
    function NumAutoPlusAnimation(targetEle, options) {
      /*可以自己改造下传入的参数，按照自己的需求和喜好封装该函数*/
      //不传配置就把它绑定在相应html元素的data-xxxx属性上吧
      options = options || {};
  
      var $this = document.getElementById(targetEle),
        time = options.time || $this.data("time"), //总时间--毫秒为单位
        finalNum = options.num || $this.data("value"), //要显示的真实数值
        regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度
        step = finalNum / (time / regulator),
        /*每30ms增加的数值--*/
        count = 0, //计数器
        initial = 0;
  
      var timer = setInterval(function () {
        count = count + step;
        if (count >= finalNum) {
          clearInterval(timer);
          count = finalNum;
  
          if (typeof options.complete === "function") {
            options.complete();
          }
        }
  
        //t未发生改变的话就直接返回
        //避免调用text函数，提高DOM性能
        var t = Math.floor(count);
        if (t == initial) return;
  
        initial = t;
        $this.innerHTML = initial;
      }, 30);
    }
  
    function Video(el) {
      this.el = el;
    }
    // 加载数据
    Video.prototype.onData = function (callback) {
      var el = this.el;
      el.addEventListener("loadedmetadata", callback);
    };
    // 开始播放
    Video.prototype.onPlay = function (callback) {
      var el = this.el;
      el.addEventListener("play", callback);
    };
    // 播放中
    Video.prototype.onPlaying = function (callback) {
      var el = this.el;
      el.addEventListener("playing", callback);
    };
    // 加载中
    Video.prototype.onLoad = function (callback) {
      var el = this.el;
      el.addEventListener("waiting", callback);
    };
    // 暂停
    Video.prototype.onPause = function (callback) {
      var el = this.el;
      el.addEventListener("pause", callback);
    };
    // 播放结束
    Video.prototype.onEnded = function (callback) {
      var el = this.el;
      el.addEventListener("ended", callback);
    };
    Video.prototype.onMotionless = function (callback) {
      var el = this.el;
      el.addEventListener("pause", callback);
      el.addEventListener("ended", callback);
    };
    // 移除事件
    Video.prototype.unon = function (type, callback) {
      var el = this.el;
      var eventTypes = {
        data: "onData",
        play: "onPlay",
        playing: "onPlaying",
        load: "onLoad",
        pause: "onPause",
        ended: "onEnded",
        motionless: "onMotionless",
      };
  
      if (type === "all") {
        for (var i in eventTypes) {
          el.removeEventListener(eventTypes[i], function () {}, false);
        }
      } else if (eventType[type]) {
        el.removeEventListener(eventTypes[type], function () {}, false);
      }
    };
  
    function Mouse() {}
    Mouse.prototype.scroll = function (callback) {
      var scrollFunc = function (e) {
        e = e || window.event;
        if (e.wheelDelta) {
          //判断浏览器IE，谷歌滑轮事件
          if (e.wheelDelta > 0) {
            //当滑轮向上滚动时
            callback("up");
          }
          if (e.wheelDelta < 0) {
            //当滑轮向下滚动时
            callback("down");
          }
        } else if (e.detail) {
          //Firefox滑轮事件
          if (e.detail > 0) {
            //当滑轮向下滚动时
            callback("down");
          }
          if (e.detail < 0) {
            //当滑轮向上滚动时
            callback("up");
          }
        }
      };
  
      //给页面绑定滑轮滚动事件
      if (document.addEventListener) {
        document.addEventListener("DOMMouseScroll", scrollFunc, false);
      }
      //滚动滑轮触发scrollFunc方法
      window.onmousewheel = document.onmousewheel = scrollFunc;
    };
    
    win._numAutoPlusAnimation = NumAutoPlusAnimation;
    win._video = Video;
    win._mouse = Mouse;
  })(window, document);
  