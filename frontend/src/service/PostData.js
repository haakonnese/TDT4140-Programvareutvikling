export function PostData(type, userData) {
  const BASE_URL = "";

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
