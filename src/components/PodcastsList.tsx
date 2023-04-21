import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Entry } from '../types'
import { LocalStorage } from 'ttl-localstorage'

interface Props {
  podcasts: Entry[]
  setFilterPodcast: (text: string) => void
}

export function PodcastsList () {
  const [podcasts, setPodcasts] = useState<Entry[]>([])
  const [filterPodcast, setFilterPodcast] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (LocalStorage.get('podcasts') === null) {
      fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        .then(async res => await res.json())
        .then(res => {
          setPodcasts(res.feed.entry)
          LocalStorage.put('podcasts', res.feed.entry, 86400)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      setPodcasts(LocalStorage.get('podcasts'))
    }
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
    <div>
    <div className='filter-container'>
        <h3 style={ {
          backgroundColor: '#1da1f2',
          color: 'white',
          padding: '8px',
          borderRadius: '5px'
        } }>{ filteredPodcast?.length }</h3>
        <input placeholder='Filtra por podcast/autor' onChange={ (e) => {
          setFilterPodcast(e.target.value)
        } } style={ {
          padding: '12px',
          borderRadius: '5px',
          border: '1px solid #d3d3d3'
        } } />
      </div>
      <div className='podcast-container'>
        { filteredPodcast.map((podcast, index) => (
          <div className='podcast' key={ index } onClick={() => { navigate(`/podcast/${podcast.id.attributes['im:id']}`) }}>
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
