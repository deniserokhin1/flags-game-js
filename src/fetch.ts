import { namespace } from './type'

interface ICountry {
  nameCountry: string
  flagUrl: string
  code: string
}

export const arrayCountries: ICountry[] = []

console.log(arrayCountries)

export async function getCountryArr() {
  let response = await fetch(`https://restcountries.com/v3.1/all`)
  let data: namespace.ICountry[] = await response.json()

  for (let i = 0; i < data.length; i++) {
    arrayCountries.push({
      nameCountry: data[i].translations.rus.common,
      flagUrl: data[i].flags.png,
      code: data[i].cca2,
    })
  }
}
