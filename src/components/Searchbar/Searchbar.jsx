import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar= ({onSubmit}) =>{
  const [search, setSearch] = useState('');
  

 const  onChangeHandler = ev => {
    setSearch(ev.target.value );
  };

  const onSubmitHandler = ev => {
    ev.preventDefault();
    if (!search.trim()) {
      return alert('You need to put something for search...');
    }
    onSubmit(search);
  };

 return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onSubmitHandler}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={onChangeHandler}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
