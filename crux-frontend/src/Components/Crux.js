import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DataTable from './DataTable';
import { AppContext } from './Context';
import { makeRequest } from './Context/utils';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FilterNav from './FilterNav';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const LIMIT = 3 //Should always be greater than or equal to one

const Crux = () => {

    const { loading, setLoading, cruxData, setCruxData, formFactor, setFormFactor } = useContext(AppContext)

    const [url, setUrl] = useState([""])
    const [error, setError] = useState([false])
    // const [allowedUrls, setAllowedUrls] = useState(1)

    const validate = () => {
        let regex = /https:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+\.[A-Za-z]+/i;
        for (let i = 0; i < url.length; i++) {
            if(!regex.test(url[i])){
                setError((arr) => {
                    const temp = [...arr]
                    temp[i] = true
                    return temp
                })
                return false
            }
        }

        setError(new Array(url.length).fill(false))

        return true
    }

    const getCruxData = async() => {
        setLoading(true)
        if(!validate()) return
        const res = await makeRequest("/getCruxData", {url, formFactor})
        const data = await res.json()

        if(res.ok){
            if(data.status){
                setCruxData(data.data)
            }
            setLoading(false)
        }else{
            alert(data.message)
            setLoading(false)
        }
    }

    const increaseUrl = (idx) => {
        if(idx + 1 === LIMIT) return
        setUrl((arr) => {
            const temp = [...arr]
            temp.push("")
            return temp
        })
        setError((arr) => {
            const temp = [...arr]
            temp.push(false)
            return temp
        })
    }

    const removeUrl = (pos) => {
        if(pos === 0) return
        setUrl((arr) => {
            const temp = [...arr]
            temp.splice(pos, 1)
            return temp
        })
        setError((arr) => {
            const temp = [...arr]
            temp.splice(pos, 1)
            return temp
        })
    }

    return (
    <div className='container'>
        <h1>Chrome UX Report</h1>
        <div className='searchContainer'>
            <FormControl style={{width: "10%"}}>
                <InputLabel id="simple-select-label" style={{color: "#1fa77e"}}>Form Factor</InputLabel>
            <Select
            labelId="simple-select-label"
            id="simple-select"
            value={formFactor}
            label="Form Factor"
            onChange={(e) => setFormFactor(e.target.value)}
            sx={{
                color: "#1fa77e",
                backgroundColor: "rgb(28, 26, 33)",
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1fa77e',
                }
            }}
            >
                <MenuItem value="DESKTOP">Desktop</MenuItem>
                <MenuItem value="PHONE">Phone</MenuItem>
                <MenuItem value="TABLET">Tablet</MenuItem>
            </Select>
            </FormControl>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { width: '100%' },
                "& .MuiFilledInput-root": {
                    color: "#1fa77e",
                    fontFamily: "Arial",
                    fontWeight: 500,
                    backgroundColor: "#1c1a21",
                    "&:before": {
                        borderColor: "#2e2e2e",
                    },
                    "&:after": {
                        borderColor: "#1fa77e",
                    }
                },
                "& .MuiInputLabel-filled": {
                    color: "#1fa77e",
                    fontWeight: 700,
                    "&.Mui-focused": {
                        color: "#1fa77e",
                        fontWeight: 700,
                    }
                },
            }}
            noValidate
            autoComplete="off"
            width="50%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="1em"
            >
                {url.map((item,idx) => {
                    return <div className='textfield-container' key={idx}>
                        <TextField required id="filled-basic" label="Enter URL" variant="filled" style={{width: "100%"}} value={url[idx]} error={error[idx]} onChange={(e)=>setUrl((arr)=>{
                        const temp = [...arr]
                        temp[idx] = e.target.value
                        return temp
                    })}/>
                        <AddCircleOutlineOutlinedIcon style={{color:"#1fa77e", cursor: "pointer",  visibility: `${url.length === idx + 1 ? "visible" : "hidden"}`, opacity: idx + 1 === LIMIT ? 0.4 : 1}} onClick={()=>increaseUrl(idx)}/>
                        <RemoveCircleOutlineIcon style={{color:"#1fa77e", cursor: "pointer", opacity: idx === 0 ? 0.4 : 1}} onClick={()=>removeUrl(idx)}/>
                    </div>
                })}
            </Box>
            <Button style={{borderColor: "#1fa77e", color: "#1fa77e"}} variant="outlined" onClick={()=>getCruxData()}>Search</Button>
        </div>
        {cruxData.length > 0 && 
        <div className="main-table-container">
            <FilterNav/>
            <DataTable/>
        </div>}
    </div>
  )
}

export default Crux