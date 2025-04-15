import { DepartmentMenu, renderDepartmentsMenusAndTriggers } from "./departmentMenu.js"
import { MainMenu } from "./mainMenu.js"
import { MobileMenu } from "./mobileMenu.js"

const popoverMenuContainer = document.querySelector('[data-menu="popover_container"]')
const mainMenuToggleButton = document.getElementById("main_menu_toggle_bt")
const mainMenuElement = document.getElementById("main_menu")
const mobilePopover = document.querySelector('[data-menu="mobile"]')
const mobileTrigger = document.querySelector('[data-toggle="mobile-menu"]')

const defaultMenuCategories = {
    subcategory1: [
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
    ],
    subcategory2: [
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
    ],
    subcategory3: [
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
        {
            href: "/",
            name: "Categoria"
        },
    ],
}

const departmentStruct = {
    department1: defaultMenuCategories,
    department2: defaultMenuCategories,
    department3: defaultMenuCategories,
    department4: defaultMenuCategories,
    department5: defaultMenuCategories,
    department6: defaultMenuCategories,
    department7: defaultMenuCategories,
    department8: defaultMenuCategories,
    department9: defaultMenuCategories,
    department10: defaultMenuCategories
}

function renderMenus(){
    renderDepartmentsMenusAndTriggers(popoverMenuContainer)

    new MainMenu(mainMenuElement, mainMenuToggleButton, departmentStruct)

    const departmentToggleMenuButtons = Array.from(document.querySelectorAll('[data-toggle="department"]'))
    
    departmentToggleMenuButtons.forEach((toggleButton, index) => {
            const departmentMenuElements = Array.from(document.querySelectorAll(`[data-menu="department_popover"]`))

        new DepartmentMenu(departmentMenuElements[index], toggleButton, defaultMenuCategories)
    })


    const mobileMenu = new MobileMenu(mobilePopover, mobileTrigger)

    mobileMenu.renderPopover(departmentStruct)
}

renderMenus()