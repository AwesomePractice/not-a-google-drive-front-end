const initialSearch = "";
const searchReducer = (search = initialSearch, action) => {
  switch (action.type) {
    case "searchReducer/setSearch":
      return action.payload;
    default:
      return search;
  }
};

export default searchReducer;
