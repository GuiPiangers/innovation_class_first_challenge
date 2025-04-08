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
    #popover = null
    isOpen = false

    constructor(popover) {
        this.#popover = popover
    }
    
    toggle(){
        this.#setElementVisible(this.isOpen)
        this.isOpen = !this.isOpen
    }
    
    #setElementVisible(isVisible){
        if(isVisible) {
            this.#popover.classList.add("--hidden")
        } else {
            this.#popover.classList.remove("--hidden")
        }
    }
}

class MainMenu extends Menu {
    #departmentsStruct = {
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

    #menuCategories = null
    selectedDepartment = "department1"
    isOpen = false
    #menuItens = null

    constructor(popover) {
        super(popover)
        this.#menuCategories = popover.getElementsByClassName("menu__categories")[0]
        this.#renderCategories()
        
        const menuItens = Array.from(popover.getElementsByClassName("menu__list__item"))

        menuItens.forEach(menuItem => {
            menuItem.addEventListener("click", (e) => {
                const selectedElement = e.currentTarget.getAttribute("id")
                mainMenu.setSelectedDepartment(selectedElement)
            })
        });

        this.#menuItens = menuItens
    }

    setSelectedDepartment(item) {
        this.selectedDepartment = item
        this.#setActiveDepartmentStyle(this)
        this.#renderCategories()
    }


    #getDepartmentStruct() {
        return this.#departmentsStruct[this.selectedDepartment]
    }

    #renderCategories() {
        const categoriesHTML = Object.entries(this.#getDepartmentStruct()).reduce((acc, [key, value])=>{
            const itens = value.reduce((acc, item) => {
                return acc + `<li><a class="menu__category__link" href="${item.href}">${item.name}</a></li>`
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
    
        this.#menuCategories.innerHTML = categoriesHTML
    }
    #setActiveDepartmentStyle(menu){
        this.#menuItens.forEach(menuItem => {
            menuItem.classList.remove("--selected")
    
            if(menuItem.getAttribute("id") === menu.selectedDepartment){
                menuItem.classList.add("--selected")
            }
        });
    }
}

const mainMenu = new MainMenu(mainMenuElement)

mainMenuToggleButton.addEventListener("click", (e)=>{
    mainMenu.toggle()
})