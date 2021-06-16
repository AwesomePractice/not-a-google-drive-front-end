import React from 'react'
import '../../styles/SidebarItem.css'


const SidebarItem = ({icon, label, page}) => {
    const handleClick = (e) => {
        e.preventDefault();
        alert('Clicked')
    }

    return (
        <button className='sidebarItem' onClick={handleClick}>
            <div className='sidebarItem_main'>
                {icon}
                <p>{label}</p>
            </div>
        </button>
    )
}

export default SidebarItem
