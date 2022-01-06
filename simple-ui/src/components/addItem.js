import { useState } from "react";

function AddItem(props) {
  const [quantity, setQuantity] = useState(0);
  const [title, setTitle] = useState(0);
  const [description, setDescription] = useState("");

  async function addItem() {
    const res = await fetch("http://localhost:8080/createItem", {
      crossDomain: true,
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        title: title,
        quantity: quantity,
        description: description,
      }),
    });
    console.log(res);
    props.setToAdd(false);
  }

  return (
    <div className="additem">
      <div>
        <label>Title</label>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
      </div>

      <div>
        <label>Quantity</label>
        <input
          type="number"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>

      <div className="row">
        <button className="action" onClick={() => addItem()}>
          Create
        </button>
        <button className="">Cancel</button>
      </div>
    </div>
  );
}

export default AddItem;
