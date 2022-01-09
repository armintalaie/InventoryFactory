import { v4 as UUID } from "uuid";

export type Item = {
  title: string;
  quantity: number;
  description?: string;
  id?: string;
};

export abstract class ItemHandler {
  private items: { [id: string]: InventoryItem } = {};

  public createItem(item: Item): InventoryItem {
    if (item.quantity <= 0)
      throw new TypeError("Item quantity must be positive");
    const newItem: InventoryItem = new InventoryItem(item);
    this.items[newItem.id] = newItem;
    return newItem;
  }

  public deleteItem(id: string): boolean {
    if (!Object.prototype.hasOwnProperty.call(this.items, id)) return false;

    delete this.items[id];
    return true;
  }

  public getItem(id: string): InventoryItem {
    if (!Object.prototype.hasOwnProperty.call(this.items, id))
      throw new Error("item doesn't exist");
    return this.items[id];
  }

  public editItem(item: Item): boolean {
    const id: string = item.id!;
    if (Object.prototype.hasOwnProperty.call(this.items, id)) {
      const editableItem: InventoryItem = this.getItem(item.id!);
      editableItem.quantity = item.quantity;
      editableItem.title = item.title;
      editableItem.description = item.description!;

      return true;
    } else {
      throw new Error("Item doesn't exist");
    }
  }

  public getItems(): InventoryItem[] {
    return Object.values<InventoryItem>(this.items);
  }

  public inventorycheck(items: Item[]): boolean {
    for (const item of items) {
      if (
        !Object.prototype.hasOwnProperty.call(this.items, item.id!) ||
        this.items[item.id!].quantity < item.quantity
      ) {
        return false;
      }
    }
    return true;
  }

  public removeItems(item: Item): boolean {
    if (Object.prototype.hasOwnProperty.call(this.items, item.id!)) {
      const editableItem: InventoryItem = this.getItem(item.id!);
      if (editableItem.quantity - item.quantity <= 0) {
        return this.deleteItem(item.id!);
      } else {
        editableItem.quantity = editableItem.quantity - item.quantity;
        return true;
      }
    }
    return false;
  }

  public addBack(item: Item) {
    if (Object.prototype.hasOwnProperty.call(this.items, item.id!)) {
      const editableItem: InventoryItem = this.getItem(item.id!);
      editableItem.quantity = editableItem.quantity + item.quantity;
    } else {
      this.createItem(item);
    }
  }
}

export class InventoryItem {
  public title: string;
  public description?: string;
  public quantity: number;
  public id: string = UUID();

  constructor(item: Item) {
    if (item.id) this.id = item.id;
    this.title = item.title;
    this.quantity = item.quantity;
    this.description = item.description;
  }
}
