var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var canvas, ctx, padHeight, padTop;
var padLeft = 0.1921 * windowWidth;
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
}