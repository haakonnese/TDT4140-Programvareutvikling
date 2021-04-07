// Redusere slik at man slipper å sende med props til
// komponenter via-via når man trenger propen i en child
import { combineReducers, createStore } from "redux";

// kategori
function categoryReducer(state = [], action = "DEFAULT_CATEGORY") {
  switch (action.type) {
    case "UPDATE_CATEGORY":
      return action.payload;
    default:
      return state;
  }
}

// default filter
export const filter = {
  min: false,
  max: false,
  category: null,
  city: null,
};

// filter
function filterReducer(state = filter, action = "DEFAULT_FILTER") {
  switch (action.type) {
    case "UPDATE_FILTER":
      return action.payload;
    default:
      return state;
  }
}

// logget inn
function loggedInReducer(state = false, action = "DEFAULT_LOGGED_IN") {
  switch (action.type) {
    case "UPDATE_LOGGED_IN":
      // fjern token dersom man logger ut
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
