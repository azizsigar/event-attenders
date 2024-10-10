import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import "./App.css";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import UpdateItemForm from "./components/UpdateItemForm"; // You already imported it

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<AddItemForm />} />
        <Route path="/getall" element={<ItemList />} />
        <Route path="/update/:itemId" element={<UpdateItemForm />} />
      </Routes>
    </Router>
  );
}

export default App;
