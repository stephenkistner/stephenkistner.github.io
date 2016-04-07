var density = 1;

//WEATHER DATA VARS
var zip = 85001;
var weather, url;
var temperature, cloudAmt;
var sunriseDate,sunriseHours,sunsetDate,sunsetHours,dataDate,dataHours;
var nighttime = false;

//TYPOGRAPHY VARS
var calibre;
var textSizeFinal = 400;
var displayText = 'NEW YORK';
var textIsGood = false;
//COLOR VARS
var color1,color2,color3,colorBase,colorTime,colorTimeInv,cloudShadow;

//SHADOW VARS
var shadowBuffer;

//WAVEFORM VARS
var textMask, toMask;
var wave,wave2,wave3;
  var t = 0;
  var delta = 0;
  var freq = 0;
  var waveOffset = 20;
  var wavePulse = 40;
  var waveUpper, waveLower,wiggleAmt = 0;
  
//CLOUD VARS
var clouds = [];

function preload() {
  calibre = loadFont('assets/Calibre-Black.otf');
  url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&units=imperial&APPID=dbc1eb3f8bcd39cf9ae676b83e2e514c';
  loadJSON(url, gotWeather);
}

function setup() {
  pixelDensity(density);
  createCanvas(windowWidth*density,windowHeight*density);
  frameRate(60);
  colorSys();
}

function draw() {
  var minutes = minute();
  if (frameCount === 0 || minutes === 0) {
    colorSys();
    gotWeather();
  }
  
  textSizeUpdate();
  background(colorTime);
  shadow();
  //image(shadowBuffer,0,0,windowWidth,windowHeight);
  makeWaves();

 var cloudCount = map(cloudAmt,0,100,0,20);
 
 if (textIsGood) {
   if (cloudAmt>20) {
  if (clouds.length < cloudCount){
  for (var i=0; i<=cloudCount; i++) {
    clouds.push(new Cloud(random(0,windowWidth),0));
    }
  }
  for (var i=0; i<cloudCount; i++) {
    randomSeed(i);
    clouds[i].drawCloud();
    clouds[i].move();
  }
 }
 }
 
 print(frameRate());
  
  if (nighttime) {
    blendMode(MULTIPLY);
    fill(255,223,171);
    rect(-10,-10,windowWidth*1.1,windowHeight*1.1);
    blendMode(NORMAL);
  }

}


//PARSE WEATHER DATA
function gotWeather(weather) {
  temperature = weather.main.temp;

  cloudAmt = weather.clouds.all;
  
  displayText = weather.name;
  displayText = displayText.toUpperCase();
  
  sunriseDate = new Date(weather.sys.sunrise*1000);
  sunriseHours = sunriseDate.getHours() ;
  sunsetDate = new Date(weather.sys.sunset*1000);
  sunsetHours = sunsetDate.getHours();
  dataDate = new Date(weather.dt*1000);
  dataHours = dataDate.getHours() ;
  dataHours = 0.15;
}


//SET COLOR SCHEME


function colorSys() {
  cloudShadow = color(0);
  
  if (sunriseHours<dataHours && dataHours<sunsetHours) {
    colorTime = color(255);
    colorTimeInv = color(0);
  }
  else if (dataHours<sunriseHours || dataHours>sunsetHours) {
    colorTime = color(0);
    colorTimeInv = color(255);
    nighttime = true;
  }
  
  if (temperature < 40) {
    color1 = color(136,255,227);
    color2 = color(98,231,233);
    color3 = color(45,197,241);
    colorBase = color(colorTime);
    wiggleAmt = map(temperature,-30,60,0.5,0.01);
    freq = map(temperature,-30,40,.03,.06);
  }
  else if (temperature >= 40 && temperature <=60) {
    color3 = color(255,248,0);
    color2 = color(195,252,114);
    color1 = color(136,255,227);
    colorBase = color(colorTime);
    wiggleAmt = map(temperature,-30,60,0.5,0.01);
    freq = map(temperature,40,60,.06,.085);
  }
  else if (temperature > 60 && temperature < 80) {
    color1 = color(255,66,0);
    color2 = color(255,157,0);
    color3 = color(255,248,0);
    colorBase = color(colorTime);
    wiggleAmt  = map(temperature,60,120,0.01,0.3);
    freq = map(temperature,60,120,.085,.02);
  }
  else if (temperature >= 80) {
    color1 = color(colorTime);
    color3 = color(255,157,0);
    color2 = color(255,248,0);
    colorBase = color(255,66,0);
    wiggleAmt  = map(temperature,60,120,0.01,0.3);
    freq = map(temperature,60,120,.05,.02);
  }
}


//DRAW TEXT SHADOW
function shadow() {
  //shadowBuffer = createGraphics(windowWidth,windowHeight);
  //shadowBuffer.pixelDensity(2);
  textSize(textSizeFinal);
  textFont(calibre);
  textAlign(CENTER,CENTER);
  stroke(colorTimeInv);
  fill(colorTime);
 strokeWeight(2.5);
  
  for (var i=12; i>=0; i-=3) {
    text(displayText,windowWidth/2+i*.9,windowHeight/2+i*1.8);
  }
  
  noStroke();
}


//DRAW INNER WAVES
function makeWaves() {
  
  textMask =  createGraphics(windowWidth,windowHeight);
  textMask.pixelDensity(2);
  textMask.noStroke();
  textMask.fill(255);
  textSize(textSizeFinal);
  textMask.textFont(calibre);
  textAlign(CENTER,CENTER);
  textMask.text(displayText,textMask.width/2,textMask.height/2);

  wave = createGraphics(windowWidth*density,windowHeight*density);
    wave.beginShape();
    wave.fill(color3);
    wave.noStroke();
    wave.vertex(0,height/2);
    //wave.curveVertex(0,-height/2);
    for (i=-10; i<=windowWidth; i+=windowWidth*freq) {
      var yPos = map(noise(i),0,1,waveUpper,waveLower);
       delta = map(noise(i+t),0,1,-wavePulse,wavePulse);
      wave.curveVertex(i,yPos+delta);
    }
    wave.vertex(width,height+20);
    wave.vertex(-20,height+20);
    wave.endShape(CLOSE);
    
    wave.beginShape();
    wave.fill(color2);
    wave.noStroke();
    wave.vertex(0,height/2+waveOffset);
    for ( i=-10; i<=windowWidth; i+=windowWidth*freq) {
       yPos = map(noise(i),0,1,waveUpper,waveLower);
       delta = map(noise(i+t),0,1,-wavePulse,wavePulse);
      wave.curveVertex(i,yPos+delta+waveOffset);
    }
    wave.vertex(width,height+20+waveOffset);
    wave.vertex(-20,height+20+waveOffset);
    wave.endShape(CLOSE);
    
    wave.beginShape();
    wave.fill(color1);
    wave.noStroke();
    wave.vertex(0,height/2+waveOffset*2);
    for ( i=-10; i<=windowWidth; i+=windowWidth*freq) {
       yPos = map(noise(i),0,1,waveUpper,waveLower);
       delta = map(noise(i+t),0,1,-wavePulse,wavePulse);
      wave.curveVertex(i,yPos+delta+waveOffset*2);
    }
    wave.vertex(width,height+20+waveOffset*2);
    wave.vertex(-20,height+20+waveOffset*2);
    wave.endShape(CLOSE);
    
    t+=.01;
    
  toMask = createGraphics(windowWidth*2,windowHeight*2);
  toMask.pixelDensity(density);
  toMask.background(colorBase);
  toMask.image(wave,0,0,windowWidth,windowHeight);

  var toMaskImg = toMask.get();
  toMaskImg.mask(textMask._renderer);
  image(toMaskImg);
  }
  
  
//CLOUD OBJECTS
  
  
  function Cloud(xPos,yPos) {
    this.x = xPos+random(-200,windowWidth);
    this.y = yPos+random(windowHeight/2-textSizeFinal*.83,windowHeight/2+textSizeFinal*.4);
    
    this.drawCloud = function() {
    this.cloudLength = random(windowWidth*.009,windowWidth*.4);
    this.cloudSize= random(textSizeFinal*.1,textSizeFinal*.5);
      strokeCap(ROUND);
      stroke(cloudShadow);
      strokeWeight(this.cloudSize);
      line(this.x+this.cloudSize*.5,this.y+this.cloudSize*.3,this.x+this.cloudLength+this.cloudSize*.5,this.y+this.cloudSize*.3);
      stroke(colorTimeInv);
      strokeWeight(this.cloudSize);
      line(this.x,this.y,this.x+this.cloudLength,this.y);
      stroke(colorTime);
      strokeWeight(this.cloudSize-2.5);
      line(this.x,this.y,this.x+this.cloudLength,this.y);
    }
   
    this.move = function() {
      this.x=this.x + map(this.cloudSize,80,0,0,2) ;
      if (this.x >windowWidth) {
        this.x = random(-400,-200);
      }
    }
  }


//RESPONSIVE FUNCTIONALITY
function windowResized() {
  resizeCanvas(windowWidth*density, windowHeight*density);
  
  textIsGood = false;
    clouds.splice(0,clouds.length);
  
}

function textSizeUpdate() {
  textSize(textSizeFinal);
  var contentWidth = textWidth(displayText);
  
  if (contentWidth > windowWidth*.9) {
    textSizeFinal = textSizeFinal-10;
  }
  
  else if (windowWidth > 400) {
   if (contentWidth < windowWidth*.8) {
    textSizeFinal = textSizeFinal+10;
  }
  }
  
   if (windowWidth > 400 && windowWidth*.8<contentWidth && contentWidth<windowWidth*.9 || windowWidth<400) {
    textIsGood = true;
  }
  
   waveOffset = textSizeFinal*0.08;
   waveUpper = windowHeight/2-textSizeFinal*.75;
   waveLower = windowHeight/2+textSizeFinal*.08;
   wavePulse = windowWidth*wiggleAmt;
}