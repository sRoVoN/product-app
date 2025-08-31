import { useGetProductsQuery} from "../services/productsApi";
import { Link } from "react-router-dom";
const Products = () => {
const { data: products, isLoading, error } = useGetProductsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

    return (
    <div className="products-list">
         <Link className="add-btn" to="/add"> Add Product</Link>
      {products?.map((p: any) => (
        <div key={p.id} className="product-card">
          <img src={p.image} alt={p.name} />
          <div className="content">
            <h3>{p.name}</h3>
            <span className="badge">{p.price}</span>
            <Link className="product-link" to={`/${p.id}`} > More ...</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
