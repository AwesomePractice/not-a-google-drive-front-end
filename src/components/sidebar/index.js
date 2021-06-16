import React from 'react'
import '../../styles/Sidebar.css'

import NewFile from './NewFile'
import SidebarItem from './SidebarItem';

import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const index = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar_itemsContainer">
                <SidebarItem icon={(<HomeIcon />)} label={'Home page'} page="home" />
                <SidebarItem icon={(<PeopleAltIcon />)} label={'Shared with me'} />
                <SidebarItem icon={(<StarBorderIcon />)} label={'Favorites'} page="favorite" />
                <SidebarItem icon={(<DeleteOutlineIcon />)} label={'Deleted'} />
                
            </div>
            <NewFile/>       
        </div>
    )
}

export default index
