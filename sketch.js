var dog,happyDog,dogSprite;
var foodS,foodStock,foodObj,foodImg;
var lastFed;
var db;
function preload()
{
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png"); 
}
function setup() {
  createCanvas(500,500);
  db=firebase.database();
  dogSprite=createSprite(250,375,20,20);
  dogSprite.addImage(dog);
  dogSprite.scale=0.25;

  foodStock=db.ref('food');
  foodStock.on("value",readstock);

  foodObj=new Food();

  addFood=createButton("add food");
  addFood.position(500,95);
  addFood.mousePressed(addFoods);

  feed=createButton("feed");
  feed.position(600,95);
  feed.mousePressed(feedDog);
}
function draw() {  
  background(46,139,87);
  fill(255,255,255);
  text("food remaing: "+foodS,175,150);

  if(lastFed >= 12) {
    text("Last Fed: " + lastFed % 12 + " PM", 50, 10);
} else if(lastFed === 0){
    text("Last Fed: 12 AM", 50, 10);
} else{
    text("Last Fed: " + lastFed + " AM", 50, 10);
}

  foodObj.display();
  drawSprites();
  //add styles here
}

function addFoods()
{
  if(foodS<20)
  {
    foodS+=1;
    foodObj.updateFoodStock(foodS,lastFed);
  }
}
function feedDog()
{
  if(foodS>0)
  {
    foodS-=1
    dogSprite.addImage(happyDog);
    foodObj.updateFoodStock(foodS);
    updateFedTime();
  }
}

function updateFedTime()
{
  lastFed=hour();
  db.ref('/').update({
    lastFed: lastFed
  })
}