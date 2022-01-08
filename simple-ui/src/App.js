import "./App.css";
import AddItem from "./components/addItem";
import Item from "./components/item";
import { useEffect, useState } from "react";
import NewShipment from "./components/newShipment";
import Shipment from "./components/shimpents";

function App() {
  const [action, setAction] = useState("list");
  const [items, seItems] = useState([]);
  const [count, setCount] = useState(0);

  async function getItems() {
    const res = await fetch("http://localhost:8080/items", {
      crossDomain: true,
      method: "GET",
    });
    const data = await res.json();
    seItems(data);
    setCount(data.length);
    console.log(count);
  }

  useEffect(() => {
    getItems();
  }, []);

  const addModule = () => {
    if (action === "addItem") {
      return (
        <AddItem
          setToAdd={(toStatus) => {
            setAction("list");
          }}
        />
      );
    } else if (action === "list") return list();
    else {
      return (
        <NewShipment
          setToAdd={(toStatus) => {
            setAction("list");
          }}
        />
      );
    }
  };

  const list = () => {
    return (
      <div>
        {" "}
        <div class="header">
          <h3>Inventory list</h3>
          <div className="row">
            <button
              className="action"
              onClick={() => {
                setAction("addItem");
              }}
            >
              Create Item
            </button>
            <button
              className="action"
              onClick={() => {
                if (count > 0) setAction("shipment");
                else {
                  alert("No Items Available - Add items first");
                }
              }}
            >
              Create Shipment
            </button>
          </div>
        </div>
        <section className="items">
          {items.map((e) => {
            return <Item key={e.id} item={e} />;
          })}
        </section>
      </div>
    );
  };
  return (
    <div className="App">
      <h1>Inventory Factory</h1>
      <Info />
      <section className="main">{addModule()}</section>
    </div>
  );
}

export default App;

function Info() {
  const [show, setShow] = useState(false);

  const textBox = () => {
    if (show)
      return (
        <div className="bottomline">
          {" "}
          <h4>Features</h4>
          <a
            href="https://github.com/armintalaie/InventoryFactory"
            target="_blank"
            rel="noreferrer"
          >
            <button>GitHub Repo</button>
          </a>
          <ul>
            <li>
              CRUD operations: you can create/edit/delete items via the button
              on this page
            </li>
            <li>
              Added feature: create a shipment of items available and updatre
              inventory accordingly
            </li>
          </ul>
          <h4>Notes</h4>
          <ul>
            <li>
              You should refresh to visually see the changes under the hood
            </li>
          </ul>
        </div>
      );
    else return;
  };

  return (
    <section className="main">
      <div class="header">
        <h3>Info About Webapp</h3>

        <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
      </div>

      {textBox()}
      <hr></hr>
      <Shipment />
    </section>
  );
}
