var currentState,
    width,
    height,
    canvas,
    renderingContext,
    frames = 0,
    theHero,
    theGround,
    theCrystal,
    theCrystal02,
    theFireBall,
    theFireBall02,
    points = 1,
    level = 1,
    life = 3,
    highScore = 1;


var states = {
    splash: 0,
    game: 1,
    score: 2
};

function Fireball(){
    this.x = (width / 2) + Math.floor(Math.random() * 200) + 300;
    this.y = 0;

    this.frame = 0;
    this.annimation = [0, 1, 2, 3];

    this.update = function (){
        var h = 12; //every 10 browser frames = 1 hero frame
        this.frame += frames % h === 0 ? 1 : 0;
        this.frame %= this.annimation.length;
    };

    var ranHeight = 75;
    var ranWaveHeight = 30;
    var ranXOffset = Math.floor(Math.random() * 25);

    this.draw = function (renderingContext){ //rendering context is the canvas
        renderingContext.save();
        renderingContext.translate(this.x, this.y);

        var h = this.annimation[this.frame];
        fireBall[h].draw(renderingContext, this.x, this.y);

        renderingContext.restore();


        if (this.x <= -26){
            ranHeight = Math.floor(Math.random() * 140);
            ranWaveHeight = Math.floor(Math.random() * 50) + 20;
            ranXOffset = Math.floor(Math.random() * 300);
            this.x = (width / 2) + ranXOffset;
            this.y = ranHeight;
            this.annimation = [0, 1, 2, 3];
        } else{
            this.x -= (1 + (level / 3));
            this.y = ranHeight + ( ranWaveHeight * Math.cos(frames / 15) );
        }
    }
}

function Crystal(){
    var speed = (Math.random() * 3) + 0.5;
    var height = (Math.random() * 150) + 75;

    this.x = width - 100;
    this.y = height;
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
            speed = (Math.random() * 3) + (level);
            this.x = width / 2;
            this.y = ranHeight;
            this.annimation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        } else{
            this.x-= speed;
        }
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
        ground[h].draw(renderingContext, this.x + (256 * 2), this.y );
        renderingContext.restore();
        this.x <= -31 ? this.x = 0 : this.x -= (1 + (level/5));
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

    this.updatePlayingHero = function () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y >= 180) { //check to see if hit the ground and stay there
            this.y = 180;
            this.velocity = this._jump;
            this.annimation = this.annimation = [0, 1, 2, 1];
            this._jump = 4.6;

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
    theCrystal02 = new Crystal();
    theFireBall = new Fireball();
    theFireBall02 = new Fireball();
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
    //FireBalls
    var fireBallImg = new Image();
    fireBallImg.src = "img/fireBall.png";

    linkImg.onload = function () {
        initLink(this);
        initGround(groundImg);
        initCrystal(crystalImg);
        +        initFireBall(fireBallImg);
        renderingContext.fillStyle = "#8BE4DF";
        //link.draw(renderingContext, 50, 50);
        gameLoop();
    };

}

function crystalCollisionCheck(){
    var crystalCenter = [theCrystal.x + 14, theCrystal.y + 24 ];
    var crystalCenter02 = [theCrystal02.x + 14, theCrystal02.y + 24];
    var linkCenter = [theHero.x + 22, theHero.y + 26];
    var collisionDistance = 15;
    var crystalLinkDiff = [Math.abs(crystalCenter[0] - linkCenter[0]), Math.abs(crystalCenter[1] - linkCenter[1])];
    var crystal02LinkDiff = [Math.abs(crystalCenter02[0] - linkCenter[0]), Math.abs(crystalCenter02[1] - linkCenter[1])];
    if (crystalLinkDiff[0] < collisionDistance && crystalLinkDiff[1] < collisionDistance){

        if(theCrystal.annimation.length > 1){points++; life += 2; updatePoints();}
        theCrystal.annimation = [12];

        updatePoints();

    }
    if (crystal02LinkDiff[0] < collisionDistance && crystal02LinkDiff[1] < collisionDistance){

        if(theCrystal02.annimation.length > 1){points++; life+=2; updatePoints();}
        theCrystal02.annimation = [12];

        updatePoints();
    }
}
function fireballCollisionCheck(){
    var fireBallCenter = [theFireBall.x + 19, theFireBall.y + 21 ];
    var fireBallCenter02 = [theFireBall02.x + 19, theFireBall02.y + 21];
    var linkCenter = [theHero.x + 22, theHero.y + 26];
    var collisionDistance = 15;
    var fireBallLinkDiff = [Math.abs(fireBallCenter[0] - linkCenter[0]), Math.abs(fireBallCenter[1] - linkCenter[1])];
    var fireBall02LinkDiff = [Math.abs(fireBallCenter02[0] - linkCenter[0]), Math.abs(fireBallCenter02[1] - linkCenter[1])];
    if (fireBallLinkDiff[0] < collisionDistance && fireBallLinkDiff[1] < collisionDistance){

        life -= 1;
        theHero.annimation = [3];
        theHero._jump = 7;
        theHero.jump();
        theHero._jump = 0;
        updatePoints();
    }
    if (fireBall02LinkDiff[0] < collisionDistance && fireBall02LinkDiff[1] < collisionDistance){

        life -= 1;
        theHero.annimation = [3];
        theHero._jump = 7;
        theHero.jump();
        theHero._jump = 0;
        updatePoints();
    }
}

function gameLoop(){
    update();
    render();
    crystalCollisionCheck();
    fireballCollisionCheck();
    level = Math.ceil(points / 10);
    checkLife();

    window.requestAnimationFrame(gameLoop);
}

function checkLife(){
    if (life < 1) {
        $("#gameCanvas").hide();
        $("#wrapper").replaceWith("<div class='container' id='wrapper'><img src='img/died.gif'></div>");
    }
}
function update(){
    frames++;
    theHero.update();
    theGround.update();
    theCrystal.update();
    theCrystal02.update();
    theFireBall.update();
    theFireBall.x--;
    theFireBall02.update();

}
function render(){
    renderingContext.fillRect(0, 0, width, height);
    theHero.draw(renderingContext);
    theGround.draw(renderingContext);
    theCrystal.draw(renderingContext);
    theCrystal02.draw(renderingContext);
    theFireBall.draw(renderingContext);
    theFireBall02.draw(renderingContext);
}

function windowSetup() {
    var inputEvent = "touchstart";
    var windowWidth = window.innerWidth;
    if(windowWidth < 500){
        width = 320;
        height = 430;
    } else {
        width = 600;
        height = 430;
        inputEvent = "mousedown";
    }

    document.addEventListener(inputEvent, onPress);

}

function canvasSetup(){
    canvas = document.getElementById("gameCanvas");
    canvas.style.border = "1px solid black";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext("2d");

    getHighScore();
}

function updatePoints(){
    $("#points").replaceWith("<div class='item' id='points'><h2 id = 'points'>"+points+"</h2></div>");
    $("#points").addClass("highlight");
    var displayLevel = Math.ceil(level);
    var displayLife = Math.ceil(life);
    $("#level").replaceWith("<div class='item' id='level'><h2>"+displayLevel+"</h2></div>");
    $("#life").replaceWith("<div class='item' id='life'><h2>"+displayLife+"</h2></div>");
    checkHighScore();
}

function getHighScore(){

    if ( db.get("highScore") ){
        highScore = db.get("highScore");
        $("#highScore").replaceWith("<div class='item' id = 'highScore'><h2>"+highScore+"</h2></div>");
    } else {
        db.save("highScore", 1)
    }

}

function checkHighScore(){

    if (points > highScore) {
        highScore = points;
        db.save("highScore", highScore);

        $("#highScore").replaceWith("<div class='item' id = 'highScore'><h2>"+highScore+"</h2></div>");
        $("#highScore").addClass("highlight");
    }
}


