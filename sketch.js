class Container{
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    draw(){
        rectMode(CORNERS);
        strokeWeight(1);
        fill(155, 155, 155)
        rect(this.x, this.y, this.x + this.w, this.y - this.h);
    }

    fillWithWater(percentage){
        const waterHeight = this.h * percentage / 100
        this.water = new Water(this.x, this.y, this.w, waterHeight)
    }

    updateWater(){
        if(this.water){
            this.water.draw()
        }
    }
}

class Bottle{
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    draw(){
        rectMode(CORNERS);
        fill(155, 0, 0)
        rect(this.x, this.y, this.x + this.w, this.y - this.h);
    }

    updatePosition(x, y){
        let setY = y
        if(y > (displayHeight / 2 + 200)){
            setY = displayHeight / 2 + 200
        }
        this.x = x
        this.y = setY
    }
}

class Water{
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.belowWaterLine = false
        this.waterLineY = this.y - this.h
    }
    isBelowWaterLine(){
        // relies on b being globally accessible
        if(b.y >= this.waterLineY){
            this.belowWaterLine = true
            
        } else {
            this.belowWaterLine = false
        }
    }

    draw(){
        rectMode(CORNERS);
        fill(0, 0, 255)
        strokeWeight(0);
        this.isBelowWaterLine()
        
        if(this.belowWaterLine){
            const increaseInWater = deltaWater(this.y - this.waterLineY, this.w, b.w, this.y - b.y)

            const horizontalExtend = b.x - this.x
            rect(this.x, this.y, this.x + horizontalExtend, this.waterLineY);
            rect(b.x + BOTTLE_WIDTH, this.y, this.x + this.w, this.waterLineY);
            rect(b.x, this.y, b.x + BOTTLE_WIDTH, b.y);

            // water increase
            // fill(255,0, 0)
            rect(this.x, this.waterLineY, b.x, this.waterLineY - increaseInWater);
            rect(b.x + b.w, this.waterLineY, this.x + this.w, this.waterLineY - increaseInWater);
        } else {
            rect(this.x, this.y, this.x + this.w, this.waterLineY);
        }
        
    }
}

const displayWidth = 1024
const displayHeight = 600

BOTTLE_WIDTH = 50
BOTTLE_HEIGHT = 200
CONTAINER_WIDTH = 600
CONTAINER_HEIGHT = 200

let c = new Container(displayWidth / 2 - 250, displayHeight / 2 + 200, CONTAINER_WIDTH, CONTAINER_HEIGHT)
let b = new Bottle(100, 300, BOTTLE_WIDTH, BOTTLE_HEIGHT)

c.fillWithWater(80)

function setup() {    
    createCanvas(displayWidth, displayHeight);
    background(240);
}

function draw() {
    background(240);
    c.draw()
    b.draw()

    if (mouseIsPressed === true) {
        b.updatePosition(mouseX, mouseY)
    }

    c.updateWater()
}

function deltaWater(C_y, C_x, h, y_b){
    return ((C_y - y_b) / (C_x - h)) * h
}
