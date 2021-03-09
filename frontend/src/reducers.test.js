import store, { filter } from "./reducers";

describe("category reducer", () => {
  it("should return the initial state", () => {
    expect(store.getState().categories).toEqual([
      {
        category: "",
      },
    ]);
  });

  it("should handle UPDATE_CATEGORY", () => {
    store.dispatch({
      type: "UPDATE_CATEGORY",
      payload: [{ category: "Leker" }],
    });
    expect(store.getState().categories).toEqual([
      {
        category: "Leker",
      },
    ]);
  });
});

describe("filter reducer", () => {
  it("should return the initial state", () => {
    expect(store.getState().filter).toEqual(filter);
  });

  it("should handle UPDATE_FILTER", () => {
    filter.minimum = 100;
    filter.maximum = 200;
    filter.city = "Oslo";
    store.dispatch({
      type: "UPDATE_FILTER",
      payload: filter,
    });
    expect(store.getState().filter).toEqual(filter);
  });
});
