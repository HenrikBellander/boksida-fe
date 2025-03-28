import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Categories from "./pages/Categories"
import BooksByCategory from "./pages/BooksByCategory"
import Register from "./pages/Register";
import BookDetail from './pages/BookDetail'; 
import LoginPage from './pages/LoginPage';



function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Categories />}/>
          <Route path="/category/:category" element={<BooksByCategory />} />
          <Route path="/book/:book_id" element={<BookDetail/>} />
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
