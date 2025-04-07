const menuItens = Array.from(document.getElementsByClassName("menu__list__item"))
const menuCategories = document.getElementById("menu-categories")
const mainMenuToggleButton = document.getElementById("main_menu_toggle_bt")
const mainMenuElement = document.getElementById("main_menu")

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


class Menu {
    departmentsStruct = {
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
    
    selectedDepartment = "department1"
    isOpen = false

    toggle(){
        this.isOpen = !this.isOpen
        setElementVisible(mainMenuElement, !this.isOpen)
    }

    setSelectedDepartment(item) {
        this.selectedDepartment = item
        setActiveDepartmentStyle(this)
        renderCategories(this)
    }

    getDepartmentStruct() {
        return this.departmentsStruct[this.selectedDepartment]
    }
}


function renderCategories(menu) {
    const categoriesHTML = Object.entries(menu.getDepartmentStruct()).reduce((acc, [key, value])=>{
        const itens = value.reduce((acc, item) => {
            return acc + `<li>${item.name}</li>`
        }, "")

        return acc + `
            <div class="col menu__category">
                <h4 class="menu__title">${"Categoria"}</h4>
                <ul class="menu__list">
                    ${itens}
                </ul>
            </div>
        `
    }, "")

    menuCategories.innerHTML = categoriesHTML
}

function setActiveDepartmentStyle(menu){
    menuItens.forEach(menuItem => {
        menuItem.classList.remove("--selected")

        if(menuItem.getAttribute("id") === menu.selectedDepartment){
            menuItem.classList.add("--selected")
        }
    });
}

function setElementVisible(element, isVisible){
    if(isVisible) {

        element.classList.add("--hidden")
    } else {
        element.classList.remove("--hidden")
    }
}

const mainMenu = new Menu()
renderCategories(mainMenu)

menuItens.forEach(menuItem => {
    menuItem.addEventListener("click", (e) => {
        const selectedElement = e.currentTarget.getAttribute("id")
        mainMenu.setSelectedDepartment(selectedElement)
    })
});

mainMenuToggleButton.addEventListener("click", (e)=>{
    mainMenu.toggle()
})