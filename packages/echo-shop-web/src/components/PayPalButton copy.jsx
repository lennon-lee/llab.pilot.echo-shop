import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import axios from 'axios';

const PayPalButton = props => {
  const [isReadySdk, setReadySdk] = useState(false);

  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: props.amount,
          },
        },
      ],
    });
  const onApprove = (data, actions) =>
    actions.order
      .capture()
      .then(details => props.onSuccess(data, details))
      .catch(err => console.error(err));

  const addPaypalSdk = async () => {
    const result = await axios.get('/api/config/paypal');
    const clientID = result.data;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
    script.async = true;
    script.onload = () => {
      setReadySdk(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalSdk();
    }
  }, []);

  if (!isReadySdk) {
    return <div>Loading...</div>;
  }

  const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

  return (
    <Button
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

PayPalButton.propTypes = {
  amount: PropTypes.number,
  onSuccess: PropTypes.func,
};

PayPalButton.defaultProps = {
  amount: 0,
  onSuccess: () => {},
};

export default PayPalButton;
