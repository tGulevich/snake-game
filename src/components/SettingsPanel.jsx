import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import SettingsScreen from './SettingsScreen'

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    top: 64px
    }
  }
`;

class SettingsPanel extends React.Component {
  render() {

    return (
      <React.Fragment>
        <StyledDrawer
          anchor='top'
          open={this.props.settingsOpen}
          onClose={this.props.updateSettingsOpen}
        >
          <Box
          // onClick={this.props.updateSettingsOpen}
          // onKeyDown={this.props.updateSettingsOpen}
          >
            <SettingsScreen
              level={this.props.level}
              updateLevel={this.props.updateLevel}
              blocks={this.props.blocks}
              updateBlocksStatus={this.props.updateBlocksStatus}
              scene={this.props.scene}
              updateScene={this.props.updateScene} />
          </Box>
        </StyledDrawer >
      </React.Fragment >
    );
  }
}

SettingsPanel.propTypes = {
  settingsOpen: PropTypes.bool,
  updateSettingsOpen: PropTypes.func,
  level: PropTypes.string,
  updateLevel: PropTypes.func,
  blocks: PropTypes.bool,
  updateBlocksStatus: PropTypes.func,
  scene: PropTypes.string,
  updateScene: PropTypes.func,
};

export default SettingsPanel