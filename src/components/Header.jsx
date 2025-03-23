import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <h1>Bookstore</h1>
      <nav>
        <Link to='/Categories'>Categories</Link>
      </nav>
    </header>    
  )
}

export default Header