import React from 'react'
import '../../styles/FileItem.css'
import { useDispatch } from 'react-redux';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import FolderIcon from '@material-ui/icons/Folder';

import { db } from '../../firebase'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FileItem = ({ id, caption, timestamp, fileUrl, size, isFavorite, icon }) => {
    const date = new Date(timestamp)
    console.log(date.getDay())
    const fileDate = `${date.getDate()} ${monthNames[date.getMonth() + 1]} ${date.getFullYear()}`
    console.log(timestamp)
    console.log(typeof(timestamp))

    const getReadableFileSizeString = (fileSizeInBytes) => {
        if(fileSizeInBytes === "-")
            return "-"

        let i = -1;
        const byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    };

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        const t = isFavorite ? "favorites/deleteFavorite" : "favorites/addFavorite"
        dispatch({type: t, payload: id})
    }

    return (
        <div className='fileItem'>
                <div className="fileItem--left">
                    <a href={fileUrl} className="fileItem__link" title="Download file" download>
                        { icon === "file" &&  <InsertDriveFileIcon /> }
                        { icon === "folder" && <FolderIcon />}
                    </a>
                    <button className="fileItem_star" onClick={handleClick}>
                        { isFavorite ? <StarIcon /> : <StarOutlineIcon /> }
                    </button>
                    <a href={fileUrl} className="fileItem__link" title="Download file" download>
                        <p>{caption}</p>
                    </a>
                </div>
                <div className="fileItem--right">
                    <p>{fileDate}</p>
                    <p>{getReadableFileSizeString(size)}</p>
                </div>
            
        </div>
    )
}

export default FileItem
