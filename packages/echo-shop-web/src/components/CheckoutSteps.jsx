import React from 'react';
import PropsType from 'prop-types';

const CheckoutSteps = ({ device, step1, step2, step3, step4 }) => (
  <div className={`checkout-steps ${device}`}>
    <div className={step1 ? 'active' : ''}>Signin</div>
    <div className={step2 ? 'active' : ''}>Shipping</div>
    <div className={step3 ? 'active' : ''}>Payment</div>
    <div className={step4 ? 'active' : ''}>Place Order</div>
  </div>
);

CheckoutSteps.propTypes = {
  device: PropsType.string,
  step1: PropsType.bool,
  step2: PropsType.bool,
  step3: PropsType.bool,
  step4: PropsType.bool,
};

CheckoutSteps.defaultProps = {
  device: 'pc',
  step1: false,
  step2: false,
  step3: false,
  step4: false,
};

export default CheckoutSteps;
