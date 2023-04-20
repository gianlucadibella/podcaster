import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { type Result } from '../types.d'
import './podcast.css'
import { formatDuration } from '../helpers/formatDuration'

export function Podcast () {
  const [podcast, setPodcast] = useState<Result[]>()
  const [selectEpisode, setSelectEpisode] = useState<Result>()
  const [feedData, setFeedData] = useState<Document>()

  const { podcastId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast
    &entity=podcastEpisode&limit=20`)}`)
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
          const xml = new DOMParser().parseFromString(data.contents, 'text/xml')
          console.log(xml)

          setFeedData(xml)
        })
        console.log(data)
        setPodcast(JSON.parse(data.contents).results)
      })
      .catch(err => { console.log(err) })
  }, [podcastId])

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
                            style={{
                              cursor: 'pointer'
                            }}
                            onClick={() => { returnToEpisodes() }}/>
                            <hr />
                            <div className='detail-podcast-info'>
                                <p style={ {
                                  margin: '0px',
                                  fontWeight: 'bold',
                                  cursor: 'pointer'
                                } }
                                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                onClick={() => { returnToEpisodes() }}
                                >{ podcast[0].collectionName }</p>
                                <p style={ {
                                  margin: '0px',
                                  fontStyle: 'italic',
                                  cursor: 'pointer'
                                }}
                                onClick={() => { returnToEpisodes() }}>By { podcast[0].artistName }</p>
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
                                <p style={ {
                                  textAlign: 'justify',
                                  margin: '0px'
                                } }>
                                    {/* { doc?.getElementById('summary')?.textContent ?? doc?.getElementsByTagName('description')[0]?.textContent } */}
                                </p>
                            </div>
                        </div>
                        { (selectEpisode == null)
                          ? (
                            <div className='detail-episode'>
                                <div className='episodes-quantity'>
                                    <h3 style={ {
                                      margin: '0px',
                                      marginBottom: '5px',
                                      fontWeight: 'bold'
                                    } }>
                                        Episodes: { podcast.length }
                                    </h3>
                                </div>
                                <div className='detail-episode-list'>
                                    <table style={ { width: '100%' } } className='episodes-table'>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Title
                                                </th>
                                                <th>
                                                    Date
                                                </th>
                                                <th>
                                                    Duration
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { podcast.slice(1).map((episode, index) => {
                                              const backgroundColor = index % 2 === 0 ? '#FAF9F6' : '#E5F3FD'
                                              return (
                                                    <tr key={ episode.trackName } style={ { backgroundColor, cursor: 'pointer' } } onClick={ () => {
                                                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                                      navigate(`/podcast/${podcastId}/episode/${episode.trackId}`)
                                                      setSelectEpisode(episode)
                                                    } }>
                                                        <td>
                                                            { episode.trackName }
                                                        </td>
                                                        <td>
                                                            { episode.releaseDate.toString().split('T')[0] }
                                                        </td>
                                                        <td>
                                                            { formatDuration(episode.trackTimeMillis) }
                                                        </td>

                                                    </tr>
                                              )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            )
                          : (
                                <div className='episode-container'>
                                    <h1>{selectEpisode.trackName}</h1>
                                    <div className='episode-info'>
                                        <p style={ {
                                          margin: '0px',
                                          textAlign: 'justify'
                                        }}>
                                            { feedData?.getElementById('item')?.textContent ?? feedData?.getElementsByTagName('description')[0]?.textContent }

                                        </p>
                                        {selectEpisode.shortDescription}
                                        </div>
                                        <audio controls src={selectEpisode.episodeUrl}/>

                                </div>
                            )
                        }
                    </div>
                )
              : (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) }
        </div>
  )
}
