import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Entry } from '../types'
import { LocalStorage } from 'ttl-localstorage'

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
      <div className='flex flex-wrap justify-end items-center gap-4 mt-3 pr-3'>
        <h3 className='text-white p-2 rounded-md bg-[#1da1f2]'>{ filteredPodcast?.length }</h3>
        <input placeholder='Filtra por podcast/autor' onChange={ (e) => {
          setFilterPodcast(e.target.value)
        } } className='m-1.5 border border-[#d3d3d3] p-3 rounded-md'/>
      </div>
      <div className='flex flex-wrap justify-center gap-4 mt-16'>
        { filteredPodcast.map((podcast, index) => (
          <div className='flex flex-col justify-center items-center border border-[#d3d3d3] min-w-[350px] rounded-md mb-16 shadow-2
          hover:bg-stone-100 hover:cursor-pointer' key={ index } onClick={ () => {
            navigate(`/podcast/${podcast.id.attributes['im:id']}`, {
              state: {
                podcast
              }
            })
          } }>
            <div className='flex flex-col items-center justify-center items-center'>
              <img src={ podcast['im:image'][2].label } alt={ podcast['im:name'].label }
              className='shadow-3 w-24 h-24 rounded-full m-0 -mt-12 mb-2.5' />
              <div className='flex flex-col justify-center items-center'>
                <h4 className='max-w-[200px]'>{ podcast['im:name'].label }</h4>
                <p className='max-w-[200px] text-base italic color-gray-400'>Author: { podcast['im:artist'].label }</p>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}
