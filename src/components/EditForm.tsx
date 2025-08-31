import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../services/productsApi";

export default function EditForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // گرفتن اطلاعات محصول
  const { data: product, isLoading, error } = useGetProductQuery(id!);
  const [updateProduct] = useUpdateProductMutation();

  // state برای کنترل فرم
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // وقتی محصول لود شد، مقدار اولیه state ها پر بشه
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setCategory(product.category);
      setDescription(product.description);
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    await updateProduct({
      id: Number(id), // چون id از URL استرینگ میاد
      name,
      price: parseFloat(price),
      category,
      description,
      image,
      rating: product?.rating ?? { rate: 0, count: 0 },
    });

    navigate(`/`); // بعد از آپدیت برگرده به لیست محصولات
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Error loading product</p>;

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <button onClick={() => navigate("/")} className="back-btn">← Back</button>
      <h2>Edit Product</h2>
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
      <button type="submit">Update Product</button>
    </form>
  );
}
