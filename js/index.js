import { subject } from "./subject.js";
import { recipesArr } from "../data/recipes.js";
import { listOfInputs } from "./input.js";
import { Recipes } from "./Recipes.js";


let recipes;

export function loadScripts() {
    recipes = new Recipes(recipesArr);
    recipes.filterTagsResultList();
    recipes.diplayRecipes(recipes.filteredRecipes);
    listOfInputs.forEach((input) => {
        input.userSearchEventListener(recipes);
        input.openListOfTagsHandler(recipes);
    });
}

subject.subscribe(loadScripts);
subject.fire();
