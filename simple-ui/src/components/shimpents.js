import { useEffect, useState } from "react";

function Shipment(props) {
  const [items, seItems] = useState([]);

  async function getShipments() {
    const res = await fetch("http://localhost:8080/shipments/get", {
      crossDomain: true,
      method: "GET",
    });
    const data = await res.json();
    seItems(data);
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
      <h4>Shipments</h4>
      <h5>
        click Process to confirm shipment OR Discard to delete shipment and add
        items back to the inventory{" "}
      </h5>

      {items.map((e) => {
        const id = e.id ? e.id : "No ID";
        return (
          <div className="shipmentItem" key={id}>
            <h5>{e}</h5>
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
      <div className="row">
        <button
          className="action"
          onClick={() => {
            processAllShipments();
            props.setToAdd(false);
          }}
        >
          Process All
        </button>
      </div>
    </div>
  );
}

export default Shipment;
