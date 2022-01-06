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
        if (this.items.hasOwnProperty(item.id!)) {
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
