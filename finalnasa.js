  // establish variables
  var w     = 1430;
  var h     = 720;
  var x     = w/2;
  var y     = h/2;
  var t0    = new Date().setHours(0,0,0,0);
  var delta = (Date.now() - t0);
  //var starate = 10;

  // planets and moons
  var planets = [
    { R:    60, r:   3, speed: -1.60, phi0:  35, moons: [   // mercury
    ]},
    { R:    80, r:   6, speed: -1.17, phi0: 185, moons: [   // venus
    ]},
    { R:    110, r:   6, speed: -1.00, phi0: 135, moons: [   // earth
    //   { R:  10, r:   1, speed: -9.00, phi0:  15 }           // the moon
    ]},
    { R:   130, r:   3, speed: -0.80, phi0: 235, moons: [   // mars
    //   { R:   6, r: 0.5, speed: -3.80, phi0:  15 },          // phobos
    //   { R:   9, r: 0.5, speed: -2.80, phi0: 115 }           // deimos
    ]},
    { R:   200, r:  22, speed: -0.43, phi0: 135, moons: [   // jupiter
    //   { R:  30, r:   2, speed: -7.70, phi0:  25 },          // io
    //   { R:  36, r:   1, speed: -2.45, phi0:  95 },          // europa
    //   { R:  49, r:   3, speed: -1.10, phi0: 125 },          // ganymede
    //   { R:  79, r:   2, speed: -0.50, phi0: 315 }           // callisto
    ]},
    { R:   270, r:  18, speed: -0.32, phi0: 260, moons: [   // saturn
    //   { R:  28, r:   1, speed: -4.10, phi0: 120 },          // mimas
    //   { R:  33, r:   1, speed: -3.90, phi0:  20 },          // enceladus
    //   { R:  38, r:   1, speed: -3.60, phi0:   0 },          // tethys
    //   { R:  44, r:   1, speed: -3.20, phi0: 100 },          // dione
    //   { R:  58, r:   2, speed: -2.90, phi0: 300 },          // rhea
    //   { R:  98, r:   5, speed: -1.30, phi0: 180 },          // titan
    //   { R: 188, r:   2, speed: -0.10, phi0:  10 }           // lapetus
    ]},

    { R:   320, r:   9, speed: -1.0, phi0:  35, moons: [   // haiwang
    ]},

    { R:    350, r:   7, speed: -0.5, phi0:  35, moons: [   // tianwang
    ]},
  ];

// global valuables for API
var max = [];
var min = [];
var body = [];
var namek = [];
var hazard = [];
var text_x = 100;
var text_y = 100;
var count_earth = 0;
var count_mars = 0;
var firstdate = [];
var lastdate = [];
var firstyear = [];
var lastyear = [];
var collectfirstyear = [];
var collectlastyear = [];

/* D3 CODE */

  // insert svg element

  //------------ canvas1 --------
  var svg = d3.select('body').insert("svg")
      .attr('id', "master_svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "graph-svg-component")
    //   .call(d3.behavior.zoom().on("zoom", function(){
    //         svg.attr("transform","translate("+ d3.event.translate + ")"+ "scale("+ d3.event.scale + ")")
    //   }));

    

  //------------ canvas2 -------- 
    var svg2 = d3.select('body').insert("svg")
    .attr('id', "master_svg2")
    .attr("width", w)
    .attr("height", 800)
    .attr("class", "graph-svg-component2");

    //------ nasa icon-------
    svg2.append('svg:image')
      .attr({
        'xlink:href': 'nasa.PNG',  // can also add svg file here
        x: 1300,
        y: 700,
        width: 80
        // ,
        // height: 128
      });

  // sun
  svg.append("circle")
     .attr("r", 50)
     .attr("cx", x)
     .attr("cy", y)
     .attr("id", "sun");

  // planet group
  var container = svg.append("g")
      .attr("id", "orbit_container")
      .attr("transform", "translate(" + x + "," + y + ")")     

  // draw planets and moon clusters at the beginning
  container.selectAll("g.planet").data(planets).enter().append("g")
           .attr("class", "planet_cluster")
           .each(function(d, i) {
             d3.select(this)
               .append("circle")
               .attr("class", "orbit")
               .attr("r", d.R);
             d3.select(this)
               .append("circle")
               .attr("r", d.r)
               .attr("cx",d.R)
               .attr("cy", 0)
               .attr("class", "planet");
             d3.select(this).append("g").attr("transform", "translate(" + d.R + ",0)")
                .selectAll("g.moon").data(d.moons).enter().append("g")
                .attr("class", "moon_cluster").each(function(d, i) {
                  d3.select(this).append("circle").attr("class", "orbit")
                    .attr("r", d.R);
                  d3.select(this).append("circle").attr("r", d.r).attr("cx",d.R)
                    .attr("cy", 0).attr("class", "moon");
                })
                .attr("transform", function(d) {
                  return "rotate(" + (d.phi0 + (delta * (d.speed/100))) + ")";
                });
           })
           .attr("transform", function(d) {
             return "rotate(" + (d.phi0 + (delta * (d.speed/100 ))) + ")";
           });

  // throttled rotaiton animations
  setInterval(function(){
    var delta = (Date.now() - t0);
    svg.selectAll(".planet_cluster, .moon_cluster").attr("transform", function(d) {
      return "rotate(" + (d.phi0 + (delta * (d.speed/100))) + ")";
    });
  }, 40);

function updateplanets(){
  container.selectAll("g.planet").data(planets).enter().append("g")
  .attr("class", "planet_cluster")
  .each(function(d, i) {
    d3.select(this)
      .append("circle")
      .attr("class", "orbit")
      .attr("r", d.R);
    d3.select(this)
      .append("circle")
      .attr("r", d.r)
      .attr("cx",d.R)
      .attr("cy", 0)
      .attr("class", "planet");
    d3.select(this).append("g").attr("transform", "translate(" + d.R + ",0)")
       .selectAll("g.moon").data(d.moons).enter().append("g")
       .attr("class", "moon_cluster").each(function(d, i) {
         d3.select(this).append("circle").attr("class", "orbit")
           .attr("r", d.R);
         d3.select(this).append("circle").attr("r", d.r).attr("cx",d.R)
           .attr("cy", 0).attr("class", "moon");
       })
       .attr("transform", function(d) {
         return "rotate(" + (d.phi0 + (delta * (d.speed/100))) + ")";
       });
  })
  .attr("transform", function(d) {
    return "rotate(" + (d.phi0 + (delta * (d.speed/100 ))) + ")";
  });
}

/* API CODE */

function saveKeyWords(){
    // var startDate = 'hi';
    var MM = document.testform.searchBoxMM.value;
    var DD = document.testform.searchBoxDD.value;
    var sev = 6;
    var DDD = Number(DD) - Number(sev); 
    if(DDD <10){
        DDD = "0"+DDD;
    }
    var YY = document.testform.searchBoxYY.value;
    var startDate = YY + "-" + MM + "-" + DDD;
    var endDate = YY + "-" + MM + "-" + DD;
    var apikey = "Fuo9LrHRAnO1atO7BC2Bbf1pdF2Tb60RnAHAI5GL";
    console.log(startDate + 'and' +endDate);
    // var url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2019-01-07&end_date=2019-01-14&api_key=' + apikey;
    var url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='+startDate+"&end_date="+endDate+"&api_key=" + apikey;
    var neoid = [] ;    

    if(YY==2019){
      svg2.append('svg:image')
      .attr({
        'xlink:href': '2019.PNG',  // can also add svg file here
        x: 370,
        y: 40,
        width: 500
        // ,
        // height: 128
      });
    } else if(YY==2002){
      svg2.append('svg:image')
      .attr({
        'xlink:href': '2002.PNG',  // can also add svg file here
        x: 370,
        y: 40,
        width: 500
        // ,
        // height: 128
      });
    }else if(YY==1968){
      svg2.append('svg:image')
      .attr({
        'xlink:href': '1968.PNG',  // can also add svg file here
        x: 370,
        y: 40,
        width: 500
        // ,
        // height: 128
      });
    }else if(YY==1999){
      svg2.append('svg:image')
      .attr({
        'xlink:href': '1999.PNG',  // can also add svg file here
        x: 370,
        y: 40,
        width: 500
        // ,
        // height: 128
      });
    }


    
    
    getJSON(url, function(nasa){
        console.log('Here is the nasa info 1', nasa);
        
        pla_length = planets.length;

         console.log(pla_length);

        for(i=0;i<nasa.near_earth_objects[endDate].length;i++){
            max[i] = nasa.near_earth_objects[endDate][i].estimated_diameter.kilometers.estimated_diameter_max;
            min[i] = nasa.near_earth_objects[endDate][i].estimated_diameter.kilometers.estimated_diameter_min;
            body[i] = nasa.near_earth_objects[endDate][i].close_approach_data[0].orbiting_body;
            namek[i] = nasa.near_earth_objects[endDate][i]['name'];
            hazard[i] = nasa.near_earth_objects[endDate][i].is_potentially_hazardous_asteroid;
            neoid[i] = nasa.near_earth_objects[endDate][i].id;
            
            console.log(nasa.near_earth_objects[endDate][i]);
            console.log("name", namek[1]);
            console.log("id", neoid[1]);
            console.log(i, max[i]);
            
             // -------------Second Api Get---------


        // var url2 = 'https://api.nasa.gov/neo/rest/v1/neo/'+neoid[i]+'?api_key='+ apikey;

        // getJSON(url2, function(info){
        //   console.log("Here is III",i);
        //   console.log("URL2WORKS");
        //   console.log(info.orbital_data.first_observation_date); 

        //   firstdate[i] = info.orbital_data.first_observation_date;
        //   lastdate[i] = info.orbital_data.last_observation_date;
        //   //console.log("HERE IS date", firstdate[i]);

        //   var initialyear = 1900; 

        //   collectfirstyear[i] = firstdate[i].slice(0, 4);
        //   collectlastyear[i] = lastdate[i].slice(0, 4);
          
          

        //   firstyear[i] = Number(collectfirstyear[i]) - Number(initialyear);
        //   lastyear[i] = Number(collectlastyear[i]) - Number(initialyear);
        //   // console.log("HERE IS YEAR", firstyear[i]);
        //   // console.log("HERE IS YEAR", lastyear[i]);

          
        //     // svg2.append("line")
        //     // .attr("x1",firstyear[i]+i*20)
        //     // .attr("y1",h*(i+1)*0.1)
        //     // .attr("x2",lastyear[i]+i*50)
        //     // .attr("y2",h*(i+1)*0.1)
        //     // .attr("stroke","#000000")
        //     // .attr("stroke-width",10);
          
        // });

            // show the moon
            if(body[i]=="Earth"){
                count_earth++;
                if(count_earth<6){
                    planets[2].moons[i] = { 
                        R:   10 + i*5, 
                        r:   1, 
                        speed: -1.60*i, 
                        phi0:  35, 
                        };
                    // show the text
                    // var sample = '<div class="sample'+ i +'"><p>name is '+hazard[i]+'</p></div>';
                    // document.getElementById("display_area").insertAdjacentHTML('beforeend',sample);
            
                } else {
                    console.log("none");
                }
                console.log(planets[2].moons[i]);
            }
            //console.log(count_earth);

            // if(body[i]=="Mars"){
            //     count_mars++;
            //     planets[3].moons[i] = { 
            //         R:   10 + i*5, 
            //         r:   1, 
            //         speed: -1.60*i, 
            //         phi0:  35, 
            //         };
            //     //console.log(planets[3].moons[i]);
            // }
            // console.log(count_mars);
     
        }
        updateplanets();
        showtext();

      

        

        for(var i=0;i<5;i++){
            var sample = '<div class="sample'+ i +'"><h4>Name:'+namek[i]+'</h4></div>';
            document.getElementById("display_area").insertAdjacentHTML('beforeend',sample);

            var sample = '<div class="sample'+ i +'"><h5>Speed(max):'+max[i]+'km</h5></div>';
            document.getElementById("display_area2").insertAdjacentHTML('beforeend',sample);

            if(hazard[i]== false){
                svg.append("circle")
                .attr("r", 5)
                .attr("cx", 1400)
                .attr("cy", h*(i+1)*0.121)
                .attr("id", "star1")
                .attr("fill", "#666");
            } else if (hazard[i]== true){
                svg.append("circle")
                .attr("r", 10)
                .attr("cx", 1400)
                .attr("cy", h*(i+1)*0.121)
                .attr("id", "star1")
                .attr("fill", "#ff0000");                
            } else {
              svg.append("circle")
                .attr("r", 10)
                .attr("cx", 1400)
                .attr("cy", h*(i+1)*0.121)
                .attr("id", "star1")
                .attr("fill", "#fff9ea");
            }
            // svg.append("circle")
            // .attr("r", 5)
            // .attr("cx", 1000)
            // .attr("cy", h*(i+1)*0.1)
            // .attr("id", "star1")
            // .attr("fill", "#0000ff");           
        }

        

        // var sample = '<div class="sample"><p>max is '+max[0]+'</p></div>';
        // document.getElementById("display_area").insertAdjacentHTML('beforeend',sample);
        // console.log('hi', nasa.near_earth_objects[endDate][0].estimated_diameter.kilometers.estimated_diameter_max);
        // console.log('hi', nasa.near_earth_objects[endDate][0].estimated_diameter.kilometers.estimated_diameter_min);
        // console.log(i, max);
              
        });

        // svg2.append('svg:image')
        // .attr({
        //   'xlink:href': 'year.png',  // can also add svg file here
        //   x: 370,
        //   y: 40,
        //   width: 500
        //   // ,
        //   // height: 128
        // });

}


function getJSON(path, callback) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', path, true);
    req.setRequestHeader('Accept', 'application/json');
    req.onload = function() {
        callback(req.response);
    };
    req.send();
}

function displayDate(orgdata, i){
  var neoDate = orgdata.near_earth_objects[i];
  console.log('Here is the nasa info 3', neoDate);
  var html = '<p>' + neoDate + '</p>';
  // p.innerHTML = title;

  return html;
}

function showtext(){
  var text = svg.selectAll("text")
      .append("text");
  var textLabels = text
  .attr("x", text_x)
  .attr("y", text_y)
}


// var form = document.querySelector("#searchForm");
// form.addEventListener("click",saveKeyWords);

// function saveKeyWords(e){
//     e.preventDefault();
//     var value = document.querySelector("#submit").value;
//     form.reset();
//     getJSON(value.split('').join("+"));
// }

// function showData(nasa){
// console.log('Here is the nasa info 2', nasa);
// // console.log('Here is the nasa info', nasa.collection.items[0].data[0].title);


// var inserttitle = [];
// var nasapic = [];

// for(var i=0; i<=5; i++){
    
//     inserttitle.push(display(nasa,i));

// }
// var titleHTML = document.getElementById("title");
// titleHTML.innerHTML = inserttitle[0];

// for(var i=0; i<=5; i++){

//     nasapic.push(displayPhoto(nasa,i));
    

// }
// // console.log(nasapic)
// let picHTML = document.getElementById("image");
// picHTML.setAttribute("src", nasapic[0]);


// };

// function display(orgdata, i){
//     var title = orgdata.collection.items[i].data[0].title;
//     console.log('Here is the nasa info', title);
//     var html = '<p>' + title + '</p>';
//     // p.innerHTML = title;

//     return html;
// }




// function displayPhoto(photodata, i){
//     let photo = photodata.collection.items[i].links[0].href;
//     console.log('Here is the nasa info', photo);
//     let html = photo;
//     // p.innerHTML = title;

//     return html;
// }


