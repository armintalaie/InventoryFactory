import { useEffect, useState } from "react";
import Item from "./item";

function Shipment(props) {
  const [quantity, setQuantity] = useState(0);

  const [items, seItems] = useState([]);

  async function getItems() {
    const res = await fetch("http://localhost:8080/shipments/get", {
      crossDomain: true,
      method: "GET",
    });
    const data = await res.json();
    seItems(data);
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="">
      <h4>Shipments</h4>

      {items.map((e) => {
        return (
          <div className="shipmentItem" key={e.id}>
            <h5>{e}</h5>
            <button
              className=""
              onClick={() => {
                props.setToAdd(false);
              }}
            >
              Process
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Shipment;
