var Spotted = false;

//block x,y locations 
var blocks = [
    [7, 6],
    [8, 6],
    [9, 6],
    [9, 7],
    [8, 7],
    [7, 7],
    [7, 8],
    [8, 8],
    [9, 8],
]

class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Player extends Character {
    playerPos = (this.x, this.y);

}


class Enemy extends Character {
    PatrolCounter = 0;
    detectPlayer(x, y) {
        let visionPos = [this.x, this.y]; // Change hardcoded to current enemy pos
        console.log(visionPos[0], visionPos[1], Game.player);
        //x pos  
        if (visionPos[0] == Game.player.x) { //console log visionpos to playerpos (array.compare or array.equalss)
            //Enemy Spotted
            clearInterval(Game.interval);
            console.log("ENEMY SPOTTED");
            Spotted = true;
        }

        if (visionPos[1] == Game.player.y) {
            //Enemy Spotted
            clearInterval(Game.interval);
            Spotted = true;
        }
    }

    patrolPath = [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
        [2, 3],
        [1, 3],
        [0, 3],
        [0, 2],
        [0, 1],
    ];
}


// Game Manager
var Game = {
    /**
     * Display:
     *  draw(x, y, character)
     *  clear()
     */
    display: null,
    player: null,
    enemy: null,
    interval: null,
    moveCounter: 0,
    collide: false,
    
    init: function () {
        // Display stuff
        let DisplayOptions = {
            bg: "yellow",
            fg: "black",
            height: 20,
            width: 20,
            forceSquareRatio: true,
            fontSize: 15,
        };

        this.display = new ROT.Display(DisplayOptions);
        document.getElementById("game").appendChild(this.display.getContainer());

        // Player stuff
        this.player = new Player(10, 10);
        this.enemy = new Enemy(0, 0);

    },
    timer: function () {
        Game.enemy.PatrolCounter++;
        Game.enemy.x = Game.enemy.patrolPath[Game.enemy.PatrolCounter % Game.enemy.patrolPath.length][0];
        Game.enemy.y = Game.enemy.patrolPath[Game.enemy.PatrolCounter % Game.enemy.patrolPath.length][1];
        Game.draw();
        Game.enemy.detectPlayer(Game.player.x, Game.player.y)
        console.log('tick');
        // console.log(Game.enemy);

    },
    // draw display and game on screen 
    draw: function () {
        this.display.clear();
        this.display.draw(this.player.x, this.player.y, "@");
        //for loop to run over each block x,y and draw
        for (const block of blocks) {
            //console.log(block);
            this.display.draw(block[0], block[1], "#");
        }
        if (Spotted == true) {
            Game.pathFind();
        }
        this.display.draw(this.enemy.x, this.enemy.y, "%");
    },
    
    pathFind: function () {
        console.log("pathfinding");

        // "0" == 0 // true (ducktype)
        // "0" === 0 // false (actually checking string vs integer) 

        // input callback informs about map structure 
        function passableCallback(x, y) {
            let hasCollided = collision([x, y]);
            return hasCollided;
            
        }

        var astarSettings = {
            topology: 4
        };

        // prepare path to given coords (target)
        var astar = new ROT.Path.AStar(this.player.x, this.player.y, passableCallback, astarSettings);

        var hasNextStep = false;
        // compute from given coords #1 
        astar.compute(this.enemy.x, this.enemy.y, function(x, y) {
            if (Game.enemy.x == x && Game.enemy.y ==y) return;
            if (hasNextStep) return;
            hasNextStep = true;
            Game.enemy.x = x;
            Game.enemy.y = y;

        });

    },
    // clicking restart button resets game
    restart: function () {
        console.log("restart");
        moveCounter = 0;
        this.player = new Player(10, 10);
        this.enemy = new Enemy(0, 0);
        this.draw();
        Spotted = false;
        clearInterval(Game.interval);
        Game.timer();

    }

};


Game.interval = setInterval(Game.timer, 500);

document.getElementById("btnRestart").onclick = function () {
    console.log(this);
    Game.restart();
};

// Basically a linear search
function collision(position) {
    // If the position is in the blocks array, return false

    // Loop through the array
    for (const block of blocks) {
        // If current block is our position, return false
        if (block[0] == position[0] && block[1] == position[1]) {
            return false;
        }
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    // Setup rot.js stuff
    Game.init();
    Game.draw();
    // Do something whenever key is pressed
    document.addEventListener("keydown", function (event) {
        // Player movement
        switch (event.key) {
            case "ArrowLeft":
                if (Game.player.x > 0 && collision([Game.player.x - 1, Game.player.y])) {
                    Game.player.x -= 1;
                //move counter + every time update runs (per turn), allowing enemy movement to rely on player (turn based playing)
                    Game.moveCounter++;
                }
                break;
            case "ArrowRight":
                if (Game.player.x < 19 && collision([Game.player.x + 1, Game.player.y])) {
                    Game.player.x += 1;
                    Game.moveCounter++;
                }
                break;
            case "ArrowUp":
                if (Game.player.y > 0 && collision([Game.player.x, Game.player.y - 1])) {
                    Game.player.y -= 1;
                    Game.moveCounter++;
                }
                break;
            case "ArrowDown":
                if (Game.player.y < 19 && collision([Game.player.x, Game.player.y + 1])) {
                    Game.player.y += 1;
                    Game.moveCounter++;
                }
                break;
        }
        if (Spotted == true) {
            // Game.enemy.x = Game.enemy.patrolPath[Game.moveCounter % Game.enemy.patrolPath.length][0];
            // Game.enemy.y = Game.enemy.patrolPath[Game.moveCounter % Game.enemy.patrolPath.length][1]; 
        } 
        // Draw game
        Game.draw();
        // console.log(Game.moveCounter % 4);
        // console.log(Game.enemy.patrolPath[Game.moveCounter % 4]);

        // % is modulus, allows for capping and not allowing array to go over 


        console.log(Game.moveCounter);
        // Update the game
        console.log(Game.player);
    });
});