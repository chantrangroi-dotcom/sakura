let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    initProductButtons();
    initCheckoutButton();
});

// Thêm sự kiện cho nút "Mua ngay"
function initProductButtons() {
    const productCards = document.querySelectorAll(".card");

    productCards.forEach((card) => {
        const button = card.querySelector("button");
        
        button.addEventListener("click", () => {
            const productName = card.querySelector("h3").innerText;
            const productPriceText = card.querySelector(".price").innerText;
            const productPrice = parseInt(productPriceText.replace(/[^0-9]/g, ""));

            addToCart(productName, productPrice);
        });
    });
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    renderCart();
}

// Cập nhật giao diện giỏ hàng gộp chung một khối duy nhất
function renderCart() {
    const cartList = document.getElementById("cart-list");
    const totalElement = document.querySelector(".cart-total span:last-child");

    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = `<li style="justify-content: center; color: #aaa;">Giỏ hàng đang trống</li>`;
        if (totalElement) totalElement.innerText = "0đ";
        return;
    }

    let totalMoney = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalMoney += itemTotal;

        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${item.name}</strong> 
                <span style="color: #d88a3d; margin-left: 8px;">x${item.quantity}</span>
            </div>
            <div>
                <span>${itemTotal.toLocaleString('vi-VN')}đ</span>
                <button onclick="removeFromCart(${index})" style="background: none; color: #ff5252; padding: 0 0 0 10px; box-shadow: none; font-size: 13px;">Xóa</button>
            </div>
        `;
        cartList.appendChild(li);
    });

    if (totalElement) {
        totalElement.innerText = `${totalMoney.toLocaleString('vi-VN')}đ`;
    }
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    renderCart();
};

// Hàm xử lý khi bấm nút Thanh toán công cụ
function initCheckoutButton() {
    const checkoutBtn = document.querySelector(".btn-checkout");
    if (!checkoutBtn) return;

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Giỏ hàng đang trống. Vui lòng chọn nước uống trước nhé!");
            return;
        }

        const totalMoney = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`🎉 Thanh toán thành công!\nTổng tiền: ${totalMoney.toLocaleString('vi-VN')}đ\nCửa hàng đang chuẩn bị món cho bạn!`);

        cart = [];
        renderCart();
    });
}