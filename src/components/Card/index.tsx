import { useNavigate } from 'react-router'

type CardProps = {
  img: string
  alt: string
  population: number
  capital: string
  region: string
  children: React.ReactNode
  officialValue: string
}

export const Card = ({
  img,
  alt,
  population,
  capital,
  region,
  children,
  officialValue,
}: CardProps) => {
  const navigate = useNavigate()
  function handle() {
    navigate(`/country/${officialValue}`)
  }
  return (
    <div
      className="flex flex-col mt-6.5 border border-[#CACACA] rounded-[8px] cursor-pointer"
      onClick={handle}
    >
      <div className="h-[12rem]">
        <img src={img} alt={alt} className="w-[17rem] h-[11rem]" />
      </div>
      <h2 className="text-center mt-4 text-[1.75rem]">{children}</h2>
      <div className="flex flex-col px-4 pb-4 pt-3 font-[Inter] gap-3">
        <p>
          <b>População:</b> {population}
        </p>
        <p>
          <b>Capital:</b> {capital}
        </p>
        <p>
          <b>Região:</b> {region}
        </p>
      </div>
    </div>
  )
}
