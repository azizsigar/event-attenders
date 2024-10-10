import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "../axios.jsx"; // Make sure axios is configured correctly

const UpdateItemForm = () => {
  const { itemId } = useParams(); // Get itemId from the URL
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the existing item data
  useEffect(() => {
    const fetchItem = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`/items/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching item details.");
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`/items/${itemId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Item updated successfully!");
    } catch (error) {
      alert("Failed to update item");
    }
  };

  if (loading) return <p>Loading item data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit} className="update-item-form">
      <div>
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update Item</button>
    </form>
  );
};

export default UpdateItemForm;
