import React, { useState } from 'react'
import '../styles/AddItemForm.css'
import { Button, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { format, isToday, isYesterday } from 'date-fns';




export default function AddItemForm({addItem}) {

  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState(0);
  const [dateAdded, setDateAdded] = useState("");
  const [comment, setComment] = useState("");

  const handleDate = (e) => {
    const date = new Date(e);

    if (isToday(date)) {
        return setDateAdded(`Today at ${format(date, 'hh:mm aa')}`);
    } else if (isYesterday(date)) {
        setDateAdded(`Yesterday at ${format(date, 'hh:mm aa')}`);
    } else {
        setDateAdded(format(date, 'MMM d, yyyy'));
    }
  }

  const handleItemSubmit = (e) => {
    e.preventDefault();

    console.log(e);
    if (itemName) {
      addItem({itemName, amount, dateAdded, comment});
      setItemName('');
    }
  };

  return (
    <div className="AddItemContainer">
        <form onSubmit={handleItemSubmit}>
            <h1>Add an item!</h1>
            <Stack className="AddFormStack" spacing={3}>
                <input type="text" placeholder='Name of Item' onChange={(e) => setItemName(e.target.value)}></input>
                <input type="text" placeholder='Amount' onChange={(e) => setAmount(e.target.value)}></input>
                {/* <input type="text" placeholder='Date' onChange={(e) => setDateAdded(e.target.value)}></input> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(e) => handleDate(e)}
                  />
                </LocalizationProvider>
                <input type="text" placeholder='Comments' onChange={(e) => setComment(e.target.value)}></input>
                <Button variant="contained" style={{backgroundColor: '#006769'}} type="submit">Submit</Button>
            </Stack>
        </form>
    </div>
  )
}
