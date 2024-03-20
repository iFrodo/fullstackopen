import { useState, useEffect } from 'react'
import contactsService from './services/Contacts.js'


const Filter = (props) => {
  return (
    <>
      filter show with: <input value={props.newFilter} onChange={props.onChangge} />
    </>
  )
}
const AddNewPerson = (props) => {
  console.log(props)
  return (
    <>
      <div>name: <input value={props.newName} onChange={props.onChangeName} /></div>
      <div>number: <input value={props.newPhone} onChange={props.onChangePhone} type="tel" /></div>
    </>
  )
}
const Persons = (props) => {
  return (
    <>
      {props.filteredPersons.map((person) => <p key={person.id}>{person.name} {person.phone}</p>)}
    </>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('+7')
  const [newFilter, setNewFilter] = useState(' ')
  const [filter, setFilter] = useState('true')

  useEffect(() => {
    console.log('effect')
    contactsService.getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      })
  }, [])
  const onSubmitForm = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      phone: newPhone
    }
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {

      contactsService.create(newPerson)
        .then(result => {
          console.log(result)
          setPersons(persons.concat(result));
        })

    }


  }
  const onChangeName = (e) => {
    setNewName(e.target.value)

  }
  const onChangePhone = (e) => {
    setNewPhone(e.target.value)

  }
  const onChangeFilter = (e) => {
    setNewFilter(e.target.value);
    setFilter(e.target.value.trim() !== '');
  };
  const filteredPersons = newFilter.trim() === '' ? persons : persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} onChangge={onChangeFilter} />

      <form onSubmit={onSubmitForm}>
        <div>
          <h2>add a new</h2>
          <AddNewPerson newName={newName} onChangeName={onChangeName} newPhone={newPhone} onChangePhone={onChangePhone} />


        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
