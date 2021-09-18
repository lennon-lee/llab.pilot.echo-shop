import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { saveShipping } from '../actions/cartActions';
import CheckoutStpes from '../components/CheckoutSteps';

const Shipping = ({ device }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  };

  const validate = values => {
    const errors = {};

    if (!values.address) {
      errors.address = 'Addres is required';
    }

    if (!values.city) {
      errors.city = 'City is required';
    }

    if (!values.postalCode) {
      errors.postalCode = 'Postal Code is required';
    }

    if (!values.country) {
      errors.country = 'Country is required';
    }

    return errors;
  };

  const submitHandler = values => {
    dispatch(saveShipping(values));
    history.push('/payment');
  };

  return (
    <section className={`shipping ${device}`}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={submitHandler}
      >
        {formik => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty,
          } = formik;
          return (
            <>
              <CheckoutStpes />
              <form onSubmit={handleSubmit} className="shipping-form">
                <div>
                  <h2>Shipping</h2>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address">Address</label>
                  <input
                    value={values.address}
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.address && touched.address ? 'input-error' : null
                    }
                  />

                  {errors.address && touched.address && (
                    <span className="error">{errors.address}</span>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city">City</label>
                  <input
                    value={values.city}
                    type="text"
                    name="city"
                    id="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.city && touched.city ? 'input-error' : null
                    }
                  />

                  {errors.city && touched.city && (
                    <span className="error">{errors.city}</span>
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    value={values.postalCode}
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.postalCode && touched.postalCode
                        ? 'input-error'
                        : null
                    }
                  />

                  {errors.postalCode && touched.postalCode && (
                    <span className="error">{errors.postalCode}</span>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country">Country</label>
                  <input
                    value={values.country}
                    type="text"
                    name="country"
                    id="country"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.country && touched.country ? 'input-error' : null
                    }
                  />

                  {errors.country && touched.country && (
                    <span className="error">{errors.country}</span>
                  )}
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    className={
                      !(dirty && isValid) ? 'button disabled' : 'button primary'
                    }
                    disabled={!(dirty && isValid)}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </>
          );
        }}
      </Formik>
    </section>
  );
};

Shipping.propTypes = {
  device: PropTypes.string,
};

Shipping.defaultProps = {
  device: 'pc',
};

export default Shipping;
