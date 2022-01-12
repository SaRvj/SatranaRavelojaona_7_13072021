import { subject } from "./subject.js";
import { recipesArr } from "../data/recipes.js";
import { listOfInputs } from "./input.js";
import { Recipes } from "./Recipes.js";


let recipes;
//chargement recettes
export function loadScripts() {
    recipes = new Recipes(recipesArr);
    recipes.filterTagsResultList();
    recipes.displayRecipes(recipes.filteredRecipes);
    listOfInputs.forEach((input) => {
        input.userSearchEventListener(recipes);
        input.openListOfTagsHandler(recipes);
    });
}

subject.subscribe(loadScripts);
subject.fire();
