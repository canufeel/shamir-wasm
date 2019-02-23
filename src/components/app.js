import React from 'react';
import { Grommet, Box, Grid, Text } from 'grommet';
import SplitContainer from './split-container';
import RestoreContainer from './restore-container';

const App = ({

}) => (
  <Grommet theme={{
    grid: {
      extend: () => ({
        'min-height': '800px'
      })
    }
  }}>
    <Grid
      fill
      columns={{
        count: 2,
        size: "auto"
      }}
      gap="small"
    >
      <Box
        background="dark-2"
      >
        <Box
          pad="small"
          align="center"
          gap="small"
        >
          <Text>Split</Text>
        </Box>
        <SplitContainer />
      </Box>
      <Box
        background="dark-2"
      >
        <Box
          pad="small"
          align="center"
          gap="small"
        >
          <Text>Restore</Text>
        </Box>
        <RestoreContainer />
      </Box>
    </Grid>
  </Grommet>
);

export default App;