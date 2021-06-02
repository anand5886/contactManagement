import { Component } from "react";
import { trackPromise } from "react-promise-tracker";
class Service extends Component {
  state = {
    loadingStatus: true,
  };
  componentDidMount() {
    this.setState({
      UserID: localStorage.username,
    });
  }

  GetData = (url, tenantId = "") => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        tenantId: tenantId,
        userId: localStorage.username,
        Authorization: localStorage.token,
      },
    };
    return trackPromise(
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
    );
  };
  PostHandler(url, body, tenantId = "") {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        tenantId: tenantId,
        userId: localStorage.username,
        Authorization: localStorage.token,
      },
      body: body,
    };
    return trackPromise(
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        })
    );
  }
}
export const Services = new Service();
