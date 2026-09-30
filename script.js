// ================================
// SUPABASE
// ================================

const SUPABASE_URL =
    "https://kmxpwdgenkhqyhnjjfzf.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_UpAW1S3BKBNGGrlUCB_EvA_BwwDhBbF";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("Supabase conectado!");


// ================================
// CARRINHO
// ================================

const cart = document.getElementById("cart");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let productsInCart = [];


// ABRIR CARRINHO

cartButton.addEventListener("click", () => {

    cart.classList.add("open");

});


// FECHAR CARRINHO

closeCart.addEventListener("click", () => {

    cart.classList.remove("open");

});


// ================================
// ADICIONAR PRODUTO
// ================================

const addButtons = document.querySelectorAll(".quick-add");

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        const name = card.dataset.name;

        const priceElement = card.querySelector(".product-info strong");

        const priceText = priceElement.textContent
            .replace("R$", "")
            .replace(".", "")
            .replace(",", ".")
            .trim();

        const price = Number(priceText);


        productsInCart.push({
            name: name,
            price: price
        });


        updateCart();

        cart.classList.add("open");

    });

});


// ================================
// ATUALIZAR CARRINHO
// ================================

function updateCart() {

    cartCount.textContent = productsInCart.length;


    if (productsInCart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>
        `;

        cartTotal.textContent = "R$ 0,00";

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    productsInCart.forEach((product, index) => {

        total += product.price;


        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div>

                <strong>
                    ${product.name}
                </strong>

                <p>
                    R$ ${product.price
                        .toFixed(2)
                        .replace(".", ",")}
                </p>

            </div>

            <button onclick="removeProduct(${index})">
                ✕
            </button>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

}


// ================================
// REMOVER PRODUTO
// ================================

function removeProduct(index) {

    productsInCart.splice(index, 1);

    updateCart();

}


// ================================
// FILTRO DE PRODUTOS
// ================================

const filters = document.querySelectorAll(".filter");

const productCards =
    document.querySelectorAll(".product-card");


filters.forEach((filter) => {

    filter.addEventListener("click", () => {

        filters.forEach((item) => {

            item.classList.remove("active");

        });


        filter.classList.add("active");


        const category =
            filter.dataset.category;


        productCards.forEach((card) => {

            if (
                category === "todos" ||
                card.dataset.category === category
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// ================================
// PESQUISA
// ================================

const searchButton =
    document.getElementById("searchButton");

const searchBox =
    document.getElementById("searchBox");

const searchInput =
    document.getElementById("searchInput");


searchButton.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {

        searchInput.focus();

    }

});


searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase();


    productCards.forEach((card) => {

        const name =
            card.dataset.name.toLowerCase();


        if (name.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});


// ================================
// FINALIZAR COMPRA
// ================================

const checkoutButton =
    document.getElementById("checkoutButton");


checkoutButton.addEventListener("click", () => {

    if (productsInCart.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }


    alert(
        "Checkout da M7Store em desenvolvimento! 🚀"
    );

});

console.log("M7Store: script.js carregado!");
console.log("Supabase:", supabase);
