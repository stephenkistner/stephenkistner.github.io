var imgN, imgO, imgG, imgR, imgI, imgD, imgS;

var startX,startY;

var scaler = .1;

var posExX, posExY, posGenX, posGenY, posDayX,posDayY;

var wiggleX, wiggleY, wiggleX1, wiggleY1, t = 0;

var string1 = "in nature";
var string2 = "there are";

var noiseScale = 100;

var line1Offset,line2Offset;

var calibre;

var wiggleL;

var wiggleMaxX, wiggleMaxY = 100;

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
wiggleX = noise(t);
wiggleX = map(wiggleX,0,1,0,wiggleMaxX);
wiggleY = noise(t,10);
wiggleY = map(wiggleY,0,1,0,wiggleMaxY);
  image(imgN, startX+wiggleX, startY+wiggleY,imgN.width*scaler,imgN.height*scaler);
wiggleX = noise(t,11);
wiggleX = map(wiggleX,0,1,0,wiggleMaxX);
wiggleY = noise(t,12);
wiggleY = map(wiggleY,0,1,0,wiggleMaxY);
   image(imgO, startX+1000*scaler+wiggleX, startY+wiggleY,imgO.width*scaler,imgO.height*scaler);
wiggleX = noise(t,13);
wiggleX = map(wiggleX,0,1,0,wiggleMaxX);
wiggleY = noise(t,14);
wiggleY = map(wiggleY,0,1,0,wiggleMaxY);
  image(imgG, startX+wiggleX, startY+1500*scaler+wiggleY,imgG.width*scaler,imgG.height*scaler);
wiggleX = noise(t,15);
wiggleX = map(wiggleX,0,1,0,wiggleMaxX);
wiggleY = noise(t,16);
wiggleY = map(wiggleY,0,1,0,wiggleMaxY);
  image(imgR, startX+1000*scaler+wiggleX, startY+800*scaler+wiggleY,imgR.width*scaler,imgR.height*scaler);
wiggleX = noise(t,17);
wiggleX = map(wiggleX,0,1,0,wiggleMaxX);
wiggleY = noise(t,18);
wiggleY = map(wiggleY,0,1,0,wiggleMaxY);
  image(imgS, startX+4.2*1000*scaler+wiggleX, startY+800*scaler+wiggleY,imgS.width*scaler,imgS.height*scaler);
wiggleX = noise(t,19);
wiggleX = map(wiggleX,0,1,0,wiggleMaxX);
wiggleY = noise(t,20);
wiggleY = map(wiggleY,0,1,0,wiggleMaxY);
  image(imgI, startX+2*1000*scaler+wiggleX, startY+800*scaler+wiggleY,imgI.width*scaler,imgI.height*scaler);
wiggleX = noise(t,21);
wiggleX = map(wiggleX,0,1,0,wiggleMaxX);
wiggleY = noise(t,22);
wiggleY = map(wiggleY,0,1,0,wiggleMaxY);
  image(imgD, startX+2.7*1000*scaler+wiggleX, startY+800*scaler+wiggleY,imgD.width*scaler,imgD.height*scaler);

fill(0,map(frameCount,100,500,255,0));
rect(0,0,width,height);
  
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



  line(wiggleX-textWidth(string1)/2,wiggleY+line1Offset,wiggleX1+textWidth(string2)/2,wiggleY1+line2Offset);

  t+=0.002;
  
  
 wiggleMaxX = map(mouseX,0,width,-500,1500);
  wiggleMaxY = map(mouseY,0,width,-500,1500);
  
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    startX = windowWidth*.01;
  startY = windowHeight*.01;
}