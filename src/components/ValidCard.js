import React, { useState } from 'react';

export default function ValidCard() {
  const isValidCard = (cardNumber) => {
    const digits = cardNumber.toString().split('').map(Number);

    let sum = 0;
    let isSecondDigit = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];

      if (isSecondDigit) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isSecondDigit = !isSecondDigit;
    }

    return sum % 10 === 0;
  };

  const [cardNumber, setCardNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidCard(cardNumber)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  
  return (
    <div>
      <form onSubmit={handleSubmit} className="card-form">
        <label>
          Credit Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="card-input"
          />
        </label>
        <button type="submit" className="validate-button">Validate</button>
      </form>
      {isValid && <p className="valid-message">Valid card number.</p>}
      {!isValid && cardNumber !== '' && (
        <p className="invalid-message">Invalid card number.</p>
      )}
    </div>
  );
}