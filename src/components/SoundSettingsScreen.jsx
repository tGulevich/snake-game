import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import '../style.css'

const SettingsWrap = styled(Box)({
  backgroundColor: '#4C5BD0',
  width: '100%',
  padding: '20px 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 200px);',
  columnGap: '60px',
  justifyContent: 'center'
});

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  changeMusicVolumeHandler = (event, newValue) => {
    localStorage.setItem('musicVolume', newValue);
    this.props.updateMusicVolume(newValue);
  }

  changeSoundVolumeHandler = (event, newValue) => {
    localStorage.setItem('soundVolume', newValue);
    this.props.updateSoundVolume(newValue);

  }

  render() {
    return (
      <SettingsWrap
        component={'form'}
        onSubmit={this.handleSubmit}
      >
        <div className="SoundBlock">
          <Typography id="continuous-slider" gutterBottom>
            Music
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider
                value={this.props.musicVolume}
                onChange={this.changeMusicVolumeHandler}
                aria-labelledby="continuous-slider"
              />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
        </div>
        <div className="SoundBlock">
          <Typography id="continuous-slider" gutterBottom>
            Sounds
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider
                value={this.props.soundVolume}
                onChange={this.changeSoundVolumeHandler}
                aria-labelledby="continuous-slider"
              />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
        </div>
      </SettingsWrap>
    );
  }
}

SettingsScreen.propTypes = {
  musicVolume: PropTypes.number,
  soundVolume: PropTypes.number,
  updateMusicVolume: PropTypes.func,
  updateSoundVolume: PropTypes.func,
};

export default SettingsScreen;


