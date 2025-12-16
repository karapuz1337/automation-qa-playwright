import CreateCarDTO from "../dto/CreateCarDTO.js";

export default class CreateCarDTOFactory {
  static empty() {
    return new CreateCarDTO({});
  }

  static AudiR8(mileage = 0) {
    return new CreateCarDTO({
      carBrandId: 1,
      carModelId: 2,
      mileage
    });
  }

  static FordMondeo(mileage = 0) {
    return new CreateCarDTO({
      carBrandId: 3,
      carModelId: 14,
      mileage
    });
  }

  static FiatScudo(mileage = 0) {
    return new CreateCarDTO({
      carBrandId: 5,
      carModelId: 23,
      mileage
    });
  }

}