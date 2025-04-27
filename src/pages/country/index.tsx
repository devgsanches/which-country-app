import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import darkArrow from '../../assets/dark-arrow-back.svg'
import Arrow from '../../assets/arrow-back.svg'
import { CountriesAPI } from '../../services/api'

type CountryPageProps = {
  mode: boolean
}

type NativeName = {
  [key: string]: {
    official: string
    common: string
  }
}

type Currencies = {
  [currencyCode: string]: {
    name: string
    symbol: string
  }
}

type Languages = {
  [languageCode: string]: string
}

type Translations = {
  [languageCode: string]: {
    official: string
    common: string
  }
}

type CountryResponse = {
  name: {
    common: string
    official: string
    nativeName: NativeName
  }
  tld: string[]
  currencies: Currencies
  capital: string[]
  region: string
  subregion: string
  languages: Languages
  borders: string[]
  population: number
  translations: Translations
  flags: {
    png: string
    svg: string
    alt: string
  }
}

export const CountryPage = ({ mode }: CountryPageProps) => {
  const [country, setCountry] = useState<CountryResponse>()
  const [borderCountries, setBorderCountries] = useState([])

  const navigate = useNavigate()
  function handle() {
    navigate('/')
  }

  const { name } = useParams()

  const fetchCountry = useCallback(async () => {
    const response = await CountriesAPI.get(
      `name/${name}?fields=name,population,capital,region,subregion,tld,currencies,languages,borders,translations,flags`
    )
    const country = response.data[0]
    setCountry(country)
    setBorderCountries(country.borders.slice(0, 3))
  }, [name])

  useEffect(() => {
    fetchCountry()
  }, [fetchCountry])

  const firstNativeName = country?.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : null

  return (
    <main
      className={`${
        mode ? 'bg-[#161616] text-white' : 'bg-white text-black'
      } h-full min-h-screen md:h-screen w-full flex flex-col`}
    >
      <div className="flex mt-6.5 ml-11.5">
        <button
          onClick={handle}
          className={`flex px-3 py-2.5 font-[Inter] font-bold gap-2 cursor-pointer ${
            mode
              ? 'bg-[#161616] text-white border border-[#5D5D5D] rounded'
              : 'bg-white text-black border border-[#CACACA] rounded'
          }`}
        >
          <img src={mode ? Arrow : darkArrow} alt="Arrow Icon" />
          Voltar
        </button>
      </div>
      <div className="mt-6 flex justify-center">
        <img
          src={country?.flags.svg}
          alt={country?.flags.alt}
          className="w-[20rem] rounded"
        />
      </div>
      <div className="flex flex-col ml-14 md:ml-0 mt-4 md:items-center">
        <h2 className="mb-3 text-[2.75rem]">
          {country?.translations.por.common}
        </h2>
        <div className="font-[Inter] flex flex-col gap-4 mb-6 md:items-center">
          <p>
            <b>Nome Nativo:</b> {firstNativeName}
          </p>
          <p>
            <b>População:</b> {country?.population}
          </p>
          <p>
            <b>Capital:</b> {country?.capital}
          </p>
          <p>
            <b>Região:</b> {country?.region}
          </p>
          <p>
            <b>Sub-região:</b> {country?.subregion}
          </p>
          <p>
            <b>domínio de nível superior:</b> {country?.tld}
          </p>
          <p>
            <b>Moeda:</b> {Object.values(country?.currencies || {})[0]?.name}
          </p>
          <p>
            <b>Língua(s):</b>{' '}
            {Object.values(country?.languages || {})
              .slice(0, 3)
              .join(', ')}
          </p>
        </div>
        <div className="font-[Inter]">
          <b>Países fronteira:</b>
          <div className="flex gap-2 mt-2">
            {borderCountries.map(borderCountry => (
              <p
                className="border border-[#CACACA] px-3 py-1.5 rounded"
                key={borderCountry}
              >
                {borderCountry}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
