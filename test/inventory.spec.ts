import { assert, expect } from "chai";
import { InventoryHandler } from "../src/model/inventory";
import { ShipmentInfo } from "../src/model/shipmentHandler";
import { InventoryItem, Item } from "../src/model/itemHandler";
import { v4 as UUID } from 'uuid';


describe("Managing Inventory", () => {
    let inventory: InventoryHandler;

    before(() => {
        inventory = new InventoryHandler();
    });
    
  describe("Managing Inventory Items", () => {
    // it("should successfully get items", () => {
    //   assert.fail("Not implemented");
    // });
    describe("Creating Items", () => {
        it("should not create an item with a not positive quantity", () => {
            const item: Item = { title: 'mockItem', quantity: -10, description: '' };
            expect(() => inventory.createItem(item)).to.throw();
      });

      it("should successfully create item", () => {
          const item: Item = { title: 'mockItem', quantity: 5, description: '' };
          const inventoryItem: InventoryItem = inventory.createItem(item);
          expect(item.title).equal(item.title);
          expect(item.description).equal(item.description);
          expect(item.quantity).equal(item.quantity);
      });
    });

    describe("Deleting Items", () => {
        it("should successfully delete item", () => {
            const item: Item = { title: 'mockItem', quantity: 5, description: '' };
            const inventoryItem: InventoryItem = inventory.createItem(item);
            inventory.deleteItem(inventoryItem.id);
            expect(() => inventory.getItem(inventoryItem.id)).to.throw();
      });

      it("when deleting item should do nothing item doesn't exist", () => {
          const item: Item = { title: 'mockItem', quantity: 5, description: '' };
          const inventoryItem: InventoryItem = inventory.createItem(item);
          expect(inventory.deleteItem(UUID())).false;
      });
    });

    describe("Updating Items", () => {
      it("should successfully edit item", () => {
        const item: Item = { title: 'mockItem', quantity: 5, description: '' };
        const inventoryItem: InventoryItem = inventory.createItem(item);
        const updatedItem = { id: inventoryItem.id, title: inventoryItem.title, quantity: inventoryItem.quantity, description: inventoryItem.description };
        inventory.editItem(updatedItem);
        expect(inventory.getItem(inventoryItem.id)).to.eql(updatedItem);
          
      });

      it("when editing item should do nothing item doesn't exist", () => {
        const item: Item = { title: 'mockItem', quantity: 5, description: '' };
        const inventoryItem: InventoryItem = inventory.createItem(item);
        const updatedItem = { id: UUID(), title: inventoryItem.title, quantity: inventoryItem.quantity, description: inventoryItem.description };
        expect(inventory.editItem(updatedItem)).false;
        expect(inventory.getItem(inventoryItem.id)).to.equal(inventoryItem);
      });

        it("should successfully update item's quantity", () => {
        let item: Item = { title: 'mockItem', quantity: 5, description: '' };
        const inventoryItem: InventoryItem = inventory.createItem(item);
        item.quantity = 3;
        item.id = inventoryItem.id;
        expect(inventory.removeItems(item)).true;
        expect(inventory.getItem(inventoryItem.id).quantity).to.equal(2);

      });

      it("should delete item's if the adjusted quantity is not positive", () => {
        let item: Item = { title: 'mockItem', quantity: 5, description: '' };
        const inventoryItem: InventoryItem = inventory.createItem(item);
        item.quantity = 5;
        item.id = inventoryItem.id;
        inventory.removeItems(item);
        expect(() => inventory.getItem(item.id!)).to.throw();
      });

      it("should not do anything when trying to remove count from an item that doesn't exist", () => {
        let item: Item = { id: UUID(),title: 'mockItem', quantity: 5, description: '' };
        expect(inventory.removeItems(item)).false;
        expect(() => inventory.getItem(item.id!)).to.throw();
      });

      it("should successfully add back item's quantity", () => {
        let item: Item = { title: 'mockItem', quantity: 5, description: '' };
        const inventoryItem: InventoryItem = inventory.createItem(item);
        item.quantity = 3;
        item.id = inventoryItem.id;
          inventory.addBack(item);
          expect(inventory.getItem(inventoryItem.id).quantity).to.equal(8);
      });

      it("should successfully add back item with quantity if item no longer exists", () => {
       
          let item: Item = { title: 'mockItem', quantity: 5, description: '' };
          const inventoryItem: InventoryItem = inventory.createItem(item);
          item.quantity = 3;
          item.id = inventoryItem.id;
          inventory.deleteItem(inventoryItem.id);
          inventory.addBack(item);
          expect(inventory.getItem(inventoryItem.id)).to.eql(item);
      });

      it("should not do anything when adding back item doesn't have a positive quantity", () => {
        assert.fail("Not implemented");
      });

      it("should return false when at least one item isn't in inventory", () => {
          let item: Item = {  title: 'mockItem', quantity: 5, description: '' };
          let item2: Item = {id: UUID(), title: 'mockItem2', quantity: 10, description: '' };
          const inventoryItem: InventoryItem = inventory.createItem(item);
          expect(inventory.inventorycheck([inventoryItem, item2 ])).false;
      });

      it("should return false when at least one item has a lesser quantity", () => {
        let item: Item = { title: 'mockItem', quantity: 5, description: '' };
        let item2: Item = { title: 'mockItem2', quantity: 10, description: '' };
          const inventoryItem: InventoryItem = inventory.createItem(item);
          item.id = inventoryItem.id;
          item.quantity  = 6
        inventory.createItem(item2);
        expect(inventory.inventorycheck([item,item2])).false;
      });

      it("should return true when all items asked are in inventory and in stock", () => {
        let item: Item = { title: 'mockItem', quantity: 5, description: '' };
        let item2: Item = { title: 'mockItem2', quantity: 10, description: '' };
          const inventoryItem: InventoryItem = inventory.createItem(item);
          const inventoryItem2: InventoryItem = inventory.createItem(item2);
        expect(inventory.inventorycheck([inventoryItem, inventoryItem2])).true;
      });
    });
  });

  describe("Managing Shipments", () => {
    describe("creating shipments", () => {
      it("should successfully create a shipment", () => {
        let item: Item = { title: 'mockItem', quantity: 5, description: '' };
        let item2: Item = { title: 'mockItem2', quantity: 10, description: '' };
          const inventoryItem: InventoryItem = inventory.createItem(item);
          const inventoryItem2: InventoryItem = inventory.createItem(item2);
          item.id = inventoryItem.id;
          item.quantity = 1;
          item2.id = inventoryItem2.id;
          expect(() => inventory.hanldeShipmentRequest([item, item2])).to.not.throw();
      });

      it("should not create a shipment if at least one of the items does not meet the quantity", () => {
        let item: Item = { title: 'mockItem', quantity: 5, description: '' };
        let item2: Item = { title: 'mockItem2', quantity: 10, description: '' };
          const inventoryItem: InventoryItem = inventory.createItem(item);
          const inventoryItem2: InventoryItem = inventory.createItem(item2);
          item.id = inventoryItem.id;
          item.quantity = 11;
          item2.id = inventoryItem2.id;
          expect(() => inventory.hanldeShipmentRequest([item, item2])).to.throw();
      });

      it("should not create a shipment if at least one of the items is not in inventory", () => {
        let item: Item = { title: 'mockItem', quantity: 5, description: '' };
        let item2: Item = { id: UUID(),title: 'mockItem2', quantity: 10, description: '' };
          const inventoryItem: InventoryItem = inventory.createItem(item);
          item.id = inventoryItem.id;
          item.quantity = 1;
          expect(() => inventory.hanldeShipmentRequest([item, item2])).to.throw();
      });
    });

    describe("handling shipments", () => {
      it("should successfully process a shipment", () => {
        let item: Item = { title: 'mockItem', quantity: 5, description: '' };
        let item2: Item = { title: 'mockItem2', quantity: 10, description: '' };
          const inventoryItem: InventoryItem = inventory.createItem(item);
          const inventoryItem2: InventoryItem = inventory.createItem(item2);
          item.id = inventoryItem.id;
          item.quantity = 1;
          item2.id = inventoryItem2.id;
          const shipmentInfo: ShipmentInfo = inventory.hanldeShipmentRequest([item, item2]);
          inventory.hanldeShipment(shipmentInfo.id, false);
          const shipments: ShipmentInfo[] = inventory.getShipments();
          expect(shipments.find(shipment => { return shipment.id == shipmentInfo.id })).eql(undefined);
          
      });

      it("should successfully process all shipments available", () => {
        assert.fail("Not implemented");
      });

      it("should do nothing if shipment does not exist", () => {
        assert.fail("Not implemented");
      });

      it("should successfully discard a shipment and add items back", () => {
        assert.fail("Not implemented");
      });

    //   it("should successfully get all shipments", () => {
    //     assert.fail("Not implemented");
    //   });
    });
  });
});
