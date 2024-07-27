import { ButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import '../styles/SidePanel.css'

export function SidePanel() {
    const [panelOpen, setPanelOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(null);

    function togglePanel(feature) {
        setActiveFeature(feature);
        setPanelOpen(!panelOpen || activeFeature !== feature);
    };

    function closePanel() {
        setPanelOpen(false);
    };

    return (
        <div className='sidePanelContainer'>
            <div className='buttonGroup'>
                <ButtonGroup orientation='vertical'>
                    <IconButton onClick={() => togglePanel('filters')}>
                        <FilterAltIcon />
                    </IconButton>
                    <IconButton onClick={() => togglePanel('changelog')}>
                        <HistoryOutlinedIcon />
                    </IconButton>
                </ButtonGroup>
            </div>
            <div className='contentContainer'>
                hi
            </div>
        </div>
        // <div className={`sidePanel ${panelOpen ?  'open' : ''}`}>
        //     <div className='buttonGroup'>
        //         <ButtonGroup orientation='vertical'>
                    // <IconButton onClick={() => togglePanel('filters')}>
                    //     <FilterAltIcon />
                    // </IconButton>
                    // <IconButton onClick={() => togglePanel('changelog')}>
                    //     <HistoryOutlinedIcon />
                    // </IconButton>
        //         </ButtonGroup>
        //     </div>
        //     <div className='sidePanelContent'>
        //         <IconButton onClick={closePanel} className='close-button'>
        //             <CloseIcon />
        //         </IconButton>
        //     </div>
        // </div>
    )
}