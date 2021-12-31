import { subject } from "./subject.js";
import { loadScripts } from "./index.js";
import { developTagsSearchResults, shrinkTagsSearchResults } from "./function.js";

class Input {
    constructor(type) {
        this.inputType = type;
        if (this.inputType == "mainSearch") {
            this.inputDOM = document.querySelector(".search");
        }
        if (this.inputType == "ingredients") {
            this.inputDOM = document.querySelector(".search__ingredients ");
            this.tagResultsList = document.querySelector(".ingredients__results");
        }
        if (this.inputType == "appliance") {
            this.inputDOM = document.querySelector(".search__appareils ");
            this.tagResultsList = document.querySelector(".appliance__results");
        }
        if (this.inputType == "ustensils") {
            this.inputDOM = document.querySelector(".search__ustensiles ");
            this.tagResultsList = document.querySelector(".ustensils__results");
        }
    }

    
    userSearchEventListener(recipesObj) {
        this.inputDOM.addEventListener("keyup", (e) => {
            subject.unsubscribe(loadScripts);
            let userSearch = e.target.value.toLowerCase();
            //recherche principale
            if (this.inputType == "mainSearch") {
                recipesObj.mainSearchContent = userSearch;
                recipesObj.currentInput = "ingredients";
                recipesObj.filterRecipesAfterTagSelection(listOfInputs[0].tagResultsList, userSearch);
                recipesObj.currentInput = "appliance";
                recipesObj.filterRecipesAfterTagSelection(listOfInputs[1].tagResultsList, userSearch);
                recipesObj.currentInput = "ustensils";
                recipesObj.filterRecipesAfterTagSelection(listOfInputs[2].tagResultsList, userSearch);

                if (userSearch.length >= 3 && recipesObj.selectedTags.ingredients == 0 && recipesObj.selectedTags.appliances == 0 && recipesObj.selectedTags.ustensils == 0) {
                    console.time('algo1')
                    recipesObj.mainSearch(userSearch);
                }
                if (recipesObj.selectedTags.ingredients.length == 0 && recipesObj.selectedTags.appliances.length == 0 && recipesObj.selectedTags.ustensils.length == 0 && userSearch.length < 3) {
                    recipesObj.displayRecipes(recipesObj.recipesList);
                }
                if (userSearch.length < 3) recipesObj.mainSearchContent = "";
            }
            //inputs scondaires
            else {
                developTagsSearchResults(listOfInputs, this, recipesObj);
                recipesObj.filterTagsResultList(this.inputType, userSearch);
                recipesObj.displayListOfTags(this.tagResultsList);
                recipesObj.clickOnTagsHandler(this.tagResultsList, userSearch);
            }
        });
    }

    openListOfTagsHandler(recipesObj) {
        if (this.inputType != "mainSearch") {
            //cliquer sur la flèche fermée pour ouvrir
            this.inputDOM.nextElementSibling.addEventListener("click", () => {
                developTagsSearchResults(listOfInputs, this, recipesObj);
            });
            //cliquer sur la flèche ouverte pour fermer
            this.inputDOM.nextElementSibling.nextElementSibling.addEventListener("click", () => {
                shrinkTagsSearchResults(this);
            });
            //cliquer sur un autre élément de la page pour fermer
            window.addEventListener("click", (e) => {
                if (!e.target.classList.contains("secondary-search") && !e.target.classList.contains("closed-search") && !e.target.classList.contains("opened-search")) {
                shrinkTagsSearchResults(this);
                }
            });
        }
    }
}

class InputFactory {
    constructor() {
        this.create = (type) => {
            return new Input(type);
        };
    }
}

export const listOfInputs = [];
const inputFactory = new InputFactory();

//création des objets pour les 3 inputs secondaires
listOfInputs.push(inputFactory.create("ingredients"));
listOfInputs.push(inputFactory.create("appliance"));
listOfInputs.push(inputFactory.create("ustensils"));
listOfInputs.push(inputFactory.create("mainSearch"));
