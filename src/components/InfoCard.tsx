import { type Entry } from '../types'

interface Props {
  podcast: Entry
  navigate: (path: string, state?: any) => void
}
export const InfoCard = ({ podcast, navigate }: Props) => {
  return (
    <div className='flex flex-col justify-center items-center border border-[#d3d3d3] min-w-[350px] rounded-lg mb-16 shadow-2
    hover:bg-stone-100 hover:cursor-pointer pt-8 px-8 py-6' onClick={ () => {
      navigate(`/podcast/${podcast.id.attributes['im:id']}`, {
        state: {
          podcast
        }
      })
    } }>
      <div className='flex flex-col flex-1 items-center justify-center items-center -mt-8 w-full h-full'>
        <img src={ podcast['im:image'][2].label } alt={ podcast['im:name'].label }
          className='shadow-3 w-24 h-24 rounded-full m-0 -mt-12 mb-2.5' />
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <h4 className='max-w-[300px] text-lg font-medium line-clamp-2'>{ podcast.title.label }</h4>
          <p className='max-w-[300px] text-base text-gray-400 line-clamp-1 mt-auto'>Author: { podcast['im:artist'].label }</p>
        </div>
      </div>
    </div>
  )
}
