import { useEffect, useState } from "react";
import axios from "../axios.jsx"; // Assuming axios is already set up for the base URL

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token

      try {
        const response = await axios.get("/items/", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach JWT token for authentication
          },
        });

        setItems(response.data); // Store the items in the state
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching items");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="item-list">
      <h2>Items for Sale</h2>
      {items.length === 0 ? (
        <p>No items found for this seller.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
              <p>
                Location: {item.location.city}, {item.location.country}
              </p>
              <img src={item.image} alt={item.name} width="150" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
