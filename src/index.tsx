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
import { Podcast } from './components/Podcast'
import { PodcastsList } from './components/PodcastsList'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <PodcastsList />
      },
      {
        path: 'podcast/:podcastId',
        element: <Podcast />
      },
      {
        path: 'podcast/:podcastId/episode/:episodeId',
        element: <Podcast />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <div className='App'>
    <RouterProvider router={ router } />
    </div>
  </React.StrictMode>
)
