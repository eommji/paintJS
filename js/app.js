const canvas = document.querySelector(".canvas-js"),
  ctx = canvas.getContext("2d"),
  colors = document.getElementsByClassName("color-js"),
  range = document.querySelector(".range-js"),
  modeBtn = document.querySelector(".mode-js"),
  resetBtn = document.querySelector(".reset-js"),
  saveBtn = document.querySelector(".save-js");

const CANVAS_WIDTH = canvas.clientWidth,
  CANVAS_HEIGHT = canvas.clientHeight,
  INITIAL_COLOR = "#2c2c2c",
  INITIAL_BG = "#fff";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_WIDTH;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = INITIAL_BG;
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false,
  filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(e) {
  const x = e.offsetX,
    y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    modeBtn.innerText = "Fill";
  } else {
    filling = true;
    modeBtn.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function handleResetClick() {
  ctx.fillStyle = INITIAL_BG;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function handleCM(e) {
  e.preventDefault();
}

function handleSaveClick() {
  const url = canvas.toDataURL(),
    link = document.createElement("a");
  link.href = url;
  link.download = "paintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (modeBtn) {
  modeBtn.addEventListener("click", handleModeClick);
}

if (resetBtn) {
  resetBtn.addEventListener("click", handleResetClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
