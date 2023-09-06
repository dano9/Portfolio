const pixelSize = 7;
const wormLength = 10;
const wormSpeed = 4;
const scaling = 1;
let mouseX =0; let mouseY = 0;
let cWidth = window.innerWidth / scaling;
let cHeight = window.innerHeight / scaling;

class LightWorm {
    constructor(wli, x, y, xv, yv) {
        // Constructor: initialize object properties
        this.wli = wli;
        this.x = x;
        this.y = y;
        
        this.xv = xv;
        this.yv = yv;
        this.RandomVals();
        this.px = x;
        this.py = y;
        this.UpdatePPos();
        
        this.lastPoses = [];
        this.needsToRender = false;
        this.isDead = false;
        this.length = wormLength;
        this.caughtFrame = -1;
       // this.respawnOnDeath;
    }
    RandomVals()
    {
        let side = Math.random() * 4;
        let vel = (Math.random() * 2) - 1;
        if (side < 1) {this.x = 0; this.y = Math.random() * (cHeight - 1); this.xv = 1; this.yv = vel;}
        else if (side < 2) {this.x = cWidth; this.y = Math.random() * (cHeight - 1); this.xv = -1; this.yv = vel;}
        else if (side < 3) {this.y = 0; this.x = Math.random() *(cWidth); this.yv = 1; this.xv = vel;}
        else {this.y = cHeight; this.x = Math.random() * (cWidth); this.yv = -1; this.xv = vel;}
        //this.x = canvas.width;//Math.random(0,canvas.width);
        //this.y = canvas.height - 1;//Math.random(0,canvas.height);
        //this.xv =-1;
        //this.yv = 0;
    }
    // Methods can be defined inside the class
    Update() {
        if (!this.isDead)
        {
            this.x += this.xv * wormSpeed;
            this.y += this.yv * wormSpeed;
            let oldpx = this.px; let oldpy = this.py;
            this.UpdatePPos();
            if (this.px != oldpx || this.py != oldpy)
            {
                this.lastPoses.push([this.px, this.py]);
                this.needsToRender = true;
            }
            this.CheckCollision();
        }
        else
        {
            this.length -= 1;
            if (this.length > 0)
            {
            this.needsToRender = true;
            }
            else if (this.caughtFrame == -1)
            {
                this.FullyDie();
            }
            if (this.caughtFrame != -1)
            {
                this.CaughtAnimation();
            }

        }
    }
    UpdatePPos()
    {
        let ppos = PixelSnap(this.x, this.y);
        this.px = ppos[0]; this.py = ppos[1];
    }
    Render()
    {
        if (this.needsToRender)
        {
            this.lastPoses.forEach((pos, index) => {
                //DrawSquare(pos[0], pos[1], "red");
                //console.log(index);
            });
            DrawSquare(this.px, this.py, "#772563");
            if (this.lastPoses.length > this.length && this.length > 0)
            {
                const index = 0;
                DrawSquare(this.lastPoses[index][0], this.lastPoses[index][1], "black");
                this.lastPoses.shift();
            }
            this.needsToRender = false;
        }
    }
    CheckCollision() {
        if (this.x < 0 || this.x >= canvas.width ||
            this.y < 0 || this.y >= canvas.height) {
                this.Die();
        }
    }
    Die()
    {
        this.isDead = true;
    }
    Catch()
    {
        if (!this.isDead)
        {
            mWormBankd += Math.ceil(this.length * 0.5);
            this.isDead = true;
            this.caughtFrame = 0;
        }
    }
    DetectCatch(mx,my)
    {
        this.lastPoses.forEach((element) => {
        let cThresh = pixelSize * 7;
        if (this.caughtFrame == -1 && mx < element[0] + cThresh && mx > element[0] - cThresh && 
            my < element[1] + cThresh && my > element[1])
            {
                this.Catch();
            }
        })
    }
    CaughtAnimation()
    {
        let col = "pink";
        let multi = 1;
        let posIndex = this.caughtFrame;
        if (this.caughtFrame > 6) {posIndex = this.caughtFrame - 6; col = "black"; multi = 1.1;}
        DrawSquare(this.px + (posIndex * pixelSize), this.py,col,multi);
        DrawSquare(this.px, this.py + (posIndex * pixelSize),col,multi);
        DrawSquare(this.px - (posIndex * pixelSize), this.py,col,multi);
        DrawSquare(this.px, this.py - (posIndex * pixelSize),col,multi);
        this.caughtFrame += 1;
        if (this.caughtFrame == 13)
        {
            this.FullyDie();
        }
    }
    FullyDie()
    {
        DrawSquare(this.px, this.py, "black");
        wormList.forEach((element, index) => {       
            if (element.wli == this.wli){
            wormList.splice(index, 1);}
        })
        //if (this.respawnOnDeath) {wormList[this.wli] = new LightWorm(this.wli, 500,500,1,1);}
    }
}

const immerseBttn = document.getElementById("immerseSwitch");
const lengthUI = document.getElementById("wormLength");
const highScoreUI = document.getElementById("highScore");
const roundUI = document.getElementById("wormRound");
const canvas = document.getElementById("interactiveBackground");
const ctx = canvas.getContext("2d");

const wormList = [];

// Set canvas size to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mWormLength = 20;
let mWormBankd = 0;
let drawnMWorm = false;
let lastBiteTime = 0;
let lastSplitPoint;
let splitEffectFrame = -1;
let round = 0;
let pinkieLevel = 1;
let wCI = 0;
let highScore = 0;
let immerseMode = false;
let lastPortfolioScrolPos = 0;
var GameLoop = function Loop() {
    Update();
    Render();
    //requestAnimationFrame(GameLoop);
    return true;
}
function SetupEvents(isMobile = false)
{
    if (!isMobile)
    {
        // Event listener to track mouse movement
        window.addEventListener("mousemove", (event) => {
            mouseX = event.clientX / scaling;
            mouseY = event.clientY / scaling;
            mp = PixelSnap(mouseX,mouseY)
            if (mousePoses.length == 0 || mp[0] != mousePoses[0][0] || mp[1] != mousePoses[0][1])
            {
                mousePoses.unshift(mp);
                DrawMouseWorm();
            }
        });
    }
    else
    {
        window.addEventListener("touchmove", (event) => {
            mouseX = event.clientX / scaling;
            mouseY = event.clientY / scaling;
            mp = PixelSnap(mouseX,mouseY)
            if (mousePoses.length == 0 || mp[0] != mousePoses[0][0] || mp[1] != mousePoses[0][1])
            {
                mousePoses.unshift(mp);
                DrawMouseWorm();
            }
        });
    }
}
var GameStart = function Start()
{

    SetupEvents();
    mWormLength = 12;
    ctx.scale(scaling,scaling);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cWidth = canvas.width /scaling;
    cHeight = canvas.height /scaling;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    GameLoop();
    return true;
}
function Update()
{
    if (immerseMode)
    {
        window.scrollBy(0,100);
    }

    let lastRound = -1;
    let lastLength = -1;
    

    let difcltyRampSpeed = 0.4;
    round = Math.floor(Math.pow(mWormLength / 50,0.95));
    let targLength = Math.floor(Math.pow(round + 1,1/0.95) * 50);
    /*if (mWormLength < 20) {round = 0; targLength = 20}
    else if (mWormLength < 40 / difcltyRampSpeed) {round = 1; targLength = 40 / difcltyRampSpeed;}
    else if (mWormLength < 70 / difcltyRampSpeed) {round = 2;}
    else if (mWormLength < 11 / difcltyRampSpeed) {round = 3;}
    else if (mWormLength < 150 / difcltyRampSpeed) {round = 3;}
    else if (mWormLength < 200 / difcltyRampSpeed) {round = 4;}
    else if (mWormLength < 260 / difcltyRampSpeed) {round = 5;}
    else if (mWormLength < 330 / difcltyRampSpeed) {round = 6;}
    else if (mWormLength < 410 / difcltyRampSpeed) {round = 7;}*/
    pinkieLevel = 1 + Math.min(round, 10);
    if (wormList.length < pinkieLevel)
    {
        wormList.push(new LightWorm(wCI, 0, 0, 0,0));
        wCI += 1;
    }

    let sTSlice = -1;
    if (!drawnMWorm && time - lastBiteTime > 1)
    {
        mousePoses.forEach((instance, index) => {
                if (DetectMWSlice(PixelSnap(instance[0],instance[1]), index)) {sTSlice = index;}});
    }
    if (sTSlice != -1)
    {
        SliceMWorm(sTSlice);
    }
    drawnMWorm = false;
    wormList.forEach((instance, index) => {
        instance.Update();
    });
    DetectCatch(mouseX, mouseY);

    if (detachdMPs.length > 0)
    {
        DrawSquare(detachdMPs[0][0],detachdMPs[0][1],"black", 1.1);
        detachdMPs.shift();
    }

    if (splitEffectFrame != -1)
    {
        let col = "red";
        let multi = 1;
        let px = lastSplitPoint[0]; let py = lastSplitPoint[1];
        let posIndex = splitEffectFrame;
        if (splitEffectFrame > 14) {posIndex = splitEffectFrame - 14; col = "black"; multi = 1.1;}
        else if (splitEffectFrame > 7) {posIndex = splitEffectFrame - 7; col = "white"; multi = 1;}
        DrawSquare(px + (posIndex * pixelSize), py + (posIndex * pixelSize),col,multi);
        DrawSquare(px - (posIndex * pixelSize), py + (posIndex * pixelSize),col,multi);
        DrawSquare(px - (posIndex * pixelSize), py - (posIndex * pixelSize),col,multi);
        DrawSquare(px + (posIndex * pixelSize), py - (posIndex * pixelSize),col,multi);
        splitEffectFrame += 1;
        if (splitEffectFrame > 22)
        {
            splitEffectFrame = -1;
        }
    }

    if (mWormBankd > 0)
    {
        mWormBankd -= 1;
        mWormLength += 1;
    }
    if (mWormLength < highScore)
    {
        highScoreUI.innerHTML = "High Score: " + highScore;
    }
    if (lastLength != mWormLength && lengthUI != null) {lengthUI.innerHTML = "Length: " + mWormLength + "/" + targLength;}
    if (lastRound != round && roundUI != null) {roundUI.innerHTML = "Round " + round;}
    if (mWormLength > highScore)
    {
        highScore = mWormLength;
        highScoreUI.innerHTML = "New High Score: " + highScore;
    }
    lastLength = mWormLength;
    lastRound = round;
}
function Render()
{
    wormList.forEach((instance, index) => {
        instance.Render();
    });
}

// Function to draw a red square at the mouse coordinates
function DrawSquare(x, y, col, multi = 1) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
    mp = PixelSnap(x,y);
    x = mp[0]; y = mp[1];
    ctx.fillStyle = col;
    ctx.fillRect(x - (pixelSize * 0.5 * multi), y - (pixelSize * 0.5 * multi), pixelSize * multi, pixelSize * multi); // Draw a 50x50 red square centered at the mouse coordinates
}

function DetectCatch(x, y)
{
    wormList.forEach((instance, index) => {
        instance.DetectCatch(x,y);
    });
}
function SliceMWorm(index)
{
    splitEffectFrame = 0;
    lastSplitPoint = mousePoses[index];
    detachdMPs = detachdMPs.concat(mousePoses.slice(index - 1, mousePoses.length));
    //detachdMPs.push(mousePoses[mousePoses.length-1]);
    mousePoses = mousePoses.slice(0,index);
    mWormLength = index;
    lastBiteTime = time;

    detachdMPs.forEach((instance, index) => {
        DrawSquare(instance[0],instance[1],"grey",1.05);
    });
    
}
const biteThrsh = pixelSize * 3;
function DetectMWSlice(seg, index)
{
    let foundSlice = false;
    if (index > 9 && index < mWormLength - 9)
    {
        wormList.forEach((worm, index) => {
            if (!foundSlice && !worm.isDead && worm.px < seg[0] + biteThrsh && worm.px > seg[0] - biteThrsh && worm.py < seg[1] + biteThrsh && worm.py > seg[1] - biteThrsh)//(worm.px == seg[0] && worm.py == seg[0])
            {
                foundSlice = true;
            }
        });
    }
    return foundSlice;
}
let mousePoses = [];
let detachdMPs = [];
function DrawMouseWorm()
{
    drawnMWorm = true;
    let sTSlice = -1;
    mousePoses.forEach((instance, index) => {
        let col = "#ffaf54";
        if (index == 0)
        {
            DrawSquare(instance[0],instance[1],col,1)
        }
        else if (index < mWormLength)
        {
            if (time - lastBiteTime > 1) {if(DetectMWSlice(PixelSnap(instance[0],instance[1]), index)) { sTSlice = index;} }
            if (index > mWormLength / 1.5) {col = "#412200";}
            else if (index > mWormLength / 3) {col = "#ad5c00";}
            else if (index > mWormLength / 5) {col = "#ff8800";}
            let a = mousePoses[index - 1][0] - instance[0];
            let b = mousePoses[index - 1][1] - instance[1];
            let mag = Math.sqrt((a*a) + (b*b));
            let ua = a/mag; let ub = b/mag;
            if (mag > pixelSize)
            {
                DrawSquare(instance[0],instance[1],"black",1.1)
                let dif = mag - pixelSize;
                instance[0] += dif * ua;
                instance[1] += dif * ub;
                //mousePoses[index] = PixelSnap(instance[0] + (dif * ua), instance[1] + (dif * ub));
            }
            DrawSquare(instance[0],instance[1],col,1)
        }
    });
    if (mousePoses.length > mWormLength) 
    {
        let index = mousePoses.length - 1;
        DrawSquare(mousePoses[index][0],mousePoses[index][1],"black",1.1)
        mousePoses.pop();
    }
    if (sTSlice != -1)
    {
        SliceMWorm(sTSlice);
    }
}

// Event listener to resize the canvas when the window size changes
window.addEventListener("resize", () => {
    ctx.scale(scaling,scaling);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cWidth = canvas.width /scaling;
    cHeight = canvas.height /scaling;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

immerseBttn.addEventListener("mouseover", function( event ) {   
    event.target.style.backgroundColor = "rgba(255, 0, 242, 0.8)"; event.target.style.color = "#ffffff";}, false);
immerseBttn.addEventListener("mouseout", function( event ) {   
    event.target.style.backgroundColor = "rgba(255, 0, 242, 0.1)"; event.target.style.color = "#ffffff77";}, false);

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "p":
            SwitchImmersion();
            break;
    }
});

function SwitchImmersion()
{
    immerseMode = !immerseMode;
    if (immerseMode)
    {
        //lastPortfolioScrolPos = document.body.scrollTop;
        immerseBttn.innerText = "Game View (P)";
        document.body.style.overflow = "hidden";
        document.getElementById("mainContent").style.display = "none";
    }
    else
    {
        immerseBttn.innerText = "Portfolio View (P)";
        document.body.style.overflow = "auto";
        document.getElementById("mainContent").style.display = "block";
        window.scrollTo(0,0);
    }
}

// Initial drawing to handle page load
//drawSquare(0, 0);
//Start();



function PixelSnap(x, y)
{
    return [(Math.round(x / pixelSize) * pixelSize),(Math.round(y / pixelSize) * pixelSize)];
}

