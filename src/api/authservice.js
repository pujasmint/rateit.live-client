// api/service.js

import axios from "axios";

export default class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true
    });
    this.service = service;
  }

  errorHandler = err => {
    // console.error(err);
    throw err;
  };

  signUp(body) {
    const data = new FormData();
    Object.keys(body).forEach(key => data.append(key, body[key]));
    return this.service
      .post("/signup", data)
      .then(res => res.data)
      .catch(this.errorHandler);
  }

  getLoggedInUser() {
    return this.service
      .get("/loggedin")
      .then(res => res.data)
      .catch(this.errorHandler);
  }

  logIn(data) {
    return this.service
      .post("/login", data)
      .then(res => res.data)
      .catch(this.errorHandler);
  }

  logOut() {
    return this.service
      .post("/logout", {})
      .then(res => res.data)
      .catch(this.errorHandler);
  }
}
