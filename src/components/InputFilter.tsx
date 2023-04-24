import { type Entry } from '../types'

interface Props {
  filteredPodcast: Entry[]
  setFilterPodcast: (podcast: string) => void
}
export const InputFilter = ({ filteredPodcast, setFilterPodcast }: Props) => {
  return (
        <div className='flex flex-wrap justify-end items-center gap-4 mt-3 pr-3'>
            <h3 className='text-white p-2 rounded-lg bg-[#1da1f2]'>{ filteredPodcast?.length }</h3>
            <input placeholder='Filtra por podcast/autor' onChange={ (e) => {
              setFilterPodcast(e.target.value)
            } } className='m-1.5 border border-[#d3d3d3] p-3 rounded-lg' />
        </div>
  )
}
