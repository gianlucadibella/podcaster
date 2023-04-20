import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import
{
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ErrorPage from './error-page'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  }
])

root.render(
  <React.StrictMode>
    <div className='App'>
    <RouterProvider router={ router } />
    </div>
  </React.StrictMode>
)
