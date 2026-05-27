const products = [
    {
        name: "Nike Air Max",
        price: 2500000,
        quantity: 0
    },

    {
        name: "Adidas UltraBoost",
        price: 3200000,
        quantity: 0
    },

    {
        name: "Puma RS-X",
        price: 1900000,
        quantity: 0
    }
];

/* format tiền */

function formatMoney(number){

    return number.toLocaleString('vi-VN') + "₫";

}

/* update từng card */

function updateUI(index){

    const quantityElement =
    document.getElementById(`quantity${index}`);

    const totalElement =
    document.getElementById(`total${index}`);

    quantityElement.innerText =
    products[index].quantity;

    const total =
    products[index].quantity *
    products[index].price;

    totalElement.innerText =
    formatMoney(total);

}

/* tăng */

function increase(index){

    products[index].quantity++;

    updateUI(index);

    buttonEffect(index, "plus");

}

/* giảm */

function decrease(index){

    if(products[index].quantity > 0){

        products[index].quantity--;

        updateUI(index);

        buttonEffect(index, "minus");

    }

}

/* hiệu ứng nút */

function buttonEffect(index, type){

    const buttons =
    document.querySelectorAll(".card");

    const card = buttons[index];

    if(type === "plus"){

        card.style.boxShadow =
        "0 0 40px rgba(34,197,94,0.6)";

    }
    else{

        card.style.boxShadow =
        "0 0 40px rgba(239,68,68,0.5)";

    }

    setTimeout(() => {

        card.style.boxShadow =
        `
        0 20px 60px rgba(0,0,0,0.45),
        inset 0 0 20px rgba(255,255,255,0.05)
        `;

    }, 250);

}

/* tổng tất cả */

function getGrandTotal(){

    let sum = 0;

    for(let i = 0; i < products.length; i++){

        sum +=
        products[i].quantity *
        products[i].price;

    }

    return sum;

}

/* update all */

function updateAll(){

    for(let i = 0; i < products.length; i++){

        updateUI(i);

    }

}

/* animation load */

window.onload = () => {

    updateAll();

    const cards =
    document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
        "translateY(60px)";

        setTimeout(() => {

            card.style.transition =
            "0.8s ease";

            card.style.opacity = "1";

            card.style.transform =
            "translateY(0px)";

        }, index * 200);

    });

};