import utils from "../modules/util.js";
import Recipe from "./recipes.js";

export default class FilterDropdown{
    constructor(type, items) {
        this.type = type;
        this.items = items;
        this.label = (type === "ingredient") ? "ingrédient" : type;
        this.tagList = [];
        this.create();

        FilterDropdown.instances = [...FilterDropdown.instances, this];
    }

    static instances = [];

    /**
     * mettre en place la vue du filtre "dropdown"
     */
    create = () => {
        // mettre en place le contenant
        let container = document.createElement('div');
        container.setAttribute('class', `dropdown-item dd-${this.type}`);
        container.setAttribute('data-state', 'close');

        // mettre en place le champ de recherche
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'dropdown-item__input');
        input.setAttribute('id', `${this.type}-input`);
        input.setAttribute('name', `${this.type}-input`);
        input.setAttribute('placeholder', `Rechercher un ${this.label}`);

            // ajouter un écouteur de saisie dans le champ de recherche
            input.addEventListener('input', this.search)

        // mettre en place le label
        let label = document.createElement('p');
        label.setAttribute('class', 'dropdown-item__label');
        label.innerText = `${this.label}s`;

        // mettre en place l'icon
        let icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-chevron-down dropdown-item__icon');
        this.closeIcon = icon;

        // mettre en place la liste d'élement
        let list = document.createElement('ul');
        list.setAttribute('class', `dropdown-item__list ${this.type}-dropdown`);

        // remplir la liste
        this.items.forEach(item => {
            list.appendChild(item.listElement());
            this.tagList = [...this.tagList, item];
        });

        // mettre en place et ajouter le message "Aucun filtre disponible"
        let emptyMsg = document.createElement('p');
        emptyMsg.setAttribute('class', 'empty-msg');
        emptyMsg.innerText = "Aucun filtre disponible";

        list.appendChild(emptyMsg);

        

        // ajouter les éléments créés dans le contenant
        container.appendChild(input);
        container.appendChild(label);
        container.appendChild(icon);
        container.appendChild(list);

        // ajouter l'écouteur de clique pour ouverture
        container.addEventListener('click', this.open)

        this.element = container;
    }

    /**
     * rechercher dans la liste de tags les tags correspondants à la saisie de l'utilisateur
     * @param {InputEvent} e 
     */
    search = (e) => {
        let content = e.target.value.toLowerCase();

        if (content.length >= 3 || (e.inputType === 'deleteContentBackward' && content.length >= 3)) {

            this.tagList.forEach(tag => {
                let str = tag.name.toLowerCase();
                if (str.includes(content)) {
                    tag.listElementRes.classList.remove('hidden-by-keydown');
                }else{
                    tag.listElementRes.classList.add('hidden-by-keydown');
                }
            })
        }else{
            this.tagList.forEach(tag => {
                tag.listElementRes.classList.remove('hidden-by-keydown');
            })
        }
    }

    /**
     * ouvrir le dropdown au clique de l'utilisateur
     * @param {PointerEvent} e 
     */
    open = (e) => {
        e.stopPropagation();
        
        FilterDropdown.instances.forEach(dropdown => {
            if (dropdown.element.getAttribute('data-state') === 'open' && dropdown.element !== this.element) {
                dropdown.element.setAttribute('data-state', 'close')
                document.removeEventListener('click', dropdown.close);
                dropdown.element.addEventListener('click', dropdown.open);
            }
        })

        if (this.element.getAttribute('data-state') === "close") {
            this.element.setAttribute('data-state', 'open');

            this.element.removeEventListener('click', this.open);
            document.addEventListener('click', this.close);
        }

    }

    /**
     * fermer le dropdown si l'utilisateur clique sur l'icon ou s'il clique en dehors de celui-ci
     * @param {PointerEvent} e 
     */
    close = (e) => {
        
        if (utils.clickOut(e.target, this.element) || e.target === this.closeIcon) {
            this.element.setAttribute('data-state', 'close');

            document.removeEventListener('click', this.close);
            this.element.addEventListener('click', this.open);
        }
    }

    /**
     * actualiser les listes de tags (dropdown ingrédients, appareils et ustensiles)
     */
    static updateDropDowns = () => {
        let lis = document.querySelectorAll('.dropdown-item__list li');
        lis.forEach(li => li.classList.add('hidden-by-tags'));

        let recipes = Recipe.instances.filter(recipe => recipe.visible );

        recipes.forEach(recipe => {
            let appareils = document.querySelectorAll(`.appareil-dropdown [data-value="${recipe.appareils}"]`);
            appareils.forEach(appareil => appareil.classList.remove('hidden-by-tags'));
        
            let ingredients = recipe.ingredients;
            ingredients.forEach(current => {
                let ingredientElement = document.querySelector(`.ingredient-dropdown [data-value="${current.ingredient.toLowerCase()}"]`);
                ingredientElement.classList.remove('hidden-by-tags');
            })

            let ustensils = recipe.ustensils;
            ustensils.forEach(current => {
                let ustensilElement = document.querySelector(`.ustensile-dropdown [data-value="${current.toLowerCase()}"]`);
                ustensilElement.classList.remove('hidden-by-tags');
            })

        })

        // ajouter l'exécution de la méthode 'showEmptyMessage' à la fin de la boucle d'evenement js
        setTimeout(() => {
            FilterDropdown.showEmptyMessage()  
        }, 0);
    }

    /**
     * afficher le message 'aucun filtre disponible' à l'utilisateur si besoin
     */
    static showEmptyMessage = () => {
        let ingredient = document.querySelectorAll('.ingredient-dropdown li:not(.hidden-by-tags):not(.already-selected)');
        let appareil = document.querySelectorAll('.appareil-dropdown li:not(.hidden-by-tags):not(.already-selected)');
        let ustensile = document.querySelectorAll('.ustensile-dropdown li:not(.hidden-by-tags):not(.already-selected)');

        if (appareil.length === 0) {
            document.querySelector('.appareil-dropdown .empty-msg').classList.add('visible');
        }else{
            document.querySelector('.appareil-dropdown .empty-msg').classList.remove('visible');
        }

        if (ingredient.length === 0) {
            document.querySelector('.ingredient-dropdown .empty-msg').classList.add('visible');
        }else{
            document.querySelector('.ingredient-dropdown .empty-msg').classList.remove('visible');
        }

        if (ustensile.length === 0) {
            document.querySelector('.ustensile-dropdown .empty-msg').classList.add('visible');
        }else{
            document.querySelector('.ustensile-dropdown .empty-msg').classList.remove('visible');
        }
    }
}