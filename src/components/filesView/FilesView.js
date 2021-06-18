import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { fetchData } from '../../actions/fetchData'
import { fetchOwner } from '../../actions/fetchOwner'

import '../../styles/FilesView.css'
import '../../styles/main.css'
import FileItem from './FileItem'
import FileCard from './FileCard'
import Path from './Path'

const noFiles = (
    <div className="no-files">
        <p>No files</p>
    </div>
)

function searchTree(element, matchingId){
    if(element.id === matchingId){
         return element;
    }else if (element.children != null){
         var i;
         var result = null;
         for(i=0; result == null && i < element.children.length; i++){
              result = searchTree(element.children[i], matchingId);
         }
         return result;
    }
    return null;
}

const FilesView = () => {

    
    const page = useSelector((state) => state.page)
    const initialRoot = useSelector((state) => state.files)
    const files = useSelector((state) => state.files.files)
    const folders = useSelector((state) => state.files.children)
    const dispatch = useDispatch()

    const [route, setRoute] = useState([{ name: page, id: "" }])
    const root = useSelector((state) => state.rootFolder)
    
    useEffect(() => {
        Promise.all([
            dispatch(fetchData()),
            dispatch(fetchOwner()),
        ])

        dispatch({type: "rootFolder/setRoot", payload: initialRoot})
    }, [])

    useEffect(() => {
    }, [root])

    useEffect(() => {
        setRoute([{ name: page, id: "" }])
        dispatch({type: "rootFolder/setRoot", payload: initialRoot})
    }, [page])

    useEffect(()=>{
        const folder = searchTree(initialRoot, root.id)
        dispatch({type: "rootFolder/setRoot", payload: folder})
    },[initialRoot])

    const handleChange = (folderId) => {
        if(folderId === ""){
            setRoute([{name: page, id: ""}])
            dispatch({type: "rootFolder/setRoot", payload: initialRoot})
        } else{
            const folder = searchTree(root, folderId)
            dispatch({type: "rootFolder/setRoot", payload: folder})
            setRoute([...route, {name: folder.name, id: folder.id }])
        }
    }

    const homeFiles_titles = () => {
        const currentFiles = root.files
        const currentFolders = root.children
        if(currentFiles && currentFiles.length > 0)
            return currentFiles.map(({ id, name, size, favourite }) => (
                <FileItem id={id} caption={name} timestamp={Date.now()} fileUrl={"#"} size={size} isFavorite={favourite} icon={"file"}  key={id}/>
            )).concat(
                currentFolders.map(({ id, name }) => (
                    <FileItem id={id} caption={name} timestamp={Date.now()} fileUrl={"#"} size={"-"} isFavorite={false} icon={"folder"} handleChange={handleChange} key={id}/>
                )
            ))
        else return noFiles
    }

    const homeFiles_row = () => {
        const currentFiles = root.files
        if(currentFiles)
            return currentFiles.slice(0,4).map(({ name, id }) => (
                <FileCard name={name} key={id} /> ))
    }

    const favoriteFiles_titles = () => {
        const currentFiles = root.files
        const currentFolders = folders
        if(currentFiles){
            const favoriteFiles = currentFiles.filter((item) => item.favourite === true)
            if(favoriteFiles.length > 0)
                return favoriteFiles.map(({ id, item }) => (
                    <FileItem id={id} caption={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} isFavorite={true} key={id} />
                )).concat(
                    currentFolders.map(({ id, name }) => (
                        <FileItem id={id} caption={name} timestamp={Date.now()} fileUrl={"#"} size={"-"} isFavorite={false} icon={"folder"} handleChange={handleChange} key={id} />
                    )
                ))
            else return noFiles
        } else return noFiles

    }

    return (
        <div className='fileView'>
            <Path path={route} handleChange={handleChange}/>
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
            { page === "favorites" && favoriteFiles_titles() }
        </div>
    )
}

export default FilesView
