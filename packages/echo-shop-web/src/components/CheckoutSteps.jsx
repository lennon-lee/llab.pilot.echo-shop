import React from 'react';
import PropType from 'prop-types';

const CheckoutSteps = ({ device, step1, step2, step3, step4 }) => (
  <div className={`checkout-steps ${device}`}>
    <div className={step1 ? 'active' : ''}>Signin</div>
    <div className={step2 ? 'active' : ''}>Shipping</div>
    <div className={step3 ? 'active' : ''}>Payment</div>
    <div className={step4 ? 'active' : ''}>Place Order</div>
  </div>
);

CheckoutSteps.propTypes = {
  device: PropType.string,
  step1: PropType.bool,
  step2: PropType.bool,
  step3: PropType.bool,
  step4: PropType.bool,
};

CheckoutSteps.defaultProps = {
  device: 'pc',
  step1: false,
  step2: false,
  step3: false,
  step4: false,
};

export default CheckoutSteps;
