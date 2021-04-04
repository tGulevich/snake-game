import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../style.css'

export default function Statistic(props) {
  return (
    <TableContainer className="StatisticScreen">
      <h2 className="StatisticScreen__title">Statistic</h2>
      <Table className="StatisticScreen__table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">Blocks</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.statisticArr.map((el, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {el.date}
              </TableCell>
              <TableCell align="right">{el.level}</TableCell>
              <TableCell align="right">{el.blocksStr}</TableCell>
              <TableCell align="right">{el.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <button className='button' onClick={props.updateStatisticScreenStatus}>Return</button>
    </TableContainer>
  );
}

Statistic.propTypes = {
  statisticArr: PropTypes.array,
  updateStatisticScreenStatus: PropTypes.func,
}