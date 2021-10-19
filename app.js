const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
const saveBtn = document.getElementById('jsSave');

// 캔버스 사이즈
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 기본 컬러, 두께
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// // x, y, 가로, 세로
// ctx.fillStyle = 'green';
// ctx.fillRect(50,20, 100, 49);
// ctx.fillStyle = 'black';
// ctx.fillRect(80,80, 100, 49);

//기본값 페인팅, 배경색칠
let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
// 마우스 움직일시
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
// 파렛트 클릭시 컬러변경
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
// 커서 두께 설정 (input 의 range 단계만큼)
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

// fill / paint 버튼클릭시
function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
}
// fill 버튼클릭 후 캔버스크기에 맞게 컬러넣기
function handleCanvasClick(){
    if (filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
function handleCM(evnet){
    event.preventDefault();
}
// 이미지 다운로드
function handleSaveClick(event){
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS';
    link.click();
}
// 마우스 이벤트
if(canvas){
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click',handleCanvasClick);
    canvas.addEventListener('contextmenu',handleCM);
}
// 파렛트 클릭시
Array.from(colors).forEach(color =>
    color.addEventListener('click', handleColorClick)
);

if(range){
    range.addEventListener('input', handleRangeChange);
}

if(mode){
    mode.addEventListener('click',handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}