/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { type Entry, type Result } from '../types.d'
import { Oval } from 'react-loader-spinner'
import { LocalStorage } from 'ttl-localstorage'
import { InfoCard } from './InfoCard'
import './podcast.css'

export function Podcast () {
  const [podcast, setPodcast] = useState<Result[]>()
  const [podcastInfo, setPodcastInfo] = useState<Entry>()
  const [selectEpisode, setSelectEpisode] = useState<Result>()

  const { podcastId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (LocalStorage.get(`${podcastId}`) === null) {
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
        .then(async response => {
          if (response.ok) return await response.json()
          throw new Error('Network response was not ok.')
        })
        .then(async data => {
          setPodcast(JSON.parse(data.contents).results)
          LocalStorage.put(`${podcastId}`, JSON.parse(data.contents).results, 86400)
        })
        .catch(err => { console.log(err) })
    } else {
      setPodcast(LocalStorage.get(`${podcastId}`))
    }
  }, [])

  useEffect(() => {
    setPodcastInfo(location.state.podcast)
  }, [])

  const returnToEpisodes = () => {
    setSelectEpisode(undefined)
  }

  return (
    <div className='flex m-7 h-full'>
      { (podcast != null) && podcast.length > 0
        ? (
         <InfoCard navigate={navigate} podcast={podcast} podcastId={podcastId} podcastInfo={podcastInfo} returnToEpisodes={returnToEpisodes}
          selectEpisode={selectEpisode} setSelectEpisode={setSelectEpisode} />
          )
        : (
          <div className='flex w-full justify-center items-center h-full'>
            <Oval
              height={ 100 }
              width={ 100 }
              color="#5b86e5"
              wrapperStyle={ {} }
              wrapperClass=""
              visible={ true }
              ariaLabel='oval-loading'
              secondaryColor="#5b86e5"
              strokeWidth={ 3 }
              strokeWidthSecondary={ 2 }
            />
          </div>
          ) }
    </div>
  )
}
