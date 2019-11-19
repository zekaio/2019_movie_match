const prefix = "http://111.230.183.100:5000"; // api地址
const bbt = "https://hemc.100steps.net/2017/wechat/Home/Index/index?state="; // 微信认证
const wishSite = ""; // 许愿瓶地址
const homePage = ""; // 主页

// 结束日期
const ongoingMonth = 11;
const ongoingDate = 30;

var loaded = false; // 网页是否加载完成
var isOngoing = true; // 是否还在活动时间

// 向window.onload中添加新的函数
function addOnloadEvent(func) {
  let oldEvent = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      oldEvent();
      func();
    };
  }
}

// 网页加载完成
addOnloadEvent(function() {
  loaded = true;
  let windowHeight = window.innerHeight;
  document.getElementById("ongoing_month").innerText = ongoingMonth;
  document.getElementById("ongoing_date").innerText = ongoingDate;
  document.getElementById("notOngoing").style.marginTop =
    (windowHeight - document.getElementById("notOngoing").offsetHeight) / 2 +
    "px";
});

// 前端判断时间  不在活动时间则返回false
function checkTime() {
  let nowDate = new Date();
  let year = nowDate.getFullYear();
  let month = nowDate.getMonth() + 1;
  let date = nowDate.getDate();
  if (
    year > 2019 ||
    month > ongoingMonth ||
    date > ongoingDate ||
    (month <= 11 && date < 20)
  ) {
    // 不在活动时间
    isOngoing = false;
    if (loaded) {
      showOngoingTips();
    } else {
      addOnloadEvent(showOngoingTips);
    }
    return false;
  } else {
    isOngoing = true;
    return true;
  }
}

// 显示活动未开始提示
function showOngoingTips() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("notOngoing").style.visibility = "visible";
  try {
    document.getElementById("tips").style.visibility = "hidden";
  } catch {}
}

// 关闭活动未开始提示
function ongoingClose() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("notOngoing").style.visibility = "hidden";
}

// 判断请求返回的错误码
function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  switch (res.status) {
    case 401:
      // 微信未登录
      window.location.href = bbt + encodeURIComponent(window.location.href);
      break;
    case 403:
      // 已填写信息
      try {
        document.getElementById("error").innerText = "你已经填写过信息了噢";
        setTimeout(() => {
          window.location.href = "result.html";
        }, 500);
      } catch {}
      break;
    case 410:
      // 活动不在进行
      // dom已加载完成则直接执行，否则添加到window.onload中
      isOngoing = false;
      if (loaded) {
        showOngoingTips();
      } else {
        addOnloadEvent(showOngoingTips);
      }
      break;
    default:
      console.log(res);
      break;
  }

  const err = new Error(res.statusText);
  err.res = res;
  throw err;
}

// 判断活动时间
if (checkTime()) {
  fetch(prefix + "/checkTime", {
    method: "get",
    credentials: "include"
  }).then(checkStatus);
}

// 判断是否匹配成功
fetch(prefix + "/match", {
  method: "get",
  credentials: "include"
})
  .then(checkStatus)
  .then(res => res.json())
  .then(res => {
    switch (res.errcode) {
      case 0:
        // 匹配成功
        window.localStorage.setItem("match", 0);
        window.localStorage.setItem("result", JSON.stringify(res.data));
        break;
      case 1:
        // 还未填写信息
        window.localStorage.setItem("match", 1);
        break;
      case 2:
        // 还未匹配
        window.localStorage.setItem("match", 2);
        break;
    }
  });
