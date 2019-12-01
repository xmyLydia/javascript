import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import {elements, renderLoader, clearLoader} from "./views/base";

/* Global state of the app
    Search object
    current recipe object
    shopping list object
    liked recipes
*/
const state = {};
 
//search controller
const controlSearch= async ()=>{
    //get the query from view
    const query = searchView.getInput();


    if(query){
        //new Search object and add to state
        state.search = new Search(query);
        //Prepare UI for result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //search for recipes
        try{
            await state.search.getResults();

            //render result on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }catch(error){
            alert('error processing search');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');

    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
         
    }
});

//Recipe controller
const controlRecipe=async ()=>{
    //get the id from url
    const id = window.location.hash.replace('#','');
   
    if(id){
        recipeView.clearRecipe();
        //prepare UI
        renderLoader(elements.recipe);
        if(state.search)searchView.highlightSelected(id);
        //create new recipe
        state.recipe = new Recipe(id);

        //get recipe data and parse ingredient
        try{
            await state.recipe.getRecipe();

            state.recipe.parseIngredients();
            //calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
            

        }catch(error){
            console.log(error);
            alert('error processing recipe');
        }

    }
};

['hashchange', 'load'].forEach(event=>window.addEventListener(event, controlRecipe));

//List controller
const controlList = ()=>{
    //create a new list if there is none yet
    if(!state.list)state.list = new List();
    //Add each ingredient to the list
    state.recipe.ingredients.forEach(el=>{
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
}

//Like controller
 
const controlLike=()=>{
    if(!state.likes){
        state.likes = new Likes();
    }
    const currentId = state.recipe.id;
    //user not like yet current recipe
    //add like to state
    if(!state.likes.isLiked(currentId)){
        const newLike = 
              state.likes.addLike(currentId,
                                  state.recipe.title,
                                  state.recipe.author,
                                  state.recipe.img);
        likesView.renderLike(newLike);

        //toggle the like button
        likesView.toggleLikeBtn(true);
        //add like to UI
    }else{//user has liked current recipe
        //remove like to state
        state.likes.deleteLike(currentId);
        
        //toggle the like button
        likesView.toggleLikeBtn(false);
        //remove like to UI
        likesView.deleteLike(currentId);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

//handle the delete and update list item events
elements.shopping.addEventListener('click', e=>{ 
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //handle the delete
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //delete from state
        state.list.deleteItem(id);
        //delete from UI
        listView.deleteItem(id);
    }else if(e.target.matches('.shopping__count-value')){
        //handle update count
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id,val);
    }
});

//restore liked recipes on page load
window.addEventListener('load', ()=>{
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    //render existing likes
    state.likes.likes.forEach(like=>{
        likesView.renderLike(like);
    })
})

//Handling the recipe button clicks
elements.recipe.addEventListener('click', e=>{
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        //decrease button is clicked
        if(state.recipe.servings>1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        //increase button is clicked
        if(state.recipe.servings>1){
            state.recipe.updateServings('inc');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();   
    }else if(e.target.matches(".recipe__love, .recipe__love *")){
        //like controller
        controlLike();
    }

});

