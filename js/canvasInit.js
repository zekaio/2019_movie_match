// 已填写信息则跳转到查看结果页面
if (
  window.localStorage.getItem("match") == 0 ||
  window.localStorage.getItem("match") == 2
) {
  window.location.href = "result.html";
}

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var canvas, ctx, padHeight, padTop;
var padLeft = 0.1921 * windowWidth;
let painting = false;
let draw = false;
let lastPoint = { x: undefined, y: undefined };

function canvasInit() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#c4b46b";
  padHeight = document.getElementById("sketchpad").offsetHeight;
  padTop = document.getElementById("sketchpad").offsetTop;
  canvas.style.height = padHeight * 0.911942 + "px";
  canvas.height = padHeight * 0.911942;
  canvas.width = canvas.offsetWidth;
  canvas.style.top = padTop + padHeight * 0.088058 + "px";
  ctx.strokeStyle = "#c4b46b";
  ctx.beginPath();
  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function(e) {
      if (!draw) {
        e.preventDefault();
        document.getElementById("error").innerText = "";
        let scrollTop =
          (document.documentElement && document.documentElement.scrollTop) ||
          document.body.scrollTop;
        let x = e.touches[0].clientX - padLeft;
        let y =
          e.touches[0].clientY - (padTop - scrollTop + padHeight * 0.088058);
        painting = true;
        lastPoint = { x, y };
        ctx.save();
        drawCircle(x, y, 0);
      }
    };
    canvas.ontouchmove = function(e) {
      if (painting) {
        e.preventDefault();
        let scrollTop =
          (document.documentElement && document.documentElement.scrollTop) ||
          document.body.scrollTop;
        let x = e.touches[0].clientX - padLeft;
        let y =
          e.touches[0].clientY - (padTop - scrollTop + padHeight * 0.088058);
        let newPoint = { x, y };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.ontouchend = function(e) {
      painting = false;
      draw = true;
    };
  }
}

function drawCircle(x, y, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}
