// var width = '100vw';
// var height = '100vh';

var width = 1080;
var height = 720;


var svg = d3.select('svg')
    .attr("id", 'map')
    .attr("width", width)
    .attr("height", height)
    .attr("class", "graph-svg-component")
    .append('g');

// draw Sun
var circle = svg.append('g')
    .append('circle')
    .attr("id", 'sun')
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", 50)
    .attr("stroke", 'black')
    .attr("stroke-width", 3)
    .attr("fill", 'red');

// draw Orbit
function drawOrbit(value) {
    var circle = svg.append('g')
    .append('circle')
    .attr("class", 'orbit')
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", value)
    .attr("stroke", 'black')
    .attr("stroke-width", 0.5)
    .attr("fill", 'none');    
}

function drawPlanet(value1,value2) {
    var circle = svg.append('g')
    .append('circle')
    .attr("class", 'planet')
    .attr("cx", value1)
    .attr("cy", value2)
    .attr("r", 5)
    // .duration(8000)
    .attr("stroke", 'black')
    .attr("stroke-width", 1)
    .attr("fill", '#fff9ea')
    // .attr("transform", "translate(200,200)");
}

for (var i = 0; i<=7; i++){
    drawOrbit(20*(i+1)+50);
    drawPlanet(width/2 + 20*(i+1)+50,height/2)
}

