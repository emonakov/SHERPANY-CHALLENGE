import { FC } from 'react';
import { grommet, Box, Button, Grommet, Anchor, Text } from 'grommet';

const App: FC = () => {
  return (
    <Grommet full theme={grommet}>
      <Box
        direction="row-responsive"
        justify="center"
        align="center"
        pad="xlarge"
        background="dark-2"
        gap="medium"
      >
        <Box
          pad="large"
          align="center"
          background={{ color: 'light-2', opacity: 'strong' }}
          round
          gap="small"
        >
          <Text>TEST 1</Text>
          <Anchor href="" label="Link" />
          <Button label="Button" />
        </Box>
        <Box pad="large" align="center" background="dark-3" round gap="small">
          <Text>TEST 2</Text>
          <Anchor href="" label="Link" />
          <Button label="Button" />
        </Box>
      </Box>
    </Grommet>
  );
};

export default App;
