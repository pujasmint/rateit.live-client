// api/service.js

import axios from "axios";

export default class SessionService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/session`,
      withCredentials: true
    });
    this.service = service;
  }

  errorHandler = err => {
    // console.error(err);
    throw err;
  };

  create(body) {
    return this.service
      .post("/create", body)
      .then(res => res.data)
      .catch(this.errorHandler);
  }

  update(body) {
    return this.service
      .post("/update", body)
      .then(res => res.data)
      .catch(this.errorHandler);
  }

  finish(body) {
    return this.service
      .post("/finish", body)
      .then(res => res.data)
      .catch(this.errorHandler);
  }
}
