import React, { useState, useContext, useEffect } from 'react'
import '../styles/NewItemForm.css'
import { Button, Grid, Box, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { ItemsContext } from './ItemsContext'

export function NewItemForm({item}) {
    const { addItem, updateItem } = useContext(ItemsContext);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);
    const [date, setDate] = useState(new Date());
    const [comments, setComments] = useState('');
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        if (imageSrc) {
          const reader = new FileReader();
          reader.onloaded = () => {
            setImageSrc(reader.result);
          };
          reader.readAsDataURL(imageSrc);
        } 
      }, [imageSrc]);

      useEffect(() => {
        // if we edit an item -> item exists -> we're editing so autofill form with item's values
        if (item) {
            setName(item.name);
            setAmount(item.amount);
            setDate(parseISO(item.date));
            setComments(item.comments);
        }
        // if we select add button -> no item exists yet -> autofill form with default values
        else {
            setName('');
            setAmount(1);
            setDate(new Date());
            setComments('');
        }
      }, [item]);

      function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
          setImageSrc(file);
        }
      };

      function handleItemSubmit() {
        if (item) {
          updateItem(item.id, { name, amount, date: date.toISOString(), comments, imageSrc });
        }
        else {
          addItem(name, amount, date.toISOString(), comments, imageSrc);
        }
        setName('');
        setAmount(1);
        setDate(new Date());
        setComments('');
        
      }

  return (
    <Box component='form' sx={{

        position: 'absolute;',
        padding: '15rem 10rem',
        width: '15rem',
        height: '10rem',
        top: '0',
        left: '0',
        borderRadius: '0px 15px 15px 0px', 
        backgroundColor: 'red',
    }} onSubmit={handleItemSubmit}>
        <Grid container spacing={1}>
        {/* First TextField */}
        <Grid item xs={1}>
          <TextField
            required
            fullWidth
            id="firstField"
            label="First Field"
            name="firstField"
          />
        </Grid>
        {/* Second TextField and Button */}
        <Grid item xs={8}>
          <TextField
            required
            fullWidth
            id="secondField"
            label="Second Field"
            name="secondField"
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" fullWidth>
            Button
          </Button>
        </Grid>
        {/* Third TextField */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="thirdField"
            label="Third Field"
            name="thirdField"
          />
        </Grid>
        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </Grid>

        </Grid>

            
            {/* <input type="text" placeholder='Name of Item' onChange={(e) => setName(e.target.value)}  required/>
            <input type="text" placeholder='Amount' onChange={(e) => setAmount(e.target.value)} /> */}
            {/* <input type="text" placeholder='Date' onChange={(e) => setDate(e.target.value)}></input> */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                onChange={(e) => setDate(e)}
                />
            </LocalizationProvider>
            <input type="text" placeholder='Comments' onChange={(e) => setComments(e.target.value)}></input>
            <Button variant="contained" style={{backgroundColor: '#006769'}} type="submit">Submit</Button>
            <input type='file' accept='image/*' onChange={handleFileChange} /> */}
    </Box>
  )
}
