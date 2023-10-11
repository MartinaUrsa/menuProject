const menu = [
    {
        id: 1,
        title: 'Hotcakes',
        category: ['Breakfast'],
        price: 15.99,
        img: './img/hotcakes.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, tempora reprehenderit? Quidem eaque id, deleniti dolores dolor fugit aliquam ex sapiente unde.'
    },
    {
        id: 2,
        title: 'Ensalada',
        category: ['Lunch'],
        price: 17.99,
        img: './img/salad.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, tempora reprehenderit? Quidem eaque id, deleniti dolores dolor fugit aliquam ex sapiente unde.'
    },
    {
        id: 3,
        title: 'Café + croissant',
        category: ['Breakfast', 'Combo'],
        price: 10,
        img: './img/cafe-croissant.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, tempora reprehenderit? Quidem eaque id, deleniti dolores dolor fugit aliquam ex sapiente unde.'
    },
    {
        id: 4,
        title: 'Milanesa',
        category: ['Lunch'],
        price: 17.99,
        img: './img/milanesa.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, tempora reprehenderit? Quidem eaque id, deleniti dolores dolor fugit aliquam ex sapiente unde.'
    },
];

const menuItemsContainer = document.querySelector('.menu-items-container');
const filterBtnsContainer = document.querySelector(".btn-container");

// Load menu items
window.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menu);
    filterCategories();
});

function displayMenuItems(menuItems) {
    let displayMenu = menuItems.map((item) => {
        // Pido que me devuelva un array displayMenu donde c/elemento sea un bloque de código HTML 👇🏼
        return `<div class="menu-item">
<img src=${item.img} alt="">
<div class="item-info">
    <div class="item-header">
        <h4>${item.title}</h4>
        <h4 class="price">$${item.price}</h4>
    </div>
    <p class="item-text">${item.description}</p>
</div>
</div>`;
    });
    // Ahora necesito que este array sea un string, para después poder agregarlo al innerHTML del padre
    displayMenu = displayMenu.join("");
    menuItemsContainer.innerHTML = displayMenu;
}


function filterCategories() {
    let categories = [];

    // Recorro el array 'menu'
    menu.forEach((item) => {
        // Recorro los arrays 'categories' dentro del array 'menu', e incluyo los elementos de cada array a 'categories'
        (item.category).forEach((category) => {
            categories.push(category);
        });
    });
    
    // Filtro el array 'categories' para eliminar las categorías repetidas
    const filteredCategories = categories.reduce((values, category) => {
        if(!values.includes(category)) {
            values.push(category)
        }
        return values;
    },['All'])

    const categoryBtns = filteredCategories.map((category) => {
        return `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`
    }).join("");
    filterBtnsContainer.innerHTML = categoryBtns;

    const filterBtns = document.querySelectorAll(".filter-btn");

    // Filter menu items
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let btnCategory = (e.currentTarget.dataset.id);
            if(btnCategory === 'All') {
                displayMenuItems(menu);
            } 
            else {
                const filteredMenuItems = menu.filter((menuItem) => menuItem.category.includes(btnCategory));
                displayMenuItems(filteredMenuItems);
            };
        });
    });
};