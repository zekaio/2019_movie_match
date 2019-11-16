// 固定body高度
document.body.style.height = windowHeight + "px";

//提示框垂直居中
let tipsHeight = document.getElementById("tips").offsetHeight;
document.getElementById("tips").style.marginTop =
  (windowHeight - tipsHeight) / 2 + "px";

function closeTips() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("tips").style.visibility = "hidden";
}

function redraw() {
  draw = false;
  painting = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function complete() {
  if (draw) {
    window.location.href = "register.html";
  } else {
    document.getElementById("error").innerText = "你还没有画画噢";
  }
}
