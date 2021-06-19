import React from 'react'
import '../../styles/FileItem.css'
import { useDispatch } from 'react-redux';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import FolderIcon from '@material-ui/icons/Folder';
import CancelIcon from '@material-ui/icons/Cancel';

import { manageFavorite } from '../../actions/manageFavorite';
import { deleteFile } from '../../actions/deleteFile';


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FileItem = ({ id, caption, timestamp, size, isFavorite, icon, handleChange }) => {
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
            dispatch(manageFavorite(id, !isFavorite))
        ])
    }

    const handleClickFolder = (e) => {
        e.preventDefault();

        handleChange(id)
    }

    const handleClickDelete = (e) => {
        e.preventDefault();

        Promise.all([
            dispatch(deleteFile(id))
        ])
    }

    return (
        <div className='fileItem'>
                    { 
                        icon === "file" &&  
                        <a href="#" className="fileItem__icon" title="Download file" download>
                            <InsertDriveFileIcon />
                        </a> 
                    }

                    { 
                        icon === "folder" && 
                        <button href="#" className="fileItem__icon" onClick={handleClickFolder}>
                            <FolderIcon />
                        </button>
                    }
    
                    <button className="fileItem__star" onClick={handleClickFavorite}>
                        { isFavorite ? <StarIcon /> : <StarOutlineIcon /> }
                    </button>

                    { 
                        icon === "file" &&
                        <a href="#" className="fileItem__name" title="Download file" download>
                            <p>{caption}</p>
                        </a>
                    }

                    { 
                        icon === "folder" &&
                        <button href="#" className="fileItem__name" onClick={handleClickFolder}>
                            <p>{caption}</p>
                        </button>
                    }
                    <p className="fileItem__date">{fileDate}</p>
                    <p className="fileItem__size">{getReadableFileSizeString(size)}</p>

                    <button className="fileItem__delete fileItem__button" onClick={handleClickDelete}>
                        <CancelIcon />
                    </button>
            
        </div>
    )
}

export default FileItem
