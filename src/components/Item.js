import React from "react";

function Item({ item, onItemUpdate, onItemDelete }) {

  function handleClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isInCart: !item.isInCart
      })
    })
    .then(resp => resp.json())
    .then(data => {
      onItemUpdate(data)
    })
  }

  function handleDelete() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => onItemDelete(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
