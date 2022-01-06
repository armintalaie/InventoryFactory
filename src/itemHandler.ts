import { v4 as UUID } from 'uuid';

export type Item =  {
    id?: string
    title: string;
    quantity: number;
    description?: string;
};

export abstract class ItemHandler {
    private items: { [id: string]: InventoryItem } = {};

    public createItem(item: Item): InventoryItem {
        const newItem: InventoryItem = new InventoryItem(item);
        this.items[newItem.id] = newItem;
        return newItem;
    }

    public deleteItem(id: string): boolean {
        if (!this.items.hasOwnProperty(id))
            return false;

        delete this.items[id];
        return true;
       
    }

    public getItem(id: string): InventoryItem  {
        return this.items[id];
    }

    public editItem(item: Item): boolean{
        const id: string = item.id!;
        console.log(id);
        if (this.items.hasOwnProperty(id)) {
            console.log(id);
            let editableItem: InventoryItem = this.getItem(item.id!);
            editableItem.quantity = item.quantity;
            editableItem.title = item.title;
            editableItem.description = item.description!;

            return true;
        } else {
            return false;
        }
        return true;
    }

    public getItems(): InventoryItem[] {
        return Object.values<InventoryItem>(this.items);
    }

    public inventorycheck(items: Item[]): boolean {

        for (let item of items) {
            if (!this.items.hasOwnProperty(item.id!) || this.items[item.id!].quantity < item.quantity) { 
                return false;
            } 
        }
        return true;
    }

    public removeItems(item: Item): boolean {
        if (this.items.hasOwnProperty(item.id!)) {
            let editableItem: InventoryItem = this.getItem(item.id!);
            if (editableItem.quantity - item.quantity <= 0) {
                return this.deleteItem(item.id!);
            } else {
                editableItem.quantity = editableItem.quantity - item.quantity;
                return true;
            }
        }
        return false;

    }


}

export class InventoryItem {
    public title: string;
    public description?: string;
    public quantity: number;
    public id: string = UUID();

    constructor(item: Item) {
        this.title = item.title;
        this.quantity = item.quantity;
    }

    
}
