import { InventoryItem, ItemHandler, Item } from "./itemHandler";
import { v4 as UUID } from 'uuid';

export class InventoryHandler extends ItemHandler {
    private name: string = "Inventory";
    private shipmentHandler: ShipmentHandler;
    private shipments: Shipment[] = [];
    
    
    constructor(name?: string) {
        super();
        if (name)
            this.name = name;
        this.shipmentHandler = new ShipmentHandler();
    }

    hanldeShipmentRequest(items: Item[]): boolean {
        if (this.inventorycheck(items)) {
            items.forEach(item => {
                this.removeItems(item);
            })
            this.shipmentHandler.createShipment(items);
            return true;
        } else {
            return false;
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



class ShipmentHandler {
    private shipments: Shipment[] = [];

    createShipment(items: Item[]) {
        const shipment: Shipment = new Shipment('Shipment' + this.shipments.length, items);
        this.shipments.push(shipment);
    }

    getShipments(): ShipmentInfo[]{

        let shipmentInfo: ShipmentInfo[] = [];
        this.shipments.forEach(shipment => {
            if (shipment.getStatus() == STATUS.READY)
            shipmentInfo.push(shipment.getInfo());
        })

        return shipmentInfo;

    }

    processAllShipments() {
        this.shipments.forEach(shipment => {
            if (shipment.getStatus() == STATUS.READY)
                shipment.setStatus(STATUS.PROCESSED);
        })
    }

    processShipment(id: string) {
        const shipmentIndex: number = this.shipments.findIndex(shipment => shipment.id === id);
        this.shipments[shipmentIndex].setStatus(STATUS.PROCESSED);
    }

    discardShipment(id: string): Item[] {
        const shipmentIndex: number = this.shipments.findIndex(shipment => shipment.id === id);
        const items: Item[] = this.shipments[shipmentIndex].getItems();
        this.shipments.splice(shipmentIndex, 1);
        return items;
    }
}


enum STATUS  {
    PROCESSED = "PROCESSED",
    READY = "READY TO BE SENT OUT",
}
class Shipment  {
    private status: STATUS = STATUS.READY;
    private items: Item[] = [];
    private name: string;
    readonly id: string;

    constructor(name: string, items: Item[]) {
        this.id =  UUID();
        this.name = name;
        this.items = items;
    }
    processShipment() { };
    
    getStatus(): STATUS {
        return this.status;
    }

    setStatus(status: STATUS): void {
        this.status = status;
    }

    getInfo(): ShipmentInfo {
        return { name: this.name + ' - ' + this.items.length + ' item(s)',id: this.id };
    }

    getItems(): Item[] {
        return this.items;
    }


}


export type ShipmentInfo = {
    name: string
    id: string
}