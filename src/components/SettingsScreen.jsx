import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../style.css'

const SettingsWrap = styled(Box)({
  backgroundColor: '#4C5BD0',
  width: '100%',
  padding: '20px 0',
  display: 'flex',
  justifyContent: 'center'
})

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    console.log(this.props.level)
    return (
      <SettingsWrap
        component={'form'}
        onSubmit={this.handleSubmit}
      >
        <FormControl>
          <InputLabel
            id="settings-level"
            className="SettingsLabel"
          >Level</InputLabel>
          <Select
            labelId="settings-level"
            value={this.props.level}
            onChange={this.props.updateLevel.bind(this)}
            label="Level"
            className="SettingsInput"
          >
            <MenuItem value={'easy'}>Easy</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'hard'}>Hard</MenuItem>
          </Select>
        </FormControl>
      </SettingsWrap >
    );
  }
}

SettingsScreen.propTypes = {
  level: PropTypes.string,
  updateLevel: PropTypes.func,
};

export default SettingsScreen;