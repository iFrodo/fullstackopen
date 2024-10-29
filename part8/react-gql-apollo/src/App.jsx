import { gql, useQuery } from '@apollo/client'
import Persons from "./Person.jsx";

const ALL_PERSONS = gql`
    query {
        allPersons {
            name
            phone
            id
        }
    }
`

const App = () => {
    const result = useQuery(ALL_PERSONS)

    if (result.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
<Persons persons={result.data.allPersons}/>
        </div>
    )
}

export default App