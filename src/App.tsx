import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App () {
  return (
    <div className="App">
      <nav className='navbar'>
        <Link to='/'>
          <h1 style={ {
            textDecoration: 'none'
          } }>Podcaster</h1>
        </Link>
        <h2 style={ {
          marginLeft: 'auto'
        } }>Loader</h2>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
