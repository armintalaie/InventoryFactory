import { useEffect, useState } from "react";

function NewShipment(props) {
  const [items, seItems] = useState([]);

  async function getItems() {
    const res = await fetch("http://localhost:8080/items", {
      crossDomain: true,
      method: "GET",
    });
    const data = await res.json();
    seItems(data);
  }

  async function createShipment() {
    const res = await fetch("http://localhost:8080/createShipment", {
      headers: { "Content-Type": "application/json" },
      crossDomain: true,
      body: JSON.stringify(items),
      method: "POST",
    });
    const data = await res.json();
    seItems(data);
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="shipment">
      <h4>New Shipment</h4>
      <h6>Add Items to shipment</h6>
      <hr></hr>
      {items.map((e) => {
        return (
          <div className="shipmentItem" key={e.id}>
            <h5>{e.title}</h5>

            <input
              placeholder="how many"
              type="number"
              onChange={(o) => {
                e.quantity = parseInt(o.target.value);
              }}
            ></input>
          </div>
        );
      })}

      <div className="row space">
        <button
          className="action"
          onClick={() => {
            createShipment();
            props.setToAdd(false);
          }}
        >
          Create Shipment
        </button>
        <button
          className=""
          onClick={() => {
            props.setToAdd(false);
          }}
        >
          Cancel
        </button>
      </div>
      <h6>If an item is not in stock the shipment won't be created</h6>
    </div>
  );
}

export default NewShipment;
