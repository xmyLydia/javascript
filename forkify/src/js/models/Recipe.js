import axios from 'axios';
export default class Recipe{
    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }catch(error){
            console.log(error);
            alert('something went wrong :)');
        }
    }

    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }
    parseIngredients(){
        const newIngredients = this.ingredients.map(el=>{
            const unitsLong = ['tablespoons','tablespoon', 'ounces', 'ounce','teaspoon','teaspoons','cups','pounds'];
            const unitsShort = ['tbsp','tbsp','oz', 'oz','tsp','tsp','cup', 'pound'];
            const units = [...unitsShort,'kg','g'];
            //uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i)=>{
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            //remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            //parse ingredients into count, unit and ingredients
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2=>units.includes(el2));
            let objIng;
            if(unitIndex>-1){
                //there is a unit
                const arrCount = arrIng.slice(0, unitIndex);//4 1/2 cups, arrCount is [4, 1/2]
                let count;
                if(arrCount.length===1){
                    count = eval(arrIng[0].replace('-','+'));
                }else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    count,
                    unit:arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                }
            }else if(parseInt(arrIng[0], 10)){
                //there is no unit, but first element is number
                objIng={
                    count:parseInt(arrIng[0], 10),
                    unit:'',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }else if(unitIndex===-1){
                //there is no unit or number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type){
        //searvings
        const newServings =type === 'dec'? this.servings -1:this.servings +1;
        //ingredients
        this.ingredients.forEach(ing=>{
        ing.count  = ing.count * (newServings/ this.servings) ;
        });
        this.servings = newServings;
        }
}