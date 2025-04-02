import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute"; // Importera den nya komponenten
import Header from "./components/Header";
import Categories from "./pages/Categories";
import BooksByCategory from "./pages/BooksByCategory";
import BookDetail from './pages/BookDetail';
import Search from "./components/Search";
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Publika rutter (endast för utloggade) */}
          <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          {/* Skyddade rutter (endast för inloggade) */}
          <Route element={<ProtectedRoute />}>
            <Route index element={<Categories />} />
            <Route path="/category/:category" element={<BooksByCategory />} />
            <Route path="/book/:book_id" element={<BookDetail />} />
            <Route path="/search" element={<Search />} />
          </Route>

          {/* Fallback-route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;