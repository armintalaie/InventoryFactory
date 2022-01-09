import { ItemHandler, Item } from "./itemHandler";
import { ShipmentInfo, ShipmentHandler } from "./shipmentHandler";

export class InventoryHandler extends ItemHandler {
  // private name: string = "Inventory";
  private shipmentHandler: ShipmentHandler;

  constructor() {
    super();
    this.shipmentHandler = new ShipmentHandler();
  }

  hanldeShipmentRequest(items: Item[]): ShipmentInfo {
    for (const item of items) {
      if (item.quantity <= 0) throw new Error("Failed inventory check");
    }
    if (items.length > 0 && this.inventorycheck(items)) {
      items.forEach((item) => {
        this.removeItems(item);
      });
      return this.shipmentHandler.createShipment(items);
    } else {
      throw new Error("Failed inventory check");
    }
  }

  getShipments(): ShipmentInfo[] {
    return this.shipmentHandler.getShipments();
  }

  processShipments(): void {
    this.shipmentHandler.processAllShipments();
  }

  hanldeShipment(id: string, discard: boolean) {
    if (this.getShipments().findIndex((shipment) => shipment.id == id) < 0) {
      throw new Error();
    }

    if (discard) {
      const items: Item[] = this.shipmentHandler.discardShipment(id);
      items.forEach((item) => {
        this.addBack(item);
      });
    } else {
      this.shipmentHandler.processShipment(id);
    }
  }
}
