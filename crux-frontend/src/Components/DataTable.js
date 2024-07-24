import React, { useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { AppContext } from './Context';

const DataTable = () => {

  const {cruxData, columns } = useContext(AppContext)

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: "#1fa77e",
        fontWeight: 700
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
  }));
      
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: "#161616"
      },
      '&:nth-of-type(even)': {
        backgroundColor: "rgb(28, 26, 33)"
      },
      '&:last-child td, &:last-child th': {
        border: 0,
      },
  }));

  return (
      <TableContainer component={Paper} style={{width: "90%"}}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">URL</StyledTableCell>
              <StyledTableCell align="center">Collection Period</StyledTableCell>
              {columns.includes("cumulative_layout_shift") && <StyledTableCell align="center">cumulative_layout_shift</StyledTableCell>}
              {columns.includes("experimental_time_to_first_byte") && <StyledTableCell align="center">experimental_time_to_first_byte</StyledTableCell>}
              {columns.includes("first_contentful_paint") && <StyledTableCell align="center">first_contentful_paint</StyledTableCell>}
              {columns.includes("first_input_delay") && <StyledTableCell align="center">first_input_delay</StyledTableCell>}
              {columns.includes("interaction_to_next_paint") && <StyledTableCell align="center">interaction_to_next_paint</StyledTableCell>}
              {columns.includes("largest_contentful_paint") && <StyledTableCell align="center">largest_contentful_paint</StyledTableCell>}
              {columns.includes("navigation_types") && <StyledTableCell align="center">navigation_types</StyledTableCell>}
              {columns.includes("round_trip_time") && <StyledTableCell align="center">round_trip_time</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {cruxData.map((item, index)=>{
              return <StyledTableRow key={index}>
              <StyledTableCell align='center' style={{color:"#1fa77e"}}> {item.record.key.origin} </StyledTableCell>
              <StyledTableCell align="center" style={{color:"#1fa77e"}}> {`${item.record.collectionPeriod.firstDate.day}/${item.record.collectionPeriod.firstDate.month}/${item.record.collectionPeriod.firstDate.year} - ${item.record.collectionPeriod.lastDate.day}/${item.record.collectionPeriod.lastDate.month}/${item.record.collectionPeriod.lastDate.year}`} </StyledTableCell>
              {columns.includes("cumulative_layout_shift") && <StyledTableCell align="left"> 
                <ul>
                  {item.record.metrics.cumulative_layout_shift.histogram.map((item, index)=>{
                    if(index === 2){
                      return(<li key={index}>{`Final ${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}s`}</li>)
                    }
                    return(<li key={index}>{`${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}s - ${item.end}s`}</li>)
                  })}
                  <li>{`On average 75% of page loads in ${item.record.metrics.cumulative_layout_shift.percentiles.p75}s`}</li>
                </ul> 
              </StyledTableCell>}
              {columns.includes("experimental_time_to_first_byte") && <StyledTableCell align="left">
                <ul>
                  {item.record.metrics.experimental_time_to_first_byte.histogram.map((item, index)=>{
                    if(index === 2){
                      return(<li key={index}>{`Final ${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}ms`}</li>)
                    }
                    return(<li key={index}>{`${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}ms - ${item.end}ms`}</li>)
                  })}
                  <li>{`On average 75% of page loads in ${item.record.metrics.experimental_time_to_first_byte.percentiles.p75}ms`}</li>
                </ul> 
              </StyledTableCell>}
              {columns.includes("first_contentful_paint") && <StyledTableCell align="left">
                <ul>
                  {item.record.metrics.first_contentful_paint.histogram.map((item, index)=>{
                    if(index === 2){
                      return(<li key={index}>{`Final ${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}ms`}</li>)
                    }
                    return(<li key={index}>{`${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}ms - ${item.end}ms`}</li>)
                  })}
                  <li>{`On average 75% of page loads in ${item.record.metrics.first_contentful_paint.percentiles.p75}ms`}</li>
                </ul> 
              </StyledTableCell>}
              {columns.includes("first_input_delay") && <StyledTableCell align="left">
                <ul>
                  {item.record.metrics.first_input_delay.histogram.map((item, index)=>{
                    if(index === 2){
                      return(<li key={index}>{`Final ${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}ms`}</li>)
                    }
                    return(<li key={index}>{`${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}ms - ${item.end}ms`}</li>)
                  })}
                  <li>{`On average 75% of page loads in ${item.record.metrics.first_input_delay.percentiles.p75}ms`}</li>
                </ul> 
              </StyledTableCell>}
              {columns.includes("interaction_to_next_paint") && <StyledTableCell align="left">
                <ul>
                  {item.record.metrics.interaction_to_next_paint.histogram.map((item, index)=>{
                    if(index === 2){
                      return(<li key={index}>{`Final ${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}ms`}</li>)
                    }
                    return(<li key={index}>{`${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}ms - ${item.end}ms`}</li>)
                  })}
                  <li>{`On average 75% of page loads in ${item.record.metrics.interaction_to_next_paint.percentiles.p75}ms`}</li>
                </ul> 
              </StyledTableCell>}
              {columns.includes("largest_contentful_paint") && <StyledTableCell align="left">
                <ul>
                  {item.record.metrics.largest_contentful_paint.histogram.map((item, index)=>{
                    if(index === 2){
                      return(<li key={index}>{`Final ${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}ms`}</li>)
                    }
                    return(<li key={index}>{`${Math.round(item.density * 100).toFixed(2)}% of page loads in ${item.start}ms - ${item.end}ms`}</li>)
                  })}
                  <li>{`On average 75% of page loads in ${item.record.metrics.largest_contentful_paint.percentiles.p75}ms`}</li>
                </ul> 
              </StyledTableCell>}
              {columns.includes("navigation_types") && <StyledTableCell align="left">
                {item.record.key.formFactor === "DESKTOP" ? <ul>
                  <li>back_forward: {Math.round(item.record.metrics.navigation_types.fractions.back_forward *100).toFixed(2)}%</li>
                  <li>back_forward_cache: {Math.round(item.record.metrics.navigation_types.fractions.back_forward_cache *100).toFixed(2)}%</li>
                  <li>navigate: {Math.round(item.record.metrics.navigation_types.fractions.navigate *100).toFixed(2)}%</li>
                  <li>navigate_cache: {Math.round(item.record.metrics.navigation_types.fractions.navigate_cache *100).toFixed(2)}%</li>
                  <li>prerender: {Math.round(item.record.metrics.navigation_types.fractions.prerender *100).toFixed(2)}%</li>
                  <li>reload: {Math.round(item.record.metrics.navigation_types.fractions.reload *100).toFixed(2)}%</li>
                  <li>restore: {Math.round(item.record.metrics.navigation_types.fractions.restore *100).toFixed(2)}%</li>
                </ul>: null}
              </StyledTableCell>}
              {columns.includes("round_trip_time") && <StyledTableCell align="center" style={{color:"#1fa77e"}}>{item.record.metrics.round_trip_time.percentiles.p75}</StyledTableCell>}
            </StyledTableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default DataTable