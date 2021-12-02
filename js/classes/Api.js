/**
 * classe qui simule une api, une fois l'api créée celle-ci devrait être modifiée pour la mise en production
 */
 export default class Api{

    static recipes = [];
    static allIngredients = [];
    static allAppliances = [];
    static allUstensils = [];

    /**
     * simuler une connection à une base de donnée avec un fichier json
     */
    static init = async () => {
        const req = await fetch('./recipes.json');
        if (!req.ok) {
            throw "Données momentanément indisponible";
        }
        const data = await req.json();
        Api.recipes = data.recipes;
    }

    /**
     * recueillir tous les ingrédients de toutes les recettes
     * @returns {array} ce tableau contient tous les ingrédients de toutes les recettes
     */
    static getAllIngredients = () => {

        if (Api.allIngredients.length === 0) {
            Api.recipes.forEach(recipe => {
                recipe.ingredients.map( ingredients => {
                    const ingredient =  ingredients.ingredient;

                    if (!Api.allIngredients.includes(ingredient.toLowerCase())) {
                        Api.allIngredients = [...Api.allIngredients, ingredient.toLowerCase()];
                    }
                })
            })
        }

        return Api.allIngredients;
    }

    /**
     * recueillir tous les appareils de toutes les recettes
     * @returns {array} ce tableau contient tous les appareils de toutes les recettes
     */
    static getAllAppliances = () => {

        if (Api.allAppliances.length === 0) {
            Api.recipes.forEach(recipe => {
                if (!Api.allAppliances.includes(recipe.appliance.toLowerCase())) {
                    Api.allAppliances = [...Api.allAppliances, recipe.appliance.toLowerCase()];
                }
            })
        }

        return Api.allAppliances;
    }

    /**
     * recueillir tous les ustensiles de toutes les recettes
     * @returns {array} ce tableau contient tous les ustensiles de toutes les recettes
     */
    static getAllUstensils = () => {
        if (Api.allUstensils.length === 0) {
            Api.recipes.forEach(recipe => {
                recipe.ustensils.map( ustensile => {

                    if (!Api.allUstensils.includes(ustensile.toLowerCase())) {
                        Api.allUstensils = [...Api.allUstensils, ustensile.toLowerCase()];
                    }
                })
            })
        }

        return Api.allUstensils;
    }

    /**
     * recueillir toutes les recettes existantes
     */
    static getAllRecipes = () => {
        return Api.recipes;
    }

    /**
     * recueillir une recette avec son id
     * @param {number} id 
     * @returns {object} cet objet contient tous les détails de la recette
     */
    static getRecipe = (id) => {
        const recipe = Api.recipes.filter(recipe => recipe.id === id);

        if (recipe.length !== 1) {
            console.error("Recette introuvable.");
            return;
        }
        return recipe[0];
    }
}