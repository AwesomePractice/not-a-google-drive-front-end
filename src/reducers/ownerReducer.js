
import token from "../config"

const initialOwner = "";
const ownerReducer = async (owner = initialOwner, action) => {
await fetch('http://34.105.195.56/User/FilesInfo', { 
    method: 'GET', 
    headers: {
        'Authorization': `Bearer ${token}` 
    }
    }).then((response) => {
    if (response.ok)
        response.json().then((data => {
            owner = data[0]
        }))
    })  
  switch (action.type) {
    default:
      return initialOwner;
  }
};

export default ownerReducer