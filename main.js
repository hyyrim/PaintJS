'use strict';

const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// context - 픽셀들을 control
// default 배경 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; // 선의 색
ctx.fillStyle = INITIAL_COLOR; // 채우기 색
ctx.lineWidth = "2.5" // 선의 굵기

//ctx.fillStyle = "green";
//ctx.fillRect(50, 20, 100, 49);


let painting = false;
let filling = false;

// 마우스를 움직이는 내내 호출되는 메소드 ⭐
function onMouseMove(event) { 
    // 마우스를 클릭하지않고 움직였을때는 path(선)를 시작
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) { // false 일 경우
        ctx.beginPath(); // path 시작
        ctx.moveTo(x, y); // path 경로 이동
    } else {
        ctx.lineTo(x, y); // path의 이 전 위치에서 지금 위치까지의 선 생성 (이어주는거라고 이해하면 나을듯)
        ctx.stroke(); // 획을 긋는다
    }
}

function stopPainting() {
    painting = false;
}

function startPainting() {
    if (filling === false) {
        painting = true;
    }
}

function handleColorChange(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // strokeStyle을 override
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
   const size = event.target.value;
   ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
    
}

function hadleCM(event) {
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // 캔버스 안에 마우스가 있을때
    canvas.addEventListener("mousedown", startPainting); // 캔버스 안에 마우스를 클릭할때
    canvas.addEventListener("mouseup", stopPainting); // 캔버스에서 마우스 클릭을 뗐을때
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스 밖으로 나갔을때
    canvas.addEventListener("click", handleCanvasClick); // 캔버스 채우기 선택 - 캔버스를 클릭했을때
    canvas.addEventListener("contextmenu", hadleCM); // 마우스 우클릭 방지 (사진 무단 저장 방지)
}

// color 팔레트를 array로 받아 한개씩 꺼내
// 그 한개의 팔레트가 선택될때마다 색을 바꿔주는 function 호출
Array.from(colors).forEach((color) => color.addEventListener("click", handleColorChange));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}