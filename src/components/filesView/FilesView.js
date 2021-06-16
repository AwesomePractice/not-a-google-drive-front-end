import React, { useState, useEffect } from 'react'
import { useSelector} from 'react-redux'
import '../../styles/FilesView.css'
import '../../styles/main.css'

import FileItem from './FileItem'
import FileCard from './FileCard'

import { db } from '../../firebase'
import { FilterSharp } from '@material-ui/icons'

const FilesView = () => {
    const [files, setFiles] = useState([])

    const page = useSelector((state) => state.page)
    const favorites = useSelector((state) => state.favorites)

    let favoriteFiles = []
    let current = []

    useEffect(() => {
        db.collection('myFiles').onSnapshot(snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        });

        
    }, [])
    
    useEffect(() => {
        console.log("favorites\n", favorites)
        console.log("files\n", files)
        favoriteFiles = files.filter((elem) => favorites.includes(elem.id))
        console.log("favoriteFiles\n", favoriteFiles)
    }, [favorites])

    const homeFiles_titles = () => {
        current = favoriteFiles
        console.log("home ", current.length)
        return files.map(({ id, item }) => (
            <FileItem id={id} caption={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} isFavorite={favorites.includes(id)}/>
        ))

    }

    const homeFiles_row = () => {
        return files.slice(0, 5).map(({ id, item }) => (
            <FileCard name={item.caption} /> ))
    }

    const favoriteFiles_titles = () => {
        console.log("favorite ", favoriteFiles.length)
        return favoriteFiles.map(({ id, item }) => (
            <FileItem id={id} caption={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} isFavorite={true}/>
        ))

    }

    const favoriteFiles_row = () => {
        return favoriteFiles.slice(0, 5).map(({ id, item }) => (
            <FileCard name={item.caption} /> ))
    }

    return (
        <div className='fileView'>
            <div className='fileView_row'>
                { page === "home" && homeFiles_row() }
                { page === "favorite" && favoriteFiles_row() }
            </div>
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
