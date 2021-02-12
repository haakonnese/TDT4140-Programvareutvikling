import { BASE_URL } from "./sellPointURL";

export default function PostData(type, userData) {
  // fetches data from the given endpoint and returns the promise (responseJson)
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + type, {
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((responseJson) => resolve(responseJson))
      .catch((error) => reject(error));
  });
}
