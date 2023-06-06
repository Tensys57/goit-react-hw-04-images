import PropTypes from 'prop-types';

import css from './Button.module.css';

export const Button = ({ handleClick }) => (
  <button type="button" className={css.Button} onClick={handleClick}>
    Load more...
  </button>
);

Button.propType = {
  handleClick: PropTypes.func.isRequired,
};
