var density = 1;

//INTERFACE 
var initBTN;

//WEATHER DATA VARS
var zip = 90210;
var weather, url;
var temperature, cloudAmt;
var sunriseDate,sunriseHours,sunsetDate,sunsetHours,dataDate,dataHours;
var nighttime = false;

//TYPOGRAPHY VARS
var calibre;
var textSizeFinal = 300;
var displayText = 'NEW YORK';
var textIsGood = false;
//COLOR VARS
var color1,color2,color3,colorBase,colorTime,colorTimeInv,cloudShadow;

//SHADOW VARS
var shadowBuffer;
var shadowRefresh = true;

//WAVEFORM VARS
var textMask, toMask, toMaskImg;
var wave,wave2,wave3;
  var t = 0;
  var delta = 0;
  var freq = 0;
  var waveOffset = 20;
  var wavePulse = 40;
  var waveUpper, waveLower,wiggleAmt = 0;
  
//CLOUD VARS
var cloudsLarge = [];
var cloudsSmall = [];

//WIND VARS


function preload() {
  calibre = loadFont('assets/Calibre-Black.otf');
  url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&units=imperial&APPID=dbc1eb3f8bcd39cf9ae676b83e2e514c';
  loadJSON(url, gotWeather);
}

function setup() {
  pixelDensity(density);
  createCanvas(windowWidth*density,windowHeight*density);
  frameRate(40);
  colorSys();
  initBTN = createButton("WEATHER");
}

function draw() {
  textSizeUpdate();
  background(colorTime);
  
  if (textIsGood) {
  
  var minutes = minute();
  if (frameCount === 0 || minutes === 0) {
    colorSys();
    gotWeather();
  }
  
  makeWaves();
  if (shadowRefresh) {
  shadow();
  }
  image(toMaskImg);
  
 var cloudCount = map(cloudAmt,0,100,0,30);
 

  if (cloudAmt>20) {
    if (cloudsSmall.length < cloudCount){
      for (var i=0; i<=cloudCount; i++) {
        cloudsSmall.push(new Cloud(random(0,windowWidth),0,.5,true));
      }
    }
  for ( i=0; i<cloudsSmall.length; i++) {
    cloudsSmall[i].drawCloud();
    cloudsSmall[i].move();
  }
  //LARGE CLOUDS
  if (cloudAmt > 50) {
  if (cloudsLarge.length < cloudCount/4){
      for (var i=0; i<=cloudCount/4; i++) {
        cloudsLarge.push(new Cloud(random(0,windowWidth),0,1,true));
      }
    }
  for ( i=0; i<cloudsLarge.length; i++) {
    cloudsLarge[i].drawCloud();
    cloudsLarge[i].move();
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
}


//PARSE WEATHER DATA
function gotWeather(weather) {
  temperature = weather.main.temp;

  cloudAmt = weather.clouds.all;
  
  displayText = weather.name;
  displayText = displayText.toUpperCase();
  //displayText = '7:24';
  
  sunriseDate = new Date(weather.sys.sunrise*1000);
  sunriseHours = sunriseDate.getHours() ;
  sunsetDate = new Date(weather.sys.sunset*1000);
  sunsetHours = sunsetDate.getHours();
  dataDate = new Date(weather.dt*1000);
  dataHours = dataDate.getHours() ;
  //dataHours = 0.15;
}


//SET COLOR SCHEME


function colorSys() {
  cloudShadow = color(0,220);
  
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


// Extend p5.Image, adding the converse of "mask", naming it "punchOut":
p5.Image.prototype.punchOut = function(p5Image) {
 
    if(p5Image === undefined){
        p5Image = this;
    }
    var currBlend = this.drawingContext.globalCompositeOperation;
 
    var scaleFactor = 1;
    if (p5Image instanceof p5.Graphics) {
        scaleFactor = p5Image._pInst._pixelDensity;
    }
 
    var copyArgs = [
        p5Image,
        0,
        0,
        scaleFactor*p5Image.width,
        scaleFactor*p5Image.height,
        0,
        0,
        this.width,
        this.height
    ];
 
    this.drawingContext.globalCompositeOperation = "destination-out";
    this.copy.apply(this, copyArgs);
    this.drawingContext.globalCompositeOperation = currBlend;
};

//DRAW TEXT SHADOW

function shadow() {
  textMask =  createGraphics(windowWidth,windowHeight);
  textMask.pixelDensity(2);
  textMask.noStroke();
  //textMask.fill(0);
  //textMask.rect(-10,-10,textMask.width*1.1,textMask.height*1.1);
  textMask.fill(255);
  textSize(textSizeFinal);
  textMask.textFont(calibre);
  textAlign(CENTER,CENTER);
  textMask.text(displayText,textMask.width/2,textMask.height/2);
  
  shadowBuffer = createGraphics(windowWidth,windowHeight);
  shadowBuffer.pixelDensity(2);
  shadowBuffer.fill(colorTime);
  shadowBuffer.rect(-10,-10,shadowBuffer.width*1.1,shadowBuffer.height*1.1);
  shadowBuffer.textSize(textSizeFinal);
  shadowBuffer.textFont(calibre);
  textAlign(CENTER,CENTER);
  shadowBuffer.stroke(colorTimeInv);
  shadowBuffer.fill(colorTime);
  shadowBuffer.strokeWeight(2.5);
  
  for (var i=12; i>=0; i-=3) {
    if (i===0) {
      shadowBuffer.noStroke();
    }
    shadowBuffer.text(displayText,windowWidth/2+i*.9,windowHeight/2+i*1.8);
  }
  
  noStroke();
  
  toMask = createGraphics(windowWidth*2,windowHeight*2);
  toMask.pixelDensity(density);
  toMask.background(colorBase);
  toMask.image(shadowBuffer,0,0,windowWidth,windowHeight);

  toMaskImg = toMask.get();
  toMaskImg.punchOut(textMask._renderer);
  
  shadowRefresh = false;
}


//DRAW INNER WAVES
function makeWaves() {
  fill(colorBase);
  rect(-10,10,windowWidth*1.1,windowHeight*1.1);
  //wave = createGraphics(windowWidth*density,windowHeight*density);
    beginShape();
    fill(color3);
    noStroke();
    vertex(0,height/2);
    for (i=-10; i<=windowWidth; i+=windowWidth*freq) {
      var yPos = map(noise(i),0,1,waveUpper,waveLower);
       delta = map(noise(i+t),0,1,-wavePulse,wavePulse);
      curveVertex(i,yPos+delta);
    }
    vertex(width,height+20);
    vertex(-20,height+20);
    endShape(CLOSE);
    
    beginShape();
    fill(color2);
    noStroke();
    vertex(0,height/2+waveOffset);
    for ( i=-10; i<=windowWidth; i+=windowWidth*freq) {
       yPos = map(noise(i),0,1,waveUpper,waveLower);
       delta = map(noise(i+t),0,1,-wavePulse,wavePulse);
      curveVertex(i,yPos+delta+waveOffset);
    }
    vertex(width,height+20+waveOffset);
    vertex(-20,height+20+waveOffset);
    endShape(CLOSE);
    
    beginShape();
    fill(color1);
    noStroke();
    vertex(0,height/2+waveOffset*2);
    for ( i=-10; i<=windowWidth; i+=windowWidth*freq) {
       yPos = map(noise(i),0,1,waveUpper,waveLower);
       delta = map(noise(i+t),0,1,-wavePulse,wavePulse);
      curveVertex(i,yPos+delta+waveOffset*2);
    }
    vertex(width,height+20+waveOffset*2);
    vertex(-20,height+20+waveOffset*2);
    endShape(CLOSE);
    
    t+=.01;
    
  //image(wave,0,0,windowWidth,windowHeight);
  }
  
  
//CLOUD OBJECTS
  function Cloud(xPos,yPos,cloudScale,cloudShadowOn) {
    this.cloudScale = cloudScale;
    this.x = xPos+random(-500,windowWidth);
    this.y = yPos+random(windowHeight/2-textSizeFinal*.7*cloudScale,windowHeight/2+textSizeFinal*.5*cloudScale);
    this.cloudShadowOn = cloudShadowOn;
    this.cloudLength = random(windowWidth*.0009*cloudScale,windowWidth*.2*cloudScale);
    this.cloudSize= random(textSizeFinal*.4*cloudScale,textSizeFinal*.55*cloudScale);
    
    this.drawCloud = function() {
      strokeCap(ROUND);
      if (cloudShadowOn) {
      stroke(cloudShadow);
      strokeWeight(this.cloudSize);
      line(this.x+this.cloudSize*.5,this.y+this.cloudSize*.3,this.x+this.cloudLength+this.cloudSize*.5,this.y+this.cloudSize*.3);
      }
      stroke(colorTimeInv);
      strokeWeight(this.cloudSize);
      line(this.x,this.y,this.x+this.cloudLength,this.y);
      stroke(colorTime);
      strokeWeight(this.cloudSize-2.5);
      line(this.x,this.y,this.x+this.cloudLength,this.y);
    }
   
    this.move = function() {
      this.x=this.x + map(this.cloudSize,0,80,0,windowWidth*.0003) ;
      if (this.x >windowWidth) {
        this.x = random(-400,-200);
      }
    }
  }


//RESPONSIVE FUNCTIONALITY
function windowResized() {
  resizeCanvas(windowWidth*density, windowHeight*density);
  
  textIsGood = false;
    cloudsSmall.splice(0,cloudsSmall.length);
    cloudsLarge.splice(0,cloudsLarge.length);
    
  shadowRefresh = true;
}

function textSizeUpdate() {
  textSize(textSizeFinal);
  var contentWidth = textWidth(displayText);
  
  if (contentWidth > windowWidth*.9) {
    textSizeFinal = textSizeFinal-10;
  }
  
  else if (windowWidth > 400) {
   if (contentWidth < windowWidth*.8 && textSizeFinal < 350) {
    textSizeFinal = textSizeFinal+10;
  }
  }
  
   if (windowWidth > 400  && contentWidth<windowWidth*.9) {
    textIsGood = true;
  }
  else if (windowWidth<400) {
    textIsGood = true;
  }
  
   waveOffset = textSizeFinal*0.08;
   waveUpper = windowHeight/2-textSizeFinal*.75;
   waveLower = windowHeight/2+textSizeFinal*.08;
   wavePulse = windowWidth*wiggleAmt;
}