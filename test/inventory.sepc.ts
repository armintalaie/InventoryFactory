import { assert, expect } from "chai";

describe("Managing Inventory", () => {
  describe("Managing Inventory Items", () => {
    it("should successfully get items", () => {
      assert.fail("Not implemented");
    });
    describe("Creating Items", () => {
      it("should not create an item with a not positive quantity", () => {
        assert.fail("Not implemented");
      });

      it("should successfully create item", () => {
        assert.fail("Not implemented");
      });
    });

    describe("Deleting Items", () => {
      it("should successfully delete item", () => {
        assert.fail("Not implemented");
      });

      it("when deleting item should do nothing item doesn't exist", () => {
        assert.fail("Not implemented");
      });
    });

    describe("Updating Items", () => {
      it("should successfully edit item", () => {
        assert.fail("Not implemented");
      });

      it("when editing item should do nothing item doesn't exist", () => {
        assert.fail("Not implemented");
      });

      it("should successfully update item's quantity", () => {
        assert.fail("Not implemented");
      });

      it("should delete item's if the adjusted quantity is not positive", () => {
        assert.fail("Not implemented");
      });

      it("should not do anything when trying to remove count from an item that doesn't exist", () => {
        assert.fail("Not implemented");
      });

      it("should successfully add back item's quantity", () => {
        assert.fail("Not implemented");
      });

      it("should successfully add back item with quantity if item no longer exists", () => {
        assert.fail("Not implemented");
      });

      it("should not do anything when adding back item doesn't have a positive quantity", () => {
        assert.fail("Not implemented");
      });

      it("should return false when at least one item isn't in inventory", () => {
        assert.fail("Not implemented");
      });

      it("should return false when at least one item has a lesser quaantity", () => {
        assert.fail("Not implemented");
      });

      it("should return true when all items asked are in inventory and in stock", () => {
        assert.fail("Not implemented");
      });
    });
  });

  describe("Managing Shipments", () => {
    describe("creating shipments", () => {
      it("should successfully create a shipment", () => {
        assert.fail("Not implemented");
      });

      it("should not create a shipment if at least one of the items does not meet the quantity", () => {
        assert.fail("Not implemented");
      });

      it("should not create a shipment if at least one of the items is not in inventory", () => {
        assert.fail("Not implemented");
      });
    });

    describe("handling shipments", () => {
      it("should successfully process a shipment", () => {
        assert.fail("Not implemented");
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

      it("should successfully get all shipments", () => {
        assert.fail("Not implemented");
      });
    });
  });
});
