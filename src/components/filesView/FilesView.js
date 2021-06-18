import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { fetchData } from '../../actions/fetchData'
import { fetchOwner } from '../../actions/fetchOwner'

import '../../styles/FilesView.css'
import '../../styles/main.css'
import FileItem from './FileItem'
import FileCard from './FileCard'

const noFiles = (
    <div className="no-files">
        <p>No files</p>
    </div>
)

const FilesView = () => {

    
    const page = useSelector((state) => state.page)
    const files = useSelector((state) => state.files.files)
    const folders = useSelector((state) => state.files.children)
    const dispatch = useDispatch()
    
    useEffect(() => {
        Promise.all([
            dispatch(fetchData()),
            dispatch(fetchOwner())
        ])
    }, [])

    useEffect(() => {
        console.log(files)
    }, [files])

    const homeFiles_titles = () => {
        if(files && files.length > 0)
            return files.map(({ id, name, size, favourite }) => (
                <FileItem id={id} caption={name} timestamp={Date.now()} fileUrl={"#"} size={size} isFavorite={favourite} icon={"file"}/>
            )).concat(
                folders.map(({ id, name }) => (
                    <FileItem id={id} caption={name} timestamp={Date.now()} fileUrl={"#"} size={"-"} isFavorite={false} icon={"folder"}/>
                )
            ))
        else return noFiles
    }

    const homeFiles_row = () => {
        if(files)
            return files.map(({ name }) => (
                <FileCard name={name} /> ))
    }

    const favoriteFiles_titles = () => {
        if(files){
            const favoriteFiles = files.filter((item) => item.favourite === true)
            if(favoriteFiles.length > 0)
                return favoriteFiles.map(({ id, item }) => (
                    <FileItem id={id} caption={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} isFavorite={true}/>
                ))
            else return noFiles
        } else return noFiles

    }

    return (
        <div className='fileView'>
            { page === "home" && 
                <div className='fileView_row'>
                    { homeFiles_row() }
                </div>
            }
            
            <div className='filesView_titles'>

                <div className='filesView_titles--left'>
                    <p>Name</p>
                </div>
                <div className='filesView_titles--right'>
                    <p>Last modified</p>
                    <p>File size</p>
                </div>
            </div>
            { page === "home" && homeFiles_titles() }
            { page === "favorite" && favoriteFiles_titles() }
        </div>
    )
}

export default FilesView
