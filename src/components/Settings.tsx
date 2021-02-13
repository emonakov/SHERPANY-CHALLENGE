import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, FormField, Select } from 'grommet';
import { useQueryClient } from 'react-query';

import { selectNat, setNat, clearUsers } from '../store';

const Settings: FC = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const nat = useSelector(selectNat);
  const options = String(process.env.REACT_APP_NAT_SETTINGS_SELECT).split(',');

  const onNatChange = (e: { option: string }) => {
    if (e.option !== nat) {
      dispatch(setNat(e.option));
      queryClient.resetQueries('users');
      dispatch(clearUsers());
    }
  };

  return (
    <Box height="100%" pad="large" background="dark-1">
      <Heading level={3}>Settings</Heading>
      <FormField label="Nationality" name="nat">
        <Select
          name="nat"
          options={options}
          value={nat}
          onChange={onNatChange}
          a11yTitle="Select nationality to search"
        />
      </FormField>
    </Box>
  );
};

export default Settings;
