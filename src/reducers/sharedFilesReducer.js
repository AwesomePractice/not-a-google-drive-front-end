const initialSharedFiles = [];
const sharedFiledReducer = (sharedFiles = initialSharedFiles, action) => {
  switch (action.type) {
    case "sharedFiles/loadData":
      return action.payload;
    default:
      return sharedFiles;
  }
};

export default sharedFiledReducer;
