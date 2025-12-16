export default class CreateCarDTO {
  constructor(carData) {
    this._carData = carData;
  }

  setBrandId(brandId) {
    this._carData.carBrandId = brandId;
    return this;
  }

  setModelId(modelId) {
    this._carData.carModelId = modelId;
    return this;
  }

  setMileage(mileage) {
    this._carData.mileage = mileage;
    return this;
  }

  extract() {
    return structuredClone(this._carData);
  }
}