import { InventoryItem , ItemHandler, Item} from "./itemHandler";

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

    getShipments(): string[]  {

        return this.shipmentHandler.getShipments();
    }

    processShipments(): void {
        this.shipmentHandler.sendOutReady();
    }    
}



class ShipmentHandler {
    private shipments: Shipment[] = [];

    createShipment(items: Item[]) {
        const shipment: Shipment = new Shipment('Shipment' + this.shipments.length, items);
        this.shipments.push(shipment);
    }

    getShipments(): string[]{

        let shipmentInfo: string[] = [];
        this.shipments.forEach(shipment => {
            if (shipment.getStatus() == STATUS.READY)
            shipmentInfo.push(shipment.getName());
        })

        return shipmentInfo;

    }

    sendOutReady() {
        this.shipments.forEach(shipment => {
            if (shipment.getStatus() == STATUS.READY)
                shipment.setStatus(STATUS.PROCESSED);
        })
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

    constructor(name: string, items: Item[]) {
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

    getName(): string {
        return this.name  + ' with ' + this.items.length + ' items is ' + this.status;
    }


}


