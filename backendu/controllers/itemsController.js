import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
export const getAllItems = async (req, res) => {
  try {
    const user = req.user;

    // Ensure the user object is defined
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the seller (logged-in user)
    const seller = await User.findOne({ email: user.email });

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    console.log("Logged-in user's email is:", seller.email);
    console.log("Seller's ID is:", seller._id);

    // Find items where the seller is the logged-in user
    const items = await Item.find({ seller: seller._id });

    if (!items.length) {
      return res
        .status(404)
        .json({ message: "No items found for this seller." });
    }

    // Respond with the found items
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const createItem = async (req, res) => {
  try {
    const user = req.user;

    // Check if the user is authorized
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Extract data from the request body
    const { name, description, price, location, image, category } = req.body;

    // Validate required fields
    if (!name || !description || typeof price === "undefined") {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate location fields
    if (!location || !location.country || !location.city || !location.address) {
      return res.status(400).json({
        message: "Location fields (country, city, address) are required",
      });
    }

    // Use the logged-in user's email for the seller field
    const seller = await User.findOne({ email: user.email });
    console.log("users email is: ", seller.email);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Create a new item with the seller's _id
    const newItem = new Item({
      userId: user._id, // The logged-in user who is creating the item
      name,
      description,
      price,
      seller: seller._id, // Assign the logged-in user's _id as the seller
      location,
      image,
      category,
    });

    // Save the new item to the database
    await newItem.save();

    // Respond with success, including the new item's ID
    res.status(201).json({
      message: "Item added successfully",
      item: newItem,
      itemId: newItem._id, // Include the created item's ID in the response
    });
  } catch (error) {
    console.error("Error creating item:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params; // Get the item ID from the request parameters
    const user = req.user; // Get the authenticated user
    console.log(user);
    console.log(id);
    // Check if the user is authorized
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Extract data from the request body
    const { name, description, price, location, image, category } = req.body;

    // Validate required fields
    if (
      !name &&
      !description &&
      typeof price === "undefined" &&
      !location &&
      !image &&
      !category
    ) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update" });
    }

    // Validate location fields if provided
    if (location) {
      if (!location.country || !location.city || !location.address) {
        return res.status(400).json({
          message:
            "Location fields (country, city, address) are required if location is provided",
        });
      }
    }

    // Find the item by ID
    const item = await Item.findById(id);
    console.log("ites a item: ", item);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    const seller = await User.findOne({ email: user.email });
    console.log("users email is: ", seller.email);
    console.log("itemid", id);
    console.log("Item seller ID loggedin user ID:", item.seller);

    // Update the item with new data
    item.name = name || item.name; // Only update if a new value is provided
    item.description = description || item.description;
    item.price = typeof price !== "undefined" ? price : item.price; // Check for undefined
    item.location = location || item.location;
    item.image = image || item.image;
    item.category = category || item.category;

    // Save the updated item to the database
    await item.save();

    // Respond with success
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params; // Get the item ID from the request parameters
    const user = req.user; // Get the authenticated user
    const item = await Item.findById(id);
    //delete monogdb
    // Check if the user is authorized
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    const seller = await User.findOne({ email: user.email });
    console.log("users email is: ", seller.email);
    // Check if the user is the seller of the item

    if (item.seller.toString() !== seller._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    //remove
    await Item.findByIdAndDelete(id);
    // Respond with success
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
