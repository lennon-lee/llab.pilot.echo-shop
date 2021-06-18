import PropTypes from 'prop-types';
import './Product.scss';

const Product = ({ id, src, name, brand, price }) => (
  <div className="product">
    <div className="product-cover">
      <img
        style={{ width: `263px`, height: `356px`}}
        src={ src }
        alt="product"
      />
    </div>
    <div className="product-wrap">
      <div className="product-name">{ name }</div>
      <div className="product-brand">{ brand }</div>
      <div className="product-buy">
        <div className="product-buy-price">${ price }</div>
        <div className="product-buy-button">BUY NOW</div>
      </div>
    </div>
  </div>
);

Product.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.number
};

Product.defaultProps = {
}

export default Product;