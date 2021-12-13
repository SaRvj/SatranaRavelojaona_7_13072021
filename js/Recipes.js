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

    mainSearch(userSearch) {
        const formattedRecipes = new FormattedRecipes(this.recipesList);
        let filteredIdRecipes = [];
        for (let i in formattedRecipes.ingredientsFormatted) {
            if (formattedRecipes.ingredientsFormatted[i].includes(userSearch) || formattedRecipes.nameFormatted[i].includes(userSearch) || formattedRecipes.descriptionFormatted[i].includes(userSearch)) {
                filteredIdRecipes.push(formattedRecipes.id[i]);
            }
        }
        this.filteredRecipes = this.recipesList.filter((recipe) => {
            return filteredIdRecipes.includes(recipe.id);
        });
    
        this.diplayRecipes(this.filteredRecipes);
    }

    filterTagsResultList(currentInput, userSearch) {
        this.filteredIngredientsTags = [];
        this.filteredApplianceTags = [];
        this.filteredUstensilsTags = [];
        if (currentInput != undefined) this.currentInput = currentInput;
        if (this.currentInput == "ingredients") {
            this.filteredRecipes.map((recipes) => {
                recipes.ingredients.map((ingredient) => {
                    if (userSearch != undefined) {
                        if (!this.filteredIngredientsTags.includes(ingredient.ingredient.toLowerCase()) && ingredient.ingredient.toLowerCase().includes(userSearch)) {
                            this.filteredIngredientsTags.push(ingredient.ingredient.toLowerCase());
                        }
                    } else {
                        if (!this.filteredIngredientsTags.includes(ingredient.ingredient.toLowerCase())) {
                            this.filteredIngredientsTags.push(ingredient.ingredient.toLowerCase());
                        }
                    }
                });
            });
        }
        if (this.currentInput == "appliance") {
            this.filteredRecipes.map((recipes) => {
                if (userSearch != undefined) {
                    if (!this.filteredApplianceTags.includes(recipes.appliance.toLowerCase()) && recipes.appliance.toLowerCase().includes(userSearch)) {
                        this.filteredApplianceTags.push(recipes.appliance.toLowerCase());
                    }
                } else {
                    if (!this.filteredApplianceTags.includes(recipes.appliance.toLowerCase())) {
                        this.filteredApplianceTags.push(recipes.appliance.toLowerCase());
                    }
                }
            });
        }
        if (this.currentInput == "ustensils") {
            this.filteredRecipes.map((recipes) => {
                recipes.ustensils.map((ustensil) => {
                    if (userSearch != undefined) {
                        if (!this.filteredUstensilsTags.includes(ustensil.toLowerCase()) && ustensil.toLowerCase().includes(userSearch)) {
                            this.filteredUstensilsTags.push(ustensil.toLowerCase());
                        }
                    } else {
                        if (!this.filteredUstensilsTags.includes(ustensil.toLowerCase())) {
                            this.filteredUstensilsTags.push(ustensil.toLowerCase());
                        }
                    }
                });
            });
        }
    }
}