// 固定body高度
document.body.style.height = windowHeight + "px";

//提示框垂直居中
let tipsHeight = document.getElementById('tips').offsetHeight;
document.getElementById('tips').style.marginTop = (windowHeight - tipsHeight) / 2 + "px";

let painting = false;
let draw = false;
let lastPoint = { x: undefined, y: undefined };

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

if (document.body.ontouchstart !== undefined) {
    // 使用touch事件
    canvas.ontouchstart = function (e) {
        // 开始触摸
        if (!draw) {
            e.preventDefault();
            document.getElementById('error').innerText = "";
            let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            let x = e.touches[0].clientX - padLeft;
            let y = e.touches[0].clientY - (padTop - scrollTop + padHeight * 0.088058);
            painting = true;
            lastPoint = { x, y };
            ctx.save();
            drawCircle(x, y, 0);
        }
    }
    canvas.ontouchmove = function (e) {
        // 开始滑动
        if (painting) {
            e.preventDefault();
            let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            let x = e.touches[0].clientX - padLeft;
            let y = e.touches[0].clientY - (padTop - scrollTop + padHeight * 0.088058);
            let newPoint = { x, y };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
        }
    }
    canvas.ontouchend = function (e) {
        // 滑动结束
        painting = false;
        draw = true;
    }
}

function closeTips() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('tips').style.visibility = 'hidden';
}

function redraw() {
    draw = false;
    painting = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function complete() {
    if (draw) {
        window.location.href = "register.html";
    }
    else {
        document.getElementById('error').innerText = "你还没有画画噢";
    }
}