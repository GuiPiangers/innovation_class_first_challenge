import { menuItem } from "./menuItem.js"

/**
 * @param {string} categoryName 
 * @param {{href: string, name: string}[]} itens
 */
export function menuCategory(categoryName, itens){
    const itensHTML = itens.reduce((acc, item) => {
        return acc + menuItem({href: item.href, name: item.name})
    }, "")

    return `
        <div class="col menu__category">
            <h4 class="menu__title">${"Categoria"}</h4>
            <ul class="menu__list">
                ${itensHTML}
            </ul>
        </div>
    `
}