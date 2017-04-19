var link;
var ground;
var crystal;

function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function (renderingContext, x, y){ //rendering context is the canvas
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

function initLink(img) {
    //link = new Sprite(img, 0, 0, 45, 55);
    link = [
        new Sprite(img, 0, 0, 45, 55),
        new Sprite(img, 45, 0, 45, 55),
        new Sprite(img, 90, 0, 45, 55)
    ];

}
function initGround(img){
    ground = [
        new Sprite(img, 0, 0, 256, 32 )
    ];
}

function initCrystal(img) {
    crystal = [
        new Sprite(img, 1, 0, 27, 45),
        new Sprite(img, 29, 0, 27, 45),
        new Sprite(img, 57, 0, 27, 45),
        new Sprite(img, 86, 0, 27, 45),
        new Sprite(img, 114, 0, 27, 45),
        new Sprite(img, 142, 0, 27, 45),
        new Sprite(img, 170, 0, 27, 45),
        new Sprite(img, 198, 0, 27, 45),
        new Sprite(img, 228, 0, 27, 45),
        new Sprite(img, 258, 0, 27, 45),
        new Sprite(img, 287, 0, 27, 45),
        new Sprite(img, 315, 0, 27, 45)


    ];
}




