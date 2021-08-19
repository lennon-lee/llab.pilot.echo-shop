import {
  CART_ADD_ITEM,
  // CART_REMOVE_ITEM,
  // CART_SAVE_SHIPPING,
  // CART_SAVE_PAYMENT,
} from '../constants/cartConstants';

const cartReducer = (
  state = { cartItems: [], shipping: {}, payment: {} },
  action,
) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const product = state.cartItems.find(x => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.find(x =>
            x.product === product.product ? item : x,
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    }
    default:
      return state;
  }
};

export default cartReducer;
