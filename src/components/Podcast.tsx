import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { type Result } from '../types.d'
import './podcast.css'

export function Podcast () {
  const [podcast, setPodcast] = useState<Result[]>()
  const [description, setDescription] = useState<string | null>('')
  const [selectEpisode, setSelectEpisode] = useState<Result>()
  console.log(selectEpisode)
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
        setPodcast(JSON.parse(data.contents).results)
        const xhr = new XMLHttpRequest()
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        xhr.open('GET', `https://api.allorigins.win/get?url=${encodeURIComponent(`${JSON.parse(data.contents).results[0].feedUrl}`)}`, true)
        xhr.setRequestHeader('Content-Type', 'application/xml')
        xhr.send()
        xhr.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            // The response should now contain the XML file
            const xmlString = this.responseText
            const data = JSON.parse(xmlString)
            console.log(data)
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(data.contents, 'application/xml')
            const summary = xmlDoc.getElementsByTagName('itunes:summary')[0]
            console.log(xmlDoc)
            setDescription(summary?.textContent ?? 'No description from XML file')
          }
        }
      })
      .catch(err => { console.log(err) })
  }, [podcastId])

  return (
        <div className='detail-podcast-container'>
            { (podcast != null) && podcast.length > 0
              ? (
                    <div className='detail-podcast'>
                        <div className='detail-podcast-info-container'>
                            <img src={ podcast[0].artworkUrl600 } alt={ podcast[0].collectionName } className='detail-podcast-image' />
                            <hr />
                            <div className='detail-podcast-info'>
                                <p style={ {
                                  margin: '0px',
                                  fontWeight: 'bold'
                                } }>{ podcast[0].collectionName }</p>
                                <p style={ {
                                  margin: '0px',
                                  fontStyle: 'italic'
                                } }>By { podcast[0].artistName }</p>
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
                                    { description }
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
                                            { podcast.map((episode, index) => {
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
                                                            { Math.floor((episode.trackTimeMillis / 1000 / 60) << 0).toString() + ':' + Math.floor((episode.trackTimeMillis / 1000) % 60).toString() }
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
                                        {selectEpisode.shortDescription}

                                        </div>

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
