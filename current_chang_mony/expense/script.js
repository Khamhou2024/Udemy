const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dataTransaction = [
  { id: 1, text: "Pocket money", amount: +100 },
  { id: 2, text: "Roome rates", amount: -3000 },
  { id: 3, text: "salary", amount: +180000 },
  { id: 4, text: "sale", amount: -500 },
];

let transactions = [];

function init() {
  list.innerHTML = "";
  transactions.forEach(addDataTolist);
  calculateMoney();
}

function addDataTolist(transactions) {
  const symbol = transactions.amount < 0 ? "-" : "+";

  const status = transactions.amount < 0 ? "minus" : "plus";
  const item = document.createElement("li");
  result = numberWithCommas(Math.abs(transactions.amount));
  item.classList.add(status);
  item.innerHTML = `${transactions.text}<span>${symbol}
  ${result}
  </span>
  <button class="delete-btn" onclick="removeData(${transactions.id})">X</button>`;
  list.appendChild(item);
}

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function autoID() {
  return Math.floor(Math.random() * 1000000);
}

function calculateMoney() {
  const amounts = transactions.map((transactions) => transactions.amount);
  const total = amounts
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  const expense = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  balance.innerText = `฿` + numberWithCommas(total);
  money_plus.innerText = `฿` + numberWithCommas(income);
  money_minus.innerText = `฿` + numberWithCommas(expense);
}

function removeData(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  init();
}

function adtransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please Enter information");
  } else {
    const data = {
      id: autoID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(data);
    addDataTolist(data);
    calculateMoney();
    text.value = "";
    amount.value = "";
  }
}

form.addEventListener("submit", adtransaction);
init();

// const datatransactions = dataTransaction;

// function init() {
//   datatransactions.forEach(addDataTolist);
// }

// function addDataTolist(datatransactions) {
//   const symbol = datatransactions.amount < 0 ? "-" : "+";
//   const status = datatransactions.amount < 0 ? "minus" : "plus";
//   const item = document.createElement("li");
//   item.innerHTML = `${datatransactions.text}<span>${symbol}${Math.abs(
//     datatransactions.amount
//   )}</span><button class="delete-btn">X</button>`;
//   list.appendChild(item);
//   item.classList.add(status);
// }

// init();
