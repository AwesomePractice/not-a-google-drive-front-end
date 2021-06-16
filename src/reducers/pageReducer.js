const initialPage = "home";
const pageReducer = (page = initialPage, action) => {
  switch (action.type) {
    case "page/setPage":
      return action.payload ? action.payload : page
    default:
      return page;
  }
};

export default pageReducer