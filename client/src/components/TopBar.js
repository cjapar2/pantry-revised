import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import '../styles/TopBar.css'

export function TopBar() {
  return (
    <div>
        <AppBar className='appBar'>
            <Toolbar className='toolBar'>Pantry</Toolbar>
        </AppBar>
    </div>
  )
}
