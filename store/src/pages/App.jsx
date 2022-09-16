import { Routes, Route } from "react-router-dom";
import { Product } from "../components/product/Product";
import { Login } from "../components/signup/Login";
import { Signup } from "../components/signup/Signup";
import { Users } from "../components/users/Users";
import { ProtectedRoute } from "./ProtectedRoute";
import "./App.scss";
import { NotFound } from "./NotFound";
import { Admin } from "../components/admin/Admin";

function App() {
  return (
    <div className="App">
      <header>tralala</header>
      <main>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/users" element={<Users />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute admin>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
