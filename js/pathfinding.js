var w = 150, h = 80;
ROT.RNG.setSeed(12345);
var display = new ROT.Display({width:w, height:h, fontSize:6});
document.getElementById("game").appendChild(display.getContainer());

// generate map and store its data 
var data = {};
var map = new ROT.Map.Uniform(w, h);
map.create(function(x, y, value) {
    data[x+","+y] = value; // data["1,2"]
    display.DEBUG(x, y, value);
});

// "0" == 0 // true (ducktype)
// "0" === 0 // false (actually checking string vs integer) 

// input callback informs about map structure 
var passableCallback = function(x, y) {
    return (data[x+","+y] === 0);
}

/* prepare path to given coords */
var astar = new ROT.Path.AStar(98, 38, passableCallback);

// compute from given coords #1 
astar.compute(8, 45, function(x, y) {
    display.draw(x, y, "", "", "#800");
});

// compute from given coords #2 
astar.compute(130, 8, function(x, y) {
    display.draw(x, y, "", "", "#800");
});

// highlight 
display.draw(8,  45, "", "", "#3f3");
display.draw(130, 8, "", "", "#3f3");
display.draw(98, 38, "", "", "#f33"); 