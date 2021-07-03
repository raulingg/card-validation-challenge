import validator from "./validator.js";

const creditCardElement = document.getElementById("credit-card-input");
const maskedCreditCardElement = document.getElementById("masked-credit-card");

creditCardElement.addEventListener("keyup", function () {
  const cardNumber = creditCardElement.value;
  console.log(validator.isValid(cardNumber));
  maskedCreditCardElement.innerHTML = validator.maskify(cardNumber);
});
