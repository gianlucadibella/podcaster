import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { type Entry } from './types.d'
import { Link } from 'react-router-dom'

function App () {
  const [podcasts, setPodcasts] = useState<Entry[]>([])
  const [filterPodcast, setfilterPodcast] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
      .then(async res => await res.json())
      .then(res => {
        setPodcasts(res.feed.entry)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const filteredPodcast = useMemo(() => {
    return typeof filterPodcast === 'string' && filterPodcast.length > 0
      ? podcasts.filter((podcast) => {
        return (
          podcast['im:name'].label.toLowerCase().includes(filterPodcast.toLowerCase()) || podcast['im:artist'].label.toLowerCase().includes(filterPodcast.toLowerCase())
        )
      })
      : podcasts
  }, [filterPodcast, podcasts])

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
      <div className='filter-container'>
        <h3 style={ {
          backgroundColor: '#1da1f2',
          color: 'white',
          padding: '8px',
          borderRadius: '5px'
        } }>{ filteredPodcast.length }</h3>
        <input placeholder='Filtra por podcast/autor' onChange={ (e) => {
          setfilterPodcast(e.target.value)
        } } style={ {
          padding: '12px',
          borderRadius: '5px',
          border: '1px solid #d3d3d3'
        } } />
      </div>
      <div className='podcast-container'>
        { filteredPodcast.map((podcast, index) => (
          <div className='podcast' key={ index }>
            <div className='podcast-info-container'>
              <img src={ podcast['im:image'][2].label } alt={ podcast['im:name'].label } className='podcast-image' />
              <div className='podcast-info'>
                <h4 style={ {
                  maxWidth: '200px'
                } }>{ podcast['im:name'].label }</h4>
                <p style={ {
                  color: 'gray',
                  maxWidth: '200px',
                  fontSize: '1rem',
                  fontStyle: 'italic'
                } }>Author: { podcast['im:artist'].label }</p>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}

export default App
