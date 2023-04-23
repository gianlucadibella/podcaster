import { useEffect, useState } from 'react'
import './App.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Rings } from 'react-loader-spinner'

function App () {
  const [loader, setLoader] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [location.pathname])

  return (
    <div className="App">
      <nav className='flex bg-white px-2.5 border border-[#d3d3d3] items-center'>
        <Link to='/' style={ {
          textDecoration: 'none'
        } }>
          <h1 className='logo'>PODCASTER</h1>
        </Link>
        { loader && (
          <div className='ml-auto'>
            <Rings
              height="50"
              width="50"
              color="#5b86e5"
              radius='12.5'
              ariaLabel="mutating-dots-loading"
              wrapperStyle={ {} }
              wrapperClass=""
              visible={ true }
            />
          </div>
        ) }
      </nav>
      <Outlet />
    </div>
  )
}

export default App
