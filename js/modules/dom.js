/**
 * ajouter un élément à la fin d'un autre élément
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
 const append = (element, target) => {
    target.appendChild(element);
}

/**
 * remplacer un élément par un autre élément
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
const replace = (element, target) => {
    target.parentNode.replaceChild(element, target);
}

/**
 * ajouter un élément avant un autre élément
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
const insertBefore = (element, target) => {
    target.parentNode.insertBefore(element, target);
}

/**
 * ajouter un élément après un autre élément
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
const insertAfter = (element, target) => {
    target.after(element);
}

/**
 * supprimer un élément du dom
 * @param {HTMLElement} element
 */
const remove = (element) => {
    element.parentNode.removeChild(element);
}

const dom = {
    append,
    replace,
    insertBefore,
    insertAfter,
    remove
}

export default dom;