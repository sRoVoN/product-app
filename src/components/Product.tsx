import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery, useDeleteProductMutation } from "../services/productsApi";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductQuery(id!);
  const [deleteProduct] = useDeleteProductMutation(); 
 

  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Error loading product</p>;

  const handleDelete = async () => {
    await deleteProduct(product.id);
    navigate("/");
  };

  const handleEdit = () => {
    navigate(`/edit/${product.id}`);
  };

  return (
    <div className="product-detail">
      <button onClick={() => navigate("/")} className="back-btn">← Back</button>
      <img src={product.image} alt={product.name} />
      <div className="info">
        <h2>{product.name}</h2>
        <div className="price">${product.price}</div>
        <div className="category">{product.category}</div>
        <div className="description">{product.description}</div>
        <div className="rating">
          ⭐ {product.rating.rate} ({product.rating.count} reviews)
        </div>

        <div className="actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
