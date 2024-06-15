import React from 'react'
import '../styles/AddItemForm.css'
import { Stack } from '@mui/material'

export default function AddItemForm() {
  return (
    <div className="AddItemContainer">
        <form >
            <h1>Add an item!</h1>
            <Stack className="AddFormStack" spacing={3}>
                <input placeholder='Name of Item'></input>
                <input placeholder='Ammount'></input>
                <input placeholder='Comments'></input>
            </Stack>
        </form>
    </div>
  )
}
