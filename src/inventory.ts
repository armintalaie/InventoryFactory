import { InventoryItem , ItemHandler, Item} from "./itemHandler";

export class InventoryHandler extends ItemHandler {
    private name: string = "Inventory";
    
    constructor(name?: string) {
        super();
        if (name)
            this.name = name;
    }

    
}



