import React from 'react'
import '../../styles/FileItem.css'
import { useDispatch } from 'react-redux';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';

import { db } from '../../firebase'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FileItem = ({ id, caption, timestamp, fileUrl, size, isFavorite }) => {
    const fileDate = `${timestamp?.toDate().getDate()} ${monthNames[timestamp?.toDate().getMonth() + 1]} ${timestamp?.toDate().getFullYear()}`

    const getReadableFileSizeString = (fileSizeInBytes) => {
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
                        <InsertDriveFileIcon />
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
