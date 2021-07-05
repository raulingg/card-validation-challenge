import validator from "./validator.js";

const creditCardElement = document.getElementById("credit-card-input");
const maskedCreditCardElement = document.getElementById("masked-credit-card");
const validationResultElement = document.getElementById("validation-result");
const containerElement = document.getElementById("creditCardContainer");
let inFront = true;
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

containerElement.addEventListener("click", function () {
  const creditCardFrontElement = document.getElementById("creditCardFront");
  const creditCardBackElement = document.getElementById("creditCardBack");

  if (inFront) {
    creditCardFrontElement.style.transform = "rotateY(180deg)";
    creditCardBackElement.style.transform = "rotateY(0deg)";
    inFront = false;
  } else {
    creditCardFrontElement.style.transform = "rotateY(0deg)";
    creditCardBackElement.style.transform = "rotateY(180deg)";
    inFront = true;
  }
});
