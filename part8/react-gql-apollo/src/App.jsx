import {useQuery } from '@apollo/client'
import Persons from "./Person.jsx";
import PersonForm from "./PersonForm.jsx";
import {ALL_PERSONS} from "./queries/queries.jsx";


const App = () => {
    const result = useQuery(ALL_PERSONS)

    if (result.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <PersonForm/>
<Persons persons={result.data.allPersons}/>
        </div>
    )
}

export default App