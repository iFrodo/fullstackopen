import React, {useState, useEffect} from 'react'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    const fetchCountry = async () => {
        try{
            const response = await fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)

            if (!response.ok) {
                throw new Error('Country not found')
            }
            const data = await response.json()
            setCountry({found:true,data})
        } catch (error) {
            setCountry({found:false})
            throw new Error('Error fetching country,country not found')
        }



}
    useEffect( () => {
        if(name){
            fetchCountry()
        }

    },[name])

    return country
}

const Country = ({country}) => {
    if (!country) {
        return null
    }
    console.log(country)

    if (!country.found) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>

            <h3>{country.data.name.common} </h3>
            <div>capital {country.data.capital[0]} </div>
            <div>population {country.data.population}</div>
            <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/>
        </div>
    )
}

const App = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name)

    const handleFetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
            <form onSubmit={handleFetch}>
                <input {...nameInput} />
                <button>find</button>
            </form>

            <Country country={country}/>
        </div>
    )
}

export default App