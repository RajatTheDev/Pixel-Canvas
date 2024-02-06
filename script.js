const container = document.querySelector(".container");
const reset = document.querySelector('#reset');
const toggleEraser = document.querySelector('#eraser');
const togglePen = document.querySelector('#toggle-pen');
const toggleGrid = document.querySelector('#toggle-grid');
const colorPicker = document.querySelector('.color-picker');
const toggleRainbow = document.querySelector('#toggle-rainbow');
const pixelRangeSelector = document.querySelector('#grid-size-changer');
const gridCurrentValue = document.querySelector('#grid-value');

let pixelAmount, pixelSize;
let isTogglePenSelected = false;
let isToggleGridSelected = false;
let isToggleRainbowSelected = false;
let isToggleEraserSelected = false;
let rainbowColor, redValue, blueValue, greenValue, aplhaValue;

function createDiv() {
    let div = document.createElement("div");
    divStyle(div);

    div.addEventListener('mousemove', handleMouseMove);
    div.addEventListener('click', handleMouseClick);

    container.appendChild(div);
}

function handleMouseMove(e) {
    if (isToggleEraserSelected && e.buttons === 1) {
        e.target.style.backgroundColor = "transparent";
    } else if (isTogglePenSelected && e.buttons === 1) {
        e.target.style.backgroundColor = `${colorPicker.value}`;
    } else if (isToggleRainbowSelected && e.buttons === 1) {
        e.target.style.backgroundColor = rainbowColorGenerator();
    }
}

function handleMouseClick(e) {
    if (isToggleEraserSelected) {
        e.target.style.backgroundColor = "transparent";
    } else if (isTogglePenSelected) {
        e.target.style.backgroundColor = `${colorPicker.value}`;
    } else if (isToggleRainbowSelected) {
        e.target.style.backgroundColor = rainbowColorGenerator();
    }
}

function rainbowColorGenerator () {
    redValue = Math.floor((Math.random()*255)/10)*10;
    blueValue = Math.floor((Math.random()*255)/10)*10;
    greenValue = Math.floor((Math.random()*255)/10)*10;

    rainbowColor = `rgb(${redValue}, ${blueValue}, ${greenValue})`;
    console.log(rainbowColor);
    return rainbowColor;
}

function divStyle(div) {
    div.style.cssText = `border: 1px solid black; width: ${pixelSize}px; height: ${pixelSize}px; box-sizing: border-box;`;
    div.setAttribute("class", "child-div");
}

togglePen.addEventListener('click', () => {
    isTogglePenSelected = !isTogglePenSelected;

    if (isTogglePenSelected) {
        togglePen.textContent = "Toggled Pen";
        toggleEraser.textContent = "Toggle Eraser";
        toggleRainbow.textContent = "Toggle Rainbow";
        isToggleRainbowSelected = false;
        isToggleEraserSelected = false;
    } else {
        togglePen.textContent = "Toggle Pen";
    }
});

toggleEraser.addEventListener('click', () => {
    isToggleEraserSelected = !isToggleEraserSelected;

    if (isToggleEraserSelected) {
        toggleEraser.textContent = "Toggled Eraser";
        toggleRainbow.textContent = "Toggle Rainbow";
        togglePen.textContent = "Toggle Pen";
        isToggleRainbowSelected = false;
        isTogglePenSelected = false;
    } else {
        toggleEraser.textContent = "Toggle Eraser";
    }
});

toggleRainbow.addEventListener('click', () => {
    isToggleRainbowSelected = !isToggleRainbowSelected;

    if(isToggleRainbowSelected) {
        toggleRainbow.textContent = "Toggled Rainbow";
        toggleEraser.textContent = "Toggle Eraser";
        togglePen.textContent = "Toggle Pen";
        isToggleEraserSelected = false;
        isTogglePenSelected = false;
    } else {
        toggleRainbow.textContent = "Toggle Rainbow";
    }
});

reset.addEventListener('click', () => {
    const childDivs = container.querySelectorAll('.child-div');
    childDivs.forEach(div => {
        div.style.backgroundColor = "transparent";
    });
});

toggleGrid.addEventListener('click', () => {
    isToggleGridSelected = !isToggleGridSelected;

    if (isToggleGridSelected) {
        toggleGrid.textContent = "Toggled Grid";
        const childDivs = container.querySelectorAll('.child-div');
        childDivs.forEach(div => {
            div.style.borderColor = "transparent";
        });
    } else{
        toggleGrid.textContent = "Toggle Grid";
        const childDivs = container.querySelectorAll('.child-div');
        childDivs.forEach(div => {
            div.style.borderColor = "black";
        });
        
    }
    
});

pixelRangeSelector.addEventListener('click', () => {
    const childDivs = container.querySelectorAll('.child-div');
    childDivs.forEach(div => {
        container.removeChild(div);
    });
    gridCurrentValue.textContent = pixelRangeSelector.value;
    pixelAmount = pixelRangeSelector.value;
    getGridSize(pixelAmount);
})

function getGridSize() {

    pixelAmount = pixelRangeSelector.value;
    pixelSize = 500 / pixelAmount;

    for (let i = 0; i < pixelAmount; i++) {
        for (let j = 0; j < pixelAmount; j++) {
            createDiv();
        }
    }
}

getGridSize();
