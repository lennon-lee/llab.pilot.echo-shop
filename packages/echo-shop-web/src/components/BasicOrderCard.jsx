import React from 'react';
import PropType from 'prop-types';

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
  title: PropType.string,
  type: PropType.string,
  order: PropType.objectOf(PropType.any),
};

BasicOrderCard.defaultProps = {
  title: PropType.string,
  type: '',
  order: {},
};

export default BasicOrderCard;
