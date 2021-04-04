import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: '#4C5BD0',
    color: '#fff',
    padding: '10px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  rssImage: {
    height: '30px',
    width: 'auto'
  },
  ghWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  ghImage: {
    height: '20px',
    width: 'auto'
  },
  ghLink: {
    color: '#fff',
    paddingTop: '5px'
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer>
      <Box className={classes.footer}>
        <Box className={classes.rss}>
          <a href='https://rs.school/react/'><img className={classes.rssImage} src='./rss.svg' /></a>
        </Box>
        <Typography variant='h6'>React 2021Q1</Typography>
        <Box className={classes.ghWrap}>
          <img className={classes.ghImage} src='../github.png' /> <Link className={classes.ghLink} underline='hover' href='https://github.com/tGulevich'>@tGulevich</Link>
        </Box>
      </Box>
    </footer>
  );

}