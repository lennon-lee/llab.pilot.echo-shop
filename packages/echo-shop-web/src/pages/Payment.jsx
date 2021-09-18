import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Payment = ({ device }) => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const history = useHistory();

  const submitHandler = e => {
    e.preventDefault(); // ignore submit
    console.log(paymentMethod);
    history.push('/placeOrder');
  };

  return (
    <section className={`payment ${device}`}>
      <form onSubmit={submitHandler} className="payment-form">
        <div>
          <h2>Payment</h2>
        </div>
        {/* PaymentMethod */}
        <div className="row">
          <input
            type="radio"
            name="paymentMethod"
            id="paymentMethod"
            value="paypal"
            checked
            onChange={e => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paymentMethod">Paypal</label>
        </div>

        {/* Submit */}
        <div>
          <button type="submit" className="button primary">
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

Payment.propTypes = {
  device: PropTypes.string,
};

Payment.defaultProps = {
  device: 'pc',
};

export default Payment;
