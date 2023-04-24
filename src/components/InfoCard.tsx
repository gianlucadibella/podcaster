import { type Result } from '../types'
import { Episode } from './Episode'
import { EpisodePlayer } from './EpisodePlayer'

interface Props {
  podcast: Result[]
  returnToEpisodes: () => void
  podcastInfo: any
  selectEpisode: Result | undefined
  setSelectEpisode: (episode: Result) => void
  podcastId: string | undefined
  navigate: (path: string) => void
}

export const InfoCard = ({ podcast, returnToEpisodes, podcastInfo, selectEpisode, setSelectEpisode, podcastId, navigate }: Props) => {
  return (
        <div className='flex flex-row m-12 flex-1 gap-10'>
        <div className='flex flex-col justify-center items-center max-w-xs p-5 border border-[#d3d3d3] rounded-lg shadow-1'>
          <img src={ podcast[0].artworkUrl600 } alt={ podcast[0].collectionName } className='p-2.5 min-w-[250px]
          cursor-pointer rounded-2xl hover:scale-105 transform transition duration-300 ease-in-out'
           onClick={ () => { returnToEpisodes() } } />
          <hr />
          <div className='flex flex-col items-start pl-3.5 mb-0 w-full'>
            <p className='m-0 font-bold cursor-pointer' onClick={ () => { returnToEpisodes() } }
            >{ podcast[0].collectionName }</p>
            <p className='m-0 italic cursor-pointer'
              onClick={ () => { returnToEpisodes() } }>By { podcast[0].artistName }</p>
          </div>
          <hr />
          <div className='flex flex-col flex-start pl-3.5 flex-1 w-full '>
            <p className='flex m-0 mb-1.5 font-bold'>
              Description
            </p>
            <div>
            </div>
            <p className='text-justify m-0 break-words'>
              { podcastInfo?.summary.label }
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
}
