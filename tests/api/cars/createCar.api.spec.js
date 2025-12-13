import { withUserTest, expect } from "../../../src/fixtures/customFixtures/userFixture.js";
import CreateCarDTOFactory from "../../../src/domain/cars/factory/CreateCarDTOFactory.js";

withUserTest.describe("API - POST /cars", () => {

  withUserTest("Should create a car with valid data", async({ apiClient }) => {
    // Test data
    const carData = CreateCarDTOFactory.AudiR8(10000).extract();

    await withUserTest.step("Create a car", async() => {
      const response = await apiClient.cars.createCar(carData);

      await expect(response).toBeOK();
    });

    await withUserTest.step("Check that the car is created", async() => {
      const response = await apiClient.cars.getCars();
      await expect(response, "Check status code").toBeOK();
      const json = await response.json();
      await expect(json.data, "Check that only one car is created").toHaveLength(1);
      await expect(json.data[0], "Check that the created car corresponds to the test data").toMatchObject(carData);
    });

  });
});