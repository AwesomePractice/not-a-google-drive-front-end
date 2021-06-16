import token from "../config"

let initialFiles = []
const filesReducer = async (files = initialFiles, action) => {
  await fetch('http://34.105.195.56/User/FilesInfo', { 
    method: 'GET', 
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  }).then((response) => {
    if (response.ok)
      response.json().then((data => {
        initialFiles = data[0]
      }))
    })
    
  switch (action.type) {
    case "files/addFavorite":
      // post 
      return files
    case "files/deleteFavorite":
      // post
      return files
    default:
      return files;
  }
};

export default filesReducer;