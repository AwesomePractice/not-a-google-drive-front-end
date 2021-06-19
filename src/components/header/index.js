import React from 'react'
import '../../styles/Header.css'
import { useSelector } from 'react-redux';

import NotGoogleDriveLogo from '../../media/logo.png'

import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

const Index = ({ userPhoto }) => {
    const owner = useSelector((state) => state.owner)

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
                <PersonIcon />
                { owner ? "Hello, " + capitalizeFirstLetter(owner.name) + " " + capitalizeFirstLetter(owner.surname) : "Hello!"}
            </div>
        </div>
    )
}

export default Index
