import {useQuery } from '@apollo/client'
import Persons from "./Person.jsx";
import PersonForm from "./PersonForm.jsx";
import {ALL_PERSONS} from "./queries/queries.jsx";
import {useState} from "react";

const Notify = ({errorMessage}) => {
    if(!errorMessage){
        return
    }else
    return(
        <>
            <div style={{color:'red',fontSize:'23px',border:'1px,red,solid',width:'fit-content',padding:'10px'}}>{errorMessage}</div>
        </>
    )
}
const App = () => {
    const [errorMessage,setErrorMessage] = useState(null)
    const result = useQuery(ALL_PERSONS)

    if (result.loading) {
        return <div>loading...</div>
    }
const setNotify = (message) => {
setErrorMessage(message)
    setTimeout(()=>{setErrorMessage(null)},3000)
}
    return (
        <div>
            <Notify errorMessage={errorMessage}/>
            <PersonForm setNotify={setNotify}/>
<Persons persons={result.data.allPersons}/>
        </div>
    )
}

export default App