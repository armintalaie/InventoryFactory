import { ItemHandler, Item } from "./itemHandler";
import {ShipmentInfo, ShipmentHandler } from "./shipmentHandler";
import { v4 as UUID } from 'uuid';

export class InventoryHandler extends ItemHandler {
    private name: string = "Inventory";
    private shipmentHandler: ShipmentHandler;
    
    constructor(name?: string) {
        super();
        if (name)
            this.name = name;
        this.shipmentHandler = new ShipmentHandler();
    }

    hanldeShipmentRequest(items: Item[]): ShipmentInfo {
        if (this.inventorycheck(items)) {
            items.forEach(item => {
                this.removeItems(item);
            })
            return this.shipmentHandler.createShipment(items);
        } else {
            throw new Error('Failed inventory check');
        }
        
    }

    getShipments(): ShipmentInfo[]  {

        return this.shipmentHandler.getShipments();
    }

    processShipments(): void {
        this.shipmentHandler.processAllShipments();
    } 
    
    hanldeShipment(id: string, discard: boolean) {
    
        if (discard) {
            const items: Item[] = this.shipmentHandler.discardShipment(id);
            items.forEach(item => {
                this.addBack(item);
            });
        } else {
            this.shipmentHandler.processShipment(id);
        }
    }
}

