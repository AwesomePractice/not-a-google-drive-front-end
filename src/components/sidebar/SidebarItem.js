import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/SidebarItem.css'



const SidebarItem = ({icon, label, pageName}) => {
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        dispatch({ type: "page/setPage", payload: pageName })
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
