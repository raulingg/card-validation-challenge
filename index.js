import validator from "./validator.js";

const creditCardElement = document.getElementById("credit-card-input");
const maskedCreditCardElement = document.getElementById("masked-credit-card");
const validationResultElement = document.getElementById("validation-result");

creditCardElement.addEventListener("keyup", function () {
  const cardNumber = creditCardElement.value;

  if (validator.isValid(cardNumber)) {
    validationResultElement.innerHTML = "Credit card is valid";
    validationResultElement.style.color = "green";
  } else {
    validationResultElement.innerHTML = "credit card is invalid";
    validationResultElement.style.color = "red";
  }

  maskedCreditCardElement.innerHTML = validator.maskify(cardNumber);
});
