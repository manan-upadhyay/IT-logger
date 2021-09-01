import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
  SET_CURRENT_TECH,
  CLEAR_CURRENT_TECH,
  UPDATE_TECH,
} from "../actions/types";

const initialState = {
  techs: null,
  loading: false,
  error: null,
  currentTech: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false,
      };
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        loading: false,
      };
    case UPDATE_TECH:
      return {
        ...state,
        techs: state.techs.map((tech) =>
          tech._id === action.payload._id ? action.payload : tech
        ),
      };
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter((tech) => tech._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT_TECH:
      return {
        ...state,
        currentTech: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_TECH:
      return {
        ...state,
        currentTech: null,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TECHS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
