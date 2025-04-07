const menuItens = Array.from(document.getElementsByClassName("menu__list__item"))
const menuCategories = document.getElementById("menu-categories")

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
    departamentsStruct = {
        departament1: defaultMenuCategories,
        departament2: defaultMenuCategories,
        departament3: defaultMenuCategories,
        departament4: defaultMenuCategories,
        departament5: defaultMenuCategories,
        departament6: defaultMenuCategories,
        departament7: defaultMenuCategories,
        departament8: defaultMenuCategories,
        departament9: defaultMenuCategories,
        departament10: defaultMenuCategories,
    }
    
    selectedDepartament = "departament1"

    setSelectedDepartament(item) {
        this.selectedDepartament = item
    }

    getDepartamentStruct() {
        return this.departamentsStruct[this.selectedDepartament]
    }
}


function renderCategories(menu) {
    const categoriesHTML = Object.entries(menu.getDepartamentStruct()).reduce((acc, [key, value])=>{
        const itens = value.reduce((acc, item) => {
            return acc + `<li>${item.name}</li>`
        }, "")

        return acc + `
            <div class="col menu__category">
                <h4 class="menu__title">${key}</h4>
                <ul class="menu__list">
                    ${itens}
                </ul>
            </div>
        `
    }, "")

    menuCategories.innerHTML = categoriesHTML
}

const menu = new Menu()
renderCategories(menu)

menuItens.forEach(menuItem => {
    console.log(menuItem)
    menuItem.addEventListener("click", (e) => {
        menuItens.forEach(element => {
            element.classList.remove("--selected")
        });

        menuItem.classList.add("--selected")
    })
});