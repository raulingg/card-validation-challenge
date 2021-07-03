const validator = {
  isValid(cardNumber) {
    const numbers = Array.from(cardNumber).map(Number);
    console.log(numbers);

    // Step 2: double all digits which are in even positions
    const doubledNumbers = numbers.map((digit, idx) =>
      idx % 2 == 0 ? digit * 2 : digit
    );
    console.log(doubledNumbers);

    // Step 3: sum the digits of all numbers, from previous step, greater than 9
    const nextNumbers = doubledNumbers.map((number) =>
      number > 9 ? 1 + (number % 10) : number
    );
    console.log(nextNumbers);

    // Step 4: Sum all the final digits
    const sum = nextNumbers.reduce((sum, number) => number + sum, 0);

    console.log(sum);
    // Step 5: Check if the last digit of the sum is 0
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
};

export default validator;
