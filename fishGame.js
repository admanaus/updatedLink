var currentState,
    width,
    height,
    canvas,
    renderingContext,
    frames = 0,
    theHero,
    theGround,
    theCrystal,
    theCrystal02;

var states = {
    splash: 0,
    game: 1,
    score: 2
};

function Crystal(){

    this.x = width;
    this.y = 75;

    this.frame = 0;
    this.annimation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    this.update = function (){
        var h = 20; //every 10 browser frames = 1 hero frame
        this.frame += frames % h === 0 ? 1 : 0;
        this.frame %= this.annimation.length;
    };

    this.draw = function (renderingContext){ //rendering context is the canvas
        renderingContext.save();
        renderingContext.translate(this.x, this.y);

        var h = this.annimation[this.frame];
        crystal[h].draw(renderingContext, this.x, this.y);

        renderingContext.restore();

        if (this.x <= -26){
            var ranHeight = Math.floor(Math.random() * 150);
            this.x = width;
            this.y = ranHeight;
        } else{
            this.x--;
        }
        console.log("x: " + this.x + "  y: " + this.y);
    }
}
function Crystal02(){

    this.x = width + 50;
    this.y = 50;

    this.frame = 0;
    this.annimation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    this.update = function (){
        var h = 20; //every 10 browser frames = 1 hero frame
        this.frame += frames % h === 0 ? 1 : 0;
        this.frame %= this.annimation.length;
    };

    this.draw = function (renderingContext){ //rendering context is the canvas
        renderingContext.save();
        renderingContext.translate(this.x, this.y);

        var h = this.annimation[this.frame];
        crystal[h].draw(renderingContext, this.x, this.y);

        renderingContext.restore();

        if (this.x <= -26){
            var ranHeight = Math.floor(Math.random() * 150);
            var ranDistance = Math.floor(Math.random() * 250);
            this.x = width + ranDistance;
            this.y = ranHeight;
        } else{
            this.x--;
        }
        console.log("x: " + this.x + "  y: " + this.y);
    }
}

function Ground(){
    this.x = 0;
    this.y = 205;

    this.frame = 0;
    this.annimation = [0];

    this.update = function (){
        var h = currentState === states.splash ? 10 : 5; //every 10 browser frames = 1 hero frame
        this.frame += frames % h === 0 ? 1 : 0;
        this.frame %= this.annimation.length;
    };

    this.draw = function (renderingContext){ //rendering context is the canvas
        renderingContext.save();

        renderingContext.translate(this.x, this.y);

        var h = this.annimation[this.frame];
        ground[h].draw(renderingContext, this.x, this.y);
        //draw a second copy fo the ground image
        ground[h].draw(renderingContext, this.x + 256, this.y ); //256 is the length of the ground image

        renderingContext.restore();
        this.x <= -31 ? this.x = 0 : this.x--;
    }
}
function Hero(){
    this.x = 40;
    this.y = 180;

    this.frame = 0;
    this.velocity = 0;
    this.annimation = [0, 1, 2, 1];

    this.rotation = 0;
    this.radius = 12;

    this.gravity = 0.25;
    this._jump = 4.6;

    this.jump = function(){
      this.velocity = -this._jump;
    };

    this.update = function (){
        var h = currentState === states.splash ? 12 : 8; //every 10 browser frames = 1 hero frame
        this.frame += frames % h === 0 ? 1 : 0;
        this.frame %= this.annimation.length;

        if (currentState === states.splash){
            this.updateIdleHero();
        } else {
            this.updatePlayingHero();
        }
    };

    this.updateIdleHero = function (){
        this.y = 180;
    };

    this.updatePlayingHero = function (){
        this.velocity += this.gravity;
        this.y += this.velocity;

        if(this.y >= 180){ //check to see if hit the ground and stay there
            this.y = 180;
            this.velocity = this._jump;
        }
    };

    this.draw = function (renderingContext){ //rendering context is the canvas
        renderingContext.save();

        renderingContext.translate(this.x, this.y);
        renderingContext.rotate(this.rotation);

        var h = this.annimation[this.frame];
        link[h].draw(renderingContext, this.x, this.y);

        renderingContext.restore();
    }
}

function onPress(evt){
    console.log("click happened");
    switch (currentState){
        case states.splash:
            theHero.jump();
            currentState = states.game;
            break;

        case states.game:
            theHero.jump();
            break;

    }
}

function main(){
    windowSetup();
    canvasSetup();
    currentState = states.splash;
    document.body.appendChild(canvas);
    loadGraphics();
    theHero = new Hero;
    theGround = new Ground;
    theCrystal = new Crystal();
    theCrystal02 = new Crystal02();
}

function loadGraphics() {

    //Link
    var linkImg = new Image();
    linkImg.src = "img/linkSheet.png";
    //Ground
    var groundImg = new Image();
    groundImg.src = "img/marioGround.png";
    //Crystals
    var crystalImg = new Image();
    crystalImg.src = "img/greenCrystal.png";

    linkImg.onload = function () {
        initLink(this);
        initGround(groundImg);
        initCrystal(crystalImg);
        renderingContext.fillStyle = "#8BE4DF";
        //link.draw(renderingContext, 50, 50);
        gameLoop();
    };

}


function gameLoop(){
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}
function update(){
    frames++;
    theHero.update();
    theGround.update();
    theCrystal.update();
    theCrystal02.update();

}
function render(){
    renderingContext.fillRect(0, 0, width, height);
    theHero.draw(renderingContext);
    theGround.draw(renderingContext);
    theCrystal.draw(renderingContext);
    theCrystal02.draw(renderingContext);
}

function windowSetup() {
    var inputEvent = "touchstart";
    var windowWidth = window.innerWidth;
    if(windowWidth < 500){
        width = 320;
        height = 430;
    } else {
        width = 400;
        height = 430;
        inputEvent = "mousedown";
    }

    document.addEventListener(inputEvent, onPress);

}

function canvasSetup(){
    canvas = document.createElement("canvas");
    canvas.style.border = "1px solid black";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext("2d");
}


