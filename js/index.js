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
