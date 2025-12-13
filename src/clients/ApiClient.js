import CarsAPIController from "../controllers/CarsAPIController.js";

export default class ApiClient {
  constructor(request) {
    this.cars = new CarsAPIController(request);
  }
}