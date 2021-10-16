import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailOrder, payOrder } from '../actions/orderActions';

import BasicOrderCard from '../components/BasicOrderCard';
import ShoppingCart from '../components/ShoppingCart';

const Order = ({ device }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailOrder(id));
  }, []);

  const orderDetail = useSelector(state => state.orderDetail);
  const { loading, order, error } = orderDetail;
  console.log(order);

  // TODO: Payment 버튼생성 및 프로세스 진행 후 결과 값 전달 확인
  const handlePay = paymentResult => {
    console.log(paymentResult);
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
            <div>
              <button type="button" onClick={handlePay}>
                Paypal
              </button>
            </div>

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
