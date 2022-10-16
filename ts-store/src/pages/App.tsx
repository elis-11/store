 import { Routes, Route } from "react-router-dom";
import { Home } from "../components/home/Home";
import { Login } from "../components/signup/Login";
import { Signup } from "../components/signup/Signup";
import { ProtectedRoute                                                                                                                                                                                                                                                   } from "./ProtectedRoute";
import "./App.scss";
import { NotFound } from "./NotFound";
import { Navbar } from "./Navbar";
import { AddProduct } from "../components/product/AddProduct";
import { Admin } from "../components/admin/Admin";
import { ProductDetails } from "../components/product/ProductDetails";
import { Cart } from "../components/cart/Cart";


function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* <Route
            path="users"
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
          <Route path="/products/:id" element={
            <ProtectedRoute>
              <ProductDetails/>
            </ProtectedRoute>
          } />
          <Route path="cart" element={<Cart/>} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
