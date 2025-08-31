import { useState } from "react";
import { useAddProductMutation } from "../services/productsApi";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !category || !description || !image) return;
    await addProduct({
      name,
      price: parseFloat(price),
      category,
      description,
      image,
      rating: { rate: 0, count: 0 },
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
       <button type="button" onClick={() => navigate("/")} className="back-btn">← Back</button>
      <h2>Add New Product</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
