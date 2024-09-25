import React from 'react'
import '../styles/LeftDrawer.css'
import { ButtonGroup, IconButton, Paper } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import SettingsIcon from '@mui/icons-material/Settings';

export function LeftDrawer() {
  return (
    <div className='drawerContainer'>
      <ButtonGroup orientation='vertical'>
        <IconButton>
          <HomeRoundedIcon sx={{
            fontSize: '5rem',
            color: '#b8c4ac',
          }}
        />
        </IconButton>
        <IconButton>
          <MapRoundedIcon sx={{
            fontSize: '5rem',
            color: '#b8c4ac',
          }}
        />
        </IconButton>
        <IconButton>
          <FormatListBulletedRoundedIcon sx={{
            fontSize: '5rem',
            color: '#b8c4ac',
          }}
        />
        </IconButton>
        <IconButton>
          <SettingsIcon sx={{
            fontSize: '5rem',
            color: '#b8c4ac',
          }}
        />
        </IconButton>
      </ButtonGroup>
    </div>  
  )
}
