import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('+7')
  const [newFilter, setNewFilter] = useState(' ')
  const [filter, setFilter] = useState('true')

  const onSubmitForm = (e) => {
    e.preventDefault()
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      phone: newPhone
    }
    persons.find(person => person.name === newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newPerson));

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
      filter show with: <input value={newFilter} onChange={onChangeFilter} />
      <form onSubmit={onSubmitForm}>
        <div>
          <h2>add a new</h2>
          name: <input value={newName} onChange={onChangeName} />
          <div>number: <input value={newPhone} onChange={onChangePhone} type="tel" pattern="\+7\-[0-9]{3}\-[0-9]{3}\-[0-9]{2}\-[0-9]{2}" /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => <p key={person.id}>{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App
