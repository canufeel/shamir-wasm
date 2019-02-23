import React from 'react';
import { Box, Button, Text, TextInput, DataTable } from 'grommet';
import { onSplitPropChange } from '../actions';

const columns = [
  {
    property: 'idx',
    header: <Text>Share num</Text>,
    primary: true,
  },
  {
    property: 'key',
    header: <Text>Share</Text>,
  }
];

const Split = ({
  onAddSplitResults,
  secret,
  sharesNum,
  threshold,
  keys,
  onSplitPropChange
}) => (
  <Box
    direction="column"
    justify="evenly"
    align="stretch"
    pad="small"
    flex
    gap="medium"
  >
    <Box
      pad="small"
      align="stretch"
      justify="start"
      flex
      gap="small"
      background={{ color: "light-2", opacity: "strong" }}
    >
      <Box
        pad="small"
        align="center"
        justify="center"
        flex
        gap="small"
      >
        <Text>Enter secret</Text>
        <TextInput value={secret} onChange={ onSplitPropChange('secret') } />
      </Box>
      <Box
        align="stretch"
        justify="evenly"
        pad="small"
        direction="row"
        gap="small"
      >
        <Box
          flex
        >
          <Text>Pick number of shares</Text>
          <TextInput value={sharesNum} onChange={ onSplitPropChange('sharesNum') } />
        </Box>
        <Box
          flex
        >
          <Text>Pick threshold value</Text>
          <TextInput value={threshold} onChange={ onSplitPropChange('threshold') } />
        </Box>
      </Box>
      <Box
        align="end"
      >
        <Button label="Split" onClick={() => onAddSplitResults() } />
      </Box>
    </Box>
    <Box
      pad="small"
      align="center"
      justify="start"
      background={{ color: "light-2", opacity: "strong" }}
      gap="small"
      flex
    >
      <Box>
        <DataTable
          columns={columns}
          data={keys.map((key, idx) => ({ key, idx }))}
        />
      </Box>
    </Box>
  </Box>
);

export default Split;