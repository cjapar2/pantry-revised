import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import '../styles/TopBar.css'

export function TopBar() {
  return (
    <div>
        <AppBar className='AppBar'>
            <Toolbar className='ToolBar'>Pantry</Toolbar>
        </AppBar>
    </div>
  )
}
