import { combineReducers, createStore } from "redux";

function categoryReducer(state = [], action = "DEFAULT_CATEGORY") {
  switch (action.type) {
    case "UPDATE_CATEGORY":
      return action.payload;
    default:
      return state;
  }
}
export const filter = {
  min: false,
  max: false,
  category: null,
  city: null,
};
function filterReducer(state = filter, action = "DEFAULT_FILTER") {
  switch (action.type) {
    case "UPDATE_FILTER":
      return action.payload;
    default:
      return state;
  }
}

function loggedInReducer(state = false, action = "DEFAULT_LOGGED_IN") {
  switch (action.type) {
    case "UPDATE_LOGGED_IN":
      if (action.payload === false) {
        localStorage.removeItem("token");
      }
      return action.payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  categories: categoryReducer,
  filter: filterReducer,
  loggedIn: loggedInReducer,
});
export default createStore(rootReducer);
