import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current Recipe object
 * - Shopping List object
 * - Liked Recipes
 *  */
const state = {};

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
    // 1- Get query from the view
    const query = searchView.getInput();

    if (query){
        // 2- New search object and add to the state
        state.search = new Search(query);
        
        // 3- Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            // 4- Search for recipes
            await state.search.getResults();
    
            // 5- Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(error){
            console.log(error);
            alert('Error controlSearch() !!!! :(');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
    // Get the ID from the URL
    const id = window.location.hash.replace('#','');
    console.log(id);

    if(id){
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight select search item
        if(state.search) searchView.highlightSelected(id);

        // Create new Recipe object
        state.recipe = new Recipe(id);

        try{
            // Get Recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render Recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            
        } catch(error){
            console.log(error);
            alert('Error controlRecipe() !!!! :(')
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));