import {useState} from "react";
import {useMutation} from "@apollo/client";
import {CREATE_PERSON, ALL_PERSONS} from "./queries/queries.jsx";


const PersonForm = ({setNotify}) => {
    const useField = (type) => {
        const [value, setValue] = useState('')

        const onChange = (event) => {
            setValue(event.target.value)
        }
        const reset = () => {
            setValue('')
        }
        return {
            type,
            value,
            reset,
            onChange
        }
    }
    // const [name, setName] = useState('')
    // const [phone, setPhone] = useState('')
    // const [street, setStreet] = useState('')
    // const [city, setCity] = useState('')
    const name = useField('text')
    const phone = useField('tel')
    const street = useField('text')
    const city = useField('text')

    const getInputProps = (field) => ({
        type: field.type,
        value: field.value,
        onChange: field.onChange
    });

    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries: [{query: ALL_PERSONS}], onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            setNotify(messages)
        }
    })
    const submit = (e) => {
        e.preventDefault()
        console.log('submit')
        createPerson({variables: {name: name.value, street: street.value, city: city.value, phone: phone.value}})
        name.reset()
        phone.reset()
        street.reset()
        city.reset()
    }
    return (
        <>
            <h2>Create person</h2>
            <form onSubmit={submit}>
                <div><label>Name: <input {...getInputProps(name)}/></label></div>

                <div><label>Phone: <input {...getInputProps(phone)}/></label></div>

                <div><label>Street: <input {...getInputProps(street)}/></label></div>

                <div><label>City: <input {...getInputProps(city)}/></label></div>

                <button>submit</button>
            </form>
        </>
    )
}
export default PersonForm;