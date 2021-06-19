import {
  OWNER_LOAD_OWNER_INFO_SUCCESS,
  OWNER_LOAD_OWNER_SUCCESS,
} from "../modules/Header/actions/actionTypes";

const initialOwner = {
  id: "",
  name: "",
  surname: "",
};
const ownerReducer = (owner = initialOwner, action) => {
  switch (action.type) {
    case OWNER_LOAD_OWNER_SUCCESS:
      return {
        ...owner,
        id: action.payload,
      };
    case OWNER_LOAD_OWNER_INFO_SUCCESS:
      return {
        ...owner,
        name: action.payload.name,
        surname: action.payload.surname,
      };
    default:
      return owner;
  }
};

export default ownerReducer;
