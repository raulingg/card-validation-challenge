const validator = {
  isValid(cardNumber) {
    // Step 0: Starting at the rightmost side
    const numbers = Array.from(cardNumber).map(Number).reverse();

    // Step 1: double all digits which are in even positions
    const doubledNumbers = numbers.map((digit, idx) =>
      idx % 2 != 0 ? digit * 2 : digit
    );

    // Step 2: sum the digits of all numbers, from previous step, greater than 9
    const nextNumbers = doubledNumbers.map((number) =>
      number > 9 ? number - 9 : number
    );

    // Step 3: Sum all the final digits
    const sum = nextNumbers.reduce((sum, number) => number + sum, 0);

    // Step 4: Check if the last digit of the sum is 0
    return sum % 10 == 0;
  },
  maskify(cardNumber, maskCharacter = "#") {
    if (cardNumber.length > 4) {
      return (
        maskCharacter.repeat(cardNumber.length - 4) +
        cardNumber.slice(cardNumber.length - 4, cardNumber.length)
      );
    }

    return cardNumber;
  },
  getIssuer(cardNumber) {
    // ref: https://stevemorse.org/ssn/cc.html
    const rules = {
      visa: ["4"],
      mastercard: ["51", "52", "53", "54", "55"],
      "dinners-club": [
        "2014",
        "2149",
        "300",
        "301",
        "302",
        "303",
        "304",
        "305",
        "309",
        "36",
        "38",
        "39",
      ],
      "american-express": ["34", "37"],
      discover: ["6011"],
      jcb: ["1800", "3", "2131"],
    };
    const issuers = Object.keys(rules);

    return issuers.find((issuer) =>
      rules[issuer].some((rule) => cardNumber.startsWith(rule))
    );
  },
};

export default validator;
