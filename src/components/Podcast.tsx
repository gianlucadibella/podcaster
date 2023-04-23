/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { type Result } from '../types.d'
import './podcast.css'
import { Oval } from 'react-loader-spinner'
import { Episode } from './Episode'
import { EpisodePlayer } from './EpisodePlayer'
import { LocalStorage } from 'ttl-localstorage'

export function Podcast () {
  const [podcast, setPodcast] = useState<Result[]>()
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

  const returnToEpisodes = () => {
    setSelectEpisode(undefined)
  }

  return (
    <div className='flex m-7'>
      { (podcast != null) && podcast.length > 0
        ? (
          <div className='flex flex-row m-12 flex-1'>
            <div className='flex flex-col justify-center items-center max-w-xs p-5 border border-[#d3d3d3] shadow-1'>
              <img src={ podcast[0].artworkUrl600 } alt={ podcast[0].collectionName } className='p-2.5 min-w-[250px] cursor-pointer'
               onClick={ () => { returnToEpisodes() } } />
              <hr />
              <div className='flex flex-col items-start pl-3.5 mb-0 w-full'>
                <p className='m-0 font-bold cursor-pointer' onClick={ () => { returnToEpisodes() } }
                >{ podcast[0].collectionName }</p>
                <p className='m-0 italic cursor-pointer'
                  onClick={ () => { returnToEpisodes() } }>By { podcast[0].artistName }</p>
              </div>
              <hr />
              <div className='flex flex-col flex-start pl-3.5 flex-1 w-full'>
                <p className='m-0 mb-1.5 font-bold'>
                  Description
                </p>
                <div>
                </div>
                <p className='text-justify m-0 break-words'>
                  { location.state.podcast.summary.label }
                </p>
              </div>
            </div>
            { (selectEpisode == null)
              ? (
                <Episode podcast={ podcast } setSelectEpisode={ setSelectEpisode } podcastId={ podcastId } navigate={ navigate } />
                )
              : (
                <EpisodePlayer selectEpisode={ selectEpisode } />
                )
            }
          </div>
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
