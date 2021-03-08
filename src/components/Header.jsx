import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SettingsIcon from '@material-ui/icons/Settings';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SettingsPanel from './SettingsPanel'

const StyledHeaderWrap = styled(Box)({
  flexGrow: 1,
  width: '100%'
})

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#4C5BD0',
  color: '#fff',
  padding: '10px'
})

const Title = styled(Typography)({
  flexGrow: 1,
  textAlign: 'center',
  marginRight: '30px'
})

const StyledIconButton = styled(IconButton)({
  marginRight: '15px'
})

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settingsOpen: false,
      soundsOpen: false
    };
    this.updateSettingsOpen = this.updateSettingsOpen.bind(this)
  }

  updateSettingsOpen() {
    this.setState({ settingsOpen: !this.state.settingsOpen })
  }

  render() {
    return (
      <StyledHeaderWrap>
        <StyledAppBar position="static">
          <Toolbar>
            <StyledIconButton onClick={this.updateSettingsOpen} edge="start" color="inherit" aria-label="Settings">
              <SettingsIcon />
            </StyledIconButton>
            <IconButton edge="start" color="inherit" aria-label="MusicNote">
              <MusicNoteIcon />
            </IconButton>
            <Title variant="h4">
              Snake Game
          </Title>
            <IconButton
              aria-label="EmojiEvents"
              color="inherit"
            >
              <EmojiEventsIcon />
            </IconButton>
          </Toolbar>
        </StyledAppBar>
        <SettingsPanel
          settingsOpen={this.state.settingsOpen}
          updateSettingsOpen={this.updateSettingsOpen}
          level={this.props.level}
          updateLevel={this.props.updateLevel}
        />
      </StyledHeaderWrap>
    );
  }
}
Header.propTypes = {
  level: PropTypes.string,
  updateLevel: PropTypes.func,
};

export default Header;