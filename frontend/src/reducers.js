import { combineReducers, createStore } from "redux";

function categoryReducer(
  state = [{ category: "" }],
  action = "DEFAULT_CATEGORY"
) {
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
const rootReducer = combineReducers({
  categories: categoryReducer,
  filter: filterReducer,
});
export default createStore(rootReducer);