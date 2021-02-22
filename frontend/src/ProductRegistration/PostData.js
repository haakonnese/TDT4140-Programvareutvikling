import { BASE_URL } from "./sellPointURL";

export function PostData(type, userData) {
  // fetches data from the given endpoint and returns the promise (responseJson)
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + type, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok || response.created) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((responseJson) => resolve(responseJson))
      .catch((error) => reject(error));
  });
}
