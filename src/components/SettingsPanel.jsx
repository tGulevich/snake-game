import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import SettingsScreen from './SettingsScreen'
import SoundSettingsScreen from './SoundSettingsScreen'


const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    top: 64px
    }
  }
`;

class SettingsPanel extends React.Component {
  render() {

    const isSettings = this.props.settingsOpen;
    const isSoundSettings = this.props.soundSettingsOpen;

    const closePanel = () => {
      if (this.props.settingsOpen) {
        this.props.updateSettingsOpen();
      } else if (this.props.soundSettingsOpen) {
        this.props.updateSoundSettingsOpen();
      }
    }

    return (
      <React.Fragment>

        <StyledDrawer
          anchor='top'
          open={this.props.settingsOpen || this.props.soundSettingsOpen}
          onClose={closePanel}
        >
          <Box>
            {isSettings ?
              <SettingsScreen
                level={this.props.level}
                updateLevel={this.props.updateLevel}
                blocks={this.props.blocks}
                updateBlocksStatus={this.props.updateBlocksStatus}
                scene={this.props.scene}
                updateScene={this.props.updateScene} />
              : null
            }
            {isSoundSettings ?
              <SoundSettingsScreen
                level={this.props.level}
                updateLevel={this.props.updateLevel}
                blocks={this.props.blocks}
                updateBlocksStatus={this.props.updateBlocksStatus}
                scene={this.props.scene}
                updateScene={this.props.updateScene}
                musicVolume={this.props.musicVolume}
                soundVolume={this.props.soundVolume}
                updateMusicVolume={this.props.updateMusicVolume}
                updateSoundVolume={this.props.updateSoundVolume} />
              : null
            }

          </Box>
        </StyledDrawer >
      </React.Fragment >
    );
  }
}

SettingsPanel.propTypes = {
  settingsOpen: PropTypes.bool,
  updateSettingsOpen: PropTypes.func,
  soundSettingsOpen: PropTypes.bool,
  updateSoundSettingsOpen: PropTypes.func,
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

export default SettingsPanel