// api/service.js

import axios from "axios";

export default class RatingService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/rating`,
      withCredentials: true
    });
    this.service = service;
  }

  errorHandler = err => {
    // console.error(err);
    throw err;
  };

  user(body) {
    return this.service
      .post("/user", body)
      .then(res => res.data)
      .catch(this.errorHandler);
  }

  update(body) {
    return this.service
      .post("/update", body)
      .then(res => res.data)
      .catch(this.errorHandler);
  }
}
