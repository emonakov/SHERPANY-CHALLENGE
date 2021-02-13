import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';
import { TextInput } from 'grommet';
import { useDispatch } from 'react-redux';

import { clearSearch, usersSearch } from '../store';

const SearchElement = styled(TextInput)`
  font-size: 0.9rem;
  padding: 5px 10px;
`;
const Search: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
  });

  return (
    <DebounceInput
      a11yTitle="search user"
      element={SearchElement}
      placeholder="type here to search..."
      onChange={(e) => {
        if (e.target.value.length > 2) {
          dispatch(usersSearch(e.target.value));
        } else {
          dispatch(clearSearch());
        }
      }}
    />
  );
};

export default Search;
