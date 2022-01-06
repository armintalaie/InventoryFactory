import "./App.css";
import AddItem from "./components/addItem";
import Item from "./components/item";
import { useEffect, useState } from "react";

function App() {
  const [toAdd, setToAdd] = useState(false);
  const [items, seItems] = useState([]);

  async function getItems() {
    const res = await fetch("http://localhost:8080/items", {
      crossDomain: true,
      method: "GET",
    });
    const data = await res.json();
    seItems(data);
  }

  useEffect(() => {
    getItems();
  }, []);

  const addModule = () => {
    if (toAdd) {
      return (
        <AddItem
          setToAdd={(toStatus) => {
            setToAdd(toStatus);
          }}
        />
      );
    } else return list();
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
                setToAdd(true);
              }}
            >
              Create Item
            </button>
            <button disabled={true} className="action">
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

function ItemList() {}

export default App;

function Info() {
  const [show, setShow] = useState(false);

  const textBox = () => {
    if (show)
      return (
        <div className="bottomline">
          {" "}
          <h4>Features</h4>
          <button disabled={true}>GitHub Repo</button>
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
            <li>The Inventory will reset on page refresh</li>
          </ul>
        </div>
      );
    else return;
  };

  return (
    <section className="main">
      <div class="header">
        <h3>Info About Webapp</h3>

        <button onClick={() => setShow(!show)}>
          {show ? "Dismiss" : "Show"}
        </button>
      </div>

      {textBox()}
    </section>
  );
}
