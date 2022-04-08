import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function newItemRender(newItem) {
    setItems([...items, newItem])
  }

  function handleItemUpdate(updatedItem) {
    const updatedItems = items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }

  function handleItemDelete(deletedItem) {
    const updatedItems = items.filter(item => item.id !== deletedItem.id)
    setItems(updatedItems)
  }

  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setItems(data)
    })
  }, [])

  return (
    <div className="ShoppingList">
      <ItemForm onNewItemSubmit={newItemRender} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onItemUpdate={handleItemUpdate} onItemDelete={handleItemDelete}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
