import React, { useState } from 'react'
import '../styles/AddItemForm.css'
import { Button, Stack } from '@mui/material'



export default function AddItemForm({addItem}) {
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState(0);
  const [comment, setComment] = useState("");

  const handleItemSubmit = (e) => {
    e.preventDefault();

    if (itemName) {
      addItem({itemName, amount, comment});
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
                <input type="text" placeholder='Comments' onChange={(e) => setComment(e.target.value)}></input>
                <Button variant="contained" style={{backgroundColor: '#006769'}} type="submit">Submit</Button>
            </Stack>
        </form>
    </div>
  )
}
