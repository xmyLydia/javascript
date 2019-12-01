import Search from './models/Search';
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import {elements, renderLoader, clearLoader} from "./views/base";
import Recipe from './models/Recipe';
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
        console.log(goToPage);
    }
});

//Recipe controller
const controlRecipe=async ()=>{
    //get the id from url
    const id = window.location.hash.replace('#','');
    console.log(id);
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
            recipeView.renderRecipe(state.recipe);
            console.log(state.recipe);
           
        }catch(error){
            alert('error processing recipe');
        }

    }
};

['hashchange', 'load'].forEach(event=>window.addEventListener(event, controlRecipe));