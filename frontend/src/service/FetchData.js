import { BASE_URL } from "./sellPointURL";

export function PostPutData(
  type,
  userData,
  contentType = "application/json",
  method = "POST"
) {
  // post or puts data to the given endpoint and returns the promise (responseJson) of return data
  return new Promise((resolve, reject) => {
    const headers = {
      Accept: "application/json",
    };
    // if user is logged in, add token to authorization header
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
        //  check if response is in "good" range
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else {
          reject(response.status);
        }
      })
      .then((responseJson) => resolve(responseJson))
      .catch((error) => reject(error));
  });
}

export function GetData(type, userData = null) {
  // gets data from the given endpoint and returns the promise (responseJson)
  let text;
  if (userData != null) {
    text = type + "/" + userData;
  } else {
    text = type;
  }
  const headers = {
    Accept: "application/json",
  };
  // if user is logged in, add token to authorization header
  if (localStorage.getItem("token") != null) {
    headers.Authorization = "Token " + localStorage.getItem("token");
  }
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + text, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        //  check if response is in "good" range
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else {
          reject(response.status);
        }
      })
      .then((responseJson) => resolve(responseJson))
      .catch((error) => reject(error));
  });
}

export function DeleteData(type, userData = null) {
  // deletes data from the given endpoint and returns the promise (responseJson)
  let text;
  if (userData != null) {
    text = type + "/" + userData;
  } else {
    text = type;
  }
  const headers = {
    Accept: "application/json",
  };
  // if user is logged in, add token to authorization header
  if (localStorage.getItem("token") != null) {
    headers.Authorization = "Token " + localStorage.getItem("token");
  }
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + text, {
      method: "DELETE",
      headers: headers,
    })
      .then((response) => {
        //  check if response is in "good" range
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else {
          reject(response.status);
        }
      })
      .then((responseJson) => resolve(responseJson))
      .catch((error) => reject(error));
  });
}
