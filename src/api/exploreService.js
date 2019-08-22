// api/service.js

import axios from "axios";

export default class RatingService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/explore`,
      withCredentials: true
    });
    this.service = service;
  }

  errorHandler = err => {
    // console.error(err);
    throw err;
  };

  find(body) {
    return this.service
      .post("/profession  ", body)
      .then(res => res.data)
      .catch(this.errorHandler);
  }
}
