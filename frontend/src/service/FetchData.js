import { BASE_URL } from "./sellPointURL";

export function PostData(type, userData, contentType = "application/json") {
  // fetches data from the given endpoint and returns the promise (responseJson)
  return new Promise((resolve, reject) => {
    const headers = {
      Accept: "application/json",
      // "Content-Type": contentType,
    };
    if (localStorage.getItem("token") != null) {
      headers.Authorization = "Token " + localStorage.getItem("token");
    }
    let body;
    if (contentType === "multipart/form-data") {
      body = userData;
    } else {
      headers["Content-Type"] = contentType;
      body = JSON.stringify(userData);
    }
    fetch(BASE_URL + type, {
      method: "POST",
      headers: headers,
      body: body,
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

export function GetData(type, userData = null) {
  // fetches data from the given endpoint and returns the promise (responseJson)
  let text;
  if (userData != null) {
    text = type + "/" + userData;
  } else {
    text = type;
  }
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + text, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => resolve(responseJson))
      .catch((error) => reject(error));
  });
}
