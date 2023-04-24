import { useEffect, useState } from 'react'
import { Rings } from 'react-loader-spinner'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {
  const [loader, setLoader] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [location.pathname])
  return (
    <nav className='flex bg-white p-2.5 border-b border-[#d3d3d3] items-center'>
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
  )
}
