import React, { useState, useEffect } from 'react';

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

const CreditCardForm = () => {
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

  useEffect(() => {
    if (cardNumber !== '') {
      setIsValid(isValidCard(cardNumber));
    }
  }, [cardNumber]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="card-form">
        <label>
          Credit Card Number:
          <input className = "card-input"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </label>
        <button type="submit" className="validate-button">Validate</button>
      </form>
      {cardNumber !== '' && isValid === false && (
        <div className="validation-message invalid-message">Invalid card number.</div>
      )}
      {isValid && (
        <div className="validation-message valid-message">Valid card number.</div>
      )}
    </div>
  );
};

export default CreditCardForm;
