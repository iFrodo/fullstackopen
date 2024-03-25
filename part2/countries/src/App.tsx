import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey =''

const CountriesToShow = ({ filteredCountries }) => {
  const [clickedCountry, setClickedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const getWeather = async (lat, lon) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    setWeather(response.data);
  }

  useEffect(() => {
    if (filteredCountries.length === 1) {
      getWeather(filteredCountries[0].latlng[0], filteredCountries[0].latlng[1]);
    }
  }, [filteredCountries]);

  const onClickBtn = (name) => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`).then(response => setClickedCountry(response.data))
  }

  return (
    <>
      {filteredCountries.length === 1 ?
        <>

          <h1>{filteredCountries[0].name['common']}</h1>
          <div>
            <p>Capital : {filteredCountries[0]["capital"]}</p>
            <p>Area : {filteredCountries[0]["area"]}km</p>
            <p>Population : {filteredCountries[0]["population"]} peaple</p>
            <p>Languages : {Object.entries(filteredCountries[0]["languages"]).map(([code, name]) => (
              ` ${name}`
            ))} </p>
            <p><img src={filteredCountries[0]['flags']['png']} alt="" /></p>
            { }

          </div>
        </>
        : filteredCountries.length > 10 ? "To many matches,specify filter" : filteredCountries.map(e => <p key={e.cca2}>{e.name.common} <button onClick={() => { onClickBtn(e.name.common) }}>show</button></p>)}

      {clickedCountry && (
        <div >
          <p>Capital : {clickedCountry.capital}</p>
          <p>Area : {clickedCountry.area}km</p>
          <p>Population : {clickedCountry.population} peaple</p>
          <p>Languages : {Object.entries(clickedCountry.languages).map(([code, name]) => (
            ` ${name}`
          ))} </p>
          <p><img src={clickedCountry.flags.png} alt="" /></p>
        </div>)}
      {weather && (
        <div>
          <h2>Weather in {filteredCountries[0].name['common']}</h2>
          <p><strong>temperature:</strong> {weather.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" />
          <p><strong>wind:</strong> {weather.wind.speed} m/s direction {weather.wind.deg} degrees</p>
        </div>
      )}

    </>
  )
}
const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState()
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => setAllCountries(response.data))
  }, [])
  if (!allCountries) {
    return null
  }
  const handleChange = (e) => {
    setValue(e.target.value)

  }

  const filteredCountries = value.trim() === '' ? allCountries : allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      <form >
        country: <input value={value} onChange={handleChange} />
      </form>
      <pre>
        <CountriesToShow filteredCountries={filteredCountries} />

      </pre>
    </div>
  )
}

export default App