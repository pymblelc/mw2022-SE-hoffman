var display = new ROT.Display({width:w, height:h, fontSize:6});
document.getElementById("game").appendChild(display.getContainer());
var w = 100, h = 60;
var map = new ROT.Map.Cellular(w, h, { connected: true });

map.randomize(0.54);

/* make a few generations */
for (var i=0; i<4; i++) map.create();

/* display only the final map */
var display = new ROT.Display({width:w, height:h, fontSize:4});
document.getElementById("game").appendChild(display.getContainer());    
map.create(display.DEBUG, );
map.connect(display.DEBUG,2);

// /* now connect the maze */
// var display = new ROT.Display({width:w, height:h, fontSize:4});
// document.getElementById("game").appendChild(display.getContainer());    
// map.connect(display.DEBUG, );

/* create a connected map where the player can reach all non-wall sections */


/* cells with 1/2 probability */
