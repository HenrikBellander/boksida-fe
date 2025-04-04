import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Categories from "./pages/Categories";
import BooksByCategory from "./pages/BooksByCategory";
import BookDetail from './pages/BookDetail';
import Search from "./components/Search";
import Team from "./pages/Team";
import Register from './pages/Register';
import Login from './pages/Login';
import Footer from "./components/Footer";
import Admin from "./pages/Admin";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />D
          <Route path="/team" element={<Team />} />  
          <Route element={<ProtectedRoute />}>
            <Route index element={<Categories />} />
            <Route path="category/:category" element={<BooksByCategory />} />
            <Route path="book/:book_id" element={<BookDetail />} />
            <Route path="search" element={<Search />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;