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
      soundSettingsOpen: false,
    };
    this.updateSettingsOpen = this.updateSettingsOpen.bind(this);
    this.updateSoundSettingsOpen = this.updateSoundSettingsOpen.bind(this);

  }

  updateSettingsOpen() {
    this.setState({ settingsOpen: !this.state.settingsOpen })
  }

  updateSoundSettingsOpen() {
    this.setState({ soundSettingsOpen: !this.state.soundSettingsOpen })
  }

  render() {
    return (
      <StyledHeaderWrap>
        <StyledAppBar position="static">
          <Toolbar>
            <StyledIconButton onClick={this.updateSettingsOpen} edge="start" color="inherit" aria-label="Settings">
              <SettingsIcon />
            </StyledIconButton>
            <IconButton onClick={this.updateSoundSettingsOpen} edge="start" color="inherit" aria-label="MusicNote">
              <MusicNoteIcon />
            </IconButton>
            <Title variant="h5">
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
          soundSettingsOpen={this.state.soundSettingsOpen}
          updateSoundSettingsOpen={this.updateSoundSettingsOpen}
          level={this.props.level}
          updateLevel={this.props.updateLevel}
          blocks={this.props.blocks}
          updateBlocksStatus={this.props.updateBlocksStatus}
          scene={this.props.scene}
          updateScene={this.props.updateScene}
          musicVolume={this.props.musicVolume}
          soundVolume={this.props.soundVolume}
          updateMusicVolume={this.props.updateMusicVolume}
          updateSoundVolume={this.props.updateSoundVolume}
        />
      </StyledHeaderWrap>
    );
  }
}
Header.propTypes = {
  level: PropTypes.string,
  updateLevel: PropTypes.func,
  blocks: PropTypes.bool,
  updateBlocksStatus: PropTypes.func,
  scene: PropTypes.string,
  updateScene: PropTypes.func,
  musicVolume: PropTypes.number,
  soundVolume: PropTypes.number,
  updateMusicVolume: PropTypes.func,
  updateSoundVolume: PropTypes.func,

};

export default Header;