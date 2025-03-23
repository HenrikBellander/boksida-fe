import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Categories from "./pages/Categories"


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Categories" element={<Categories />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
