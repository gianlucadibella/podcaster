import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Entry } from '../types'
import { LocalStorage } from 'ttl-localstorage'
import { InputFilter } from './InputFilter'
import { MainCard } from './MainCard'

export function PodcastsList () {
  // El PodcastsList es el componente que se encarga de traer los datos de la API y de filtrarlos (maneja el estado de los podcasts)
  const [podcasts, setPodcasts] = useState<Entry[]>([])
  const [filterPodcast, setFilterPodcast] = useState<string | null>(null)

  const navigate = useNavigate()
  // Importo el hook useNavigate para poder navegar entre las rutas

  useEffect(() => {
    if (LocalStorage.get('podcasts') === null) {
      // Si no hay datos en el LocalStorage, entonces se hace la petición a la API
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
      // Si hay datos en el LocalStorage, entonces se setean los podcasts con esos datos
      setPodcasts(LocalStorage.get('podcasts'))
    }
  }, [])

  const filteredPodcast = useMemo(() => {
    // El useMemo mejora el rendimiento de la aplicación, ya que memoriza el valor de la función y solo se ejecuta cuando cambia el valor de filterPodcast o podcasts
    return typeof filterPodcast === 'string' && filterPodcast.length > 0
      ? podcasts.filter((podcast) => {
        return (
          // Se filtran los podcasts por el nombre o el artista
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
          // Se mapean los podcasts y se envían como props al componente MainCard
         <MainCard podcast={podcast} navigate={navigate} key={index}/>
        )) }
      </div>
    </div>
  )
}
