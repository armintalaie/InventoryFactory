import { expect } from "chai";
import { InventoryHandler } from "../src/model/inventory";
import { Application } from "express";
import { WebServer } from "../src/controller";
import request from "supertest";
import { InventoryItem } from "../src/model/itemHandler";
import { v4 as UUID } from "uuid";
import { ShipmentInfo } from "../src/model/shipmentHandler";

describe("Server calls", () => {
  const webServer: WebServer = new WebServer();
  const app: Application = webServer.createServer();

  const port = 8080; // default port to listen
  const server = app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });

  describe("Creating item calls", () => {
    afterEach(() => {
      webServer.resetInventory();
    });
    it("Request /createItem should return new item", async () => {
      const result = await request(server)
        .post("/createItem")
        .set("Accept", "application/json")
        .send({ title: "apples", quantity: 4, description: "" });
      const item: InventoryItem = result.body as InventoryItem;
      expect(item.title).eql("apples");
      expect(item.quantity).eql(4);
      expect(item.description).eql("");
      expect(result.status).to.equal(200);
    });
  });

  it("Request /createItem should return nothing if item attributes are wrong", async () => {
    const result = await request(server)
      .post("/createItem")
      .set("Accept", "application/json")
      .send({ title: "apples", quantity: -2, description: "" });
    expect(result.body).eql({});
    expect(result.status).to.equal(400);
  });

  describe("Deleting item calls", () => {
    afterEach(() => {
      webServer.resetInventory();
    });

    it("should successfully delete item - 200", async () => {
      const result = await request(server)
        .post("/createItem")
        .set("Accept", "application/json")
        .send({ title: "apples", quantity: 4, description: "" });
      const item: InventoryItem = result.body as InventoryItem;
      const deleteResult = await request(server).get("/deleteItem/" + item.id);
      expect(deleteResult.status).to.equal(200);
    });

    it("should return 400 when item doens't exist", async () => {
      const deleteResult = await request(server).get("/deleteItem/" + UUID());

      expect(deleteResult.status).to.equal(400);
    });
  });

  describe("Updating item calls", () => {
    let inventory: InventoryHandler;
    beforeEach(() => {
      inventory = webServer.getInvntory();
    });

    afterEach(() => {
      webServer.resetInventory();
    });

    it("should successfully update item - 200", async () => {
      const item: InventoryItem = inventory.createItem({
        title: "apples",
        quantity: 4,
        description: "",
      });

      const result = await request(server)
        .post("/editItem/" + item.id)
        .set("Accept", "application/json")
        .send({ title: "apples", quantity: 41, description: "" });

      expect(result.status).to.equal(200);
      expect(inventory.getItem(item.id).quantity).equal(41);
    });

    it("should return 400 when item cannot be created", async () => {
      const result = await request(server)
        .post("/editItem/" + UUID())
        .set("Accept", "application/json")
        .send({ title: "apples", quantity: 41, description: "" });

      expect(result.status).to.equal(400);
    });
  });

  describe("Getting item calls", () => {
    let inventory: InventoryHandler;
    beforeEach(() => {
      inventory = webServer.getInvntory();
    });

    afterEach(() => {
      webServer.resetInventory();
    });

    it("should successfully get item - 200", async () => {
      const item: InventoryItem = inventory.createItem({
        title: "apples",
        quantity: 4,
        description: "",
      });

      const result = await request(server).get("/getItem/" + item.id);

      expect(result.status).to.equal(200);
      expect(result.body).eql(item);
    });

    it("should return 400 when item doens't exist", async () => {
      const result = await request(server).get("/getItem/" + UUID());

      expect(result.status).to.equal(400);
    });

    it("should successfully get items - 200", async () => {
      const item: InventoryItem = inventory.createItem({
        title: "apples",
        quantity: 4,
        description: "",
      });

      const item2: InventoryItem = inventory.createItem({
        title: "mangoess",
        quantity: 10,
        description: "mangoes",
      });

      const result = await request(server).get("/items");

      expect(result.body).eql([item, item2]);
    });
  });

  describe("Shipment calls", () => {
    let inventory: InventoryHandler;
    beforeEach(() => {
      inventory = webServer.getInvntory();
    });

    afterEach(() => {
      webServer.resetInventory();
    });
    it("should return 400 when shipment isn't created", async () => {
      const item: InventoryItem = inventory.createItem({
        title: "banana",
        quantity: 4,
        description: "",
      });
      const result = await request(server)
        .post("/createShipment")
        .set("Accept", "application/json")
        .send([{ id: item.id, quantity: 40, description: "" }]);

      expect(result.status).to.equal(400);
    });

    it("should return 200 when shipment is created", async () => {
      const item: InventoryItem = inventory.createItem({
        title: "banana",
        quantity: 4,
        description: "",
      });
      const result = await request(server)
        .post("/createShipment")
        .set("Accept", "application/json")
        .send([item]);
      expect(result.status).to.equal(200);
    });

    it("should return all shipments", async () => {
      const item: InventoryItem = inventory.createItem({
        title: "banana",
        quantity: 4,
        description: "",
      });

      inventory.hanldeShipmentRequest([
        { id: item.id, title: "banana", quantity: 1, description: "" },
      ]);
      const result = await request(server).get("/shipments/get");

      expect(result.body).eql(inventory.getShipments());
    });
    describe("Shipment process calls", () => {
      let inventory: InventoryHandler;
      beforeEach(() => {
        inventory = webServer.getInvntory();
      });

      afterEach(() => {
        webServer.resetInventory();
      });
      it("should return 200 if shipment exists", async () => {
        const item: InventoryItem = inventory.createItem({
          title: "banana",
          quantity: 4,
          description: "",
        });
        const shipmentInfo: ShipmentInfo = inventory.hanldeShipmentRequest([
          { id: item.id, title: "banana", quantity: 1, description: "" },
        ]);

        const result = await request(server).get(
          "/shipments/" + shipmentInfo.id + "/process"
        );
        expect(result.status).to.equal(200);
      });
      it("should return 400 if shipment does not exist", async () => {
        const result = await request(server).get(
          "/shipments/" + UUID() + "/process"
        );
        expect(result.status).to.equal(400);
      });
    });

    describe("Shipment discard calls", () => {
      let inventory: InventoryHandler;
      beforeEach(() => {
        inventory = webServer.getInvntory();
      });

      afterEach(() => {
        webServer.resetInventory();
      });
      it("should return 200 if shipment exists", async () => {
        const item: InventoryItem = inventory.createItem({
          title: "banana",
          quantity: 4,
          description: "",
        });
        const shipmentInfo: ShipmentInfo = inventory.hanldeShipmentRequest([
          { id: item.id, title: "banana", quantity: 1, description: "" },
        ]);

        const result = await request(server).get(
          "/shipments/" + shipmentInfo.id + "/discard"
        );
        expect(result.status).to.equal(200);
        expect(inventory.getShipments.length).equal(0);
      });
      it("should return 400 if shipment does not exist", async () => {
        const result = await request(server).get(
          "/shipments/" + UUID() + "/discard"
        );
        expect(result.status).to.equal(400);
      });
    });

    it("should return 200 when processing all shipments", async () => {
      const item: InventoryItem = inventory.createItem({
        title: "banana",
        quantity: 4,
        description: "",
      });
      inventory.hanldeShipmentRequest([
        { id: item.id, title: "banana", quantity: 1, description: "" },
      ]);

      inventory.hanldeShipmentRequest([
        { id: item.id, title: "banana", quantity: 2, description: "" },
      ]);

      const result = await request(server).get(
        "/shipments/processAllShipments"
      );
      expect(result.status).to.equal(200);
      expect(inventory.getShipments()).eql([]);
    });
  });

  it("should return list of API endpoints if URL does not match any", async () => {
    const validURLs: string[] = [
      "/createItem",
      "/deleteItem/:id",
      "/items",
      "/editItem/:id",
      "/getItem/:id",
      "/createShipment",
      "/shipments/get",
      "/shipments/process",
    ];

    const result = await request(server).get("/*");
    expect(result.body).eql(validURLs);
  });

  after(() => {
    server.close();
  });
});
