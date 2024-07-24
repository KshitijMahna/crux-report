import React, { useContext, useState } from 'react'
import { AppContext } from './Context'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material'

const columnNames = ["cumulative_layout_shift", "experimental_time_to_first_byte", "first_contentful_paint", "first_input_delay", "interaction_to_next_paint", "largest_contentful_paint", "navigation_types", "round_trip_time"]

const FilterNav = () => {

  const { columns, setColumns } = useContext(AppContext)

  const handleChange = (value) => {
    setColumns(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div className='filter-container'>
      <p>Filter: </p>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-checkbox-label" style={{color: "#1fa77e"}}>Columns Shown</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={columns}
          onChange={(e) => handleChange(e.target.value)}
          input={<OutlinedInput label="Columns Shown" />}
          renderValue={(selected) => selected.join(', ')}
          sx={{
            color: "#1fa77e",
            backgroundColor: "rgb(28, 26, 33)",
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1fa77e',
            }
          }}
        >
          {columnNames.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={columns.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default FilterNav