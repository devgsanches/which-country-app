import { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

type SearchProps = {
  isDark: boolean
  className?: string
  isSearch: React.Dispatch<React.SetStateAction<string>>
}

export const Search = ({ isDark, className, isSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    isSearch(e.target.value)
  }

  return (
    <div
      className={`w-80 h-12 lg:w-[30.3125rem] flex border border-[#CACACA] rounded-[76px] items-center px-2.5 gap-2 ${
        isDark ? 'bg-[#252525] border-none' : 'bg-[#ECECEC]'
      } ${className}`}
    >
      <IoSearchSharp
        size={24}
        className={`${!isDark ? 'text-black' : 'text-[#5D5D5D]'}`}
      />
      <input
        type="text"
        value={inputValue}
        placeholder="Pesquisar por país..."
        onChange={handleChange}
        className={`w-full py-3 outline-0 text-base font-[Inter] ${
          isDark ? 'placeholder-[#5D5D5D]' : 'placeholder-[#CACACA]'
        }`}
      />
    </div>
  )
}
