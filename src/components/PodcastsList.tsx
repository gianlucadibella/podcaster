import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Entry } from '../types'
import { LocalStorage } from 'ttl-localstorage'
import { InputFilter } from './InputFilter'
import { InfoCard } from './InfoCard'

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
      <InputFilter filteredPodcast={filteredPodcast} setFilterPodcast={setFilterPodcast} />
      <div className='flex flex-wrap justify-center gap-4 mt-16'>
        { filteredPodcast.map((podcast, index) => (
         <InfoCard podcast={podcast} navigate={navigate} key={index}/>
        )) }
      </div>
    </div>
  )
}
