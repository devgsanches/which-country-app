import { useState } from 'react'
import darkArrowExpand from '../../assets/dark_expand_icon.svg'
import arrowExpand from '../../assets/expand_icon.svg'
import darkArrowCollect from '../../assets/dark_collect_icon.svg'
import arrowCollect from '../../assets/collect_icon.svg'

type RegionFilterProps = {
  mode: boolean
  onSelectRegion: (region: string) => void
}

export const RegionFilter = ({ mode, onSelectRegion }: RegionFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('Filtrar por Região')

  const regions = [
    { label: 'Filtrar por Região', value: '' },
    { label: 'África', value: 'Africa' },
    { label: 'América', value: 'Americas' },
    { label: 'Europa', value: 'Europe' },
    { label: 'Ásia', value: 'Asia' },
    { label: 'Oceania', value: 'Oceania' },
  ]

  const toggleDropdown = () => setIsOpen(!isOpen)

  const selectRegion = (value: string, label: string) => {
    setSelectedRegion(label)
    onSelectRegion(value)
    setIsOpen(false)
  }

  const darkMode = mode
    ? 'bg-[#161616] text-white border border-[#5D5D5D]'
    : 'bg-white text-black border border-[#CACACA]'

  const optionBg = mode ? 'hover:bg-[#333333]' : 'hover:bg-[#f1f1f1]'

  return (
    <div
      className={`relative inline-block text-left ${darkMode} rounded p-2 font-[Inter] mt-6 min-w-[10.875rem]`}
    >
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex justify-between gap-2 w-full font-bold items-center cursor-pointer"
      >
        {selectedRegion}
        {(isOpen && mode && (
          <img src={arrowCollect} alt="Ícone seta pra cima" />
        )) ||
          (!isOpen && mode && (
            <img src={arrowExpand} alt="Ícone seta pra baixo" />
          )) ||
          (isOpen && !mode && (
            <img src={darkArrowCollect} alt="Ícone seta pra cima" />
          )) ||
          (!isOpen && !mode && (
            <img src={darkArrowExpand} alt="Ícone seta pra baixo" />
          ))}
      </button>

      {isOpen && (
        <div
          className={`absolute mt-2 w-full rounded-md shadow-lg z-10 ${darkMode}`}
        >
          <div className="py-1">
            {regions.map(region => (
              <button
                key={region.value}
                onClick={() => selectRegion(region.value, region.label)}
                className={`block w-full text-left px-4 py-2 font-semibold ${optionBg}`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
