import validator from "./validator.js";

const formElement = document.querySelector(".form");
const cvvInput = document.getElementById("cvv");
const maskedCreditCardElement = document.getElementById("masked-credit-card");
const validationResultElement = document.getElementById("validation-result");
const cardIssuerIconElement = document.querySelector(".cardIssuerIcon");

let creditCardInFront = true;

const behaviorsFns = {
  focusSibling(e) {
    const siblingId = e.target.dataset.focusSibling;
    document.getElementById(siblingId).focus();
  },
  flipCard() {
    const creditCardFrontElement = document.getElementById("creditCardFront");
    const creditCardBackElement = document.getElementById("creditCardBack");

    if (creditCardInFront) {
      creditCardFrontElement.style.transform = "rotateY(180deg)";
      creditCardBackElement.style.transform = "rotateY(0deg)";
      creditCardInFront = false;
    } else {
      creditCardFrontElement.style.transform = "rotateY(0deg)";
      creditCardBackElement.style.transform = "rotateY(180deg)";
      creditCardInFront = true;
    }
  },
  validAndMaskify(e) {
    const cardNumber = e.target.value;

    if (validator.isValid(cardNumber)) {
      validationResultElement.innerHTML = "Credit card is valid";
      validationResultElement.style.color = "green";
    } else {
      validationResultElement.innerHTML = "credit card is invalid";
      validationResultElement.style.color = "red";
    }
    maskedCreditCardElement.innerHTML = validator.maskify(cardNumber);
  },
  showCardIssuerIcon(e) {
    const issuer = validator.getIssuer(e.target.value);

    if (issuer) {
      cardIssuerIconElement.className = `cardIssuerIcon ${issuer}Icon`;
    }
  },
};

formElement.addEventListener("keyup", function (e) {
  const { behavior } = e.target.dataset;

  if (e.target.id === "number") {
    behaviorsFns.showCardIssuerIcon(e);
  }

  if (
    "focusSibling" === behavior &&
    e.target.value.length === e.target.maxLength
  ) {
    behaviorsFns.focusSibling(e);
  }

  if (
    "validAndMaskify" === behavior &&
    e.target.value.length >= e.target.minLength
  ) {
    behaviorsFns.validAndMaskify(e);
  }
});

cvvInput.addEventListener("focusin", behaviorsFns.flipCard);
cvvInput.addEventListener("focusout", behaviorsFns.flipCard);
