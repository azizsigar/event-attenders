import { useState } from "react";
import axios from "../axios.jsx"; // Assuming axios is set up in your project

export default function AddItemForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    country: "",
    city: "",
    address: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "/items/", // assuming your route in the backend is `/items/create`
        {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          location: {
            country: formData.country,
            city: formData.city,
            address: formData.address,
          },
          image: formData.image,
          category: formData.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach JWT token for authentication
          },
        }
      );

      console.log("Item created:", response.data);
      alert("Item created successfully!");
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create item");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
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
      <div>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
}
