const initialRootFolder = [];
const rootFolderReducer = (rootFolder = initialRootFolder, action) => {
  switch (action.type) {
    case "rootFolder/setRoot":
      return action.payload;
    default:
      return rootFolder;
  }
};

export default rootFolderReducer;
