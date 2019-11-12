var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
// 固定body高度
document.body.style.height = windowHeight + "px";

//提示框垂直居中
let tipsHeight = document.getElementById('tips').offsetHeight;
document.getElementById('tips').style.marginTop = (windowHeight - tipsHeight) / 2 + "px";

var disable = false; // 按钮是否禁用
function submit() {
    document.getElementById('error').innerText = "";
    if (!disable) {
        document.getElementById('overlay').style.display = "inline";
        document.getElementById('tips').style.visibility = "visible";
    }
}

function Confirm() {
    if (!disable) {
        document.getElementById('overlay').style.display = "none";
        document.getElementById('tips').style.visibility = "hidden";
        let nickname = document.getElementById('nickname').value;
        let gradeIndex = document.getElementById('grade').selectedIndex;
        let grade = document.getElementById('grade').options[gradeIndex].value;
        let checkedGender = document.querySelector('input[name="gender"]:checked');
        let tel = document.getElementById('tel').value;
        let wechat = document.getElementById('wechat').value;
        let checkedExp = document.querySelector('input[name="expectation"]:checked');
        let err = document.getElementById('error');
        let phoneReg = /^1[0-9]{10}$/;

        if (nickname === "") {
            err.innerText = "请输入你的昵称";
        } else if (grade === "") {
            err.innerText = "请选择你的年级";
        } else if (checkedGender === null) {
            err.innerText = "请选择你的性别";
        } else if (tel === "") {
            err.innerText = "请输入手机号";
        } else if (!phoneReg.test(tel)) {
            err.innerText = "手机号错误";
        } else if (wechat === "") {
            err.innerText = "请输入微信号";
        } else if (checkedExp === null) {
            err.innerText = "请选择期望匹配的性别";
        } else {
            let gender = checkedGender.value;
            let expectation = checkedExp.value;
            disable = true;
            fetch("url", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nickname, // 昵称
                    grade, // 年级 （大12345，研123）
                    tel, // 手机号
                    wechat, // 微信号
                    gender, // 性别（男/女）
                    expectation // 期望匹配的性别（男/女/随机）
                })
            })
                .then(res => res.json())
                .then(res => {

                });
        }
    }
}

function cancel() {
    document.getElementById('overlay').style.display = "none";
    document.getElementById('tips').style.visibility = "hidden";
}