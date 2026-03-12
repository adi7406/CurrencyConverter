const URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/usd.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    convert();
});


for (let select of dropdowns) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name ==="from" && code === "USD"){
            newOption.selected = true;
        }else if(select.name === "to" && code === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }
}

dropdowns.forEach(select => {
    select.addEventListener("change", e => {
        updateFlag(e.target);
    });
});

const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
}

btn.addEventListener("click", e => {
    e.preventDefault();
    
    convert();
});


async function convert() {
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    if(amt === "" || amt <= 0){
        amt = 1;
        amount.value = "1";
    }
    let fromCurrency = document.querySelector(".from select").value.toLowerCase();
    let toCurrency = document.querySelector(".to select").value.toLowerCase();
    let res = await fetch(`https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`);
    let data = await res.json();
    console.log(data);
    let rate = data[fromCurrency][toCurrency];
    console.log(rate);
    let convertedAmount = (amt * rate).toFixed(2);
    msg.innerText = `${amt} ${fromCurrency.toUpperCase()} = ${convertedAmount} ${toCurrency.toUpperCase()}`;
}
