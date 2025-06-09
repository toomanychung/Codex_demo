const drinks = [
    { id: 1, name: '紅茶', price: 30 },
    { id: 2, name: '綠茶', price: 35 },
    { id: 3, name: '奶茶', price: 45 }
];

const toppings = [
    { id: 'boba', name: '波霸', price: 10 },
    { id: 'pudding', name: '布丁', price: 15 },
    { id: 'coconut', name: '椰果', price: 10 }
];

const cart = [];

function createDrinkItem(drink) {
    const container = document.createElement('div');
    container.className = 'drink';

    const title = document.createElement('h3');
    title.textContent = `${drink.name} - $${drink.price}`;

    const toppingContainer = document.createElement('div');
    toppings.forEach(t => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = t.id;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(`${t.name} +$${t.price}`));
        toppingContainer.appendChild(label);
    });

    const addBtn = document.createElement('button');
    addBtn.textContent = '加入購物車';
    addBtn.onclick = () => {
        const selectedToppings = Array.from(toppingContainer.querySelectorAll("input:checked")).map(c => c.value);
        cart.push({ drinkId: drink.id, toppings: selectedToppings });
        updateCart();
        toppingContainer.querySelectorAll("input").forEach(i => (i.checked = false));
    };

    container.appendChild(title);
    container.appendChild(toppingContainer);
    container.appendChild(addBtn);
    return container;
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach(item => {
        const drink = drinks.find(d => d.id === item.drinkId);
        const li = document.createElement('li');
        li.className = 'cart-item';
        const toppingNames = item.toppings.map(id => toppings.find(t => t.id === id).name);
        li.textContent = `${drink.name} (${toppingNames.join(', ')})`;
        cartList.appendChild(li);
    });
}

function init() {
    const list = document.getElementById('drink-list');
    drinks.forEach(d => list.appendChild(createDrinkItem(d)));
}

window.onload = init;
