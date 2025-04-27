import { useCallback, useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { Search } from '../../components/Search'
import { RegionFilter } from '../../components/RegionFilter'
import axios from 'axios'

type HomePageProps = {
  mode: boolean
}

export type Country = {
  name: { common: string }
  translations: { por: { common: string } }
  flags: { png: string, alt: string }
  population: number
  capital: string
  region: string
}

export const HomePage = ({ mode }: HomePageProps) => {
  const [countries, setCountries] = useState<Country[]>([])
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [countrySearched, setCountrySearched] = useState('')
  const [regionSelected, setRegionSelected] = useState('')

  const fetchCountries = useCallback(async () => {
    const response = await axios.get(
      'https://restcountries.com/v3.1/alpha?codes=br,fr,arg,ang,kr,bo,dk,ru,de,es,it,jp'
    )

    const { data } = response
    setCountries(data)
  }, [])

  const filterCountries = useCallback(() => {
    let filtered = countries

    if (countrySearched) {
      filtered = filtered.filter(country =>
        country.translations.por.common
          .toLowerCase()
          .includes(countrySearched.trim().toLowerCase())
      )
    }

    if (regionSelected) {
      filtered = filtered.filter(
        country => country.region.toLowerCase() === regionSelected.toLowerCase()
      )
    }

    setFilteredCountries(filtered)
  }, [countrySearched, regionSelected, countries])

  useEffect(() => {
    fetchCountries()
  }, [fetchCountries])

  useEffect(() => {
    filterCountries()
  }, [countrySearched, regionSelected, filterCountries])

  return (
    <main
      className={`${
        mode ? 'bg-[#161616] text-white' : 'bg-white text-black'
      } h-full min-h-screen md:h-full w-full flex flex-col items-center`}
    >
      <Search isDark={mode} className="mt-6" isSearch={setCountrySearched} />{' '}
      <RegionFilter mode={mode} onSelectRegion={setRegionSelected} />
      <div className="flex flex-wrap justify-center gap-6">
        {filteredCountries.map(country => (
          <Card
            key={country.name.common}
            img={country.flags.png}
            alt={country.flags.alt}
            population={country.population}
            capital={country.capital}
            region={country.region}
            officialValue={country.name.common}
          >
            {country.translations.por.common}
          </Card>
        ))}
      </div>
    </main>
  )
}
