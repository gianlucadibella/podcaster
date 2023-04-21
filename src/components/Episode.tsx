import { formatDuration } from '../helpers/formatDuration'
import { type Result } from '../types'

interface Props {
  podcast: Result[]
  setSelectEpisode: (episode: Result) => void
  podcastId: string | undefined
  navigate: (path: string) => void
}

export function Episode ({ podcast, setSelectEpisode, podcastId, navigate }: Props) {
  return (
    <div className='detail-episode'>
    <div className='episodes-quantity'>
      <h3 style={ {
        margin: '0px',
        marginBottom: '5px',
        fontWeight: 'bold'
      } }>
        Episodes: { podcast.length - 1 }
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
}
