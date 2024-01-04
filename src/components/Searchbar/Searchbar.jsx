import { useState } from 'react';
import {
  SearchBarWrapper,
  SearchForm,
  SearchButton,
  FormInput,
} from './Searchbar.styled';

export const SearchBar = ({onSubmit}) => {

  const [query, setQuery] = useState('');

  const handleSearchQueryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return;
    }
    
    onSubmit(query);
  };

    return (
      <SearchBarWrapper direction="horizontal" className="justify-content-center mt-5">
        <SearchForm className="d-flex" onSubmit={handleSubmit}>
        <SearchButton type="submit">
            <span>Search</span>
          </SearchButton>

          <FormInput
            name="query"
            className="me-auto"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleSearchQueryChange}
            value={query}
          />
          
        </SearchForm>
      </SearchBarWrapper>
    );
  }
