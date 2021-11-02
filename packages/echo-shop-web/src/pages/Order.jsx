import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailOrder, payOrder } from '../actions/orderActions';

import BasicOrderCard from '../components/BasicOrderCard';
import ShoppingCart from '../components/ShoppingCart';
import PayPalButton from '../components/PayPalButton';

const Order = ({ device }) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    if (successPay) {
      history.push('/profile');
    }
    dispatch(detailOrder(id));
  }, [successPay]);

  const orderDetail = useSelector(state => state.orderDetail);
  const { loading, order, error } = orderDetail;

  const handlePay = paymentResult => {
    dispatch(payOrder(order, paymentResult));
  };

  return (
    <section className={`order ${device}`}>
      {loading ? <div>Loading...</div> : <div>{error}</div>}
      {order && (
        <>
          <div className="order-form">
            <BasicOrderCard
              title="Shipping"
              type="shipping"
              order={order.shipping}
            />
            <BasicOrderCard
              title="payment"
              type="payment"
              order={order.payment}
            />
            <ShoppingCart device={device} cartItems={order.orderItems} />
          </div>
          <div className="order-form-buy">
            {/* Payment */}
            {loadingPay && <div>Finishing Payment...</div>}
            {!order.isPaid && (
              <div>
                <PayPalButton amount={order.totalPrice} onSuccess={handlePay} />
              </div>
            )}

            {/* Order Summary */}
            <div className="order-form-buy-title">Order Summary</div>
            <div className="order-form-buy-summary">
              <div className="order-form-buy-summary-name">
                <div>Items</div>
                <div>Shipping</div>
                <div>Tax</div>
                <div className="total">Order Total</div>
              </div>
              <div className="order-form-buy-summary-value">
                <div>${order.itemsPrice}</div>
                <div>${order.shippingPrice}</div>
                <div>${order.taxPrice}</div>
                <div className="total">${order.totalPrice}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

Order.propTypes = {
  device: PropTypes.string,
};

Order.defaultProps = {
  device: 'pc',
};

export default Order;
