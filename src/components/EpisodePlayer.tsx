import { type Result } from '../types'

interface Props {
  selectEpisode: Result
}
export const EpisodePlayer = ({ selectEpisode }: Props) => {
  return (
    <div className='episode-container'>
                  <h1>{ selectEpisode.trackName }</h1>
                  <div className='episode-info'>
                    {/* <p style={ {
                                          margin: '0px',
                                          textAlign: 'justify'
                                        }}>
                                            { feedData?.getElementById('item')?.textContent ?? feedData?.getElementsByTagName('description')[0]?.textContent }
                                        </p> */}
                    <div className='episode-description'>
                      <p style={ {
                        margin: '0px',
                        textAlign: 'justify'
                      } }>
                        { selectEpisode.description != null ? selectEpisode?.description : selectEpisode?.shortDescription }
                      </p>
                    </div>
                  </div>
                  <audio controls src={ selectEpisode.episodeUrl } className='episode-player'/>

                </div>
  )
}
