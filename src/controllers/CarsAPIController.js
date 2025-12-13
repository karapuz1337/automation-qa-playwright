import BaseController from "./BaseController.js";

export default class CarsAPIController  extends BaseController {
  _CARS_PATH = "/api/cars";

  constructor(request) {
    super(request);
  }

  createCar(carData) {
    return this.request.post(this._CARS_PATH, {
      data: carData
    });
  }

  getCars() {
    return this.request.get(this._CARS_PATH);
  }
}
