const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange rates and update the DOM

function cal() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
     .then(res => res.json())
     .then(data => {
        const rate = data.rates[currency_two];

        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two} `;

        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
     });
}

function swapping () {
  const temp = currencyEl_one.value;
  currencyEl_one.value =currencyEl_two.value;
  currencyEl_two.value = temp;
  cal();
}

//Event Listeners
currencyEl_one.addEventListener('change', cal);
amountEl_one.addEventListener('input', cal);
currencyEl_two.addEventListener('change', cal);
amountEl_two.addEventListener('input', cal);

swap.addEventListener('click', swapping);

cal();