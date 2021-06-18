import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/NewFile.css'
import token from '../../config'

import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { fetchData } from '../../actions/fetchData';

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const NewFile = () => {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch()
    const folder = useSelector((state) => state.rootFolder)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = () => {
        setUploading(true)

        let body = new FormData();
        console.log(file)
        body.append('fileUpload', file);

        fetch(`http://34.105.195.56/FileUploader/UploadFile?compressed=false&encrypted=false&favourite=false&folderId=${folder.id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` 
            },
            body: body
        }).then((response) => {
            response.json()
            .then((data) => {
                console.log(data)
            })

            setUploading(false)
            setOpen(false)
            setFile(null)

            dispatch(fetchData())
        })



    }

    return (
        <div className="newFile">
            <div className="newFile_container" onClick={handleOpen}>
                <AddIcon/>
                <p>Upload</p>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <p>Select files you want to upload:</p>
                    {
                        uploading ? (
                            <p>Uploading...</p>
                        ) : (
                                <>
                                    <input type="file" onChange={handleChange} />
                                    <button onClick={handleUpload}>Upload</button>
                                </>
                            )
                    }
                </div>
            </Modal>
        </div>
    )
}

export default NewFile
