import axios from 'axios'

export const CountriesAPI = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
})
