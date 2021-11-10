import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, max }) => {
  const iconElement = [];
  const refineValue = Math.round(value);

  for (let i = 0; i < refineValue; i += 1) {
    let element = <i className="fas fa-star yellow" />;
    if (i === refineValue - 1 && value % 1 !== 0) {
      element = <i className="fas fa-star-half-alt yellow" />;
    }
    iconElement.push({
      id: i,
      element,
    });
  }
  for (let i = 0; i < max - refineValue; i += 1) {
    iconElement.push({
      id: i + refineValue,
      element: <i className="far fa-star yellow" />,
    });
  }

  return (
    <div className="rating">
      {iconElement.map(item => (
        <span className="rating-icon" key={item.id}>
          {item.element}
        </span>
      ))}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
};

Rating.defaultProps = {
  value: 1,
  max: 5,
};

export default Rating;
