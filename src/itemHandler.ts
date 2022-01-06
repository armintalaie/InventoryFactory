import { v4 as UUID } from 'uuid';


export type Item =  {
    id?: string
    title: string;
    quantity: number;
    description?: string;
};



export abstract class ItemHandler {
    private items: InventoryItem[] = [];

    public createItem(item: Item): InventoryItem {
        const newItem: InventoryItem = new InventoryItem(item);
        this.items.push(newItem);
        return newItem;
    }

    public deleteItem(id: string): boolean {
        const itemIndex: number = this.items.findIndex(e => e.id === id);
        if (itemIndex >= 0) {
            this.items.splice(itemIndex,1);
            return true;
        } else {
            return false;
        }
    }

    public getItem(id: string): InventoryItem  | undefined {
        return this.items.find(e => e.id === id);
    }

    public editItem(item: Item): boolean{
        const itemIndex: number = this.items.findIndex(e => e.id === item.id);
        if (itemIndex >= 0) {
            this.items[itemIndex].quantity = item.quantity;
            this.items[itemIndex].title = item.title;
            return true;
        } else {
            return false;
        }
        return true;
    }

    public getItems(): InventoryItem[] {
        return this.items;
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

