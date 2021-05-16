var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Estados del Juego
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Fondo en movimiento
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//crear el niño que corre
boy = createSprite(180,530,30,30);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.setCollider("circle",0,0,500);
boy.debug = true;

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;

  path.velocityY = +(3 + 3* treasureCollection/100);
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para reiniciar el fondo
  if(path.y > 440 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+150;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+100;

      
    }else if(swordGroup.isTouching(boy)){
        gameState=END;
        boy.addAnimation("SahilRunning",endImg);
        boy.scale=0.95;
        boy.x=200;
        boy.y=300;
        cashG.destroyEach();
        cashG.setVelocityXEach(0);
        diamondsG.destroyEach();
        diamondsG.setVelocityXEach(0);
        jwelleryG.destroyEach();
        jwelleryG.setVelocityXEach(0);
        swordGroup.destroyEach();
        swordGroup.setVelocityXEach(0);
        boy.debug = false;
  }
  
  drawSprites();
  textSize(22);
  fill(255);
  text("Tesoro:\n     "+treasureCollection,250,60);
  }
  if(mousePressedOver(boy)||keyDown("space")&&gameState==END){
    reset();
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = +(3 + treasureCollection/100);
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = +(3 + treasureCollection/100);
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = +(3 + treasureCollection/100);
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = +(3 + treasureCollection/100);
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}
function reset(){
  gameState = PLAY;
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  boy.y=530;
  boy.debug = true;
  treasureCollection = 0;
}