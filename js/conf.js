const prefix = "http://111.230.183.100:5000";
const bbt = "https://hemc.100steps.net/2017/wechat/Home/Index/index?state=";

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  const err = new Error(res.statusText);
  err.res = res;
  switch (res.status) {
    case 401:
      //微信未登录
      window.location.href = bbt + encodeURIComponent(window.location.href);
      break;
    case 403:
      //已填写信息
      try {
        document.getElementById("error").innerText = "你已经填写过信息了噢";
        setTimeout(() => {
          window.location.href = "result.html";
        }, 500);
      } catch {}
      break;
    case 410:
      //活动不在进行
      break;
    default:
      console.log(err.res);
      break;
  }
  throw err;
}

fetch(prefix + "/checkTime", {
  method: "get",
  credentials: "include"
}).then(checkStatus);

fetch(prefix + "/match", {
  method: "get",
  credentials: "include"
})
  .then(checkStatus)
  .then(res => res.json())
  .then(res => {
    switch (res.errcode) {
      case 0:
        //匹配成功
        window.localStorage.setItem("match", 0);
        window.localStorage.setItem("result", res.data);
        break;
      case 1:
        //还未填写信息
        window.localStorage.setItem("match", 1);
        break;
      case 2:
        //还未匹配
        window.localStorage.setItem("match", 2);
        break;
    }
  });
