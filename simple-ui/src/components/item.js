import { useState } from "react";

function Item({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const [edit, setEdit] = useState(false);

  async function deleteItem() {
    const res = await fetch("http://localhost:8080/deleteItem/" + item.id, {
      crossDomain: true,
      method: "GET",
    });
    setEdit(false);
  }

  async function editItem() {
    const res = await fetch("http://localhost:8080/editItem/" + item.id, {
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
    setEdit(false);
  }

  const module = () => {
    if (edit) {
      return (
        <div className="item">
          <div>
            <label>Quantity</label>
            <input
              value={quantity}
              type="number"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="row">
            <button className="action" onClick={() => editItem()}>
              Save
            </button>
            <button onClick={() => deleteItem()} className="delete">
              Delete Item
            </button>
            <button onClick={() => setEdit(false)}>Cancel</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="item">
          <p>{quantity}</p>
          <h4>{title}</h4>
          <p className="description">{description}</p>
          <button onClick={() => setEdit(true)} className="edit">
            Edit Item
          </button>
        </div>
      );
    }
  };
  return module();
}

export default Item;
