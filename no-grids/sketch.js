var imgN, imgO, imgG, imgR, imgI, imgD, imgS;

var startX,startY;

var scaler = .1;

var posExX, posExY, posGenX, posGenY, posDayX,posDayY;

var wiggleX, wiggleY, wiggleX1, wiggleY1, t = 0;

var string1 = "in nature";
var string2 = "there are no grids";

var noiseScale = 100;

var line1Offset,line2Offset;

var calibre;

function preload() {
  imgN = loadImage("assets/N.png");
  imgO = loadImage("assets/O.png");
  imgG = loadImage("assets/G.png");
  imgR = loadImage("assets/R.png");
  imgI = loadImage("assets/I.png");
  imgD = loadImage("assets/D.png");
  imgS = loadImage("assets/S.png");
  calibre = loadFont('assets/Calibre-Medium.otf');
}

function setup() {

  createCanvas(windowWidth,windowHeight);
 startX = windowWidth*.01;
  startY = windowHeight*.01;
  posExX = random(0,windowWidth);
  posExY = random(0,windowHeight);
    background(0);
}

function draw() {
  fill(0,9);
  rect(0,0,width,height);
scaler=width*height/5000000;
   image(imgO, startX+1000*scaler, startY,imgO.width*scaler,imgO.height*scaler);
  image(imgG, startX, startY+1500*scaler,imgG.width*scaler,imgG.height*scaler);
  image(imgR, startX+1000*scaler, startY+800*scaler,imgR.width*scaler,imgR.height*scaler);
    image(imgS, startX+4.2*1000*scaler, startY+800*scaler,imgS.width*scaler,imgS.height*scaler);
  image(imgN, startX, startY,imgN.width*scaler,imgN.height*scaler);
 
  image(imgI, startX+2*1000*scaler, startY+800*scaler,imgI.width*scaler,imgI.height*scaler);
  image(imgD, startX+2.7*1000*scaler, startY+800*scaler,imgD.width*scaler,imgD.height*scaler);

  
  noStroke();
  fill(255);
  textFont(calibre);
  textSize(50);
  wiggleX = noise(t,1);
  wiggleX = map(wiggleX,0,1,0+textWidth(string1),width-textWidth(string1));
  wiggleY = noise(t,2);
  wiggleY = map(wiggleY,0,1,0,height/2);
  textAlign(RIGHT);
  text(string1,wiggleX, wiggleY);
  wiggleX1 = noise(t,5);
  wiggleX1 = map(wiggleX1,0,1,0+textWidth(string2),width-2*textWidth(string2));
  wiggleY1 = noise(t,7);
  wiggleY1 = map(wiggleY1,0,1,height/2,height);
  textAlign(LEFT);
  text(string2, wiggleX1, wiggleY1);
  noFill();
  strokeWeight(2);
  stroke(255);
  

    line1Offset = 20;
    line2Offset = -45;


  for (var i=-10000; i<10000; i+=200) {
  line(wiggleX-textWidth(string1)/2+2*i,wiggleY+line1Offset+i,wiggleX1+textWidth(string2)/2+2*i,wiggleY1+line2Offset+i);
}
  t+=0.002;
  
  
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    startX = windowWidth*.01;
  startY = windowHeight*.01;
}