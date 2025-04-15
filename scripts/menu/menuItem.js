/**
 * @param {{href: string, name: string}} param
 * @returns string
 */

export function menuItem({href, name}){
    return `<li><a class="menu__category__link" href="${href}">${name}</a></li>`
}