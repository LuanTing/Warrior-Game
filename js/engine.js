/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on player and enemy objects (defined in app.js).
 */

var Engine = (function(global) {
    
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
		isGameOver = false,
		gameCompleted = false,
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);
   
    function main() {
        
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

		if (!(gameCompleted || isGameOver)) {
			update(dt);
			render();
		} else if (isGameOver) {
			ctx.globalAlpha = 1
			textDrawer("Game Over!",canvas.width / 2, canvas.height / 2);
			textDrawer("Click 'Restart' to start again!", canvas.width / 2, (canvas.height / 2) + 80);
		} else if (gameCompleted) {
			ctx.globalAlpha = 1
			textDrawer("Congratulations!",canvas.width / 2, canvas.height / 2);
			textDrawer("Click 'Restart' to start again!", canvas.width / 2, (canvas.height / 2) + 80);
		}
    
        lastTime = now;

        win.requestAnimationFrame(main);
    }
	//the function determines the font style ,when game is over or completed
	function textDrawer(text, x, y) {
        ctx.font = "35px Sigmar One";
        ctx.textAlign = 'center';
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.strokeText(text, x, y);
        ctx.fillStyle = "yellow";
        ctx.fillText(text, x, y);
    }
   
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
		updateEntities(dt);
		checkCollisions(
			function() {
				gameCompleted = true;
			},
			function() {
				isGameOver = true;
		});
    }
	//Rectangular coordinates
	 var Rectangle = function (left, top, width, height) {
        this.left = left;
        this.top = top;
        this.right = this.left + width;
        this.bottom = this.top + height;
        this.width = width;
        this.height = height;
    };
    function checkCollisions(gameCompleteCallback, gameoverCallback) {
        var playerRect = new Rectangle(
            player.x + 20,
            player.y + 120,
            44,
	        40);
		// check whether the player hit the enemy 
        allEnemies.forEach(function (bug) {
            var bugRect = new Rectangle(
                bug.x + 20,
                bug.y + 120,
                44,
		        40);
			if (doRectanglesIntersect(bugRect, playerRect)) {
					gameoverCallback();
					console.log("Player collided with a bug!");
			}
		//check if player has arrived at the destination.
		var destinationRect = new Rectangle(
            destination.x + 20,
            destination.y + 120,
            44,
	        20);
		if (doRectanglesIntersect(destinationRect, playerRect)) {
			gameCompleteCallback();
			console.log("Player arrived!");
		}
	//check if the enemy out of bounds
		if(bugRect.left >= 515){
			bug.x = -85;
			var Yposition = [50,140,230,320];
			function someposition(){
				return parseInt(Math.random()*4);
			};
			bug.y = Yposition[someposition()];
		}
		}
		)
	//Using the rectangle collision detection method	
	function doRectanglesIntersect(r1, r2) {
        return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
    }

 }
	
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {
        // This array holds the relative URL to the image used for that particular row of the game level.
        var rowImages = [
                'images/grass-block.png',   // Top row is grass
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/stone-block.png',   // Row 1 of 2 of stone
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Loop through the number of rows and columns we've defined above and, using the rowImages array, draw the correct image for that portion of the "grid"
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
               
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

		renderEntities();
    }

   
    function renderEntities() {
        
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
		destination.render();
    }

    function reset() {
        
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-princess-girl.png',
		'images/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
