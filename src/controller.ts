import cors from "cors";
import express, { Application } from "express";
import { InventoryHandler } from "./model/inventory";
import { ShipmentInfo } from "./model/shipmentHandler";
import { InventoryItem, Item } from "./model/itemHandler";

export class WebServer {
  private inventory: InventoryHandler = new InventoryHandler();

  public createServer() {
    const app: Application = express();

    app.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
    app.use(express.json());

    app.post("/createItem", (req, res) => {
      const title: string = req.body.title as string;
      const quantity: number = req.body.quantity as number;
      const description: string = req.body.description as string;
      try {
        const ret: InventoryItem = this.inventory.createItem({
          title,
          quantity,
          description,
        });
        res.send(ret);
      } catch (error) {
        res.sendStatus(400);
      }
    });

    app.get("/deleteItem/:id", (req, res) => {
      const id: string = req.params.id as string;
      const ret: boolean = this.inventory.deleteItem(id);
      if (ret) res.sendStatus(200);
      else res.status(400).send("NOT FOUND");
    });

    app.get("/items", (req, res) => {
      const ret: InventoryItem[] = this.inventory.getItems();
      res.send(ret);
    });

    app.post("/editItem/:id", (req, res) => {
      const id: string = req.params.id as string;
      const title: string = req.body.title as string;
      const quantity: number = req.body.quantity as number;
      const description: string = req.body.description as string;
      try {
        const result: boolean = this.inventory.editItem({
          id: id,
          title: title,
          quantity: quantity,
          description: description,
        });
        res.status(200);
        res.send(result);
      } catch (error) {
        res.sendStatus(400);
      }
    });

    app.get("/getItem/:id", (req, res) => {
      const id: string = req.params.id as string;
      try {
        const ret: InventoryItem = this.inventory.getItem(id);
        res.status(200);
        res.send(ret);
      } catch (error) {
        res.sendStatus(400);
      }
    });

    // HANDLING SHIPMENTS

    app.post("/createShipment", (req, res) => {
      try {
        const items: Item[] = req.body as Item[];
        this.inventory.hanldeShipmentRequest(items);
        res.sendStatus(200);
      } catch (error) {
        res.status(400).send("failed to create shipment");
      }
    });

    app.get("/shipments/get", (req, res) => {
      const ret: ShipmentInfo[] = this.inventory.getShipments();
      res.send(ret);
    });

    app.get("/shipments/processAllShipments", (req, res) => {
      this.inventory.processShipments();
      res.sendStatus(200);
    });

    app.get("/shipments/:id/discard", (req, res) => {
      try {
        const id: string = req.params.id;
        this.inventory.hanldeShipment(id, true);
        res.sendStatus(200);
      } catch (error) {
        res.sendStatus(400);
      }
    });

    app.get("/shipments/:id/process", (req, res) => {
      try {
        const id: string = req.params.id;
        this.inventory.hanldeShipment(id, false);
        res.sendStatus(200);
      } catch (error) {
        res.sendStatus(400);
      }
    });

    app.get("/*", (req, res) => {
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
      res.send(validURLs);
    });

    return app;
  }

  getInvntory(): InventoryHandler {
    return this.inventory;
  }

  resetInventory(): void {
    this.inventory = new InventoryHandler();
  }
}
