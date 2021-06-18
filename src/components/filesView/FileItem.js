import React from 'react'
import '../../styles/FileItem.css'
import { useDispatch } from 'react-redux';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import FolderIcon from '@material-ui/icons/Folder';

import { manageFavorite } from '../../actions/manageFavorite';


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FileItem = ({ id, caption, timestamp, fileUrl, size, isFavorite, icon, handleChange }) => {
    const date = new Date(timestamp)
    const fileDate = `${date.getDate()} ${monthNames[date.getMonth() + 1]} ${date.getFullYear()}`

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

    const handleClickFavorite = (e) => {
        e.preventDefault();

        Promise.all([
            dispatch(manageFavorite())
        ])
    }

    const handleClickFolder = (e) => {
        e.preventDefault();

        handleChange(id)
    }

    return (
        <div className='fileItem'>
                <div className="fileItem--left">
                    { 
                        icon === "file" &&  
                        <a href={fileUrl} className="fileItem__link" title="Download file" download>
                            <InsertDriveFileIcon />
                        </a> 
                    }

                    { 
                        icon === "folder" && 
                        <button href={fileUrl} className="fileItem__button" onClick={handleClickFolder}>
                            <FolderIcon />
                        </button>
                    }
    
                    <button className="fileItem_star" onClick={handleClickFavorite}>
                        { isFavorite ? <StarIcon /> : <StarOutlineIcon /> }
                    </button>

                    { 
                        icon === "file" &&
                        <a href={fileUrl} className="fileItem__link" title="Download file" download>
                            <p>{caption}</p>
                        </a>
                    }

                    { 
                        icon === "folder" &&
                        <button href={fileUrl} className="fileItem__button" onClick={handleClickFolder}>
                            <p>{caption}</p>
                        </button>
                    }
                </div>
                <div className="fileItem--right">
                    <p>{fileDate}</p>
                    <p>{getReadableFileSizeString(size)}</p>
                </div>
            
        </div>
    )
}

export default FileItem
