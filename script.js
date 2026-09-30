// ================================
// CARRINHO DA M7STORE
// ================================

const cart = document.getElementById("cart");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartDiscount = document.getElementById("cartDiscount");
const cartTotal = document.getElementById("cartTotal");
const discountRow = document.getElementById("discountRow");

const couponInput = document.getElementById("couponInput");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const couponMessage = document.getElementById("couponMessage");

let productsInCart = [];

// Cupons cadastrados
const VALID_COUPONS = {
    "M7STORE10": { type: "percentage", value: 10, label: "10% OFF" },
    "PRIMEIRACOMPRA": { type: "percentage", value: 15, label: "15% OFF" },
    "M7VIP": { type: "fixed", value: 20, label: "R$ 20,00 OFF" }
};

let appliedCoupon = null;


// ================================
// ABRIR CARRINHO
// ================================

cartButton.addEventListener("click", () => {
    cart.classList.add("open");
});


// ================================
// FECHAR CARRINHO
// ================================

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

        if (!card) return;

        const name = card.dataset.name;

        const priceElement =
            card.querySelector(".product-info strong");

        if (!priceElement) return;

        const priceText = priceElement.textContent
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim();

        const price = Number(priceText);

        if (!name || !Number.isFinite(price)) {
            alert("Não foi possível adicionar este produto.");
            return;
        }

       const existingProduct = productsInCart.find((p) => p.name === name);

if (existingProduct) {
    existingProduct.quantity += 1;
} else {
    productsInCart.push({
        name: name,
        price: price,
        quantity: 1
    });
}

         // Alterar quantidade (+ e -)
function changeQuantity(index, delta) {
    if (!productsInCart[index]) return;
    productsInCart[index].quantity += delta;

    if (productsInCart[index].quantity <= 0) {
        productsInCart.splice(index, 1);
    }
    updateCart();
}

// Sistema de Cupom
applyCouponBtn.addEventListener("click", applyCoupon);
couponInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") applyCoupon();
});

function applyCoupon() {
    const code = couponInput.value.trim().toUpperCase();
    if (!code) return showCouponMessage("Digite um cupom válido.", "error");

    if (VALID_COUPONS[code]) {
        appliedCoupon = { code: code, ...VALID_COUPONS[code] };
        couponInput.value = "";
        showCouponMessage(`Cupom ${code} aplicado com sucesso!`, "success");
        updateCart();
    } else {
        showCouponMessage("Cupom inválido ou expirado.", "error");
    }
}

function removeCoupon() {
    appliedCoupon = null;
    couponMessage.innerHTML = "";
    updateCart();
}

function showCouponMessage(text, type) {
    if (type === "success") {
        couponMessage.className = "coupon-message success";
        couponMessage.innerHTML = `
            <span>${text}</span>
            <button type="button" onclick="removeCoupon()" class="remove-coupon-btn">Remover</button>
        `;
    } else {
        couponMessage.className = "coupon-message error";
        couponMessage.textContent = text;
    }
}



        updateCart();

        cart.classList.add("open");
    });

});


// ================================
// ATUALIZAR CARRINHO
// ================================

function updateCart() {
    const totalItemsCount = productsInCart.reduce((sum, p) => sum + p.quantity, 0);
    cartCount.textContent = totalItemsCount;

    if (productsInCart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">Seu carrinho está vazio.</p>`;
        cartSubtotal.textContent = "R$ 0,00";
        cartTotal.textContent = "R$ 0,00";
        discountRow.style.display = "none";
        return;
    }

    cartItems.innerHTML = "";
    let subtotal = 0;

    productsInCart.forEach((product, index) => {
        const itemSubtotal = product.price * product.quantity;
        subtotal += itemSubtotal;

        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <div class="cart-item-details">
                <strong>${product.name}</strong>
                <p>R$ ${product.price.toFixed(2).replace(".", ",")} un.</p>
            </div>

            <div class="cart-item-actions">
                <div class="qty-controls">
                    <button type="button" class="qty-btn" onclick="changeQuantity(${index}, -1)">-</button>
                    <span class="qty-number">${product.quantity}</span>
                    <button type="button" class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
                </div>

                <div class="cart-item-price">
                    <strong>R$ ${itemSubtotal.toFixed(2).replace(".", ",")}</strong>
                </div>

                <button type="button" class="delete-btn" onclick="removeProduct(${index})">✕</button>
            </div>
        `;

        cartItems.appendChild(item);
    });

    let discountAmount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.type === "percentage") {
            discountAmount = (subtotal * appliedCoupon.value) / 100;
        } else if (appliedCoupon.type === "fixed") {
            discountAmount = appliedCoupon.value;
        }
        if (discountAmount > subtotal) discountAmount = subtotal;
    }

    const finalTotal = subtotal - discountAmount;

    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;

    if (discountAmount > 0) {
        discountRow.style.display = "flex";
        cartDiscount.textContent = `-R$ ${discountAmount.toFixed(2).replace(".", ",")}`;
    } else {
        discountRow.style.display = "none";
    }

    cartTotal.textContent = `R$ ${finalTotal.toFixed(2).replace(".", ",")}`;
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

const filters =
    document.querySelectorAll(".filter");

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

    if (
        searchBox.classList.contains("active")
    ) {

        searchInput.focus();

    }

});


searchInput.addEventListener("input", () => {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

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
// WHATSAPP
// ================================

checkoutButton.addEventListener("click", () => {
    if (productsInCart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let subtotal = 0;

    const productLines = productsInCart.map((product) => {
        const itemSubtotal = product.price * product.quantity;
        subtotal += itemSubtotal;
        return `• *${product.quantity}x* ${product.name}\n  _R$ ${product.price.toFixed(2).replace(".", ",")} un._ ➔ *R$ ${itemSubtotal.toFixed(2).replace(".", ",")}*`;
    });

    let discountAmount = 0;
    let couponText = "Nenhum cupom aplicado";

    if (appliedCoupon) {
        if (appliedCoupon.type === "percentage") {
            discountAmount = (subtotal * appliedCoupon.value) / 100;
        } else if (appliedCoupon.type === "fixed") {
            discountAmount = appliedCoupon.value;
        }
        if (discountAmount > subtotal) discountAmount = subtotal;

        couponText = `\`${appliedCoupon.code}\` (${appliedCoupon.label})`;
    }

    const total = subtotal - discountAmount;

    // Mensagem estilo Embed do Discord
    let message = `🛍️ *M7STORE — NOVO PEDIDO*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📋 *ITENS DO PEDIDO:*\n\n`;
    message += `${productLines.join("\n\n")}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💵 *RESUMO FINANCEIRO:*\n`;
    message += `• *Subtotal:* R$ ${subtotal.toFixed(2).replace(".", ",")}\n`;
    message += `🎟️ *Cupom:* ${couponText}\n`;

    if (discountAmount > 0) {
        message += `💰 *Desconto:* -R$ ${discountAmount.toFixed(2).replace(".", ",")}\n`;
    }

    message += `🔥 *TOTAL A PAGAR:* *R$ ${total.toFixed(2).replace(".", ",")}*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📍 *Aguardando confirmação para envio!*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5532998048061?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
});


});


// ================================
// INICIAR CARRINHO
// ================================

updateCart();
