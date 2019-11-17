function setResult() {
  switch (window.localStorage.getItem("match")) {
    case "0":
      //匹配成功
      let result = window.localStorage.getItem("result");
      document.getElementById("nickname").innerText = result.nickname;
      document.getElementById("grade").innerText = result.grade;
      document.getElementById("gender").innerText = result.gender;
      document.getElementById("tel").innerText = result.tel;
      document.getElementById("wechat").innerText = result.wechat;
      document.getElementById("success").style.display = "block";
      break;
    case "1":
      //还未填写信息
      window.location.href = "star.html";
      break;
    case "2":
      //还未匹配
      document.getElementById("matching").style.display = "block";
      break;
    case null:
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
          setResult();
        });
        break;
  }
}
setResult();

function back(){
  window.location.href = homePage;
}
