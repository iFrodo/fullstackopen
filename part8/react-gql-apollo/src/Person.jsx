import {useState} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {ALL_PERSONS, DELETE_PERSON, FIND_PERSON} from "./queries/queries.jsx";



const Person = ({person, onClose,setNotify}) => {
    const [deletePerson] = useMutation(DELETE_PERSON, {
        refetchQueries: [{query: ALL_PERSONS}], onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            setNotify(messages)
        }
    })

    const deleteHandler = () => {

        deletePerson({variables: {id: person.id}})
        window.location.reload();
    }
    return (
        <div>
            <h2>{person.name}</h2>
            <div>
                {person.address.street} {person.address.city}
            </div>
            <div>{person.phone}</div>
            <button onClick={deleteHandler}>delete</button>
            <button onClick={onClose}>close</button>
        </div>
    )
}

const Persons = ({persons,setNotify}) => {
// нам приходят persons из app, мы рендерим каждый элемент persons и добавляем обработчик на кнопку который сетит имя в состояние
// в запросе  указано условие что при nameToSearch = null не делать запрос
// когда обновляется состояние это вызывает ререндер компоненты, и срабатывает запрос и условие которе возвращает компонент Person который отображает подробную информацию
// ей так же передается обработчик для зануления состояния которое снова вызывает ререндер и отображается список всех persons

    const [nameToSearch, setNameToSearch] = useState(null)
    const result = useQuery(FIND_PERSON, {
        variables: {nameToSearch},
        skip: !nameToSearch,
    })
    console.log(result)


    if (nameToSearch && result.data) {
        return (
            <Person
                person={result.data.findPerson}
                onClose={() => setNameToSearch(null)}
                setNotify={setNotify}
            />
        )
    }

    return (
        <div>
            <h2>Persons</h2>
            {persons.map((p) => (
                <div key={p.name}>
                    {p.name} {p.phone}
                    <button onClick={() => setNameToSearch(p.name)}>
                        show address
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Persons