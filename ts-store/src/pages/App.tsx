import { Routes, Route } from "react-router-dom";
import { Product } from "../components/product/Product";
import { Login } from "../components/signup/Login";
import { Signup } from "../components/signup/Signup";
// import { Users } from "../components/users/Users";
import { ProtectedRoute } from "./ProtectedRoute";
import "./App.scss";
import { NotFound } from "./NotFound";
import { Admin } from "../components/admin/Admin";
import { Navbar } from "./Navbar";
import { AddProduct } from "../components/admin/AddProduct";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route index element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute admin>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
