// src/routes/Routes.tsx
import { Routes, Route } from "react-router-dom";
import Products from "../components/Products";
import Product from "../components/Product";
import EditForm from "../components/EditForm";
import AddForm from "../components/AddForm";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products  />}  />
      <Route path="/:id" element={<Product />}  />
      <Route path="/edit/:id" element={<EditForm />} />
      <Route path="/add" element={<AddForm />} />
    </Routes>
  );
};

export default AppRoutes;
