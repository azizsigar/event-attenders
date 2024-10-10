import React, { useState, useEffect } from "react";
import axios from "../axios.jsx";
import UpdateItemForm from "./UpdateItemForm"; // Formu içeri al
import { Link } from "react-router-dom";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState(null); // Güncellenecek item

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/items", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching items");
      }
    };
    fetchItems();
  }, []);

  const handleUpdateClick = (item) => {
    setItemToUpdate(item); // Güncellenecek itemi ayarla
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Your Items</h1>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <p>{item.name}</p>
              <p>{item.description}</p>
                  <p>{item.price} USD</p>
                  
              <button onClick={() => handleUpdateClick(item)}>Update</button>
            </li>
          ))}
        </ul>
      )}

      {/* Eğer bir item seçildiyse, güncelleme formunu göster */}
      {itemToUpdate && (
        <div>
          <h2>Update Item: {itemToUpdate.name}</h2>
          <h3>update item: {console.log(itemToUpdate._id)}</h3>
          <UpdateItemForm itemId={itemToUpdate._id} />
        </div>
      )}
    </div>
  );
}
