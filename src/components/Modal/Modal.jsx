import PropTypes from 'prop-types';
import { useEffect } from 'react';

import css from './Modal.module.css';

export const Modal = ({ closeModal, largeImageURL, tags }) => {
  useEffect(() => {
    const handleKeyDown = ev => {
      if (ev.key === 'Escape') {
        closeModal('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleOverlayClick = ev => {
    if (ev.target === ev.currentTarget) {
      closeModal('');
    }
  };

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <img src={largeImageURL} alt={tags} className={css.Modal} />
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
