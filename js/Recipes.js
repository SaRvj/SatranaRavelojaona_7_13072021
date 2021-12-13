import { capitalizeFirstLetter } from "./functions.js";

class FormattedRecipes {
    constructor(recipes) {
        this.id = recipes.map((recipes) => recipes.id);
        this.ingredientsFormatted = recipes.map((recipes) => recipes.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase()));
        this.nameFormatted = recipes.map((recipes) => recipes.name.toLowerCase());
        this.descriptionFormatted = recipes.map((recipes) => recipes.description.toLowerCase());
    }
}

export class Recipes {
    constructor(recipesArr) {
        this.recipesList = recipesArr; //toutes les recettes
        this.filteredRecipes = this.recipesList; //toutes les recettes filtrées
        this.filteredIngredientsTags = [];
        this.filteredApplianceTags = [];
        this.filteredUstensilsTags = [];
        this.currentInput;
        this.mainSearchContent;
        this.selectedTags = { ingredients: [], appliances: [], ustensils: [] };
    }
}