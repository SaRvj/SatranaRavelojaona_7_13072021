import { capitalizeFirstLetter } from "./function.js";

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

    mainSearch(word) {
        let recipestmp = [];
        for (let i = 0; i < this.recipesList.length; i++) {
            let recipetmp = this.recipesList[i];
            if (
                recipetmp.name.toLowerCase().includes(word.toLowerCase()) ||
                recipetmp.description.toLowerCase().includes(word.toLowerCase())
            ) {
            recipestmp.push(recipetmp);
            } else {
                const ingredientofrecipe = recipetmp.ingredients;
                for (let j = 0; j < ingredientofrecipe.length; j++) {
                    let ingredienttmp = ingredientofrecipe[j];
                        if (
                        ingredienttmp.ingredient.toLowerCase().includes(word.toLowerCase())
                    ) {
                        recipestmp.push(recipetmp);
                        j = ingredientofrecipe.length;
                    }
                }
            }
        }
        this.filteredRecipes = recipestmp;
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
                        if (
                        !this.filteredIngredientsTags.includes(
                            ingredient.ingredient.toLowerCase()
                        ) &&
                        ingredient.ingredient.toLowerCase().includes(userSearch)
                        ) {
                            this.filteredIngredientsTags.push(
                                ingredient.ingredient.toLowerCase()
                            );
                        }
                    } else {
                        if (
                            !this.filteredIngredientsTags.includes(
                                ingredient.ingredient.toLowerCase()
                            )
                        ) {
                            this.filteredIngredientsTags.push(
                                ingredient.ingredient.toLowerCase()
                            );
                        }
                    }
                });
            });
        }
        if (this.currentInput == "appliance") {
            this.filteredRecipes.map((recipes) => {
                if (userSearch != undefined) {
                    if (
                        !this.filteredApplianceTags.includes(
                        recipes.appliance.toLowerCase()
                        ) &&
                        recipes.appliance.toLowerCase().includes(userSearch)
                    ) {
                        this.filteredApplianceTags.push(recipes.appliance.toLowerCase());
                    }
                } else {
                    if (
                        !this.filteredApplianceTags.includes(
                        recipes.appliance.toLowerCase()
                        )
                    ) {
                        this.filteredApplianceTags.push(recipes.appliance.toLowerCase());
                    }
                }
            });
        }
        if (this.currentInput == "ustensils") {
            this.filteredRecipes.map((recipes) => {
                recipes.ustensils.map((ustensil) => {
                    if (userSearch != undefined) {
                        if (
                        !this.filteredUstensilsTags.includes(ustensil.toLowerCase()) &&
                        ustensil.toLowerCase().includes(userSearch)
                        ) {
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
    //afficher les recettes
    diplayRecipes(filteredRecipes) {
        let recipesCards = document.querySelector("#recipes");
        recipesCards.innerHTML = "";
        recipesCards.innerHTML += `
            ${filteredRecipes
              .map(
                (recipe) => `
                <div class="col-12 col-md-6 col-xl-4">
                <div class="card">
                <div class="card__picture"></div>
                <div class="card__informations pt-4 p-3 ">
                <div class="d-flex justify-content-between card__header mb-4">
                <div class="card__title">${recipe.name}</div>
                <div class="card__duration"> 
                <img class="logo" src="./images/timer.svg" alt="Recipe duration" />
                ${recipe.time} min
                </div>
                </div>
                <div class="d-flex justify-content-between card__description">
                <ul class="card__ingredients">
                
                ${recipe.ingredients
                  .map(
                    (ingredient) => `
                    <li class="d-flex flex-wrap">
                    <p class="card__ingredients__name "> ${
                      ingredient.ingredient
                    } </p>  
                    <div class="d-flex ">
                    ${
                      ingredient.quantity
                        ? `<p class="card__ingredients__quantity"> : ${ingredient.quantity} </p>`
                        : ""
                    }
                   
                    ${
                      ingredient.unit
                        ? ` <p class="card__ingredients__unit">    ${ingredient.unit}  </p>`
                        : ""
                    } 
                    </div>                  
                    </li>
                    `
                  )
                  .join("")}
                    </ul>
                    <div class="card__instructions">
                    <p class="card__instructions_text">
                    ${recipe.description}
                    </p>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    `
              )
              .join("")}`;
        if (filteredRecipes.length == 0) {
          recipesCards.innerHTML += `
          <div class="col-12 mt-5 card__empty"> Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc.</div>
          `;
        }
      }
      displayListOfTags(tagResultsList) {
        let resultListUl = tagResultsList;
        let tagsToHandle;
        if (this.currentInput == "ingredients")
          tagsToHandle = this.filteredIngredientsTags;
        if (this.currentInput == "appliance")
          tagsToHandle = this.filteredApplianceTags;
        if (this.currentInput == "ustensils")
          tagsToHandle = this.filteredUstensilsTags;
        resultListUl.innerHTML = "";
        tagsToHandle.forEach(
          (tag) =>
            (resultListUl.innerHTML += `
                 <li> ${capitalizeFirstLetter(tag)}</li>
                  `)
        );
      }
    
      clickOnTagsHandler(tagResultsList, userSearch) {
        tagResultsList.querySelectorAll("li").forEach((tagToAdd) => {
          tagToAdd.addEventListener("click", (e) => {
            if (
              this.currentInput == "ingredients" &&
              !this.selectedTags.ingredients.includes(
                e.target.textContent.toLowerCase().trim()
              )
            ) {
              this.selectedTags.ingredients.push(
                e.target.textContent.toLowerCase().trim()
              );
              this.filterRecipesAfterTagSelection(tagResultsList, userSearch);
            }
            if (
              this.currentInput == "appliance" &&
              !this.selectedTags.appliances.includes(
                e.target.textContent.toLowerCase().trim()
              )
            ) {
              this.selectedTags.appliances.push(
                e.target.textContent.toLowerCase().trim()
              );
              this.filterRecipesAfterTagSelection(tagResultsList, userSearch);
            }
            if (
              this.currentInput == "ustensils" &&
              !this.selectedTags.ustensils.includes(
                e.target.textContent.toLowerCase().trim()
              )
            ) {
              this.selectedTags.ustensils.push(
                e.target.textContent.toLowerCase().trim()
              );
              this.filterRecipesAfterTagSelection(tagResultsList, userSearch);
            }
            this.displayOrRemoveSelectedTags(tagResultsList);
          });
        });
      }
      filterRecipesAfterTagSelection(tagResultsList, userSearch) {
        let newArray = [];
        let arrOfRecipes;
        if (this.mainSearchContent != undefined) {
          this.mainSearch(this.mainSearchContent);
          if (userSearch != undefined) this.mainSearch(userSearch);
          arrOfRecipes = this.filteredRecipes;
        } else arrOfRecipes = this.recipesList;
    
        arrOfRecipes.filter((recipes) => {
          const filterRecipesByTags = (arr1, arr2) => {
            let ingredientsArray = [];
            let appliancesArray = [];
            for (let i in arr1.ingredients) {
              //Push des ingredients de chaque recette dans un tableau vide
              ingredientsArray.push(
                arr1.ingredients.map((ingredient) =>
                  ingredientsArray.push(ingredient.ingredient.toLowerCase())
                )
              );
            }
            for (let i in arr1.appliance) {
              //Push des appareils de chaque recette dans un tableau vide
              appliancesArray.push(arr1.appliance.toLowerCase());
            }
    
            const foundIngredients = arr2.ingredients.every(
              (elt) => ingredientsArray.indexOf(elt) >= 0
            );
            const foundAppliances = arr2.appliances.every(
              (elt) => appliancesArray.indexOf(elt) >= 0
            );
            const foundUstensils = arr2.ustensils.every((elt) => {
              const lowerCaseUstensils = arr1.ustensils.map((tag) =>
                tag.toLowerCase()
              );
              return lowerCaseUstensils.indexOf(elt.toLowerCase()) >= 0;
            });
    
            if (
              foundIngredients &&
              foundAppliances &&
              foundUstensils &&
              !newArray.includes(recipes)
            ) {
              newArray.push(recipes);
            }
          };
          filterRecipesByTags(recipes, this.selectedTags);
        });
        this.filteredRecipes = newArray;
        this.diplayRecipes(this.filteredRecipes);
        this.filterTagsResultList(this.currentInput, userSearch);
        this.displayListOfTags(tagResultsList);
        this.clickOnTagsHandler(tagResultsList);
      }
      displayOrRemoveSelectedTags(tagResultsList) {
        let selectTagsResultList = document.querySelector(".selected-tags");
        selectTagsResultList.innerHTML = "";
        this.selectedTags.ingredients.map((tag) => renderTags(tag, "ingredients"));
        this.selectedTags.appliances.map((tag) => renderTags(tag, "appliances"));
        this.selectedTags.ustensils.map((tag) => renderTags(tag, "ustensils"));
        function renderTags(tag, type) {
          selectTagsResultList.innerHTML += `<li class="p-3  selected-tags__${type}">${capitalizeFirstLetter(
            tag
          )}</li>`;
        }
    
        selectTagsResultList.querySelectorAll("li").forEach((tagToRemove) => {
          tagToRemove.addEventListener("click", () => {
            let indexOfTagToRemove;
            if (tagToRemove.classList.contains("selected-tags__ingredients")) {
              indexOfTagToRemove = this.selectedTags.ingredients.indexOf(
                tagToRemove.textContent.toLocaleLowerCase()
              );
              this.selectedTags.ingredients.splice(indexOfTagToRemove, 1);
            }
            if (tagToRemove.classList.contains("selected-tags__appliances")) {
              indexOfTagToRemove = this.selectedTags.appliances.indexOf(
                tagToRemove.textContent.toLocaleLowerCase()
              );
              this.selectedTags.appliances.splice(indexOfTagToRemove, 1);
            }
            if (tagToRemove.classList.contains("selected-tags__ustensils")) {
              indexOfTagToRemove = this.selectedTags.ustensils.indexOf(
                tagToRemove.textContent.toLocaleLowerCase()
              );
              this.selectedTags.ustensils.splice(indexOfTagToRemove, 1);
            }
    
            if (
              this.selectedTags.ingredients.length == 0 &&
              this.selectedTags.appliances.length == 0 &&
              this.selectedTags.ustensils.length == 0 &&
              this.mainSearchContent != undefined
            )
              this.mainSearch(this.mainSearchContent);
            else this.filterRecipesAfterTagSelection(tagResultsList);
    
            this.displayOrRemoveSelectedTags(tagResultsList);
          });
        });
      }
    }
    