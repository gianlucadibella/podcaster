import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { type Result } from '../types.d'
import './podcast.css'
import { Oval } from 'react-loader-spinner'
import { Episode } from './Episode'
import { EpisodePlayer } from './EpisodePlayer'
import { LocalStorage } from 'ttl-localstorage'

export function Podcast () {
  const [podcast, setPodcast] = useState<Result[]>()
  const [selectEpisode, setSelectEpisode] = useState<Result>()
  const [feedData, setFeedData] = useState<Document>()

  const { podcastId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    if (LocalStorage.get(`${podcastId}`) === null) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
        .then(async response => {
          if (response.ok) return await response.json()
          throw new Error('Network response was not ok.')
        })
        .then(async data => {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${JSON.parse(data.contents).results[0].feedUrl}`)}`).then(async response => {
            if (response.ok) return await response.json()
            throw new Error('Network response was not ok.')
          }).then(async data => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            LocalStorage.put(`${podcastId}-xml`, data.contents, 86400)
            const xml = new DOMParser().parseFromString(data.contents, 'text/xml')
            setFeedData(xml)
          })
          setPodcast(JSON.parse(data.contents).results)
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          LocalStorage.put(`${podcastId}`, JSON.parse(data.contents).results, 86400)
        })
        .catch(err => { console.log(err) })
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    } else if (LocalStorage.get(`${podcastId}-xml`) != null) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      setPodcast(LocalStorage.get(`${podcastId}`))

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const xml = new DOMParser().parseFromString(LocalStorage.get(`${podcastId}-xml`), 'text/xml')
      setFeedData(xml)
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      setPodcast(LocalStorage.get(`${podcastId}`))

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${LocalStorage.get(`${podcastId}`)[0].feedUrl}`)}`).then(async response => {
        if (response.ok) return await response.json()
        throw new Error('Network response was not ok.')
      }
      ).then(async data => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        LocalStorage.put(`${podcastId}-xml`, data.contents, 86400)
        const xml = new DOMParser().parseFromString(data.contents, 'text/xml')
        setFeedData(xml)
      }
      ).catch(err => { console.log(err) })
    }
  }, [])

  const returnToEpisodes = () => {
    setSelectEpisode(undefined)
  }

  return (
    <div className='detail-podcast-container'>
      { (podcast != null) && podcast.length > 0
        ? (
          <div className='detail-podcast'>
            <div className='detail-podcast-info-container'>
              <img src={ podcast[0].artworkUrl600 } alt={ podcast[0].collectionName } className='detail-podcast-image'
                style={ {
                  cursor: 'pointer'
                } }
                onClick={ () => { returnToEpisodes() } } />
              <hr />
              <div className='detail-podcast-info'>
                <p style={ {
                  margin: '0px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                } }
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  onClick={ () => { returnToEpisodes() } }
                >{ podcast[0].collectionName }</p>
                <p style={ {
                  margin: '0px',
                  fontStyle: 'italic',
                  cursor: 'pointer'
                } }
                  onClick={ () => { returnToEpisodes() } }>By { podcast[0].artistName }</p>
              </div>
              <hr />
              <div className='detail-description'>
                <p style={ {
                  margin: '0px',
                  marginBottom: '5px',
                  fontWeight: 'bold'
                } }>
                  Description
                </p>
                <div>
                  </div>
                <p style={ {
                  textAlign: 'justify',
                  margin: '0px',
                  wordBreak: 'break-word'
                } }>

                  { feedData?.activeElement === null
                    ? (feedData?.getElementById('summary')?.textContent ?? feedData?.getElementsByTagName('description')[0]?.textContent)
                    : (
                        podcast[0].feedUrl
                      ) }
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
          <div className='loader'>
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
