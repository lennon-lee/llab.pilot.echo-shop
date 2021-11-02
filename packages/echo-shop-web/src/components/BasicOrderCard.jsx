import React from 'react';
import PropTypes from 'prop-types';

const BasicOrderCard = ({ title, type, order }) => {
  return (
    <div className="basic-order-card">
      {/* title */}
      <div>
        <h1>{title}</h1>
      </div>

      {/* shipping */}
      {type === 'shipping' && (
        <div>
          <span>{order.address}, </span>
          <span>{order.city}, </span>
          <span>{order.postalCode}, </span>
          <span>{order.country}</span>
        </div>
      )}

      {/* payment */}
      {type === 'payment' && <div>Payment Method: {order.paymentMethod}</div>}
    </div>
  );
};

BasicOrderCard.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  order: PropTypes.objectOf(PropTypes.any),
};

BasicOrderCard.defaultProps = {
  title: PropTypes.string,
  type: '',
  order: {},
};

export default BasicOrderCard;
