import React, { useState, useContext } from 'react'
import '../styles/AddItemForm.css'
import { Button, Stack, Modal } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { format, isToday, isYesterday } from 'date-fns';
import { ItemsContext } from './ItemsContext'




export default function AddItemForm({ open, handleClose, item }) {

  const { addItem, updateItem } = useContext(ItemsContext);

  const [name, setItemName] = useState(item ? item.name : '');
  const [amount, setAmount] = useState(item ? item.amount : 1);
  const [dateAdded, setDateAdded] = useState(item ? new Date(item.dateAdded) : new Date());
  const [comments, setComments] = useState(item ? item.comments : '');

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

  const handleItemSubmit = () => {
    if (item) {
      updateItem(item.id, { name, amount, dateAdded: dateAdded.toISOString(), comments });
    }
    else {
      addItem(name, amount, dateAdded.toISOString(), comments);
    }
    handleClose();
  };

  return (
    <Modal open={open} onCLose={handleClose}
      BackdropProps={{ onClick: handleClose }} // This line ensures the modal closes on backdrop click
      disableAutoFocus={true} // Disables the hideous blue highlight when opening modal
    >
        <div className="AddItemContainer">
          <form onSubmit={handleItemSubmit}>
            <h1>Add an item!</h1>
            <Stack className="AddFormStack" spacing={3}>
                <input type="text" placeholder='Name of Item' onChange={(e) => setItemName(e.target.value)}  required/>
                <input type="text" placeholder='Amount' onChange={(e) => setAmount(e.target.value)} />
                {/* <input type="text" placeholder='Date' onChange={(e) => setDateAdded(e.target.value)}></input> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(e) => handleDate(e)}
                  />
                </LocalizationProvider>
                <input type="text" placeholder='Comments' onChange={(e) => setComments(e.target.value)}></input>
                <Button variant="contained" style={{backgroundColor: '#006769'}} type="submit">Submit</Button>
            </Stack>
        </form>
        </div>
    </Modal>
  )
}
