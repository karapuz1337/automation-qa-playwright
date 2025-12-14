import { withUserTest, expect } from "../../../src/fixtures/customFixtures/userFixture.js";
import CreateCarDTOFactory from "../../../src/domain/cars/factory/CreateCarDTOFactory.js";
import { test } from "@playwright/test";
import ApiClient from "../../../src/clients/ApiClient.js";

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
      expect(json.data, "Check that only one car is created").toHaveLength(1);
      expect(json.data[0], "Check that the created car corresponds to the test data").toMatchObject(carData);
    });

  });

  test("Should return 401 for unauthenticated user", async({ request }) => {
    // Test data
    const carData = CreateCarDTOFactory.FordMondeo(100).extract();

    await test.step("Attempt to create a car with an unauthenticated user", async() => {
      const apiClient = new ApiClient(request);
      const response = await apiClient.cars.createCar(carData);
      expect(response.status(), "Check status code").toBe(401);

      const json = await response.json();
      expect(json.status, "Check status in the response body").toBe("error");
      expect(json.message, "Check error message").toBe("Not authenticated");
    });

  });

  withUserTest("Should return 400 for missing mileage", async({ apiClient }) => {
    await withUserTest.step("Attempt to create a car with missing mileage", async() => {
      const carData = CreateCarDTOFactory.empty().
        setBrandId(1).
        setModelId(2).
        extract();

      const response = await apiClient.cars.createCar(carData);
      expect(response.status(), "Check status code").toBe(400);

      const json = await response.json();
      expect(json.status, "Check status in the response body").toBe("error");
      expect(json.message, "Check error message").toBe("Mileage is required");
    });
  });


});