import React from 'react'
import '../../styles/Header.css'

import NotGoogleDriveLogo from '../../media/logo.png'

import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';

const index = ({ userPhoto }) => {
    return (
        <div className='header container'>
            <div className="header_logo">
                <img src={NotGoogleDriveLogo} alt="NotGoogleDrive"/>
                <span>NotGoogleDrive</span>
            </div>
            <div className="header_searchContainer">
                <div className="header_searchbar">
                    <input type="text" placeholder='Search in Drive' />
                    <SearchIcon />
                </div>
            </div>
            <div className="header_icons">
                <span>
                    <HelpOutlineIcon />
                    <SettingsIcon />
                    <AppsIcon/>
                </span>
                <img src={userPhoto} alt="User Avatar"/>
            </div>
        </div>
    )
}

export default index
