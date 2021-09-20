import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const Payment = ({ device }) => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = e => {
    e.preventDefault(); // ignore submit
    dispatch(savePayment({ paymentMethod }));
    history.push('/placeOrder');
  };

  return (
    <section className={`payment ${device}`}>
      <CheckoutSteps device={device} step1 step2 step3 />
      <form onSubmit={submitHandler} className={`payment-form ${device}`}>
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
