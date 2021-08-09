import validator from "./validator.js";

const formElement = document.querySelector("form");
const cvvInput = document.getElementById("cvv");
const maskedCreditCardElement = document.getElementById("masked-credit-card");
const cardIssuerIconElements = document.querySelectorAll(".cardIssuerIcon");
const cardNumberElement = document.getElementById("number");

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
    maskedCreditCardElement.innerHTML = validator.maskify(cardNumber);

    const issuer = validator.getIssuer(cardNumber);
    const valid = validator.isValid(cardNumber);

    if (!valid || !issuer) {
      cardNumberElement.className = "invalid";
      cardIssuerIconElements.forEach((el) => (el.innerHTML = ""));
      return;
    }

    if (valid && issuer) {
      cardNumberElement.className = "valid";
      const imageTemplate = `<img data-issuer="${issuer}" src="./assets/issuers/${issuer}.svg" />`;
      cardIssuerIconElements.forEach((el) => {
        if (el.dataset.issuer != issuer) {
          el.innerHTML = imageTemplate;
        }
      });
      document.getElementById("month").focus();
    }
  },
};

formElement.addEventListener("focusout", function (e) {
  e.stopPropagation();

  if (e.target.id == "number") return;

  const element =
    e.target.id == "month" || e.target.id == "year"
      ? document.querySelector(".expirationInput")
      : e.target;

  if (!e.target.checkValidity()) {
    element.classList.add("invalid");
    element.classList.remove("valid");
  } else {
    element.classList.add("valid");
    element.classList.remove("invalid");
  }
});

formElement.addEventListener("input", function (e) {
  const { behavior } = e.target.dataset;

  if (e.target.id != "name" && isNaN(Number(e.target.value))) {
    e.target.value = e.target.value.replace(/[^\d]+/, "");
    return;
  }

  if (!e.target.checkValidity()) {
    return;
  }

  if ("focusSibling" === behavior) {
    behaviorsFns.focusSibling(e);
  }

  if ("validAndMaskify" === behavior) {
    behaviorsFns.validAndMaskify(e);
  }
});

cvvInput.addEventListener("focusin", behaviorsFns.flipCard);
cvvInput.addEventListener("focusout", behaviorsFns.flipCard);
