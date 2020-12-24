var dog, happyDogImg, dogImg;
var database;
var position;
var foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20);
  
  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.20;

}

function draw() {  
  background(46, 139, 87);

  if(foodS!== undefined){
     textSize(15);
     stroke("black");
     fill("white");
     text("Food Remaining:", 200, 150);
     text("Note: Press UP_ARROW Key To Feed The Dog Milk!", 80, 100);
  }

  if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDogImg);
  }

  if(foodS === 0){
     foodS = 20;
  }

  dog.display();

  drawSprites();

}

//Function to write values in database
function writeStock(x){

  if(x <= 0){
     x = 0;
  }
  else{
    x = x-1;
  }
   
  database.ref('/').update({
     Food:x
  })
}

// Function to read values from database
function readStock(data){
  foodS = data.val();

}

