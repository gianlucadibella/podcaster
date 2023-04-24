import { type Result } from '../types'

interface Props {
  selectEpisode: Result
}

export const EpisodePlayer = ({ selectEpisode }: Props) => {
  return (
    <div className='flex flex-col justify-start border border-[#d3d3d3] p-5 h-fit rounded-lg'>
      <div>
        <div className='flex flex-col justify-start flex-1 m-5 pb-5 border-b border-[#d3d3d3]'>
        <h1 className='font-bold text-xl text-start pb-5'>{ selectEpisode.trackName }</h1>
          <p className='m-0 text-justify'>
            { selectEpisode.description != null ? selectEpisode?.description : selectEpisode?.shortDescription }
          </p>
        </div>
        <audio controls src={ selectEpisode.episodeUrl } className='flex flex-col justify-center' />
      </div>

    </div>
  )
}
