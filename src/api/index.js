import Alert from "../utils/Alert";
import instance from "./instance";

const REQUEST_HEADER = (access_token) => {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      token: `Bearer ${access_token}`,
      //   "x-id-token": id_token,
    },
  };
};

const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

// ERROR HANDLER
const handleError = (error) => {
  if (error && error.response && error.response.status) {
    console.error(error);

    switch (error.response.status) {
      case 400:
        Alert(
          error.response.data.error.message,
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
        break;
      case 401:
        Alert(
          error.response.data.error.message,
          "",
          logout(),
          false,
          () => {},
          logout(),
          true,
          "Ok"
        );
        break;
      case 403:
        Alert(
          error.response.data.error.message,
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
        break;
      case 404:
        Alert(
          error.response.data.error.message,
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
        break;
      case 500:
        Alert(
          error.response.data.error.message,
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
        break;
      case 502:
        Alert(
          "Server error",
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
        break;
      default:
        Alert(
          "Something went wrong. Please try again after some time.",
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
    }
  } else {
    Alert(
      "Something went wrong. Please try again after some time.",
      "",
      () => {},
      false,
      () => {},
      () => {},
      true,
      "Ok"
    );
  }
};

// login
const login = async (path, data) => {
  let response = await instance.post(path, data).catch(handleError);

  if (response && response.data && response.status === 200) {
    return response.data;
  } else if (response && response.status && response.status === 400) {
    return response;
  } else if (response && response.status && response.status === 500) {
    return response;
  } else {
    return response;
  }
};

const logout = () => {
  localStorage.removeItem("access_token");
  window.location.reload();
};

// GET method API function
const getData = async (path) => {
  let header = REQUEST_HEADER(getAccessToken());

  let response = await instance.get(path, header).catch(handleError);
  if (response && response.data && response.status && response.status === 200) {
    return response.data;
  } else if (response && response.status && response.status === 400) {
    return response;
  } else if (response && response.status && response.status === 500) {
    return response;
  } else {
    return null;
  }
};

// PUT method API function
const putData = async (path, data) => {
  let header = REQUEST_HEADER(getAccessToken());

  let response = await instance.put(path, data, header).catch(handleError);
  if (response && response.data && response.status === 200) {
    return response.data;
  } else if (response && response.status && response.status === 400) {
    return response;
  } else if (response && response.status && response.status === 500) {
    return response;
  } else {
    return null;
  }
};

// POST method API function
const postData = async (path, data) => {
  let header = REQUEST_HEADER(getAccessToken());

  let response = await instance.post(path, data, header).catch(handleError);

  if (response && response.data && response.status === 200) {
    return response.data;
  } else if (response && response.status && response.status === 400) {
    return response;
  } else if (response && response.status && response.status === 500) {
    return response;
  } else {
    return null;
  }
};

export { getData, putData, postData, login, logout };