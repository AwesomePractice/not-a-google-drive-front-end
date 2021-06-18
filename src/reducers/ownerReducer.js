import { OWNER_LOAD_OWNER_SUCCESS } from "../actions/actionTypes";

const initialOwner = "";
const ownerReducer = (owner = initialOwner, action) => {
  switch (action.type) {
    case OWNER_LOAD_OWNER_SUCCESS:
      return action.payload
    default:
      return owner;
  }
};

export default ownerReducer