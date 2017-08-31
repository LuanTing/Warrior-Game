var Enemy = function(x,y) {
	this.x = x;
	this.y = y;
	this.speed = (Math.floor(Math.random()));
    this.direction = -1;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.move = function(){
 if (this.direction === "left") {
        this.x = this.x - (dt * this.speed);
    } else if (this.direction === "right") {
        this.x = this.x + (dt * this.speed);
    }	
	console.log(this.x,this.y)
};

Enemy.prototype.update = function(dt) {
    
	 this.x = this.x + (this.speed * dt * this.direction);

    this.randomSpeed()
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//The enemy's speed is between 0-500
Enemy.prototype.randomSpeed = function(){
	var s = Math.random();
	this.speed = (Math.floor(s * -500));
	//console.log(this.speed);
};
//the Item object
var Item = function(x,y,z){
	this.x = x;
	this.y = y;
	this.sprite = z;
}

Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x,y){
	this.x = 204;
	this.y = 435;
	this.sprite = 'images/char-boy.png';
	this.previousLocation = {x: this.x, y: this.y};
};
Player.prototype.update = function(){
	
};
Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction){
	this.previousLocation.x = this.x;
    this.previousLocation.y = this.y;
    //Make sure the player doesn't get out of the border
    if (direction === 'left' && this.x >= 100) {
        this.x -= 100;
    }
    if (direction === 'up' && this.y >= 5) {
        this.y -= 30;
    }
    if (direction === 'right' && this.x >= 0 && this.x < 305) {
        this.x += 100;
    }
    if (direction === 'down' && this.y >= -15 && this.y < 408) {
        this.y += 30;
    }
	console.log(this.x,this.y);
};

var player = new Player();
var allEnemies = [new Enemy (300,50),new Enemy (0,140),new Enemy (100,230),new Enemy(400,320)];
//princess is the destination
var princess = 'images/char-princess-girl.png';
var destination = new Item(404,-15,princess);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
