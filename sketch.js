var trex, trex_running, nolive, noliveimg, edges;
var ground, groundImage;
var invisground;
var cloudimage, cloud;
var catimg1, catimg2, catimg3, catimg4, catimg5, catimg6;
var cat;
var gamestate = "play";
var cats, cloudmany;
var loserimg, restartimg, loser, restart;
var score = 0;
var diemp3, checkmp3, jumpmp3

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  noliveimg = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  
  diemp3 = loadSound("die.mp3")
  checkmp3 = loadSound("checkPoint.mp3")
  jumpmp3 = loadSound("jump.mp3")

  loserimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");

  catimg1 = loadImage("obstacle1.png");
  catimg2 = loadImage("obstacle2.png");
  catimg3 = loadImage("obstacle3.png");
  catimg4 = loadImage("obstacle4.png");
  catimg5 = loadImage("obstacle5.png");
  catimg6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  invisground = createSprite(300, 199, 600, 10);
  invisground.visible = false;

  ground = createSprite(300, 190, 600, 10);
  ground.addImage("ground", groundImage);
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("liveless", noliveimg);
  trex.scale = 0.5;

  loser = createSprite(300, 100, 20, 50);
  loser.addImage("uareloser", loserimg);
  loser.scale = 0.5;
  restart = createSprite(300, 140, 20, 50);
  restart.addImage("uloseagain", restartimg);
  restart.scale = 0.5;

  cats = createGroup();
  cloudmany = createGroup();
}

function draw() {
  background("white");
  text("score: " + Math.round(score), 520, 15);
  ground.velocityX = -10;

  if (gamestate == "play") {
    score = score + 0.5
    if (keyDown("space") && trex.y > 162) {
      trex.velocityY = -10;
      jumpmp3.play()
    }

    trex.velocityY = trex.velocityY + 0.5;

    if (ground.x < 0) {
      ground.x = 300;
    }
    
    if (score% 100 == 0) {
    checkmp3.play()

    }

    if (trex.isTouching(cats)) {
      gamestate = "end";
      diemp3.play()
    }
    trex.changeAnimation("running", trex_running);
    loser.visible = false;
    restart.visible = false;
    cloudmaker();
    catmaker();
  }

  if (gamestate == "end") {
    ground.velocityX = 0;
    cats.setVelocityXEach(0);
    cloudmany.setVelocityXEach(0);
    cats.setLifetimeEach(-567890);
    cloudmany.setLifetimeEach(
      -34444444444444444444444444444444444444444444444444444444444444
    );
    trex.changeAnimation("liveless", noliveimg);
    loser.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)) {
      gameagain();
    }
    trex.velocityY = trex.velocityY + 1
  }

  trex.collide(invisground);

  drawSprites();
}

function cloudmaker() {
  if (frameCount % 40 == 0) {
    cloud = createSprite(550, 20, 50, 50);
    cloud.addImage("cloud", cloudimage);
    cloud.scale = 0.75;
    cloud.velocityX = -7;
    cloud.y = Math.round(random(10, 80));
    cloud.lifetime = 130;
    cloudmany.add(cloud);
  }
}

function catmaker() {
  if (frameCount % 50 == 0) {
    cat = createSprite(550, 175, 50, 50);
    cat.velocityX = -7;
    var r = Math.round(random(1, 6));
    console.log(r);
    switch (r) {
      case 1:
        cat.addImage("CAT1", catimg1);
        break;
      case 2:
        cat.addImage("CAT12", catimg2);
        break;
      case 3:
        cat.addImage("CAT13", catimg3);
        break;
      case 4:
        cat.addImage("CAT14", catimg4);
        break;
      case 5:
        cat.addImage("CAT15", catimg5);
        break;
      case 6:
        cat.addImage("CAT16", catimg6);
        break;
    }
    cat.scale = 0.5;
    cat.lifetime = 130;
    cats.add(cat);
  }
}

function gameagain() {
  gamestate = "play";
  cats.destroyEach();
  cloudmany.destroyEach();
  score = 0
}
