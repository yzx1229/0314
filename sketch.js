let input;
let slider;
let button;
let dropdown;
let iframe;
let isBouncing = false;

function setup() {  //這是一個設定函數，只會執行一次
  createCanvas(windowWidth, windowHeight);
  //背景顏色為#"231942"
  background("#231942");

  // 創建輸入文字框
  input = createInput();
  input.position(10, 10);
  input.size(300, 80);
  input.input(updateText);

  // 創建滑桿
  slider = createSlider(12, 30, 12);
  slider.position(460, 25);
  slider.size(100);

  // 創建按鈕
  button = createButton('跳動');
  button.position(680, 10);
  button.mousePressed(toggleBounce);

  // 創建下拉選單
  dropdown = createSelect();
  dropdown.position(800, 10);
  dropdown.size(100);
  dropdown.option('淡江大學');
  dropdown.option('教育科技系');
  dropdown.changed(openWebsite);

  // 創建 iframe
  iframe = createElement('iframe');
  iframe.position(10, 100);
  iframe.size(windowWidth - 20, windowHeight - 120);
}

let textContent = "🐰🐯💜 ";

function updateText() {
  textContent = input.value();
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function openWebsite() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  }
}

function draw() { //這是一個繪圖函數，會一直執行
  background("#231942");
  let textSizeValue = slider.value();
  textSize(textSizeValue);
  fill(255);
  textAlign(LEFT, TOP);
  fill("#748cab");
  stroke(0);
  strokeWeight(5);

  let textWidthValue = textWidth(textContent);
  let startX = 0;
  let inputX = input.x;
  let inputY = input.y;
  let inputWidth = input.width;
  let inputHeight = input.height;

  for (let y = 100; y < height; y += textSizeValue + 10) { // 10 是行間距
    for (let x = startX; x < width; x += textWidthValue + textWidth(" ")) {
      // 避免在輸入文字框的位置繪製文字
      if (x > inputX + inputWidth || y > inputY + inputHeight) {
        let bounceOffset = isBouncing ? random(-3, 3) : 0;
        text(textContent, x, y + bounceOffset);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 120);
}
