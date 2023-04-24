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
    <div className='flex-1'>
    <div className='flex flex-start border border-[#d3d3d3] rounded-lg p-2.5'>
      <h3 className='font-bold '>
        Episodes: { podcast.length - 1 }
      </h3>
    </div>
    <div>
      <table className='w-full mt-6 rounded-lg text-left border border-separate border-tools-table-outline border-[#d3d3d3] border-1 w-full'>
        <thead className=''>
          <tr className=''>
            <th className='text-start'>
              Title
            </th>
            <th className='text-start'>
              Date
            </th>
            <th className='text-start'>
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
