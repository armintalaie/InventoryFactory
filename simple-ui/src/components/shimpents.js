import { useEffect, useState } from "react";

function Shipment(props) {
  const [items, seItems] = useState([]);
  const [count, setCount] = useState(0);

  async function getShipments() {
    const res = await fetch("http://localhost:8080/shipments/get", {
      crossDomain: true,
      method: "GET",
    });

    const data = await res.json();
    console.log(data);
    const newItems = [];

    for (const entry in data) {
      newItems.push([data[entry].name, data[entry].id]);
    }

    seItems(newItems);
    setCount(items.length);
  }

  async function discardShipment(shipmentId) {
    const res = await fetch(
      "http://localhost:8080/shipments/" + shipmentId + "/discard",
      {
        crossDomain: true,
        method: "GET",
      }
    );
    getShipments();
  }

  async function processShipment(shipmentId) {
    const res = await fetch(
      "http://localhost:8080/shipments/" + shipmentId + "/process",
      {
        crossDomain: true,
        method: "GET",
      }
    );
    const data = await res.json();
    seItems(data);

    getShipments();
  }

  async function processAllShipments() {
    const res = await fetch(
      "http://localhost:8080/shipments/processAllShipments",
      {
        crossDomain: true,
        method: "GET",
      }
    );

    getShipments();
  }

  useEffect(() => {
    getShipments();
  }, []);

  return (
    <div className="">
      <div class="header">
        <h4>Shipments</h4>
        <button
          className="action"
          disabled={count > 0 ? false : true}
          onClick={() => {
            processAllShipments();
            props.setToAdd(false);
          }}
        >
          Process All
        </button>
      </div>
      <h5>
        click Process to confirm shipment OR Discard to delete shipment and add
        items back to the inventory{" "}
      </h5>

      {items.map((e) => {
        const id = e[1] ? e[1] : "No ID";
        return (
          <div className="shipmentItem" key={id}>
            <h5>{e[0]}</h5>
            <div className="row">
              <button
                className="action"
                onClick={() => {
                  processShipment(id);
                  props.setToAdd(false);
                }}
              >
                Process
              </button>
              <button
                className=""
                onClick={() => {
                  discardShipment(id);
                  props.setToAdd(false);
                }}
              >
                Discard
              </button>
            </div>
          </div>
        );
      })}
      <div className="row"></div>
    </div>
  );
}

export default Shipment;
