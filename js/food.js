class Food
{
    constructor()
    {
      this.image=loadImage("images/Milk.png");
    }

    display()
    {
      var x = 80, y = 150;
        imageMode(CENTER);
        if(foodS != 0) {
            for(var i = 0; i < foodS; i++) {
                if(i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
    
  getFoodStock()
  {
    var foodStock = database.ref("food");
    foodStock.on("value",function(data){
      foodStock=data.val();
    })
  }

  updateFoodStock(foodS,lastFed){
    database.ref('/').update({
      food:foodS,lastFed:lastFed
    });
  }

  deductFood(foodS)
  {
    if(keyDown==="space")
    {
      foodS-=1
    }
  }
};