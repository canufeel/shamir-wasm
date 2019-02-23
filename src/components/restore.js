import React, { Component } from 'react';
import { Box, Button, Text, TextInput } from 'grommet/es6';

const defaultIdx = 0;

const newShareGetter = idx => ({
  idx,
  value: '',
});

const defaultState = {
  currentIdx: defaultIdx,
  shares: [newShareGetter(defaultIdx)]
};

class Restore extends Component {

  state = defaultState;

  onRestorePropChange = (updateIdx, value) => {
    const shares = this.state.shares;
    const toUpdateShare = shares.find(({ idx }) => idx === updateIdx);
    const updatedShare = {
      ...toUpdateShare,
      value,
    };
    const newShares = [
      ...shares.slice(0, shares.indexOf(toUpdateShare)),
      updatedShare,
      ...shares.slice(shares.indexOf(toUpdateShare) + 1, shares.length)
    ];
    this.setState({
      shares: newShares
    });
  }

  onRemoveRow = (toRemoveIdx) => {
    const shares = this.state.shares;
    const toRemoveShare = shares.find(({ idx }) => idx === toRemoveIdx);
    const newShares = [
      ...shares.slice(0, shares.indexOf(toRemoveShare)),
      ...shares.slice(shares.indexOf(toRemoveShare) + 1, shares.length)
    ];
    const reindexedShares = newShares.map((share) => share.idx > toRemoveShare.idx ? ({
      ...share,
      idx: share.idx - 1
    }) : share);
    this.setState({
      shares: reindexedShares,
      currentIdx: this.state.currentIdx - 1
    })
  }

  onAddRow = () => {
    const newIdx = this.state.currentIdx + 1;
    const newShares = this.state.shares.concat(newShareGetter(newIdx));
    this.setState({
      currentIdx: newIdx,
      shares: newShares,
    });
  }

  onRestore = () => {
    this.props.onRestore(
      this.state.shares.map(({ value }) => value)
    );
  }

  render () {
    return (
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
          { this.state.shares.map(({ idx, value}, _, arr) => (
            <Box
              key={idx}
              direction="row"
              align="stretch"
              justify="center"
            >
              <Box
                align="center"
                justify="center"
                pad="small"
                gap="small"
              >
              { idx }
              </Box>
              <Box
                flex
                align="center"
                justify="center"
                pad="small"
                gap="small"
              >
                <TextInput
                  value={value}
                  onChange={ e => this.onRestorePropChange(idx, e.target.value) }
                />
              </Box>
              <Box
                align="center"
                justify="center"
                pad="small"
                gap="small"
              >
                <Button
                  label="Remove row"
                  disabled={ arr.length === 1 }
                  onClick={() => this.onRemoveRow(idx) }
                />
              </Box>
            </Box>
          )) }
          <Box
            direction="row"
            justify="center"
          >
            <Box
              align="start"
              flex
            >
              <Button label="Add row" onClick={() => this.onAddRow() } />
            </Box>
            <Box
              align="end"
            >
              <Button label="Restore" onClick={() => this.onRestore(this.state.shares) } />
            </Box>
          </Box>
        </Box>
        <Box
          pad="small"
          align="stretch"
          justify="center"
          gap="small"
          background={{ color: "light-2", opacity: "strong" }}
        >
          <Box
            direction="row"
            justify="center"
          >
            <Box
              align="start"
            >
              <Text>Restored secret</Text>
            </Box>
            <Box
              align="end"
              flex
            >
              <Text>{ this.props.secret }</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Restore;