import { type Result } from '../types'

interface Props {
  selectEpisode: Result
}
export const EpisodePlayer = ({ selectEpisode }: Props) => {
  return (
    <div className='flex flex-col justify-start border-[#d3d3d3] p-5'>
      <h1>{ selectEpisode.trackName }</h1>
      <div>
        <div className='flex flex-col justify-start flex-1 m-5 pb-5 border-b-[#d3d3d3]'>
          <p className='m-0 text-center'>
            { selectEpisode.description != null ? selectEpisode?.description : selectEpisode?.shortDescription }
          </p>
        </div>
      </div>
      <audio controls src={ selectEpisode.episodeUrl } className='flex flex-col justify-center' />
    </div>
  )
}
