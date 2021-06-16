import React, { useState, useEffect } from 'react'
import '../../styles/FilesView.css'
import '../../styles/main.css'

import FileItem from './FileItem'
import FileCard from './FileCard'

import { db } from '../../firebase'

const FilesView = () => {
    const [files, setFiles] = useState([])
    const [page, setPage] = useState("home")

    let favoriteFiles = []

    useEffect(() => {
        db.collection('myFiles').onSnapshot(snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        });

        favoriteFiles = files.filter((id, item) => item.favorites === true)
    }, [])
    

    console.log(files)

    const homeFiles_titles = () => {
        return files.map(({ id, item }) => (
            <FileItem id={id} caption={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} />
        ))
    }

    const homeFiles_row = () => {
        return files.slice(0, 5).map(({ id, item }) => (
            <FileCard name={item.caption} /> ))
    }

    const favoriteFiles_titles = () => {
        return favoriteFiles.map(({ id, item }) => (
            <FileItem id={id} caption={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} />
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
