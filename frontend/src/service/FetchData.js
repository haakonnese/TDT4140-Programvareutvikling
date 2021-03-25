import { BASE_URL } from "./sellPointURL";

export function PostPutData(
  type,
  userData,
  contentType = "application/json",
  method = "POST"
) {
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
      method: method,
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
  const headers = {
    Accept: "application/json",
  };
  if (localStorage.getItem("token") != null) {
    headers.Authorization = "Token " + localStorage.getItem("token");
  }
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + text, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((responseJson) => resolve(responseJson))
      .catch((error) => reject(error));
  });
}

export function PostPutData(
  type,
  userData,
  contentType = "application/json",
  method = "POST"
) {
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
      method: method,
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
