import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Categories from "./pages/Categories"
import BooksByCategory from "./pages/BooksByCategory"
import BookDetail from './pages/BookDetail'; 
import Search from "./components/Search";
import Register from "./pages/Register";
import LoginPage from './pages/LoginPage';
import Team from "./pages/Team";


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Categories />}/>
          <Route path="/category/:category" element={<BooksByCategory />} />
          <Route path="/book/:book_id" element={<BookDetail/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/team" element={<Team />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
