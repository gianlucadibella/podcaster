import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type Result } from '../types.d'
import './podcast.css'

export function Podcast () {
  const [podcast, setPodcast] = useState<Result[]>()
  const [description, setDescription] = useState<string | null>('')
  const { podcastId } = useParams()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast
    &entity=podcastEpisode&limit=20`)}`)
      .then(async response => {
        if (response.ok) return await response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => {
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
                        <div className='detail-episode'>
                            <div className='episodes-quantity'>
                            <h3 style={ {
                              margin: '0px',
                              marginBottom: '5px',
                              fontWeight: 'bold'
                            } }>
                                Episodes: { podcast.length}
                            </h3>
                            </div>

                            <div className='detail-episode-list'>
                                { podcast.map((episode, index) => {
                                  return (
                                        <div key={ index } className='detail-episode-item'>
                                            </div>
                                  )
                                })}
                            </div>
                  </div>
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
